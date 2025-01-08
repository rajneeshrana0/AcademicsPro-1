import { ArrowRight, BookOpen, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function HeroSection() {
  const stats = [
    { label: 'Schools Managed', value: '500+', icon: BookOpen },
    { label: 'Active Users', value: '10K+', icon: Users },
    { label: 'Success Rate', value: '98%', icon: Award },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="relative container mx-auto px-4 py-32 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Revolutionizing Education
        </motion.h1>
        
        <motion.p 
          className="mt-6 text-xl text-muted-foreground max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Streamline academics, administration, and communication with our smart school management solutions.
        </motion.p>

        <motion.div 
          className="mt-10 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to='/student'>
          <Button size="lg" className="group">
            Get Started
            <ArrowRight className=" cursor-pointer ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          </Link>
          <Button size="lg" variant="outline">
            Explore Features
          </Button>
        </motion.div>

        <motion.div 
          className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <stat.icon className="h-8 w-8 text-primary mb-4" />
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}