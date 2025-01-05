import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

interface GradeCardProps {
  grade: {
    subject: string;
    score: number;
    maxScore: number;
    type: string;
    date: string;
  };
  delay?: number;
}

export function GradeCard({ grade, delay = 0 }: GradeCardProps) {
  const percentage = (grade.score / grade.maxScore) * 100;

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay }}
    >
      <Card className="p-6 bg-secondary/30 backdrop-blur-xl border-primary/20">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{grade.subject}</h3>
              <p className="text-sm text-muted-foreground">{grade.type}</p>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-primary/60" />
              <span className="text-lg font-semibold">
                {grade.score}/{grade.maxScore}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{grade.date}</span>
            <span className={`text-sm px-2 py-1 rounded-full ${
              percentage >= 90 ? 'bg-green-500/20 text-green-500' :
              percentage >= 80 ? 'bg-blue-500/20 text-blue-500' :
              percentage >= 70 ? 'bg-yellow-500/20 text-yellow-500' :
              'bg-red-500/20 text-red-500'
            }`}>
              {percentage.toFixed(1)}%
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}