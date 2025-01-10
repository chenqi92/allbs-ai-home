export async function getDictionary(lang: string) {
  try {
    // 动态加载语言 JSON 文件
    const dictionaryModule = await import(`./locales/${lang}.json`);
    // 只返回 dictionaryModule.default（纯对象），而非完整模块
    return dictionaryModule.default;
  } catch (e) {
    // 出错则回退到英文
    const fallbackModule = await import('./locales/en.json');
    return fallbackModule.default;
  }
} 