import { motion } from 'framer-motion';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  return (
    <motion.a
      href={href}
      className="relative px-4 py-2 group"
      whileHover="hover"
      initial="initial"
    >
      <motion.span
        className="relative z-10 transition-colors group-hover:text-primary"
        variants={{
          hover: { y: -2 },
          initial: { y: 0 },
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {children}
      </motion.span>
      <motion.div
        className="absolute inset-0 bg-primary/10 rounded-lg"
        variants={{
          hover: { scale: 1, opacity: 1 },
          initial: { scale: 0.8, opacity: 0 },
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      />
    </motion.a>
  );
}