'use strict';

const signUpBtn = document.querySelector('.nav__main--item-signUp');
const logInBtn = document.querySelector('.nav__main--item-logIn');
const iconLoginTimes = document.querySelector('.icon__logIn--times');
const btnArchiTimes = document.querySelector('.icon__archi--times');
const logIn = document.querySelector('.logIn');
const overlay = document.querySelector('.overlay');
const mainLinks = document.querySelectorAll('.nav__main--link');
const mainNavLinks = document.querySelector('.nav__main--links');
const mainNav = document.querySelector('.nav__main');
const header = document.querySelector('.header');
const navBar = document.querySelector('.icon__nav--bar');
const archiBtn = document.querySelector('.btn__archi');
const tabContainer = document.querySelector('.operations__tab--container');
const tabContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////////////////////////
// Functions

////////////////////////////////////
// Modal Window
const openLogIn = () => {
    logIn.classList.add('logIn--active');
    overlay.classList.remove('overlay--hidden');
}

const closeLogIn = () => {
    logIn.classList.remove('logIn--active');
    overlay.classList.add('overlay--hidden');
}

signUpBtn.addEventListener('click', openLogIn);
logInBtn.addEventListener('click', openLogIn);
iconLoginTimes.addEventListener('click', closeLogIn);
overlay.addEventListener('click', closeLogIn);

///////////////////////////////////
// Toggle Sub MENU
const dropDowns = document.querySelectorAll('.dropdown');

mainLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const icon = e.target.closest('.icon__chevron');
        if(!icon) return;
        const dropDown = icon.nextElementSibling;
        dropDown.classList.toggle('dropdown--active');
        dropDowns.forEach(menu => {
            if(dropDown !== menu && menu.classList.contains('dropdown--active')) {
                menu.classList.remove('dropdown--active');
            }
        })
    })
})

////////////////////////////////
// Sticky Navigation

const stickyNav = function (entries, observe) {
    const [entry] = entries;

    if (!entry.isIntersecting) {
        mainNav.classList.add('nav__main--sticky');
    } else {
        mainNav.classList.remove('nav__main--sticky');
    }
}

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
});

headerObserver.observe(header);

///////////////////////////////////
// Toggle Menu

navBar.addEventListener('click', () => {
    mainNavLinks.classList.toggle('nav__main--links-active');
});

////////////////////////////////
// Architecture text 

const openBox = function () {
    document.querySelector('.architecture__text').classList.add('architecture__text--active');
    overlay.classList.remove('overlay--hidden');
}

const clsoeBox = function () {
    document.querySelector('.architecture__text').classList.remove('architecture__text--active');
    overlay.classList.add('overlay--hidden');
}

archiBtn.addEventListener('click', openBox);
btnArchiTimes.addEventListener('click', clsoeBox);
overlay.addEventListener('click', clsoeBox);

//////////////////////////////
// Slider 

const slides = document.querySelectorAll('.slide');
const arrowLeft = document.querySelector('.icon__slide--left');
const arrowRight = document.querySelector('.icon__slide--right');
let currSlide = 0;
let maxSlide = slides.length;

slides.forEach((s, i) => {
    s.style.transform = `translateX(${105 * i}%)`;
});

const goToSlide = function (slide) {
    slides.forEach((s, i) => {
        s.style.transform = `translateX(${105 * (i - slide)}%)`;
    });
};

const nextSlide = () => {
    if (currSlide ===  maxSlide - 1) {
        currSlide = 0;
    } else {
        currSlide++;
    }

    goToSlide(currSlide);
}

setInterval(nextSlide, 3000);

const prevSlide = () => {
    if (currSlide === 0) {
        currSlide = maxSlide - 1;
    } else {
        currSlide--;
    }

    goToSlide(currSlide);
}

arrowLeft.addEventListener('click', prevSlide);
arrowRight.addEventListener('click', nextSlide);

//////////////////////////////////
// Tabs

tabContainer.addEventListener('click', function (e) {
    const tabs = this.querySelectorAll('.operations__tab');
    const tab = e.target;

    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    tab.classList.add('operations__tab--active');

    tabContent.forEach(content => content.classList.remove('operations__content--active'));
    document.querySelector(`.operations__content--${tab.dataset.tab}`).classList.add('operations__content--active');
})

///////////////////////////////
// Progress Scroll Bar
const progressBar = function () {
    const currentScroll = window.pageYOffset;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const scroll = (currentScroll / height) * 100;
    document.getElementById('scroll-bar').style.width = scroll + '%';
}

window.addEventListener('scroll', progressBar);

//////////////////////////////////////////
// Map 

const coords = [34.0509919, -118.242021];

const map = L.map('map').setView(coords, 15);

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker(coords).addTo(map)
    .bindPopup(L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: `footer__map--popup`,
    }))
    .setPopupContent(`Visit our company`)
    .openPopup();