import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const plans = [
  {
    name: 'Basic',
    price: '₹99',
    period: 'per month',
    description: 'Perfect for small schools',
    features: [
      'Core Management Features',
      'Basic Analytics',
      'Up to 500 Students',
      'Email Support',
      '5GB Storage'
    ]
  },
  {
    name: 'Standard',
    price: '₹199',
    period: 'per month',
    description: 'Ideal for growing institutions',
    features: [
      'All Basic Features',
      'Advanced Analytics',
      'Up to 2000 Students',
      'Priority Support',
      '20GB Storage',
      'AI-Powered Insights'
    ]
  },
  {
    name: 'Premium',
    price: '₹399',
    period: 'per month',
    description: 'For large educational institutions',
    features: [
      'All Standard Features',
      'Custom Integrations',
      'Unlimited Students',
      '24/7 Support',
      'Unlimited Storage',
      'Advanced AI Features',
      'Custom Reporting'
    ]
  }
];

export function PricingSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Flexible pricing options designed to fit institutions of all sizes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="relative h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </CardTitle>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-8">Get Started</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}