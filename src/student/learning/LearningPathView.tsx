import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Play, BookOpen, CheckCircle } from 'lucide-react';

const courses = [
  {
    title: 'Introduction to Calculus',
    progress: 75,
    totalLessons: 12,
    completedLessons: 9
  },
  {
    title: 'Web Development Fundamentals',
    progress: 60,
    totalLessons: 15,
    completedLessons: 9
  }
];

export function LearningPathView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 space-y-6"
    >
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
        Learning Path
      </h2>

      <div className="grid gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 bg-secondary/30 backdrop-blur-xl border-primary/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <BookOpen className="w-6 h-6 text-primary/60" />
                    <div>
                      <h3 className="font-semibold">{course.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span>{course.completedLessons}/{course.totalLessons} Lessons</span>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-primary/20 hover:bg-primary/30">
                    <Play className="w-4 h-4 mr-2" />
                    Continue
                  </Button>
                </div>

                <div className="space-y-2">
                  <Progress value={course.progress} className="h-2 bg-primary/20" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-primary">{course.progress}%</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}