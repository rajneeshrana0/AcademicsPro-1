import { motion } from 'framer-motion';

import { RouteDetails } from './RouteDetails';
import { BusSchedule } from './BusSchedule';

export function TransportView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 space-y-6"
    >
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
        Transport Details
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <RouteDetails />
        <BusSchedule />
      </div>
    </motion.div>
  );
}