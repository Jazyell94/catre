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
