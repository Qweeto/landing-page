import Sun from './sun';

const sun = new Sun(document.querySelector('h1'));
const subscribeSection = document.querySelector('.subscribe');
const userFormSubmit = document.querySelector('#userSubmitForm');
const userEmail = document.querySelector('#userEmail');
const userSubmitButton = document.querySelector('#userSubmitButton');
const downbuttons = document.querySelectorAll('div[downbutton]');
const fpSections = document.querySelectorAll('.fp-section');
const youtubes = document.querySelectorAll('.youtube');
const swiperContainers = document.querySelectorAll('.swiper-container');

export {
  //SunElement
  sun,
  //HTMLElements
  subscribeSection,
  userFormSubmit,
  userEmail,
  userSubmitButton,
  downbuttons,
  fpSections,
  youtubes,
  swiperContainers
};