import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

interface NotificationToastProps {
  show: boolean;
  message?: string;
  isSaudiGreenMode?: boolean;
}

export default function NotificationToast({ 
  show, 
  message = "Copied to Clipboard!", 
  isSaudiGreenMode = true 
}: NotificationToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          id="reusable-toast"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className={`fixed bottom-6 right-3 sm:right-6 z-50 flex items-center gap-3 px-5 py-3.5 border rounded-2xl shadow-[0_12px_44px_rgba(0,0,0,0.3)] font-mono text-xs ${
            isSaudiGreenMode 
              ? 'bg-teal-950 border-teal-500/45 text-teal-100 shadow-[0_12px_44px_rgba(0,0,0,0.5)]' 
              : 'bg-[#FAF6EB] border-[#0d5c56]/45 text-[#0d5c56] shadow-[0_12px_44px_rgba(13,92,86,0.15)]'
          }`}
        >
          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
            isSaudiGreenMode ? 'bg-teal-500/20 text-teal-400' : 'bg-[#0d5c56]/15 text-[#0d5c56]'
          }`}>
            <Check className="w-3 h-3" />
          </div>
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
