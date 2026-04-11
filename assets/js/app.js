particlesJS('particles-js', {
  "particles": {
    "number": { "value": 50, "density": { "enable": true, "value_area": 900 } },
    "color": { "value": "#e5001a" },
    "shape": { "type": "circle", "stroke": { "width": 0, "color": "#e5001a" } },
    "opacity": { "value": 0.18, "random": true, "anim": { "enable": true, "speed": 0.5, "opacity_min": 0.05, "sync": false } },
    "size": { "value": 3, "random": true, "anim": { "enable": false } },
    "line_linked": { "enable": true, "distance": 160, "color": "#e5001a", "opacity": 0.08, "width": 1 },
    "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "attract": { "enable": false } }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": { "enable": true, "mode": "grab" },
      "onclick": { "enable": true, "mode": "push" },
      "resize": true
    },
    "modes": {
      "grab": { "distance": 180, "line_linked": { "opacity": 0.35 } },
      "push": { "particles_nb": 3 }
    }
  },
  "retina_detect": true
});
