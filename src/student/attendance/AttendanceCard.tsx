import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock } from 'lucide-react';

interface AttendanceCardProps {
  subject: {
    name: string;
    attendance: number;
    total: number;
    present: number;
  };
  delay?: number;
}

export function AttendanceCard({ subject, delay = 0 }: AttendanceCardProps) {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay }}
    >
      <Card className="p-6 bg-secondary/30 backdrop-blur-xl border-primary/20">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{subject.name}</h3>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-primary/60" />
              <span className="text-sm text-muted-foreground">
                {subject.present}/{subject.total} Classes
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Progress value={subject.attendance} className="h-2 bg-primary/20" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-primary">{subject.attendance}%</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}