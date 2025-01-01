import { motion } from 'framer-motion';
import { Sparkles, Shield, Globe } from 'lucide-react';

const benefits = [
  {
    icon: Sparkles,
    title: 'Simplified School Operations',
    description: 'Streamline administrative tasks and focus on what matters most - education.'
  },
  {
    icon: Shield,
    title: 'Advanced Technology Integration',
    description: 'Leverage cutting-edge technology to enhance the learning experience.'
  },
  {
    icon: Globe,
    title: 'Trusted Worldwide',
    description: 'Join thousands of institutions already benefiting from our platform.'
  }
];

export function AboutSection() {
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
          <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Empowering schools to focus on education while we handle everything else
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg transform group-hover:scale-105 transition-transform duration-300" />
              <div className="relative p-8 text-center">
                <div className="bg-primary/10 rounded-full p-4 inline-block mb-4 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}