import { Brain, Rocket, Zap,  Globe2, Wifi, Sparkles, Book, School, BanknoteIcon,Database  } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    title: 'Future Enhancements',
    description: `
      1. Feature like Zoom: Where Teacher Schedule Extra classes on this .
      2. Feature like ExileDraw & Build-in Notes and Assignments: Advanced collaboration tools and efficient academic integration.
      3. Feature to Build PYQ with Solutions & Student Grade Cards: Seamless educational resource generation and performance tracking.
      4. Integration of advanced analytics for tracking and decision-making.
      5. Custom workflows to adapt to specific organizational needs.
      6. Multi-device support for consistent user experience across devices.
      7. Offline functionality for uninterrupted usage in low-connectivity areas.
      8. Voice-controlled commands for accessibility and enhanced usability.
      9. Enhanced AI-based recommendations for personalized experiences.
    `,
    icon: Brain,
  },
];

const orbitalConfigs = [
  { icons: [Book, School, BanknoteIcon,Database], radius: 32, duration: 25, reverse: false },
  { icons: [Rocket, Globe2, Wifi, Zap], radius: 44, duration: 30, reverse: true },
  // { icons: [Rocket, Globe2, Wifi, Zap], radius: 44, duration: 30, reverse: true },
];

export function FeaturesOrbit() {
  return (
    <div className=" w-full  flex flex-col items-center justify-center  overflow-hidden p-16">
      {/* Animated background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />

      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16 px-4  ">
        {/* Left side - Feature list */}
        <div className="lg:w-1/2 space-y-8 relative cursor-pointer">
          <div className="relative space-y-4">
            <div className="absolute -left-8 -top-8 w-32 h-32 bg-primary/30 rounded-full blur-3xl animate-glow" />
            <h2 className="relative text-4xl sm:text-5xl font-bold">
              <span className="absolute -left-6 -top-6">
                <Sparkles className="w-12 h-12 text-primary animate-pulse" />
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/50">
                Upcoming Features in Our CRM
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground relative z-10">
              Experience the next generation of CRM technology
            </p>
          </div>

          <div className="space-y-2 relative">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 rounded-2xl bg-secondary/30 backdrop-blur-sm border border-primary/10 hover:border-primary/50 transition-all duration-500 hover:translate-x-2"
                >
                  <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl group-hover:bg-primary/10 transition-all duration-500 " />
                  <div className="relative flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 backdrop-blur-sm group-hover:bg-primary/20 transition-all duration-500">
                      <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg sm:text-xl mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 ">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side - Orbital system */}
        <div className="w-full lg:w-1/2 relative p-16 ">
          <div className="relative aspect-square w-[90%] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] mx-auto">
            {/* Core */}
            <div className="absolute inset-1/4 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 backdrop-blur-xl animate-pulse">
              <div className="absolute inset-0 rounded-full bg-secondary/20 backdrop-blur-md" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-primary/30 to-transparent backdrop-blur-lg animate-pulse" />
              <div className="absolute inset-4 rounded-full border border-primary/20 animate-ping" />
            </div>

            {/* Orbital rings */}
            {orbitalConfigs.map((config, ringIndex) => (
              <div
                key={ringIndex}
                className="absolute inset-0 rounded-full"
                style={{
                  animation: `spin ${config.duration}s linear infinite ${config.reverse ? 'reverse' : ''}`,
                }}
              >
                {config.icons.map((Icon, iconIndex) => {
                  const angle = (360 / config.icons.length) * iconIndex;
                  const x = 50 + config.radius * Math.cos((angle * Math.PI) / 180);
                  const y = 50 + config.radius * Math.sin((angle * Math.PI) / 180);

                  return (
                    <div
                      key={iconIndex}
                      className={cn(
                        "absolute w-10 h-10 sm:w-14 sm:h-14 -translate-x-1/2 -translate-y-1/2",
                        "rounded-2xl bg-secondary/50 backdrop-blur-md",
                        "flex items-center justify-center",
                        "border border-primary/20 hover:border-primary/50",
                        "transition-all duration-500",
                        "hover:scale-110 hover:rotate-0",
                        "group"
                      )}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
                      }}
                    >
                      <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Decorative rings */}
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping" />
            <div className="absolute inset-[-10%] rounded-full border border-primary/10" style={{ animationDelay: '-2s' }} />
            <div className="absolute inset-[-20%] rounded-full border border-primary/5" style={{ animationDelay: '-4s' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
