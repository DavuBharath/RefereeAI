import React, { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';
import * as THREE from 'three';

// DottedSurface component with Three.js animated dots
export function DottedSurface({ className, ...props }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const SEPARATION = 100; // Reduced for more dots on screen
    const AMOUNTX = 50; // More dots horizontally
    const AMOUNTY = 50; // More dots vertically

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x111827, 1500, 8000); // gray-900 color

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.set(0, 200, 800); // Closer to see animation better

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x111827, 1); // Match background
    container.appendChild(renderer.domElement);

    // Create particles
    const positions = [];
    const colors = [];

    // Create geometry for all particles
    const geometry = new THREE.BufferGeometry();
    
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        const y = 0;
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
        
        positions.push(x, y, z);
        // Brighter white dots for better visibility
        colors.push(255, 255, 255);
      }
    }

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(colors, 3)
    );

    // Create material
    const material = new THREE.PointsMaterial({
      size: 12, // Larger dots
      vertexColors: true,
      transparent: true,
      opacity: 1.0, // Full opacity
      sizeAttenuation: true,
    });

    // Create points object
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let count = 0;
    let animationId;

    // Animation function - ENHANCED for more visible jumping
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const positionAttribute = geometry.attributes.position;
      const positions = positionAttribute.array;

      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const index = i * 3;
          // Enhanced jumping animation with multiple sine waves
          positions[index + 1] =
            Math.sin((ix + count) * 0.3) * 80 +
            Math.sin((iy + count) * 0.5) * 80 +
            Math.sin((ix + iy + count) * 0.2) * 40;
          i++;
        }
      }

      positionAttribute.needsUpdate = true;
      renderer.render(scene, camera);
      count += 0.15; // Faster animation
    };

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      particles: [points],
      animationId,
      count,
    };

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        
        // Clean up Three.js objects
        sceneRef.current.scene.traverse((object) => {
          if (object instanceof THREE.Points) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
        
        sceneRef.current.renderer.dispose();
        if (container && sceneRef.current.renderer.domElement) {
          container.removeChild(
            sceneRef.current.renderer.domElement
          );
        }
      }
    };
  }, []);

  return React.createElement('div', {
    ref: containerRef,
    className: cn('pointer-events-none fixed inset-0 z-0', className),
    ...props,
  });
}
