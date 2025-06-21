// Типы для описания моделей бытовок и хозблоков
export interface BuildingModel {
  id: string;                   // Уникальный идентификатор модели
  name: string;                 // Название модели
  type: 'bytovka' | 'hozblok';  // Тип: бытовка или хозблок
  category: string;             // Категория (стандарт, премиум, делюкс)
  description: string;          // Описание модели
  dimensions: {                 // Размеры модели
    width: number;
    length: number;
    height: number;
  };
  basePrice: number;            // Базовая цена
  defaultRoofType: string;      // Тип крыши по умолчанию
  defaultMaterial: string;      // Материал по умолчанию
  availableOptions: string[];   // Доступные опции
  defaultWindows: number;       // Количество окон по умолчанию
  defaultDoorPosition: string;  // Положение двери по умолчанию
  previewImage?: string;        // Путь к изображению предпросмотра
  modelPath?: string;           // Путь к 3D модели (если используются готовые модели)
  photos?: string[];           // Массив путей к фотографиям товара
  details?: string;             // Дополнительная информация
}

// Массив со всеми моделями бытовок
export const BYTOVKA_MODELS: BuildingModel[] = [
  // Стандартные бытовки
  {
    id: "standard-6m",
    name: "Стандартная бытовка 6м",
    type: "bytovka",
    category: "standard",
    description: "Стандартная бытовка 6 метров — универсальное решение для размещения рабочих, организации офиса или временного проживания на стройплощадке. Просторная, светлая и надёжная, она легко адаптируется под любые задачи.",
    dimensions: { width: 2.4, length: 6, height: 2.5 },
    basePrice: 120000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity", "heating", "furniture", "extra_windows"],
    defaultWindows: 2,
    defaultDoorPosition: "front",
    previewImage: "/models/previews/standard-6m.jpg",
    details: `Бытовка 6×2,4 м — это просторное и светлое помещение, идеально подходящее для размещения бригады, организации временного офиса или хранения инвентаря. Каркас из прочного бруса, надёжная кровля и качественная отделка обеспечивают долговечность и комфорт. Благодаря оптимальным размерам и продуманной планировке, бытовка легко впишется в любой участок и прослужит долгие годы.`
  },
  {
    id: "standard-4m",
    name: "Стандартная бытовка 4м",
    type: "bytovka",
    category: "standard",
    description: "Компактная бытовка 4 метра — идеальный выбор для небольших площадок и экономичного размещения 2–3 человек. Лёгкая, удобная и быстрая в установке.",
    dimensions: { width: 2.4, length: 4, height: 2.5 },
    basePrice: 90000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity", "heating", "furniture"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    previewImage: "/models/previews/standard-4m.jpg",
    details: `Бытовка 4×2,4 м — компактное и практичное решение для небольших участков. Внутри достаточно места для комфортного размещения, а прочные материалы и качественная сборка гарантируют долгий срок службы. Отличный вариант для дачи, стройки или временного проживания.`
  },
  {
    id: "standard-9m",
    name: "Стандартная бытовка 9м",
    type: "bytovka",
    category: "standard",
    description: "Просторная бытовка 9 метров — идеальна для размещения большого количества людей или оборудования. Максимум пространства и удобства!",
    dimensions: { width: 2.4, length: 9, height: 2.5 },
    basePrice: 170000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity", "heating", "furniture", "extra_windows", "plumbing"],
    defaultWindows: 3,
    defaultDoorPosition: "front",
    previewImage: "/models/previews/standard-9m.jpg",
    details: `Бытовка 9×2,4 м — это максимальный комфорт и простор для вашей команды или хранения крупного инвентаря. Качественные материалы, усиленный каркас и современная отделка делают эту модель отличным выбором для длительного использования.`
  },
  
  // Премиум бытовки
  {
    id: "premium-6m",
    name: "Премиум бытовка 6м",
    type: "bytovka",
    category: "premium",
    description: "Премиум бытовка 6 метров — повышенный комфорт, улучшенная отделка и утепление для круглогодичного использования.",
    dimensions: { width: 3, length: 6, height: 2.7 },
    basePrice: 180000,
    defaultRoofType: "gable",
    defaultMaterial: "premium",
    availableOptions: ["electricity", "heating", "furniture", "plumbing", "extra_windows", "panoramic_windows"],
    defaultWindows: 2,
    defaultDoorPosition: "front",
    previewImage: "/models/previews/premium-6m.jpg",
    details: `Премиум бытовка 6×3 м — это сочетание уюта, стиля и практичности. Улучшенная отделка, современное утепление и продуманная планировка обеспечивают комфорт в любое время года. Отличный выбор для тех, кто ценит качество и заботится о комфорте своей команды или семьи.`
  },
  {
    id: "premium-9m",
    name: "Премиум бытовка 9м",
    type: "bytovka",
    category: "premium",
    description: "Просторная премиум-бытовка с высоким потолком и улучшенными материалами для максимального комфорта.",
    dimensions: { width: 3, length: 9, height: 2.7 },
    basePrice: 240000,
    defaultRoofType: "gable",
    defaultMaterial: "premium",
    availableOptions: ["electricity", "heating", "furniture", "plumbing", "extra_windows", "panoramic_windows", "bed"],
    defaultWindows: 3,
    defaultDoorPosition: "front",
    previewImage: "/models/previews/premium-9m.jpg",
    details: `Премиум бытовка 9×3 м — просторное и светлое помещение с высоким потолком, улучшенной отделкой и современными материалами. Идеально подходит для длительного проживания или организации комфортного офиса на участке.`
  },
  
  // Делюкс бытовки
  {
    id: "deluxe-6m",
    name: "Делюкс бытовка 6м",
    type: "bytovka",
    category: "deluxe",
    description: "Делюкс бытовка 6 метров — максимальный комфорт, полная отделка, санузел и все коммуникации для жизни и работы.",
    dimensions: { width: 3.2, length: 6, height: 2.8 },
    basePrice: 280000,
    defaultRoofType: "hip",
    defaultMaterial: "deluxe",
    availableOptions: ["electricity", "heating", "furniture", "plumbing", "extra_windows", "panoramic_windows", "bed"],
    defaultWindows: 3,
    defaultDoorPosition: "front",
    previewImage: "/models/previews/deluxe-6m.jpg",
    details: `Делюкс бытовка 6×3,2 м — это премиальный уровень комфорта: полная отделка, санузел, все необходимые коммуникации. Просторная, светлая и современная, она станет отличным выбором для круглогодичного проживания или работы.`
  },
  {
    id: "deluxe-9m",
    name: "Делюкс бытовка 9м",
    type: "bytovka",
    category: "deluxe",
    description: "Делюкс бытовка 9 метров — максимальная площадь, премиальные материалы и полный комплект удобств.",
    dimensions: { width: 3.2, length: 9, height: 2.8 },
    basePrice: 350000,
    defaultRoofType: "hip",
    defaultMaterial: "deluxe",
    availableOptions: ["electricity", "heating", "furniture", "plumbing", "extra_windows", "panoramic_windows", "bed"],
    defaultWindows: 4,
    defaultDoorPosition: "front",
    previewImage: "/models/previews/deluxe-9m.jpg",
    details: `Делюкс бытовка 9×3,2 м — это максимум пространства и комфорта. Премиальные материалы, современная отделка и полный комплект удобств делают эту модель идеальной для самых требовательных клиентов.`
  }
];

// Массив со всеми моделями хозблоков
export const HOZBLOK_MODELS: BuildingModel[] = [
  // Стандартные хозблоки
  {
    id: "hozblok-small",
    name: "Малый хозблок",
    type: "hozblok",
    category: "standard",
    description: "Компактный хозблок для хранения инструментов и садового инвентаря",
    dimensions: { width: 2, length: 3, height: 2.2 },
    basePrice: 70000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    previewImage: "/models/previews/hozblok-small.jpg"
  },
  {
    id: "hozblok-medium",
    name: "Средний хозблок",
    type: "hozblok",
    category: "standard",
    description: "Хозблок среднего размера для хранения садовой техники и оборудования",
    dimensions: { width: 2.4, length: 4, height: 2.3 },
    basePrice: 95000,
    defaultRoofType: "gable",
    defaultMaterial: "standard",
    availableOptions: ["electricity", "extra_windows"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    previewImage: "/models/previews/hozblok-medium.jpg",
    details: `Габариты:\n▶ Размер наружный - 3000 х 3000 мм\n▶ Высота потолка - 1950-2150 мм\n▶ Окно деревянное 600×900 мм - 1 шт\n▶ Дверь наборная 2000×700(800) мм - 1 шт\n\nМатериалы:\n▶ Каркас - брус 50×100 мм\n▶ На пол укладывается обрезная доска 25 мм\n▶ Наружная обшивка - вагонка класс С\n▶ Внутренняя отделка - без отделки\n▶ Утепление - без утепления\n▶ Кровля - оцинкованный профлист С8\n\nФундамент:\n▶ Бетонные блоки 400×200×200 мм - 6 шт\n▶ Деревянные обработанные полозья 100×150 мм - 3 шт`
  },
  {
    id: "hozblok-large",
    name: "Большой хозблок",
    type: "hozblok",
    category: "premium",
    description: "Просторный хозблок с увеличенной высотой для хранения крупной техники и оборудования",
    dimensions: { width: 3, length: 6, height: 2.5 },
    basePrice: 140000,
    defaultRoofType: "gable",
    defaultMaterial: "premium",
    availableOptions: ["electricity", "heating", "extra_windows"],
    defaultWindows: 2,
    defaultDoorPosition: "front",
    previewImage: "/models/previews/hozblok-large.jpg"
  },
  {
    id: "hozblok-workshop",
    name: "Хозблок-мастерская",
    type: "hozblok",
    category: "deluxe",
    description: "Хозблок с утеплением и отделкой, предназначенный для использования в качестве мастерской",
    dimensions: { width: 3, length: 6, height: 2.7 },
    basePrice: 180000,
    defaultRoofType: "hip",
    defaultMaterial: "deluxe",
    availableOptions: ["electricity", "heating", "furniture", "plumbing", "extra_windows"],
    defaultWindows: 2,
    defaultDoorPosition: "front",
    previewImage: "/models/previews/hozblok-workshop.jpg"
  },
  {
    id: "hozblok-4x2",
    name: "Хозблок 4х2",
    type: "hozblok",
    category: "standard",
    description: "Удлиненный хозблок для размещения большого количества инструментов и инвентаря.",
    dimensions: { width: 2, length: 4, height: 2.1 },
    basePrice: 50000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    details: `Хозблок 4×2 м — это практичное и вместительное решение для хранения садового инвентаря, инструментов и сезонных вещей. Благодаря удлинённой форме и оптимальной высоте потолка (1950–2150 мм), внутри всегда просторно и удобно. Большое окно наполняет помещение светом, а прочная дверь обеспечивает надёжность. Каркас из бруса, пол из обрезной доски и кровля из оцинкованного профлиста гарантируют долговечность и защиту от непогоды. Фундамент на бетонных блоках и деревянных полозьях обеспечивает устойчивость на любом участке.`
  },
  {
    id: "hozblok-4x3",
    name: "Хозблок 4х3",
    type: "hozblok",
    category: "standard",
    description: "Просторный хозблок с увеличенной шириной для максимального комфорта.",
    dimensions: { width: 3, length: 4, height: 2.1 },
    basePrice: 63000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    details: `Хозблок 4×3 м — это просторное и светлое помещение для хранения крупного инвентаря, техники и инструментов. Увеличенная ширина обеспечивает максимум комфорта и свободы планировки. Качественные материалы, надёжный каркас и современная кровля делают этот хозблок отличным выбором для долгосрочного использования. Фундамент на бетонных блоках и деревянных полозьях гарантирует устойчивость и долговечность.`
  },
  {
    id: "hozblok-5x2",
    name: "Хозблок 5х2",
    type: "hozblok",
    category: "standard",
    description: "Самый длинный стандартный хозблок для больших участков и хозяйственных нужд.",
    dimensions: { width: 2, length: 5, height: 2.1 },
    basePrice: 56000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    details: `Хозблок 5×2 м — идеальное решение для тех, кому нужно максимум места на минимальной площади. Удлинённая форма позволяет удобно разместить всё необходимое для дачи или хозяйства. Прочные материалы, надёжная кровля и фундамент обеспечивают долговечность и защиту от влаги. Отличный выбор для больших участков и активного использования круглый год.`
  },
  {
    id: "hozblok-5x3",
    name: "Хозблок 5х3",
    type: "hozblok",
    category: "standard",
    description: "Просторный хозблок с увеличенной шириной для максимального комфорта и удобства.",
    dimensions: { width: 3, length: 5, height: 2.1 },
    basePrice: 71000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    details: `Хозблок 5×3 м — это просторное и надёжное помещение для хранения крупного инвентаря, техники и инструментов. Увеличенная ширина и длина обеспечивают максимум комфорта и свободы планировки. Качественные материалы, усиленный каркас и современная кровля делают этот хозблок отличным выбором для долгосрочного использования. Фундамент на бетонных блоках и деревянных полозьях гарантирует устойчивость и долговечность.`
  },
  {
    id: "hozblok-6x2",
    name: "Хозблок 6х2",
    type: "hozblok",
    category: "standard",
    description: "Популярная модель удлиненного хозблока для больших участков и хозяйственных нужд.",
    dimensions: { width: 2, length: 6, height: 2.1 },
    basePrice: 58000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    details: `Хозблок 6×2 м — идеальный выбор для тех, кто ценит вместимость и компактность. Удлинённая форма позволяет удобно разместить всё необходимое для дачи или хозяйства. Прочные материалы, надёжная кровля и фундамент обеспечивают долговечность и защиту от влаги. Отличный вариант для больших участков и активного использования круглый год.`
  },
  {
    id: "hozblok-6x3",
    name: "Хозблок 6х3",
    type: "hozblok",
    category: "standard",
    description: "Самый просторный стандартный хозблок с максимальными размерами для любых нужд.",
    dimensions: { width: 3, length: 6, height: 2.1 },
    basePrice: 74000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    details: `Хозблок 6×3 м — это максимум пространства и свободы для хранения инвентаря, техники и любых хозяйственных нужд. Увеличенная ширина и длина позволяют реализовать любые идеи по организации внутреннего пространства. Качественные материалы и усиленный фундамент гарантируют долгий срок службы.`
  },
  {
    id: "hozblok-7x3",
    name: "Хозблок 7х3",
    type: "hozblok",
    category: "standard",
    description: "Огромный хозблок для промышленных нужд и больших хозяйств.",
    dimensions: { width: 3, length: 7, height: 2.1 },
    basePrice: 95000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    details: `Хозблок 7×3 м — это просторное и надёжное решение для промышленных задач и больших хозяйств. Усиленный каркас, качественная кровля и фундамент на 12 бетонных блоках обеспечивают максимальную устойчивость и долговечность. Отличный выбор для хранения крупной техники и большого количества инвентаря.`
  },
  {
    id: "hozblok-8x3",
    name: "Хозблок 8х3",
    type: "hozblok",
    category: "standard",
    description: "Самый большой хозблок в нашем каталоге для максимальных потребностей.",
    dimensions: { width: 3, length: 8, height: 2.1 },
    basePrice: 116000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
  },
  {
    id: "hozblok-firewood-3x2",
    name: "Хозблок с дровником 3х2",
    type: "hozblok",
    category: "firewood",
    description: "Практичный хозблок с отдельным отсеком для хранения дров. Идеально для дачного участка.",
    dimensions: { width: 2, length: 3, height: 2.1 },
    basePrice: 47000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    details: `Хозблок с дровником 3×2 м — это универсальное решение для дачи или загородного дома. Просторный отсек для дров позволяет хранить запас топлива в сухости и порядке, а размер дровника можно выбрать под ваши нужды. Светлое помещение с большим окном и прочной дверью удобно для хранения инвентаря. Каркас из бруса, пол из обрезной доски и кровля из оцинкованного профлиста обеспечивают долговечность и защиту от непогоды. Фундамент на бетонных блоках и деревянных полозьях гарантирует устойчивость.`
  },
  {
    id: "hozblok-firewood-3x3",
    name: "Хозблок с дровником 3х3",
    type: "hozblok",
    category: "firewood",
    description: "Просторный хозблок с дровником квадратной формы для максимального комфорта.",
    dimensions: { width: 3, length: 3, height: 2.1 },
    basePrice: 56000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    details: `Хозблок с дровником 3×3 м — это просторное и светлое помещение с отдельным отсеком для хранения дров. Размер дровника можно выбрать индивидуально, что особенно удобно для тех, кто запасается топливом на весь сезон. Качественные материалы, усиленный каркас и современная кровля делают этот хозблок отличным выбором для долгосрочного использования. Фундамент на бетонных блоках и деревянных полозьях гарантирует устойчивость.`
  },
  {
    id: "hozblok-firewood-4x2",
    name: "Хозблок с дровником 4х2",
    type: "hozblok",
    category: "firewood",
    description: "Удлиненный хозблок с дровником для размещения большого количества инструментов и дров.",
    dimensions: { width: 2, length: 4, height: 2.1 },
    basePrice: 52000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    details: `Хозблок с дровником 4×2 м — это практичное решение для тех, кто ценит порядок и удобство. Просторный отсек для дров (размер можно выбрать индивидуально) и вместительное помещение для инвентаря делают этот хозблок незаменимым помощником на участке. Прочные материалы, надёжная кровля и фундамент обеспечивают долговечность и защиту от влаги.`
  },
  {
    id: "hozblok-firewood-4x3",
    name: "Хозблок с дровником 4х3",
    type: "hozblok",
    category: "firewood",
    description: "Просторный хозблок с дровником увеличенной ширины для максимального комфорта.",
    dimensions: { width: 3, length: 4, height: 2.1 },
    basePrice: 65000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    details: `Хозблок с дровником 4×3 м — это просторное и светлое помещение с отдельным отсеком для хранения дров. Размер дровника можно выбрать индивидуально, что особенно удобно для тех, кто запасается топливом на весь сезон. Качественные материалы, усиленный каркас и современная кровля делают этот хозблок отличным выбором для долгосрочного использования. Фундамент на бетонных блоках и деревянных полозьях гарантирует устойчивость.`
  },
  {
    id: "hozblok-firewood-5x2",
    name: "Хозблок с дровником 5х2",
    type: "hozblok",
    category: "firewood",
    description: "Длинный хозблок с дровником для больших участков и хозяйственных нужд.",
    dimensions: { width: 2, length: 5, height: 2.1 },
    basePrice: 59000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    details: `Хозблок с дровником 5×2 м — это практичное решение для тех, кто ценит порядок и удобство. Просторный отсек для дров (размер можно выбрать индивидуально) и вместительное помещение для инвентаря делают этот хозблок незаменимым помощником на участке. Прочные материалы, надёжная кровля и фундамент обеспечивают долговечность и защиту от влаги.`
  },
  {
    id: "hozblok-firewood-5x3",
    name: "Хозблок с дровником 5х3",
    type: "hozblok",
    category: "firewood",
    description: "Популярная модель просторного хозблока с дровником для максимального комфорта.",
    dimensions: { width: 3, length: 5, height: 2.1 },
    basePrice: 74000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    details: `Хозблок с дровником 5×3 м — это просторное и светлое помещение с отдельным отсеком для хранения дров. Размер дровника можно выбрать индивидуально, что особенно удобно для тех, кто запасается топливом на весь сезон. Качественные материалы, усиленный каркас и современная кровля делают этот хозблок отличным выбором для долгосрочного использования. Фундамент на бетонных блоках и деревянных полозьях гарантирует устойчивость.`
  },
  {
    id: "hozblok-firewood-6x2",
    name: "Хозблок с дровником 6х2",
    type: "hozblok",
    category: "firewood",
    description: "Самый длинный хозблок с дровником для промышленных нужд и больших хозяйств.",
    dimensions: { width: 2, length: 6, height: 2.1 },
    basePrice: 61000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    details: `Хозблок с дровником 6×2 м — это идеальное решение для тех, кто ценит вместимость и порядок. Просторный отсек для дров (размер можно выбрать индивидуально) и вместительное помещение для инвентаря делают этот хозблок незаменимым помощником на участке. Прочные материалы, надёжная кровля и фундамент обеспечивают долговечность и защиту от влаги.`
  },
  {
    id: "hozblok-firewood-6x3",
    name: "Хозблок с дровником 6х3",
    type: "hozblok",
    category: "firewood",
    description: "Огромный хозблок с дровником для максимальных потребностей и промышленного использования.",
    dimensions: { width: 3, length: 6, height: 2.1 },
    basePrice: 78000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    details: `Хозблок с дровником 6×3 м — это максимум пространства и свободы для хранения дров, инвентаря и техники. Размер дровника можно выбрать индивидуально, что особенно удобно для тех, кто запасается топливом на весь сезон. Качественные материалы, усиленный каркас и современная кровля делают этот хозблок отличным выбором для долгосрочного использования.`
  },
  {
    id: "hozblok-firewood-7x3",
    name: "Хозблок с дровником 7х3",
    type: "hozblok",
    category: "firewood",
    description: "Самый большой хозблок с дровником для промышленных нужд и больших хозяйств.",
    dimensions: { width: 3, length: 7, height: 2.1 },
    basePrice: 99000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    details: `Хозблок с дровником 7×3 м — это просторное и надёжное решение для промышленных задач и больших хозяйств. Усиленный каркас, качественная кровля и фундамент на 12 бетонных блоках обеспечивают максимальную устойчивость и долговечность. Отличный выбор для хранения крупной техники и большого количества дров.`
  },
  {
    id: "hozblok-veranda-3x3-3x2",
    name: "Хозблок 3х3 с верандой 3х2",
    type: "hozblok",
    category: "veranda",
    description: "Хозблок с просторной верандой для отдыха и хранения.",
    dimensions: { width: 3, length: 5, height: 2.1 },
    basePrice: 96000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    details: `Хозблок 3×3 с верандой 3×2 м — это идеальное сочетание функциональности и уюта. Просторная веранда отлично подойдёт для отдыха на свежем воздухе, а закрытая часть обеспечит надёжное хранение инвентаря. Качественные материалы, прочный каркас и современная кровля гарантируют долговечность и комфорт.`
  },
  {
    id: "hozblok-veranda-4x3-4x2",
    name: "Хозблок 4х3 с верандой 4х2",
    type: "hozblok",
    category: "veranda",
    description: "Хозблок с большой верандой для отдыха и хранения.",
    dimensions: { width: 4, length: 5, height: 2.1 },
    basePrice: 110000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    details: `Хозблок 4×3 с верандой 4×2 м — это просторное и светлое помещение с большой верандой для отдыха и хранения. Закрытая часть надёжно защитит ваши вещи, а веранда станет любимым местом для семейных вечеров. Прочные материалы и современная кровля обеспечивают долговечность.`
  },
  {
    id: "hozblok-veranda-5x2-5x2",
    name: "Хозблок 5х2 с верандой 5х2",
    type: "hozblok",
    category: "veranda",
    description: "Хозблок с верандой для максимального комфорта и хранения.",
    dimensions: { width: 5, length: 4, height: 2.1 },
    basePrice: 110000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    details: `Хозблок 5×2 с верандой 5×2 м — это идеальное решение для тех, кто ценит комфорт и функциональность. Просторная веранда отлично подойдёт для отдыха, а закрытая часть обеспечит надёжное хранение инвентаря и инструментов. Качественные материалы, прочный каркас и современная кровля гарантируют долговечность и уют.`
  },
  {
    id: "hozblok-veranda-5x3-5x2",
    name: "Хозблок 5х3 с верандой 5х2",
    type: "hozblok",
    category: "veranda",
    description: "Хозблок с большой верандой для отдыха и хранения.",
    dimensions: { width: 5, length: 5, height: 2.1 },
    basePrice: 124000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    details: `Хозблок 5×3 с верандой 5×2 м — это просторное и светлое помещение с большой верандой для отдыха и хранения. Закрытая часть надёжно защитит ваши вещи, а веранда станет любимым местом для семейных вечеров. Прочные материалы, современная кровля и фундамент на 12 бетонных блоках обеспечивают долговечность и устойчивость.`
  },
  {
    id: "hozblok-veranda-6x2-6x2",
    name: "Хозблок 6х2 с верандой 6х2",
    type: "hozblok",
    category: "veranda",
    description: "Хозблок с верандой для максимального комфорта и хранения.",
    dimensions: { width: 6, length: 4, height: 2.1 },
    basePrice: 118000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    details: `Хозблок 6×2 с верандой 6×2 м — это идеальное решение для тех, кто ценит комфорт и функциональность. Просторная веранда отлично подойдёт для отдыха, а закрытая часть обеспечит надёжное хранение инвентаря и инструментов. Качественные материалы, прочный каркас и современная кровля гарантируют долговечность и уют.`
  },
  {
    id: "hozblok-veranda-6x3-6x2",
    name: "Хозблок 6х3 с верандой 6х2",
    type: "hozblok",
    category: "veranda",
    description: "Хозблок с верандой для максимального комфорта и хранения.",
    dimensions: { width: 6, length: 5, height: 2.1 },
    basePrice: 137000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    details: `Хозблок 6×3 с верандой 6×2 м — это просторное и светлое помещение с большой верандой для отдыха и хранения. Закрытая часть надёжно защитит ваши вещи, а веранда станет любимым местом для семейных вечеров. Прочные материалы, современная кровля и фундамент на 12 бетонных блоках обеспечивают долговечность и устойчивость.`
  },
  {
    id: "hozblok-3x2",
    name: "Хозблок 3х2",
    type: "hozblok",
    category: "standard",
    description: "Компактный хозблок для хранения инструментов и садового инвентаря",
    dimensions: { width: 2, length: 3, height: 2.2 },
    basePrice: 70000,
    defaultRoofType: "flat",
    defaultMaterial: "standard",
    availableOptions: ["electricity"],
    defaultWindows: 1,
    defaultDoorPosition: "front",
    previewImage: "/models/previews/hozblok-3x2.jpg",
    photos: [
      "/products/hozblok-3x2/main.jpg",
      "/products/hozblok-3x2/1.jpg",
      "/products/hozblok-3x2/2.jpg"
    ],
    details: `Хозблок 3×2 м — это компактный и практичный вариант для хранения инструментов и садового инвентаря. Прочная конструкция и простота монтажа делают этот хозблок идеальным выбором для дачи или временного проживания.`
  }
];

// Объединённый массив всех моделей
export const ALL_BUILDING_MODELS: BuildingModel[] = [...BYTOVKA_MODELS, ...HOZBLOK_MODELS];

// Функция для получения модели по идентификатору
export function getModelById(id: string): BuildingModel | undefined {
  return ALL_BUILDING_MODELS.find(model => model.id === id);
}

// Функция для получения всех моделей указанного типа
export function getModelsByType(type: 'bytovka' | 'hozblok'): BuildingModel[] {
  return ALL_BUILDING_MODELS.filter(model => model.type === type);
}

// Функция для получения моделей по категории
export function getModelsByCategory(category: string): BuildingModel[] {
  return ALL_BUILDING_MODELS.filter(model => model.category === category);
}

// Функция для расчета стоимости на основе модели и опций
export function calculatePrice(modelId: string, options: string[] = []): number {
  const model = getModelById(modelId);
  if (!model) return 0;
  
  // Базовая стоимость модели
  let totalPrice = model.basePrice;
  
  // Добавляем стоимость опций
  const optionPrices: Record<string, number> = {
    "electricity": 15000,
    "heating": 25000,
    "furniture": 35000,
    "plumbing": 30000,
    "extra_windows": 18000,
    "panoramic_windows": 40000,
    "bed": 20000
  };
  
  options.forEach(option => {
    if (optionPrices[option]) {
      totalPrice += optionPrices[option];
    }
  });
  
  return totalPrice;
}

// Добавляем фотографии для всех моделей
BYTOVKA_MODELS.forEach(model => {
  model.photos = [
    `/products/${model.id}/main.jpg`,
    `/products/${model.id}/1.jpg`,
    `/products/${model.id}/2.jpg`
  ];
});
HOZBLOK_MODELS.forEach(model => {
  model.photos = [
    `/products/${model.id}/main.jpg`,
    `/products/${model.id}/1.jpg`,
    `/products/${model.id}/2.jpg`
  ];
});
