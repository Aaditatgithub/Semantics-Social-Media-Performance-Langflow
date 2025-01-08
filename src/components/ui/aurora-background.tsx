"use client";
import { cn } from "../../../src/utils/utils";

export const AuroraBackground = ({
  showRadialGradient = true,
  ...props
}) => {
  return (
    <main>
      <div
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(`
          [--black-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
          [--aurora:repeating-linear-gradient(100deg,var(--blue-900)_10%,var(--indigo-800)_15%,var(--blue-800)_20%,var(--violet-700)_25%,var(--blue-900)_30%)]
          [background-image:var(--black-gradient),var(--aurora)]
          [background-size:300%,_200%]
          [background-position:50%_50%,50%_50%]
          filter blur-[10px] invert-0
          after:content-[""] after:absolute after:inset-0 after:[background-image:var(--black-gradient),var(--aurora)] 
          after:[background-size:200%,_100%] 
          after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
          pointer-events-none
          absolute -inset-[10px] opacity-50 will-change-transform`, 
          showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}
          ></div>
        </div>
      </div>
    </main>
  );
};