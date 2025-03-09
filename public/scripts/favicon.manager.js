class DuneFaviconManager {
  constructor() {
    this.link = this.createFaviconLink();
    this.canvas = this.createCanvas();
    this.ctx = this.canvas.getContext("2d");
    this.colors = {
      nightSky: "#0e1111",
      deepDesert: "#2d2113",
      sandLight: "#e6d2a9",
      sandDark: "#c4aa76",
      spice: "#cd6c24",
    };
    this.frame = 0;
    this.dunePhase = 0;
    this.particles = this.createInitialParticles(3);

    this.animate();
  }

  createFaviconLink() {
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    return link;
  }

  createCanvas() {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    return canvas;
  }

  createInitialParticles(count) {
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(this.createParticle());
    }
    return particles;
  }

  createParticle() {
    return {
      x: Math.random() * 32,
      y: 26 + Math.random() * 6,
      size: 1 + Math.random() * 2,
      speed: 0.2 + Math.random() * 0.3,
      life: 100 + Math.random() * 50,
      currentLife: 0,
      color: Math.random() > 0.7 ? this.colors.spice : this.colors.sandLight,
    };
  }

  drawSandDunes() {
    this.ctx.fillStyle = this.colors.nightSky;
    this.ctx.fillRect(0, 0, 32, 32);
    for (let i = 0; i < 15; i++) {
      const x = (i * 7 + this.frame / 10) % 32;
      const y = (i * 3.7 + this.frame / 20) % 15;
      const size = (Math.sin(this.frame / 20 + i) + 1) * 0.5;

      this.ctx.fillStyle = "rgba(230, 210, 169, 0.4)";
      this.ctx.fillRect(x, y, size, size);
    }
    this.ctx.fillStyle = this.colors.deepDesert;
    this.ctx.beginPath();
    this.ctx.moveTo(0, 20);

    for (let x = 0; x <= 32; x++) {
      const phase = this.dunePhase / 100;
      const y =
        20 + Math.sin(x / 8 + phase) * 2 + Math.sin(x / 3 + phase * 0.8) * 1;
      this.ctx.lineTo(x, y);
    }

    this.ctx.lineTo(32, 32);
    this.ctx.lineTo(0, 32);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.fillStyle = this.colors.sandDark;
    this.ctx.beginPath();
    this.ctx.moveTo(0, 22);

    for (let x = 0; x <= 32; x++) {
      const phase = this.dunePhase / 70;
      const y =
        22 + Math.sin(x / 5 + phase) * 3 + Math.sin(x / 2 + phase * 1.3) * 1.5;
      this.ctx.lineTo(x, y);
    }

    this.ctx.lineTo(32, 32);
    this.ctx.lineTo(0, 32);
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawSpiceParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.y -= p.speed;
      p.currentLife++;
      const opacity =
        p.currentLife < 20 ? p.currentLife / 20 : (p.life - p.currentLife) / 40;
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = Math.max(0, Math.min(opacity, 1));
      this.ctx.fillRect(p.x, p.y, p.size, p.size);
      this.ctx.globalAlpha = 1;
      if (p.currentLife >= p.life) {
        this.particles[i] = this.createParticle();
      }
    }
    if (Math.random() < 0.06 && this.particles.length < 12) {
      this.particles.push(this.createParticle());
    }
  }

  drawSandworm() {
    if (this.frame % 300 < 60) {
      const wormProgress = (this.frame % 300) / 60;
      const x = -10 + wormProgress * 52;
      this.ctx.fillStyle = this.colors.deepDesert;
      this.ctx.beginPath();
      this.ctx.arc(x, 25, 5, 0, Math.PI, true);
      this.ctx.lineTo(x - 5, 32);
      this.ctx.lineTo(x + 5, 32);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.fillStyle = this.colors.nightSky;
      this.ctx.fillRect(x - 3, 25, 1, 4);
      this.ctx.fillRect(x, 25, 1, 5);
      this.ctx.fillRect(x + 3, 25, 1, 4);
    }
  }

  draw() {
    this.drawSandDunes();
    this.drawSpiceParticles();
    this.drawSandworm();
    this.dunePhase = (this.dunePhase + 1) % 10000;
    this.frame++;
  }

  animate() {
    this.draw();
    this.link.href = this.canvas.toDataURL();
    setTimeout(() => this.animate(), 1000 / 10);
  }
}

if (document.readyState === "complete") {
  new DuneFaviconManager();
} else {
  window.addEventListener("load", () => new DuneFaviconManager());
}
