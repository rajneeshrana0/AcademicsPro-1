import { motion } from 'framer-motion';
import { FeeHistory } from './FeeHistory';
import { PendingFees } from './PendingFees';

export function FeePaymentView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 space-y-6"
    >
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
        Fee Management
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <PendingFees />
        <FeeHistory />
      </div>
    </motion.div>
  );
}