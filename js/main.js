class Carousel {
  constructor(length, interval) {
    this.length = length;
    this.interval = interval;
    this.item = document.querySelectorAll('.carousel-item'); // $('.carousel-item .carousel-active').index()
    this.positionNextImage = 0;
    this.carouselInterval = null;
    this.getPosition();
  }

  getPosition() {
    let index = 0;
    this.item.forEach((element) => {
      if (element.classList.contains('carousel-active')) {
        return;
      }
      index += 1;
    });
    this.position = index;
  }

  startInterval() {
    this.carouselInterval = setInterval(() => {
      this.nextFrame();
    }, this.interval);
  }

  stopInterval() {
    clearInterval(this.carouselInterval);
  }

  buttonTimeout(button) {
    document.querySelector(button).disabled = true;
    setTimeout(() => {
      document.querySelector(button).disabled = false;
    }, this.length + 100);
  }

  nextFrame() {
    this.stopInterval();
    this.buttonTimeout('.carousel-next-button');
    if (this.position >= this.item.length - 1) {
      this.positionNextImage = 0;
    } else {
      this.positionNextImage = this.position + 1;
    }
    this.item[this.position].classList.add('carousel-active-background');
    this.item[this.position].classList.remove('carousel-active');
    this.item[this.positionNextImage].style.opacity = 0;
    this.item[this.positionNextImage].classList.add('carousel-active');
    this.item[this.positionNextImage].style.transition = `opacity ${this.length / 1000}s`;
    this.item[this.positionNextImage].style.opacity = 1;
    setTimeout(() => {
      this.item[this.positionNextImage].style.transition = '';
      this.item[this.position].style.opacity = 0;
      this.item[this.position].classList.remove('carousel-active-background');
      if (this.position === this.item.length - 1) {
        this.position = 0;
      } else {
        this.position += 1;
      }
      this.startInterval();
    }, this.length);
  }

  previousFrame() {
    this.stopInterval();
    this.buttonTimeout('.carousel-previous-button');
    if (this.position <= 0) {
      this.positionNextImage = this.item.length - 1;
    } else {
      this.positionNextImage = this.position - 1;
    }
    this.item[this.position].classList.add('carousel-active-background');
    this.item[this.position].classList.remove('carousel-active');
    this.item[this.positionNextImage].style.opacity = 0;
    this.item[this.positionNextImage].classList.add('carousel-active');
    this.item[this.positionNextImage].style.transition = `opacity ${this.length / 1000}s`;
    this.item[this.positionNextImage].style.opacity = 1;
    setTimeout(() => {
      this.item[this.positionNextImage].style.transition = '';
      this.item[this.position].style.opacity = 0;
      this.item[this.position].classList.remove('carousel-active-background');
      if (this.position <= 0) {
        this.position = this.item.length;
      }
      this.position -= 1;
      this.startInterval();
    }, this.length);
  }
}
const responsiveMenu = () => {
  document.getElementById('menu').addEventListener('click', () => {
    document.getElementById('menuEntries').classList.toggle('menu-entries-animation');
    document.getElementById('menuIcon').classList.toggle('menu-icon-animation');
  });
};

const search = () => {
  const searchIcon = document.getElementById('searchIcon');
  const searchIconSVG = document.querySelector('#searchIcon > i');
  const searchInput = document.getElementById('search');
  const container = document.querySelector('#mainHeader > .container');
  const logo = document.getElementById('logo');
  const cart = document.getElementById('cart');
  let clicked = false;
  searchIcon.addEventListener('click', () => {
    if (clicked) {
      container.classList.remove('justify-center');
      container.classList.add('justify-between');
      searchIconSVG.classList.remove('fa-times', 'text-3xl');
      searchIconSVG.classList.add('fa-search');
      searchInput.classList.add('hidden');
      logo.classList.remove('hidden');
      cart.classList.remove('hidden');
      clicked = false;
    } else {
      container.classList.remove('justify-between');
      container.classList.add('justify-center');
      searchIconSVG.classList.remove('fa-search');
      searchIconSVG.classList.add('fa-times', 'text-3xl');
      searchInput.classList.remove('hidden');
      logo.classList.add('hidden');
      cart.classList.add('hidden');
      clicked = true;
    }
  });
};

// effect is done through css transitions
const elementsFadeIn = (elements, duration) => {
  const items = elements;
  let elementTop = items[0].getBoundingClientRect().top;
  let windowHeight = window.innerHeight;
  let done = false;

  const fadeInElements = () => {
    let i = 0;
    windowHeight = window.innerHeight;
    elementTop = items[0].getBoundingClientRect().top;
    if (elementTop < windowHeight) {
      const fadeInterval = setInterval(() => {
        items[i].classList.add('!opacity-100');
        i += 1;
        if (i === items.length) {
          clearInterval(fadeInterval);
        }
      }, duration);
      done = true;
    }
  };
  for (let i = 0; i < items.length; i += 1) {
    items[i].classList.add('opacity-0');
  }
  window.addEventListener('scroll', () => {
    if (!done) {
      fadeInElements();
    }
  });
  fadeInElements();
};

document.addEventListener('DOMContentLoaded', () => {
  const carousel = new Carousel(800, 5000);
  carousel.startInterval();
  document.getElementsByClassName('carousel-next-button')[0].addEventListener('click', () => {
    carousel.nextFrame();
  });
  document.getElementsByClassName('carousel-previous-button')[0].addEventListener('click', () => {
    carousel.previousFrame();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      carousel.stopInterval();
    } else {
      carousel.startInterval();
    }
  });
  responsiveMenu();
  search();
  elementsFadeIn(document.querySelectorAll('#tips > div'), 400);
  elementsFadeIn(document.querySelectorAll('#favoriteCategories > li'), 200);
});
