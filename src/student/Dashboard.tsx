import { motion } from 'framer-motion';
import { DashboardCard } from './DashboardCard';
import {
  BookOpen,
  GraduationCap,
  Calendar,
  CreditCard,
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function Dashboard() {
  return (
    <div className="p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
          Welcome back, Mihir Jain
        </h1>
        <p className="text-muted-foreground">
          Here's your academic overview for today
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <DashboardCard
          title="Attendance"
          value="92%"
          icon={<Calendar className="w-6 h-6 " />}
        />
        <DashboardCard
          title="Current GPA"
          value="3.8"
          icon={<GraduationCap className="w-6 h-6 " />}
        />
        <DashboardCard
          title="Courses"
          value="6"
          icon={<BookOpen className="w-6 h-6 " />}
        />
        <DashboardCard
          title="Due Fees"
          value="₹1,250"
          icon={<CreditCard className="w-6 h-6  " />}
        />
      </motion.div>

    </div>
  );
}