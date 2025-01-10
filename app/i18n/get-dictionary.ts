export async function getDictionary(lang: string) {
  // 动态引入对应语言的 JSON 文件
  try {
    const dictionary = await import(`./locales/${lang}.json`);
    return dictionary;
  } catch (e) {
    // 若出错可回退到英文或其他逻辑，根据需求处理
    const fallback = await import('./locales/en.json');
    return fallback;
  }
} 