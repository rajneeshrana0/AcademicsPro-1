import { motion } from 'framer-motion';
import {  GraduationCap, Users, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const benefitsByRole = [
  {
    role: 'Students',
    icon: GraduationCap,
    benefits: ['Personalized learning paths', 'Engaging activities', 'Real-time updates', 'Progress tracking']
  },
  {
    role: 'Teachers',
    icon: Users,
    benefits: ['Automated grading', 'Efficient scheduling', 'Communication tools', 'Resource management']
  },
  {
    role: 'Parents',
    icon: Users,
    benefits: ['Progress transparency', 'Online fee payments', 'Direct teacher contact', 'Event notifications']
  },
  {
    role: 'Admins',
    icon: Building,
    benefits: ['Reduced paperwork', 'Data-driven decisions', 'Cost efficiency', 'Automated reporting']
  }
];

export function BenefitsSection() {
  return (
    <section className="py-24 bg-primary/5 p-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Benefits for Everyone</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tailored solutions for every stakeholder in the educational ecosystem
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefitsByRole.map((role, index) => (
            <motion.div
              key={role.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <role.icon className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>For {role.role}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {role.benefits.map((benefit) => (
                      <li key={benefit} className="text-muted-foreground">
                        • {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}