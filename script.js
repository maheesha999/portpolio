// DOM Elements
const sideMenu = document.querySelector('#sideMenu');
const navBar = document.querySelector("nav");
const navLinks = document.querySelector("nav ul");
const logo = document.querySelector('#logo');

// ======= Side Menu Controls =======
function openMenu() {
  sideMenu.style.transform = 'translateX(-16rem)';
}
function closeMenu() {
  sideMenu.style.transform = 'translateX(16rem)';
}

// ======= Scroll Behavior for Navbar Background =======
window.addEventListener('scroll', () => {
  if (scrollY > 50) {
    navBar.classList.add('bg-white', 'bg-opacity-80', 'backdrop-blur-lg', 'shadow-sm');
    navLinks.classList.remove('bg-white', 'shadow-sm', 'bg-opacity-80');
    logo.src = './images/logo.png';
  } else {
    navBar.classList.remove('bg-white', 'bg-opacity-80', 'backdrop-blur-lg', 'shadow-sm');
    navLinks.classList.add('bg-white', 'shadow-sm', 'bg-opacity-80');
    logo.src = './images/logo2.png';
  }
});

// ======= AOS Initialization =======
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1000,
    once: false,
    offset: 120,
    easing: 'ease-in-out',
    mirror: true
  });
});

// ======= Counter Animation =======
const counters = document.querySelectorAll('.counter');
const runCounters = () => {
  counters.forEach(counter => {
    counter.innerText = '0';
    const target = +counter.getAttribute('data-target');
    const speed = 300;
    const increment = target / speed;

    const updateCount = () => {
      const count = +counter.innerText;
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 70);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) runCounters();
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('section');
if (statsSection) counterObserver.observe(statsSection);

// ======= Circular Gradient Charts (conic style) =======
const circularCharts = document.querySelectorAll('#skills .flex.flex-col.items-center');

const animateCircularChart = (el) => {
  const percent = parseInt(el.dataset.percent);
  const color = el.dataset.color;
  let current = 0;

  const chartEl = el.querySelector('div[style*="conic-gradient"]');

  const interval = setInterval(() => {
    if (current >= percent) {
      clearInterval(interval);
    } else {
      current++;
      chartEl.style.background = `conic-gradient(${color} ${current}%, #1a1a1a 0%)`;
    }
  }, 10);
};

const circularObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCircularChart(entry.target);
       // Removed: circularObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

circularCharts.forEach(chart => {
  chart.style.position = 'relative'; // Ensure center text aligns
  circularObserver.observe(chart);
});

const animateProgressBars = () => {
  document.querySelectorAll('.bar').forEach(bar => {
    const percent = bar.getAttribute('data-percent');
    bar.style.transition = 'none';
    bar.style.width = '0'; // reset
    void bar.offsetWidth; // force reflow
    setTimeout(() => {
      bar.style.transition = 'width 2s ease-in-out';
      bar.style.width = percent;
    }, 100);
  });
};

const progressObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateProgressBars();
    }
  });
}, { threshold: 0.5 });

progressObserver.observe(document.querySelector('#skills'));

