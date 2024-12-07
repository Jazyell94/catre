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



// BOTÃO DE ESCOLHER A TRADUÇÃO 
document.addEventListener("DOMContentLoaded", function () {
  // Função para carregar o arquivo JSON de traduções
  function loadTranslations(language) {
    if (language === "br") {
      return Promise.resolve({}); // Para o idioma 'br', não precisa carregar arquivo JSON
    }
    return fetch(`./traducoes/${language}.json`)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Erro ao carregar o arquivo de traduções:", error);
        return {}; // Caso haja erro, retorna um objeto vazio
      });
  }

  // Função para aplicar a tradução
  function setLanguage(language, translations) {
    const elementsToTranslate = document.querySelectorAll("[data-translate]");
    elementsToTranslate.forEach(function (element) {
      const key = element.getAttribute("data-translate");
      if (translations[key]) {
        element.textContent = translations[key];
      }
    });
  }

  // Verificar se há um idioma previamente selecionado no localStorage
  let selectedLanguage = localStorage.getItem("selectedLanguage");

  // Se não houver um idioma salvo no localStorage, definir o idioma como 'br' (default)
  if (!selectedLanguage) {
    selectedLanguage = "br";
    localStorage.setItem("selectedLanguage", selectedLanguage);
  }

  // Carregar as traduções e aplicar o idioma selecionado
  loadTranslations(selectedLanguage).then((translations) => {
    // Definir o idioma ao carregar a página
    setLanguage(selectedLanguage, translations);

    // Marcar a bandeira correspondente como 'active'
    document.querySelectorAll(".language-option").forEach(function (option) {
      if (option.getAttribute("data-value") === selectedLanguage) {
        option.classList.add("active");
      }
    });

    // Adicionar evento de clique para cada bandeira
    document.querySelectorAll(".language-option").forEach(function (option) {
      option.addEventListener("click", function () {
        // Remover a classe 'active' de todas as opções
        document.querySelectorAll(".language-option").forEach(function (option) {
          option.classList.remove("active");
        });

        // Adicionar a classe 'active' à opção clicada
        option.classList.add("active");

        // Armazenar a seleção no localStorage
        const languageValue = option.getAttribute("data-value");
        localStorage.setItem("selectedLanguage", languageValue);

        // Recarregar a página
        location.reload(); // Isso vai recarregar a página e aplicar o idioma correto
      });
    });
  });
});



  



// SCROLLREVEAL
document.addEventListener('DOMContentLoaded', function () {
  const sr = ScrollReveal({
    distance: '80px',
    duration: 1000,
    easing: 'ease-in-out',
    reset: true
  });

  sr.reveal('.heading-home', {distance: '30px', origin: 'top', delay: 100 });
  sr.reveal('.slider-container', { origin: 'top', interval: 100 });

  sr.reveal('.home-about .image', { distance: '0px', opacity: 0, delay: 800 });
  sr.reveal('.home-about .text h3', { delay: 200 });
  sr.reveal('.home-about .text p', { delay: 300 });
  sr.reveal('.home-about .icons', { delay: 400 });

  sr.reveal('.home-accommodations .text h3', { delay: 200 });
  sr.reveal('.home-accommodations .text p', { delay: 300 });
  sr.reveal('.home-accommodations .text .buttom', { delay: 400 });
  sr.reveal('.home-accommodations .slider', { distance: '0px', opacity: 0, delay: 800 });

  sr.reveal('.home-video-container .home-video', { delay: 400 });
  sr.reveal('.home-video-container .home-video-description', { delay: 600 });

  sr.reveal('.wave-section', { distance: '120px', delay: 600 });
  sr.reveal('.wave-section .content', { delay: 400 });

  sr.reveal('.home-informacoes .informacoes .b1', { interval: 200 });
  sr.reveal('.home-informacoes .informacoes .b2', { interval: 400 });
  sr.reveal('.home-informacoes .informacoes .b3', { interval: 600 });
  sr.reveal('.home-informacoes .maps', { interval: 500 });



  sr.reveal('.heading h3', { origin: 'top', distance: '30px', delay: 300 });
  sr.reveal('.heading p', { origin: 'top', distance: '30px', interval: 200 });

  sr.reveal('.accommodations-container .infos h3', { distance: '20px', delay: 200 });
  sr.reveal('.accommodations-container .infos p', { distance: '20px', delay: 300 });
  sr.reveal('.accommodations-container .infos .items', { distance: '20px', delay: 400 });
  sr.reveal('.accommodations-container .infos .buttom', { distance: '20px', delay: 500 });

  sr.reveal('.accommodations-container .slider', { distance: '20px', delay: 200 });
});
