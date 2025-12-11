
import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  ArrowRight, 
  QrCode, 
  ExternalLink, 
  Youtube, 
  MonitorPlay,
  MessageCircle,
  ShoppingBag,
  Video,
  Feather,
  Hash,
  Users,
  Heart,
  Coffee,
  HandHeart
} from 'lucide-react';
import { BornForThisLogo } from './BornForThisLogo';

// --- Types & Helper Components ---

interface CompactQRItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  qrImageSrc: string;
  accentColor: string; // e.g. text-green-500
  linkUrl?: string;
  hideCopy?: boolean;
}

const CompactQRItem: React.FC<CompactQRItemProps> = ({ icon, title, value, qrImageSrc, accentColor, linkUrl, hideCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700/50">
      {/* Left: Icon & Title */}
      <div className="flex items-center gap-3 min-w-0">
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800 ${accentColor}`}>
          {icon}
        </div>
        <div className="flex flex-col min-w-0">
            <span className="font-medium text-slate-700 dark:text-slate-200 text-sm truncate">{title}</span>
            <span className="text-xs text-slate-400 font-mono truncate max-w-[100px] sm:max-w-[120px]">{value}</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        {/* External Link (if any) */}
        {linkUrl && (
             <a 
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-md transition-colors"
                title="访问链接"
            >
                <ExternalLink className="w-4 h-4" />
            </a>
        )}

        {/* Copy Button */}
        {!hideCopy && (
            <button 
                onClick={handleCopy}
                className="p-1.5 text-slate-400 hover:text-emerald-500 rounded-md transition-colors"
                title="复制内容"
            >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
        )}

        {/* QR Popover Trigger */}
        <div className="relative group/qr">
            <button className={`p-1.5 rounded-md text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all`}>
                <QrCode className="w-4 h-4" />
            </button>

            {/* Popover */}
            <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 opacity-0 invisible group-hover/qr:opacity-100 group-hover/qr:visible transition-all duration-200 transform origin-bottom-right translate-y-2 group-hover/qr:translate-y-0 z-50 pointer-events-none">
                 <div className="aspect-square bg-white rounded-lg overflow-hidden relative">
                     <img src={qrImageSrc} alt="QR Code" className="w-full h-full object-contain" />
                 </div>
                 <div className="text-center text-[10px] text-slate-400 mt-1">
                    使用微信/支付宝扫码
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

interface CompactLinkItemProps {
  icon: React.ReactNode;
  title: string;
  url: string;
  hoverColorClass: string; // e.g. hover:text-pink-500
}

const CompactLinkItem: React.FC<CompactLinkItemProps> = ({ icon, title, url, hoverColorClass }) => {
  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700/50"
    >
      <div className="flex items-center gap-3">
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-white dark:group-hover:bg-slate-700 shadow-sm transition-all duration-300 ${hoverColorClass}`}>
          {icon}
        </div>
        <span className="font-medium text-slate-700 dark:text-slate-200 text-sm group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{title}</span>
      </div>
      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 dark:group-hover:text-slate-300 transition-transform group-hover:translate-x-1" />
    </a>
  );
};

// --- Direct QR Card for Support Section ---

interface DirectQRCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  qrImageSrc: string;
  accentColor: string;
}

const DirectQRCard: React.FC<DirectQRCardProps> = ({ icon, title, value, qrImageSrc, accentColor }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 transition-colors h-full">
      <div className={`flex items-center gap-2 mb-4 ${accentColor}`}>
        {icon}
        <span className="font-bold text-slate-700 dark:text-slate-200">{title}</span>
      </div>
      
      <div className="w-40 h-40 bg-white p-2 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 mb-3 overflow-hidden">
        <img src={qrImageSrc} alt={title} className="w-full h-full object-contain" />
      </div>
      
      <span className="text-xs text-slate-400 font-medium">{value}</span>
    </div>
  );
};


// --- Main Component ---

export const SocialProfile: React.FC = () => {
  return (
    <section className="py-20 relative">
      {/* 
        FIX: Removed the inner "container mx-auto px-6 max-w-7xl" div.
        The layout is now handled by the parent container in App.tsx, preventing double padding.
      */}
      <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              连接 <span className="text-indigo-600 dark:text-indigo-400">AI悦创</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              从系统化课程到一对一咨询，全网同名，随时随地获取最新技术干货。
          </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Column 1: Identity / Official Site (Span 4) */}
          <div className="lg:col-span-4 flex flex-col">
                <a 
                href="https://bornforthis.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex-grow overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col min-h-[320px]"
              >
                  {/* Background Decor */}
                  <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
                  
                  <div className="relative z-10 flex-grow">
                      {/* Direct Logo Display: Large, Clean, No Box */}
                      <BornForThisLogo className="w-20 h-20 mb-6 drop-shadow-md" />
                      
                      <h3 className="text-2xl font-bold mb-2">AI悦创编程私教官网</h3>
                      <p className="text-indigo-100 text-sm leading-relaxed opacity-90 mb-8">
                            提供 Python 一对一、算法竞赛辅导、职业规划咨询。系统化学习路径，助你达成技术目标。
                      </p>
                  </div>

                  <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6">
                      <span className="font-mono text-sm opacity-80">bornforthis.cn</span>
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-indigo-600 transition-all">
                          <ArrowRight className="w-4 h-4" />
                      </div>
                  </div>
              </a>
          </div>

          {/* Column 2: Ecosystem / Connect (Span 4) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 flex flex-col">
              <div className="px-4 py-4 border-b border-slate-100 dark:border-slate-800 mb-2">
                  <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-emerald-500" />
                      社交矩阵
                  </h3>
              </div>
              
              <div className="flex flex-col gap-1 p-2">
                  <CompactQRItem 
                      icon={<MessageCircle className="w-4 h-4" />}
                      title="微信 (WeChat)"
                      value="Jiabcdefh"
                      qrImageSrc="https://cdn.bornforthis.cn/images/03-%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.JPG"
                      accentColor="text-[#28C445]"
                  />
                  <CompactQRItem 
                      icon={<Feather className="w-4 h-4" />}
                      title="公众号"
                      value="AI悦创"
                      qrImageSrc="https://cdn.bornforthis.cn/images/02-%E5%85%AC%E4%BC%97%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.JPG"
                      accentColor="text-[#28C445]"
                  />
                  <CompactQRItem 
                      icon={<Hash className="w-4 h-4" />}
                      title="小红书"
                      value="AI悦创"
                      qrImageSrc="https://cdn.bornforthis.cn/images/01-%E5%B0%8F%E7%BA%A2%E4%B9%A6%E4%BA%8C%E7%BB%B4%E7%A0%81.JPG"
                      accentColor="text-[#FF2442]"
                      linkUrl="https://www.xiaohongshu.com/user/profile/5e413a430000000001000f4c"
                  />
                    <CompactQRItem 
                      icon={<Video className="w-4 h-4" />}
                      title="微信视频号"
                      value="AI悦创"
                      qrImageSrc="https://cdn.bornforthis.cn/images/05-%E5%BE%AE%E4%BF%A1%E8%A7%86%E9%A2%91%E5%8F%B7.JPG"
                      accentColor="text-[#FA9D3B]"
                  />
                    <CompactQRItem 
                      icon={<ShoppingBag className="w-4 h-4" />}
                      title="微信小店"
                      value="AI悦创"
                      qrImageSrc="https://cdn.bornforthis.cn/images/04-%E5%BE%AE%E4%BF%A1%E5%B0%8F%E5%BA%97.jpg"
                      accentColor="text-[#28C445]"
                  />
              </div>
          </div>

          {/* Column 3: Content / Links (Span 4) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 flex flex-col">
              <div className="px-4 py-4 border-b border-slate-100 dark:border-slate-800 mb-2">
                  <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <MonitorPlay className="w-5 h-5 text-indigo-500" />
                      内容与社区
                  </h3>
              </div>

              <div className="flex flex-col gap-1 p-2">
                  <CompactLinkItem 
                      icon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.758v6.844c-.054 1.51-.578 2.769-1.574 3.773-.995 1.004-2.249 1.524-3.758 1.56H5.354c-1.51-.054-2.769-.578-3.773-1.574-.994-.995-1.514-2.249-1.55-3.758V9.985c.054-1.51.578-2.769 1.574-3.773.995-1.004 2.249-1.524 3.758-1.56h.854l-2.043-2.315 1.491-1.325L8.336 4.31l3.664.032 2.628-3.003 1.49 1.325-2.042 2.315 3.737-.326zM5.373 6.476c-1.025.025-1.859.366-2.5 1.025-.64.659-.974 1.514-.999 2.565v6.786c.025 1.026.359 1.859.999 2.5 h13.275c1.026-.025 1.859-.359 2.5-1.019.659-.641.994-1.475 1.019-2.5V10.066c-.025-1.025-.366-1.859-1.025-2.5-.659-.64-1.514-.974-2.565-.999L5.373 6.476zm2.344 3.719a2.03 2.03 0 1 1 0 4.062 2.03 2.03 0 0 1 0-4.062zm8.594 0a2.03 2.03 0 1 1 0 4.062 2.03 2.03 0 0 1 0-4.062z"/></svg>}
                      title="Bilibili (视频教程)"
                      url="https://space.bilibili.com/405961705"
                      hoverColorClass="group-hover:text-[#00AEEC]"
                  />
                  <CompactLinkItem 
                      icon={<Youtube className="w-4 h-4" />}
                      title="YouTube (Global)"
                      url="https://www.youtube.com/@aiyuechuang"
                      hoverColorClass="group-hover:text-[#FF0000]"
                  />
                  <CompactLinkItem 
                      icon={<span className="font-bold text-xs">知</span>}
                      title="知乎 (技术专栏)"
                      url="https://www.zhihu.com/people/aiyuechuang"
                      hoverColorClass="group-hover:text-[#0084FF]"
                  />
                  <CompactLinkItem 
                      icon={<span className="font-bold text-xs">C</span>}
                      title="CSDN (博客)"
                      url="https://www.csdn.net/"
                      hoverColorClass="group-hover:text-[#FC5531]"
                  />
                  <CompactLinkItem 
                      icon={<span className="font-bold text-xs">微</span>}
                      title="微博 (动态)"
                      url="https://weibo.com/u/5673898686"
                      hoverColorClass="group-hover:text-[#E6162D]"
                  />
              </div>
          </div>

          {/* Column 4: Support & Community (Span 12) */}
          <div className="lg:col-span-12 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 flex flex-col">
                <div className="px-4 py-4 border-b border-slate-100 dark:border-slate-800 mb-2">
                  <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <HandHeart className="w-5 h-5 text-rose-500" />
                      支持与交流
                  </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
                    <DirectQRCard 
                      icon={<Users className="w-5 h-5" />}
                      title="加入交流群"
                      value="扫码加入"
                      qrImageSrc="https://cdn.bornforthis.cn/images/03-%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.JPG"
                      accentColor="text-indigo-500"
                  />
                  <DirectQRCard 
                      icon={<Heart className="w-5 h-5" />}
                      title="微信赞助"
                      value="感谢支持"
                      qrImageSrc="https://cdn.bornforthis.cn/images/06-%E5%BE%AE%E4%BF%A1%E6%94%B6%E6%AC%BE%E7%A0%81.jpg"
                      accentColor="text-[#28C445]"
                  />
                  <DirectQRCard 
                      icon={<Coffee className="w-5 h-5" />}
                      title="支付宝赞助"
                      value="请喝咖啡"
                      qrImageSrc="https://cdn.bornforthis.cn/images/07-%E6%94%AF%E4%BB%98%E5%AE%9D%E6%94%B6%E6%AC%BE%E7%A0%81.jpg"
                      accentColor="text-[#1677FF]"
                  />
              </div>
          </div>

      </div>
    </section>
  );
};
