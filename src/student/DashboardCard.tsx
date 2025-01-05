import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
}

export function DashboardCard({ title, value, icon, className }: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="w-full"
    >
      <Card className={cn(
        "relative overflow-hidden p-6 glow hover:text-white",
        "bg-secondary/30 backdrop-blur-xl border-primary/20 hover:text-white",
        className
      )}>
        <div className="absolute top-0 right-0 p-3 text-primary/40">
          {icon}
        </div>
        <div className="space-y-2 hover:text-white">
          <p className="text-sm text-muted-foreground hover:text-white">{title}</p>
          <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50 hover:text-white">
            {value}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}