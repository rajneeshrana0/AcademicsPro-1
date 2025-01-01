import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How do I get started?',
    answer: 'Getting started is easy! Simply choose a plan that fits your institution\'s needs and our team will guide you through the setup process. We provide comprehensive training and support to ensure a smooth transition.'
  },
  {
    question: 'Is the platform secure?',
    answer: 'Yes, we take security seriously. Our platform uses industry-standard encryption, regular security audits, and complies with educational data protection regulations to keep your information safe.'
  },
  {
    question: 'What payment methods are supported?',
    answer: 'We accept all major credit cards, bank transfers, and digital payment methods. For institutions, we also offer flexible payment terms and custom billing options.'
  },
  {
    question: 'Can I customize the features?',
    answer: 'Absolutely! Our platform is highly customizable to meet your specific needs. Premium plans include custom module development and integration options.'
  }
];

export function FAQSection() {
  return (
    <section className="py-24 bg-primary/5 mt-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our platform
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}