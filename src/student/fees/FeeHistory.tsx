import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const feeHistory = [
  {
    id: 1,
    term: 'Fall 2023',
    amount: 1250,
    date: '2023-09-15',
    type: 'Tuition Fee',
    status: 'Paid'
  },
  {
    id: 2,
    term: 'Fall 2023',
    amount: 200,
    date: '2023-09-10',
    type: 'Library Fee',
    status: 'Paid'
  }
];

export function FeeHistory() {
  return (
    <Card className="p-6 bg-secondary/30 backdrop-blur-xl border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Payment History</h3>
          <CheckCircle className="w-5 h-5 text-primary/60" />
        </div>

        <div className="space-y-4">
          {feeHistory.map((fee, index) => (
            <motion.div
              key={fee.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg bg-secondary/50 border border-primary/10"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{fee.type}</h4>
                  <p className="text-sm text-muted-foreground">{fee.term}</p>
                </div>
                <p className="text-lg font-semibold">₹{fee.amount}</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-muted-foreground">Paid: {fee.date}</p>
                <span className="text-sm px-2 py-1 rounded-full bg-primary/20 text-primary">
                  {fee.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}