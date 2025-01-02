import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavLink } from './NavLink';
import { MobileMenu } from './MobileMenu';
import Logo from '../../assets/logo.png'
import { Link } from 'react-router';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#about' },
    { label: 'Modules', href: '#modules' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-primary/10 shadow-lg shadow-primary/5 py-2' : ''
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between gap-8 p-8">
            <motion.a
              href="/"
              className=" font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <img src={Logo} alt="Logo"
              className='w-60'
              />
            </motion.a>

            <nav className="hidden text-lg md:flex items-center gap-2 rounded-lg hover:rounded-xl">
              {navItems.map((item) => (
                <NavLink key={item.label} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden md:flex  items-center gap-4">
              
              <Link to="/login">
              <Button variant="glow" className="group">
                <span>Get Started</span>
                <Sparkles className="w-4 h-4 ml-2 group-hover:animate-pulse" />
              </Button>
              </Link>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-primary/10"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}