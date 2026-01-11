/**
 * RefereeAI - Pure Vanilla Sparkles Animation
 * Canvas-based particle system with no external dependencies
 */

(function() {
  'use strict';

  class Particle {
    constructor(canvas) {
      this.canvas = canvas;
      this.reset();
    }

    reset() {
      this.x = Math.random() * this.canvas.width;
      this.y = Math.random() * this.canvas.height;
      this.size = Math.random() * 2.5 + 0.5; // 0.5 to 3
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random();
      this.opacitySpeed = (Math.random() - 0.5) * 0.02;
    }

    update() {
      // Move particle
      this.x += this.speedX;
      this.y += this.speedY;

      // Animate opacity (twinkling effect)
      this.opacity += this.opacitySpeed;
      if (this.opacity <= 0.1 || this.opacity >= 1) {
        this.opacitySpeed *= -1;
      }

      // Wrap around screen
      if (this.x < 0) this.x = this.canvas.width;
      if (this.x > this.canvas.width) this.x = 0;
      if (this.y < 0) this.y = this.canvas.height;
      if (this.y > this.canvas.height) this.y = 0;
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  class SparklesAnimation {
    constructor() {
      this.canvas = document.getElementById('sparkles-canvas');
      if (!this.canvas) {
        console.error('Canvas element not found');
        return;
      }

      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.particleCount = 100;
      this.animationId = null;
      this.mouseX = 0;
      this.mouseY = 0;

      this.init();
    }

    init() {
      // Set canvas size
      this.resize();

      // Create particles
      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push(new Particle(this.canvas));
      }

      // Event listeners
      window.addEventListener('resize', () => this.resize());
      this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
      this.canvas.addEventListener('click', (e) => this.handleClick(e));

      // Start animation
      this.animate();

      console.log('✨ Sparkles animation initialized with', this.particleCount, 'particles');
    }

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    handleMouseMove(e) {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      // Repulse particles near mouse
      this.particles.forEach(particle => {
        const dx = particle.x - this.mouseX;
        const dy = particle.y - this.mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - distance) / 100;
          particle.x += Math.cos(angle) * force * 5;
          particle.y += Math.sin(angle) * force * 5;
        }
      });
    }

    handleClick(e) {
      // Add 4 new particles at click position
      for (let i = 0; i < 4; i++) {
        const particle = new Particle(this.canvas);
        particle.x = e.clientX + (Math.random() - 0.5) * 20;
        particle.y = e.clientY + (Math.random() - 0.5) * 20;
        this.particles.push(particle);
      }

      // Remove oldest particles to maintain count
      if (this.particles.length > this.particleCount + 50) {
        this.particles.splice(0, 4);
      }
    }

    animate() {
      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Update and draw particles
      this.particles.forEach(particle => {
        particle.update();
        particle.draw(this.ctx);
      });

      // Continue animation
      this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
      window.removeEventListener('resize', () => this.resize());
    }
  }

  // Initialize when DOM is ready
  function init() {
    new SparklesAnimation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
