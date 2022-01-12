let stopped = false;
const carousel = (length, interval) => {
  let position = $('.carousel-item.carousel-active').index();
  let newImage = 0;
  const item = $('.carousel-item');
  let carouselInterval = null;
  let startInterval = null;
  const stopInterval = () => {
    clearInterval(carouselInterval);
  };
  const carouselNext = () => {
    if (!stopped) {
      stopInterval();
      $('.carousel-next-button').attr('disabled', true);
      setTimeout(() => {
        $('.carousel-next-button').removeAttr('disabled');
      }, length + 100);
      if (position >= item.length - 1) {
        newImage = 0;
      } else {
        newImage = position + 1;
      }
      item.eq(position).addClass('carousel-active-background');
      item.eq(position).removeClass('carousel-active');
      item.eq(newImage).fadeOut(0, () => {
        item.eq(newImage).addClass('carousel-active');
      });
      item.eq(newImage).fadeIn(length, () => {
        item.eq(position).fadeOut();
        item.eq(position).removeClass('carousel-active-background');
        if (position === item.length - 1) {
          position = 0;
        } else {
          position += 1;
        }
        startInterval();
      });
    }
  };
  const carouselPrevious = () => {
    stopInterval();
    $('.carousel-previous-button').attr('disabled', true);
    setTimeout(() => {
      $('.carousel-previous-button').removeAttr('disabled');
    }, length + 100);
    if (position <= 0) {
      newImage = item.length - 1;
    } else {
      newImage = position - 1;
    }
    item.eq(position).addClass('carousel-active-background');
    item.eq(position).removeClass('carousel-active');
    item.eq(newImage).fadeOut(0, () => {
      item.eq(newImage).addClass('carousel-active');
    });
    item.eq(newImage).fadeIn(length, () => {
      item.eq(position).fadeOut();
      item.eq(position).removeClass('carousel-active-background');
      if (position <= 0) {
        position = item.length;
      }
      position -= 1;
      startInterval();
    });
  };
  startInterval = () => {
    carouselInterval = setInterval(carouselNext, interval);
  };
  startInterval();
  $('.carousel-next-button').on('click', carouselNext);
  $('.carousel-previous-button').on('click', carouselPrevious);
};
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopped = true;
  } else {
    stopped = false;
  }
});

const responsiveMenu = () => {
  const menu = $('#menu');
  const menuEntries = $('#menuEntries');
  const menuIcon = $('#menuIcon');
  let clicked = false;
  menu.on('click', () => {
    if (!clicked) {
      menuEntries.addClass('menu-entries-animation');
      menuIcon.addClass('menu-icon-animation');
      clicked = true;
    } else {
      menuEntries.removeClass('menu-entries-animation');
      menuIcon.removeClass('menu-icon-animation');
      clicked = false;
    }
  });
};

const search = () => {
  const logo = $('#logo');
  const cart = $('#cart');
  const searchBar = $('#search');
  const searchIcon = $('#searchIcon');
  const searchIconSVG = $('#searchIcon > i');
  const mainHeaderContainer = $('#mainHeader > .container');
  let clicked = false;
  searchIcon.on('click', () => {
    if (!clicked) {
      mainHeaderContainer.removeClass('justify-between').addClass('justify-center');
      searchIconSVG.removeClass('fa-search').addClass('fa-times text-3xl');
      searchBar.removeClass('hidden');
      logo.addClass('hidden');
      cart.addClass('hidden');
      clicked = true;
    } else {
      mainHeaderContainer.removeClass('justify-center').addClass('justify-between');
      searchIconSVG.removeClass('fa-times text-3xl').addClass('fa-search');
      searchBar.addClass('hidden');
      logo.removeClass('hidden');
      cart.removeClass('hidden');
      clicked = false;
    }
  });
  searchBar.on('blur', () => {
    searchBar.addClass('hidden');
  });
};

// effect is done through css transitions
const elementsFadeIn = (elements, duration) => {
  const items = elements;
  const topOfElement = items.offset().top;
  const bottomOfElement = items.offset().top + items.outerHeight();
  let topOfScreen = $(window).scrollTop();
  let bottomOfScreen = $(window).scrollTop() + $(window).innerHeight();
  let done = false;

  const fadeInElements = () => {
    let i = 0;
    if (bottomOfScreen > topOfElement && topOfScreen < bottomOfElement) {
      const fadeInterval = setInterval(() => {
        items.eq(i).addClass('!opacity-100');
        i += 1;
      }, duration);
      if (i === items.length) {
        clearInterval(fadeInterval);
      }
      done = true;
    }
  };
  for (let i = 0; i < items.length; i += 1) {
    items.eq(i).addClass('opacity-0');
  }
  $(window).on('scroll', () => {
    topOfScreen = $(window).scrollTop();
    bottomOfScreen = $(window).scrollTop() + $(window).innerHeight();
    if (!done) {
      fadeInElements();
    }
  });
  fadeInElements();
};

$(carousel(400, 5000), responsiveMenu(), search(), elementsFadeIn($('#tips > div'), 400), elementsFadeIn($('#favoriteCategories > li'), 200));
