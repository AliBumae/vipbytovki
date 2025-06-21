import { getModelById, BYTOVKA_MODELS, HOZBLOK_MODELS } from '../../../lib/buildingModels';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// Генерируем статические параметры для всех возможных productId
export async function generateStaticParams() {
  const allModels = [...BYTOVKA_MODELS, ...HOZBLOK_MODELS];
  return allModels.map((model) => ({
    productId: model.id,
  }));
}

export default function ProductPage({ params }: { params: { productId: string } }) {
  const model = getModelById(params.productId);

  if (!model) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto py-10 px-4 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-8 items-center bg-white/80 rounded-xl shadow-lg p-6">
        {model.previewImage && (
          <div className="w-full md:w-1/2 flex-shrink-0">
            <Image
              src={model.previewImage}
              alt={model.name}
              width={400}
              height={300}
              className="rounded-lg object-cover shadow-md"
              priority
            />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 text-gradient bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            {model.name}
          </h1>
          <div className="mb-4 text-gray-700 text-lg">{model.description}</div>
          <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
            <div><span className="font-semibold">Категория:</span> {model.category}</div>
            <div><span className="font-semibold">Тип:</span> {model.type === 'bytovka' ? 'Бытовка' : 'Хозблок'}</div>
            <div><span className="font-semibold">Размеры:</span> {model.dimensions.length}×{model.dimensions.width}×{model.dimensions.height} м</div>
            <div><span className="font-semibold">Крыша:</span> {model.defaultRoofType}</div>
            <div><span className="font-semibold">Материал:</span> {model.defaultMaterial}</div>
            <div><span className="font-semibold">Окон:</span> {model.defaultWindows}</div>
            <div><span className="font-semibold">Дверь:</span> {model.defaultDoorPosition}</div>
          </div>
          <div className="text-2xl font-bold text-green-600 mb-4">от {model.basePrice.toLocaleString()} ₽</div>
          <div className="flex flex-wrap gap-2 mb-2">
            {model.availableOptions.map(opt => (
              <span key={opt} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {opt}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 