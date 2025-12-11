
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-slate-950 mt-auto transition-colors duration-300">
      <div className="container mx-auto px-6 py-12 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
           <span className="text-slate-700 dark:text-slate-200 font-semibold tracking-tight">borforthis.cn</span>
           <span className="text-slate-400 dark:text-slate-600">/</span>
           <span className="text-slate-500 text-sm">© {new Date().getFullYear()} 版权所有.</span>
        </div>
        
        <div className="flex gap-6">
          <a href="https://github.com/AndersonHJB/" className="text-sm text-slate-500 hover:text-indigo-600 dark:hover:text-white transition-colors">Github</a>
          <a href="https://x.com/huangjiarongbao" className="text-sm text-slate-500 hover:text-indigo-600 dark:hover:text-white transition-colors">Twitter</a>
          <a href="https://comment.bornforthis.cn/" className="text-sm text-slate-500 hover:text-indigo-600 dark:hover:text-white transition-colors">联系我</a>
        </div>
      </div>
    </footer>
  );
};
