import React, { useId, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "../../lib/utils";
import { motion, useAnimation } from "framer-motion";

export const SparklesCore = (props) => {
  const {
    id,
    className,
    background = "#0a0a0a",
    minSize = 0.6,
    maxSize = 1.4,
    speed = 1,
    particleColor = "#ffffff",
    particleDensity = 100,
  } = props;

  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const controls = useAnimation();
  const particlesLoaded = async (container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: {
          duration: 1,
        },
      });
    }
  };

  const generatedId = useId();

  return React.createElement(
    motion.div,
    {
      animate: controls,
      className: cn("opacity-0", className),
    },
    init &&
      React.createElement(Particles, {
        id: id || generatedId,
        className: cn("h-full w-full"),
        particlesLoaded: particlesLoaded,
        options: {
          background: {
            color: {
              value: background,
            },
          },
          fullScreen: {
            enable: false,
            zIndex: 1,
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: false,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            bounce: {
              horizontal: {
                value: 1,
              },
              vertical: {
                value: 1,
              },
            },
            collisions: {
              enable: false,
            },
            color: {
              value: particleColor,
            },
            move: {
              enable: true,
              speed: {
                min: 0.1,
                max: speed,
              },
              direction: "none",
              random: false,
              straight: false,
              outModes: {
                default: "out",
              },
            },
            number: {
              density: {
                enable: true,
                width: 400,
                height: 400,
              },
              value: particleDensity,
            },
            opacity: {
              value: {
                min: 0.1,
                max: 1,
              },
              animation: {
                enable: true,
                speed: speed,
                sync: false,
              },
            },
            shape: {
              type: "circle",
            },
            size: {
              value: {
                min: minSize,
                max: maxSize,
              },
            },
          },
          detectRetina: true,
        },
      })
  );
};
