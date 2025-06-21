export default async function captureScreenshot(): Promise<string | null> {
  // Найти canvas внутри .r3f-canvas (или document.querySelector)
  const canvas = document.querySelector('.r3f-canvas canvas') as HTMLCanvasElement | null;
  if (!canvas) return null;
  // Получить изображение
  return canvas.toDataURL('image/png');
} 