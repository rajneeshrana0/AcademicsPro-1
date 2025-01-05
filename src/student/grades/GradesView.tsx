import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp } from 'lucide-react';
import { GradeCard } from './GradeCard';

const grades = [
  {
    subject: 'Mathematics',
    score: 92,
    maxScore: 100,
    type: 'Mid-term Exam',
    date: '2024-02-15'
  },
  {
    subject: 'Physics',
    score: 88,
    maxScore: 100,
    type: 'Final Exam',
    date: '2024-02-20'
  },
  {
    subject: 'Computer Science',
    score: 95,
    maxScore: 100,
    type: 'Project',
    date: '2024-02-25'
  }
];

export function GradesView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
          Academic Performance
        </h2>
        <Button variant="outline" className="bg-secondary/30 border-primary/20">
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
      </div>

      <Card className="p-6 bg-secondary/30 backdrop-blur-xl border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Current GPA</p>
            <p className="text-2xl font-bold">3.9</p>
          </div>
          <div className="flex items-center text-green-500">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm">+0.2 from last semester</span>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {grades.map((grade, index) => (
          <GradeCard 
            key={grade.subject}
            grade={grade}
            delay={index * 0.1}
          />
        ))}
      </div>
    </motion.div>
  );
}