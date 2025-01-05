
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Mail, Phone, MapPin } from 'lucide-react';

export function PersonalInfo() {
  return (
    <Card className="p-6 bg-secondary/30 backdrop-blur-xl border-primary/20">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Personal Information</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-primary/60" />
              <Input
                className="pl-10 bg-secondary/50 border-primary/10"
                placeholder="Rajneesh Rana"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-primary/60" />
              <Input
                className="pl-10 bg-secondary/50 border-primary/10"
                placeholder="ram@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-primary/60" />
              <Input
                className="pl-10 bg-secondary/50 border-primary/10"
                placeholder="+91 0000000000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-primary/60" />
              <Input
                className="pl-10 bg-secondary/50 border-primary/10"
                placeholder="123 Street, City"
              />
            </div>
          </div>

          <Button className="w-full bg-primary/20 hover:bg-primary/30">
            Update Profile
          </Button>
        </div>
      </div>
    </Card>
  );
}