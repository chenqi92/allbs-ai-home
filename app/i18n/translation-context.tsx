'use client';

import React, { createContext, useContext, ReactNode } from 'react';

type Dictionary = Record<string, any>;

interface TranslationProviderProps {
  children: ReactNode;
  dictionary: Dictionary;
}

const TranslationContext = createContext<Dictionary>({});

// 提供一个 Hook 给子组件取翻译
export function useTranslation() {
  return useContext(TranslationContext);
}

// Provider 组件：在最外层注入翻译字典
export function TranslationProvider(props: TranslationProviderProps) {
  const { children, dictionary } = props;
  return (
    <TranslationContext.Provider value={dictionary}>
      {children}
    </TranslationContext.Provider>
  );
} 