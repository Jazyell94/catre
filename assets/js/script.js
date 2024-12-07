// MENU MOBILE
$(document).ready(function () {

  $('#menu').click(function () {
      $(this).toggleClass('fa-times');
      $('.navbar').toggleClass('nav-toggle');
      
      if ($('.navbar').hasClass('nav-toggle')) {
          $('#overlay').css({
              'opacity': '1',     
              'visibility': 'visible'
          });
      } else {
          $('#overlay').css({
              'opacity': '0',      
              'visibility': 'hidden'
          });
      }
  });

  $(window).on('scroll load', function () {
      $('#menu').removeClass('fa-times');
      $('.navbar').removeClass('nav-toggle');
      $('#overlay').css({
          'opacity': '0', 
          'visibility': 'hidden' 
      });
  });

  $('#overlay').click(function () {
      $('#menu').removeClass('fa-times');
      $('.navbar').removeClass('nav-toggle');
      $('#overlay').css({
          'opacity': '0', 
          'visibility': 'hidden' 
      });
  });

  $('a[href*="#"]').on('click', function (e) {
      e.preventDefault(); 

      $('#menu').removeClass('fa-times');
      $('.navbar').removeClass('nav-toggle');
      $('#overlay').css({
          'opacity': '0', 
          'visibility': 'hidden'
      });

      const target = $($(this).attr('href'));
      if (target.length) {
          $('html, body').animate({
              scrollTop: target.offset().top,
          }, 600, 'linear');
      }
  });

  $(window).on('scroll', function () {
      let scrollPos = $(window).scrollTop(); 
      $('section').each(function () {
          let sectionTop = $(this).offset().top - 100; 
          let sectionHeight = $(this).outerHeight(); 
          let sectionId = $(this).attr('id'); 

          if ($(`.navbar a[href="#${sectionId}"]`).length > 0) {
              if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                
                  $('.navbar a[href*="#"]').removeClass('active');
                  
                  $(`.navbar a[href="#${sectionId}"]`).addClass('active');
              }
          }
      });
  });
});


// MUDA COR DO HEADER
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");

  const baseColor = "134, 182, 198";
  const initialOpacity = 0.8;
  const maxScroll = 200;

  const updateHeaderOpacity = () => {
    const scrollTop = window.scrollY;
    const opacity = Math.min(scrollTop / maxScroll + initialOpacity, 1);

    header.style.backgroundColor = `rgba(${baseColor}, ${opacity})`;
  };

  header.style.backgroundColor = `rgba(${baseColor}, ${initialOpacity})`;

  document.addEventListener("scroll", updateHeaderOpacity);
});


// TODOS OS SLIDER 
document.addEventListener("DOMContentLoaded", () => {
    const swipers = document.querySelectorAll('.swiper');
    swipers.forEach((swiper) => {
      new Swiper(swiper, {
        loop: true,
        autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        },
        zoom: {
        maxRatio: 2, // Define o nível máximo de zoom
        },
        navigation: {
        nextEl: swiper.querySelector('.swiper-button-next'),
        prevEl: swiper.querySelector('.swiper-button-prev'),
        },
        pagination: {
        el: swiper.querySelector('.swiper-pagination'),
        clickable: true,
        },
        });
    });
});


// SLIDER DO HOME
const sliderTrack = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");

let currentIndex = 0;
let slidesToShow = 1;
let autoPlayInterval;

function updateSlidesToShow() {
  slidesToShow = window.innerWidth >= 768 ? 3 : 1;
  updateSlider();
}

function updateSlider() {
  const slideWidth = slides[0].clientWidth; 
  sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function goToNextSlide() {
  if (currentIndex === slides.length - slidesToShow) {
    currentIndex = 0;
  } else {
    currentIndex = Math.min(currentIndex + 1, slides.length - slidesToShow); 
  }
  updateSlider();
}

function goToPrevSlide() {
  if (currentIndex === 0) {
    currentIndex = slides.length - slidesToShow;
  } else {
    currentIndex = Math.max(currentIndex - 1, 0);
  }
  updateSlider();
}


function startAutoplay() {
  autoPlayInterval = setInterval(() => {
    goToNextSlide();
  }, 3000); 
}

function stopAutoplay() {
  clearInterval(autoPlayInterval);
}

nextBtn.addEventListener("click", () => {
  stopAutoplay(); 
  goToNextSlide();
  startAutoplay();
});

prevBtn.addEventListener("click", () => {
  stopAutoplay(); 
  goToPrevSlide();
  startAutoplay();
});

const sliderContainer = document.querySelector(".slider-container");
sliderContainer.addEventListener("mouseenter", stopAutoplay);
sliderContainer.addEventListener("mouseleave", startAutoplay);

window.addEventListener("resize", updateSlidesToShow);

updateSlidesToShow();
startAutoplay();


// SCROLLREVEAL
document.addEventListener('DOMContentLoaded', function () {
  const sr = ScrollReveal({
    distance: '80px',
    duration: 1000,
    easing: 'ease-in-out',
    reset: true
  });


  sr.reveal('.heading-home', { origin: 'top', delay: 100 });
  sr.reveal('.slider-container', { origin: 'top', interval: 100 });

  sr.reveal('.home-about .image', { delay: 200 });
  sr.reveal('.home-about .text h3', { delay: 200 });
  sr.reveal('.home-about .text p', { delay: 300 });
  sr.reveal('.home-about .icons', { delay: 400 });

  sr.reveal('.home-accommodations .text h3', { delay: 200 });
  sr.reveal('.home-accommodations .text p', { delay: 300 });
  sr.reveal('.home-accommodations .text .buttom', { delay: 400 });
  sr.reveal('.home-accommodations .slider', { interval: 400 });

  sr.reveal('.home-video-container .home-video', { delay: 400 });
  sr.reveal('.home-video-container .home-video-description', { delay: 600 });

  sr.reveal('.wave-section', { distance: '120px', delay: 600 });
  sr.reveal('.wave-section .content', { delay: 400 });

  sr.reveal('.home-informacoes .informacoes .b1', { interval: 200 });
  sr.reveal('.home-informacoes .informacoes .b2', { interval: 300 });
  sr.reveal('.home-informacoes .informacoes .b3', { interval: 400 });
  sr.reveal('.home-informacoes .maps', { interval: 500 });
  

});
