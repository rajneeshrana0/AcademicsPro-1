import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'School Principal',
    content: 'This platform has revolutionized how we manage our school. The efficiency gains are remarkable!',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Teacher',
    content: 'The grading and attendance features save me hours every week. Highly recommended!',
    rating: 5
  },
  {
    name: 'Sarah Johnson',
    role: 'School Principal',
    content: 'This platform has revolutionized how we manage our school. The efficiency gains are remarkable!',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Teacher',
    content: 'The grading and attendance features save me hours every week. Highly recommended!',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'Parent',
    content: 'I love being able to track my child\'s progress and communicate with teachers easily.',
    rating: 5
  }
];

const successStories = [
  'Improved Attendance by 20%',
  'Streamlined Fee Collection Process',
  '95% Parent Engagement Rate',
  'Reduced Administrative Time by 40%'
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real feedback from educators, parents, and administrators
          </p>
        </motion.div>

        <Carousel className="max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex gap-1 mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{testimonial.content}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {successStories.map((story, index) => (
            <div key={index} className="text-center">
              <div className="text-xl font-semibold text-primary mb-2">{story}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}