import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, AlertCircle } from 'lucide-react';

const pendingFees = [
  {
    id: 1,
    term: 'Spring 2024',
    amount: 1250,
    dueDate: '2024-03-30',
    type: 'Tuition Fee'
  },
  {
    id: 2,
    term: 'Spring 2024',
    amount: 200,
    dueDate: '2024-03-25',
    type: 'Library Fee'
  }
];

export function PendingFees() {
  return (
    <Card className="p-6 bg-secondary/30 backdrop-blur-xl border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Pending Payments</h3>
          <AlertCircle className="w-5 h-5 text-primary/60" />
        </div>

        <div className="space-y-4">
          {pendingFees.map((fee, index) => (
            <motion.div
              key={fee.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg bg-secondary/50 border border-primary/10"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{fee.type}</h4>
                  <p className="text-sm text-muted-foreground">{fee.term}</p>
                </div>
                <p className="text-lg font-semibold">₹{fee.amount}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Due: {fee.dueDate}</p>
                <Button size="sm" className="bg-primary/20 hover:bg-primary/30">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}