import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Clock, Bus } from 'lucide-react';

const scheduleInfo = {
  weekdays: [
    { type: "Morning", departure: "7:30 AM", arrival: "8:00 AM" },
    { type: "Evening", departure: "4:00 PM", arrival: "4:30 PM" }
  ],
  weekend: [
    { type: "Morning", departure: "8:30 AM", arrival: "9:00 AM" },
    { type: "Evening", departure: "3:00 PM", arrival: "3:30 PM" }
  ]
};

export function BusSchedule() {
  return (
    <Card className="p-6 bg-secondary/30 backdrop-blur-xl border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Bus Schedule</h3>
          <Bus className="w-5 h-5 text-primary/60" />
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-3">Weekdays</h4>
            {scheduleInfo.weekdays.map((schedule, index) => (
              <motion.div
                key={schedule.type}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="mb-3 p-3 rounded-lg bg-secondary/50 border border-primary/10"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{schedule.type}</span>
                  <Clock className="w-4 h-4 text-primary/60" />
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Departure: {schedule.departure}</span>
                    <span>Arrival: {schedule.arrival}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3">Weekend</h4>
            {scheduleInfo.weekend.map((schedule, index) => (
              <motion.div
                key={schedule.type}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="mb-3 p-3 rounded-lg bg-secondary/50 border border-primary/10"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{schedule.type}</span>
                  <Clock className="w-4 h-4 text-primary/60" />
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Departure: {schedule.departure}</span>
                    <span>Arrival: {schedule.arrival}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}