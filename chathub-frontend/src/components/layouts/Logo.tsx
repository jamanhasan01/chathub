import { MessageSquare } from 'lucide-react';

export const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Icon with Gradient Background */}
      <div className="w-12 h-12 bg-gradient-to-br from-[#3b82f6] to-[#a855f7] rounded-2xl flex items-center justify-center shadow-lg">
        <MessageSquare className="w-7 h-7 text-white" />
      </div>

      <div className="flex flex-col">
        {/* ChatHub with Gradient Text */}
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-[#3b82f6] to-[#a855f7] bg-clip-text text-transparent">
          ChatHub
        </h1>
        
        {/* Welcome Back with Gradient Text */}
        <p className="text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-[#3b82f6] to-[#a855f7] bg-clip-text text-transparent opacity-90">
          WELCOME BACK!
        </p>
      </div>
    </div>
  );
};