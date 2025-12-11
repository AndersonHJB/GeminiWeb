
import React from 'react';
import { Sparkles, Sun, Moon, Monitor } from 'lucide-react';
import { ThemeMode } from '../types';
import { BornForThisLogo } from './BornForThisLogo';

interface HeaderProps {
  theme: ThemeMode;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background decoration - visible in Dark Mode primarily, but subtle in Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-50 dark:opacity-100 transition-opacity duration-500">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-normal" />
        <div className="absolute top-[30%] right-[10%] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-normal" />
      </div>

      {/* Top Navigation Bar */}
      <div className="absolute top-0 w-full px-6 py-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold tracking-tight">
          <BornForThisLogo className="w-10 h-10" />
          <span className="hidden sm:inline">BornForThis</span>
        </div>
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ring-1 ring-slate-200 dark:ring-slate-700"
          title={`当前模式: ${theme === 'system' ? '自动' : theme === 'dark' ? '深色' : '浅色'}`}
        >
          {theme === 'light' && <Sun className="w-5 h-5" />}
          {theme === 'dark' && <Moon className="w-5 h-5" />}
          {theme === 'system' && <Monitor className="w-5 h-5" />}
        </button>
      </div>

      <div className="relative container mx-auto px-6 text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-8 backdrop-blur-sm shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>BornForThis AI 实验室</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
          构建 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">未来</span>, <br className="hidden sm:block" />
          一次一个交互体验。
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          这里汇总了我基于 Gemini 和最前沿 Web 技术构建的 AI 实验项目、交互界面和创意作品。（含自己研发的有趣项目）
        </p>
      </div>
    </header>
  );
};
