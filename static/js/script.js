  // document.getElementById("mobile-menu").addEventListener("click", function() {
  //   const navList = document.querySelector(".nav-list");
  //   navList.classList.toggle("show");
  // });
  
  // Конструктор за typewriter ефекта
  var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.isDeleting = false;
    this.tick();
  };

  TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      // Премахва символ по символ
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Добавя символ по символ
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Актуализира съдържанието
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    // Настройка на времето между всяка итерация
    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    // Ако текстът е изписан изцяло, задържа за периода и след това започва изтриването
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500; // Пауза преди започване на нов текст
    }

    setTimeout(function() {
      that.tick();
    }, delta);
  };

  // Инициализация на ефекта при зареждане на страницата
  window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
  };




// Вземи всички секции и линкове от навигацията
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
  let currentSection = "";
  
  // Обхождаме секциите и определяме коя е на екрана
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) { // -60 за да се активира малко преди самата секция
      currentSection = section.getAttribute("id");
    }
  });
  
  // Обновяване на линковете – добавяне/премахване на "active"
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(currentSection)) {
      link.classList.add("active");
    }
  });
});




// Взимаме елементите от DOM
const sliderContainer = document.getElementById("slider-container");
const sliderWrapper   = document.getElementById("slider-wrapper");
const dotsContainer   = document.getElementById("dots-container");

// Намираме всички "слайдове" (div.slide)
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

// Текущ индекс на показания слайд
let currentIndex = 0;

// 1) Създаваме "точки" (slider-dot) според броя на слайдовете
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("span");
  dot.classList.add("slider-dot");
  // При клик върху точка -> отиваме на съответния слайд
  dot.addEventListener("click", () => {
    goToSlide(i);
  });
  dotsContainer.appendChild(dot);
}

// Взимаме всички "точки"
const dots = document.querySelectorAll(".slider-dot");

// Обновява визуално слайдъра
function updateSlider() {
  const offset = -currentIndex * 100;
  sliderWrapper.style.transform = `translateX(${offset}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

// Отива на конкретен слайд
function goToSlide(index) {
  currentIndex = index;
  updateSlider();
}

// Отива на следващ слайд
function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
}

// Автоматично прелистване на всеки 3 секунди
let sliderInterval = setInterval(nextSlide, 3000);

// Спиране при задържане на курсора
sliderContainer.addEventListener("mouseenter", () => {
  clearInterval(sliderInterval);
});

// Пускане отново при махане на курсора
sliderContainer.addEventListener("mouseleave", () => {
  sliderInterval = setInterval(nextSlide, 3000);
});

// Първоначална инициализация
updateSlider();


function copyEmail(event) {
  event.preventDefault(); // Спира препращането на линка
  const email = "izdravko397@gmail.com"; // Смени с твоя имейл

  navigator.clipboard.writeText(email).then(() => {
    alert("Email copied: " + email);
  }).catch(err => {
    console.error("Copy error: ", err);
  });
}