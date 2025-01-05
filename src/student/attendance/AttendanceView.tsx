import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { AttendanceCard } from './AttendanceCard';

const subjects = [
  { name: 'Mathematics', attendance: 95, total: 35, present: 32 },
  { name: 'Physics', attendance: 88, total: 35, present: 30 },
  { name: 'Computer Science', attendance: 92, total: 35, present: 31 },
  { name: 'English', attendance: 85, total: 35, present: 29 }
];

export function AttendanceView() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
          Attendance Overview
        </h2>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Spring 2024</span>
        </div>
      </div>

      <div className="grid gap-6">
        {subjects.map((subject, index) => (
          <AttendanceCard 
            key={subject.name}
            subject={subject}
            delay={index * 0.1}
          />
        ))}
      </div>
    </motion.div>
  );
}