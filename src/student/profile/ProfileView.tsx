import { motion } from 'framer-motion';
import { PersonalInfo } from './PersonalInfo';
import { SecuritySettings } from './SecuritySettings';

export function ProfileView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 space-y-6"
    >
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
        Profile Settings
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <PersonalInfo />
        <SecuritySettings />
      </div>
    </motion.div>
  );
}