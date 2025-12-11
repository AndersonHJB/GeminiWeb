
import React from 'react';
import { Project } from '../types';
import { 
  Cpu, Eye, Terminal, Mic, Box, Sparkles, Github, BookOpen, Globe,
  Palette, LineChart, Gamepad2, Wifi, Code, Music, Leaf, Shield, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

// Icon mapping helper
const getIcon = (name: string) => {
  switch (name) {
    case 'Cpu': return <Cpu className="w-5 h-5" />;
    case 'Eye': return <Eye className="w-5 h-5" />;
    case 'Terminal': return <Terminal className="w-5 h-5" />;
    case 'Mic': return <Mic className="w-5 h-5" />;
    case 'Sparkles': return <Sparkles className="w-5 h-5" />;
    case 'Palette': return <Palette className="w-5 h-5" />;
    case 'LineChart': return <LineChart className="w-5 h-5" />;
    case 'Gamepad2': return <Gamepad2 className="w-5 h-5" />;
    case 'Wifi': return <Wifi className="w-5 h-5" />;
    case 'Code': return <Code className="w-5 h-5" />;
    case 'Music': return <Music className="w-5 h-5" />;
    case 'Leaf': return <Leaf className="w-5 h-5" />;
    case 'Shield': return <Shield className="w-5 h-5" />;
    case 'Activity': return <Activity className="w-5 h-5" />;
    default: return <Box className="w-5 h-5" />;
  }
};

const getStatusColor = (status: Project['status']) => {
  switch (status) {
    case 'live': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20';
    case 'beta': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20';
    case 'concept': return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20';
    case 'maintenance': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20';
    default: return 'bg-slate-100 text-slate-600 dark:bg-slate-500/10 dark:text-slate-400';
  }
};

const getStatusText = (status: Project['status']) => {
  switch (status) {
    case 'live': return '已上线';
    case 'beta': return '测试中';
    case 'concept': return '概念版';
    case 'maintenance': return '维护中';
    default: return status;
  }
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      layout // Enable smooth layout transitions when grid changes
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative flex flex-col h-full"
    >
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-blue-500/10 dark:group-hover:from-indigo-500/20 dark:group-hover:via-purple-500/20 dark:group-hover:to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
      
      <div className="relative h-full flex flex-col bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-none">
        
        {/* Clickable Thumbnail Area -> Goes to Main URL */}
        <a href={project.url} className="block relative cursor-pointer overflow-hidden">
            {project.thumbnailUrl ? (
            <div className="h-48 w-full relative border-b border-slate-100 dark:border-slate-800/50">
                <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse" />
                <img 
                src={project.thumbnailUrl} 
                alt={project.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                />
            </div>
            ) : (
            <div className="h-32 w-full bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800/50 flex items-center justify-center relative overflow-hidden group-hover:bg-slate-100 dark:group-hover:bg-slate-800 transition-colors">
                <div className="absolute inset-0 opacity-10 dark:opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                <div className="text-slate-300 dark:text-slate-600 transform group-hover:scale-110 transition-transform duration-500">
                    {getIcon(project.iconName)}
                </div>
            </div>
            )}
        </a>

        <div className="p-6 flex flex-col flex-grow">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
             {!project.thumbnailUrl && (
                <div className={`p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300`}>
                  {getIcon(project.iconName)}
                </div>
             )}
             {project.thumbnailUrl && (
                 // Spacer to keep layout consistent if we want status on right
                 <div className="flex-1"></div>
             )}

            <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${getStatusColor(project.status)} uppercase tracking-wider`}>
              {getStatusText(project.status)}
            </span>
          </div>

          <a href={project.url} className="block group/title">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover/title:text-indigo-600 dark:group-hover/title:text-indigo-300 transition-colors">
                {project.title}
              </h3>
          </a>
          
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
            {project.description}
          </p>

          <div className="mt-auto">
             {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span key={tag} className="text-[10px] text-slate-500 dark:text-slate-500 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50">
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/50">
                {/* Main Action */}
                <a 
                    href={project.url}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                >
                    <Globe className="w-4 h-4" />
                    <span>访问</span>
                </a>

                {/* Secondary Actions */}
                {project.articleUrl && (
                    <a 
                        href={project.articleUrl}
                        title="阅读相关文章"
                        className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-500/10 transition-all"
                    >
                        <BookOpen className="w-4 h-4" />
                    </a>
                )}

                {project.githubUrl && (
                    <a 
                        href={project.githubUrl}
                        title="查看源代码"
                        className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-all"
                    >
                        <Github className="w-4 h-4" />
                    </a>
                )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
