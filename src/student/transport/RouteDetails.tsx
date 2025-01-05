import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { MapPin, Users } from 'lucide-react';

const routeInfo = {
  routeNumber: "R-102",
  driver: "Mihir jain",
  contactNumber: "+91 00000000",
  stops: [
    { name: "Narela ", time: "7:30 AM" },
    { name: "Sonipat", time: "7:45 AM" },
    { name: "PIET", time: "8:00 AM" }
  ]
};

export function RouteDetails() {
  return (
    <Card className="p-6 bg-secondary/30 backdrop-blur-xl border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Route Information</h3>
          <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
            {routeInfo.routeNumber}
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-sm">
            <Users className="w-4 h-4 text-primary/60" />
            <div>
              <p className="font-medium">{routeInfo.driver}</p>
              <p className="text-muted-foreground">{routeInfo.contactNumber}</p>
            </div>
          </div>

          <div className="space-y-3">
            {routeInfo.stops.map((stop, index) => (
              <motion.div
                key={stop.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-primary/10"
              >
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-primary/60" />
                  <span>{stop.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{stop.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}