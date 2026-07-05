/**
 * Cinematic Apology Experience - Core Controller
 * Handles Screen Transitions, GSAP Timelines, and Interactions
 */

const App = {
    currentScreen: 1,
    totalScreens: 11,
    isTransitioning: false,
    audio: new Audio('assets/music/ambient.mp3'),

    init() {
        this.initCursor();
        this.initMusic();
        this.initNavigation();
        this.initParticles();
        this.initTypewriter();
        this.initEnvelope();
        this.initQuotes();
        this.setupEventListeners();
    },

    initCursor() {
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
            gsap.to(follower, { x: e.clientX - 15, y: e.clientY - 15, duration: 0.3 });
        });
    },

    initMusic() {
        const btn = document.getElementById('musicToggle');
        this.audio.loop = true;
        btn.addEventListener('click', () => {
            this.audio.paused ? this.audio.play() : this.audio.pause();
            btn.classList.toggle('active');
        });
    },

    navigate(direction) {
        if (this.isTransitioning) return;
        let next = this.currentScreen + direction;
        if (next < 1 || next > this.totalScreens) return;

        this.isTransitioning = true;
        const currentEl = document.querySelector(`[data-index="${this.currentScreen}"]`);
        const nextEl = document.querySelector(`[data-index="${next}"]`);

        gsap.to(currentEl, { opacity: 0, scale: 0.95, duration: 0.5, onComplete: () => {
            currentEl.classList.remove('active');
            nextEl.classList.add('active');
            gsap.fromTo(nextEl, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.8 });
            this.currentScreen = next;
            document.getElementById('screen-indicator').innerText = `Screen ${this.currentScreen} / ${this.totalScreens}`;
            this.isTransitioning = false;
        }});
    },

    initEnvelope() {
        const envelope = document.querySelector('.envelope-wrapper');
        if (!envelope) return;
        envelope.addEventListener('click', () => {
            const tl = gsap.timeline();
            tl.to('.envelope-flap', { rotateX: 180, duration: 0.6 })
              .to('.letter', { y: -150, opacity: 1, duration: 1, ease: "power2.out" });
        });
    },

    initQuotes() {
        const container = document.querySelector('.quotes-container');
        const quotes = ["Every heartbeat carries an apology", "You deserved kindness", "I wish I had chosen better words", "Silence never meant I stopped caring", "Thank you for every memory"];
        quotes.forEach(text => {
            const el = document.createElement('div');
            el.className = 'floating-quote';
            el.innerText = text;
            container.appendChild(el);
            gsap.to(el, { 
                y: "random(-200, 200)", 
                x: "random(-200, 200)", 
                duration: "random(5, 10)", 
                repeat: -1, yoyo: true 
            });
        });
    },

    initParticles() {
        // Simple Particle Engine Initialization
        const canvas = document.createElement('canvas');
        document.body.prepend(canvas);
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.zIndex = '-1';
        // Implementation of particle logic (stars/aurora)
    },

    setupEventListeners() {
        document.getElementById('nextBtn').addEventListener('click', () => this.navigate(1));
        document.getElementById('prevBtn').addEventListener('click', () => this.navigate(-1));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') this.navigate(1);
            if (e.key === 'ArrowLeft') this.navigate(-1);
        });
    }
};

window.addEventListener('DOMContentLoaded', () => App.init());
