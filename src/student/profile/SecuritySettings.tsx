import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Key, Shield } from 'lucide-react';

export function SecuritySettings() {
  return (
    <Card className="p-6 bg-secondary/30 backdrop-blur-xl border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Security Settings</h3>
          <Shield className="w-5 h-5 text-primary/60" />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Current Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-primary/60" />
              <Input
                type="password"
                className="pl-10 bg-secondary/50 border-primary/10"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">New Password</label>
            <div className="relative">
              <Key className="absolute left-3 top-3 w-4 h-4 text-primary/60" />
              <Input
                type="password"
                className="pl-10 bg-secondary/50 border-primary/10"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Confirm New Password</label>
            <div className="relative">
              <Key className="absolute left-3 top-3 w-4 h-4 text-primary/60" />
              <Input
                type="password"
                className="pl-10 bg-secondary/50 border-primary/10"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button className="w-full bg-primary/20 hover:bg-primary/30">
            Update Password
          </Button>
        </div>
      </div>
    </Card>
  );
}