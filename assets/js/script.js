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




$(document).ready(function () {

  // Alternar menu e navegação (para dispositivos móveis)
  $('#menu').click(function () {
      $(this).toggleClass('fa-times');
      $('.navbar').toggleClass('nav-toggle');
  });

  // Fechar o menu durante o scroll ou no carregamento da página
  $(window).on('scroll load', function () {
      $('#menu').removeClass('fa-times');
      $('.navbar').removeClass('nav-toggle');
  });

  // Rolagem suave para links com # (âncoras)
  $('a[href*="#"]').on('click', function (e) {
      e.preventDefault(); // Impede o comportamento padrão

      // Fecha o menu (para dispositivos móveis)
      $('#menu').removeClass('fa-times');
      $('.navbar').removeClass('nav-toggle');

      // Rolagem suave até o destino
      const target = $($(this).attr('href'));
      if (target.length) {
          $('html, body').animate({
              scrollTop: target.offset().top,
          }, 600, 'linear');
      }
  });

  // Atualização da classe active durante o scroll, apenas para links com #
  $(window).on('scroll', function () {
      let scrollPos = $(window).scrollTop(); // Posição do scroll
      $('section').each(function () {
          let sectionTop = $(this).offset().top - 100; // Posição da seção
          let sectionHeight = $(this).outerHeight(); // Altura da seção
          let sectionId = $(this).attr('id'); // ID da seção

          // Verifica se o link possui um ID válido de âncora e se a seção está visível
          if ($(`.navbar a[href="#${sectionId}"]`).length > 0) {
              if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                  // Remove a classe active de todos os links
                  $('.navbar a[href*="#"]').removeClass('active');
                  // Adiciona a classe active no link correspondente
                  $(`.navbar a[href="#${sectionId}"]`).addClass('active');
              }
          }
      });
  });


  

});




document.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  const scrollTop = window.scrollY;
  const maxScroll = 200;

  const minOpacity = 0.15;
  const opacity = Math.min(scrollTop / maxScroll + minOpacity, 1); 
  
  header.style.backgroundColor = `rgba(134, 182, 198, ${opacity})`;
});






const sliderTrack = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");

let currentIndex = 0;
let slidesToShow = 1; // Número de slides visíveis por vez (atualizado com base no tamanho da tela)
let autoPlayInterval;

// Atualiza o número de slides visíveis conforme o tamanho da tela
function updateSlidesToShow() {
  slidesToShow = window.innerWidth >= 768 ? 3 : 1; // 3 slides no desktop, 1 no mobile
  updateSlider();
}

// Atualiza a posição do slider
function updateSlider() {
  const slideWidth = slides[0].clientWidth; // Largura de cada slide
  sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`; // Ajusta o slide
}

// Avança para o próximo slide
function goToNextSlide() {
  if (currentIndex === slides.length - slidesToShow) {
    // Se chegar na última imagem, volta para a primeira com uma transição suave
    currentIndex = 0;
  } else {
    currentIndex = Math.min(currentIndex + 1, slides.length - slidesToShow); // Avança 1 slide
  }
  updateSlider();
}

// Volta para o slide anterior
function goToPrevSlide() {
  if (currentIndex === 0) {
    // Se já estiver no primeiro slide, vai para o último
    currentIndex = slides.length - slidesToShow;
  } else {
    currentIndex = Math.max(currentIndex - 1, 0); // Volta 1 slide
  }
  updateSlider();
}

// Inicia o autoplay
function startAutoplay() {
  autoPlayInterval = setInterval(() => {
    goToNextSlide();
  }, 3000); // Altera o slide a cada 3 segundos
}

// Para o autoplay
function stopAutoplay() {
  clearInterval(autoPlayInterval);
}

// Eventos de clique nos botões
nextBtn.addEventListener("click", () => {
  stopAutoplay(); // Reseta o autoplay ao clicar
  goToNextSlide();
  startAutoplay();
});

prevBtn.addEventListener("click", () => {
  stopAutoplay(); // Reseta o autoplay ao clicar
  goToPrevSlide();
  startAutoplay();
});

// Pausa o autoplay quando o mouse está sobre o slider
const sliderContainer = document.querySelector(".slider-container");
sliderContainer.addEventListener("mouseenter", stopAutoplay);
sliderContainer.addEventListener("mouseleave", startAutoplay);

// Ajusta o slider quando a janela é redimensionada
window.addEventListener("resize", updateSlidesToShow);

// Inicializa
updateSlidesToShow();
startAutoplay();
