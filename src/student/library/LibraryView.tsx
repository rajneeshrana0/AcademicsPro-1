import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, Clock, ArrowRight } from 'lucide-react';

const borrowedBooks = [
  {
    title: 'Advanced Mathematics',
    dueDate: '2024-03-20',
    status: 'Due in 5 days',
  },
  {
    title: 'Physics Fundamentals',
    dueDate: '2024-03-25',
    status: 'Due in 10 days',
  },
];

export function LibraryView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 space-y-6"
    >
      <div className="space-y-6">
        {/* Header */}
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
          Library
        </h2>

        {/* Search Input */}
        <div className="flex gap-4">
          <div className="relative w-full">
            {/* Search Icon */}
            <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search books..."
              className="pl-10 bg-secondary/30 border-primary/20"
            />
          </div>
          <Button className="bg-primary/20 hover:bg-primary/30">Search</Button>
        </div>

        {/* Borrowed Books Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Currently Borrowed</h3>
          {borrowedBooks.map((book, index) => (
            <motion.div
              key={book.title}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 bg-secondary/30 backdrop-blur-xl border-primary/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <BookOpen className="w-8 h-8 text-primary/60" />
                    <div>
                      <h4 className="font-medium">{book.title}</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{book.status}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" className="hover:bg-primary/20">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
