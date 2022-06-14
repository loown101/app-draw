const btnSlider = document.querySelectorAll('.slider-btn__button');

const sliders = document.querySelectorAll('.slider');

let width = 0;
let count = 0;

let firstTranslateX = null;
let firstTranslateY = null;

function sliderStart(event) {
  const firstTouch = event.touches[0];

  firstTranslateX = firstTouch.clientX;
  firstTranslateY = firstTouch.clientY;
}

function sliderMove(event, box, list, items, btns) {
  let moveTranslateX = event.touches[0].clientX;
  let moveTranslateY = event.touches[0].clientY;
  let resultX = 0;
  let resultY = 0;

  if (!firstTranslateX || !firstTranslateY) {
    return false
  }

  resultX = moveTranslateX - firstTranslateX;
  resultY = moveTranslateY - firstTranslateY;

  if (resultX < 0) {
    count++;

    if (count >= items.length) {
      count = 0;
    }

    for (let i = 0; i < [...btns].length; i++) {
      [...btns][i].classList.remove('slider__button_active');

      if ([...btns][i].dataset.num == count + 1) {
        [...btns][i].classList.add('slider__button_active');
      }
    }

    rollSlider(box, list);
  }

  if (resultX > 0) {
    count--;

    if (count < 0) {
      count = items.length - 1;
    }

    for (let i = 0; i < [...btns].length; i++) {
      [...btns][i].classList.remove('slider__button_active');

      if ([...btns][i].dataset.num == count + 1) {
        [...btns][i].classList.add('slider__button_active');
      }
    }


    rollSlider(box, list);
  }

  firstTranslateX = null;
  firstTranslateY = null;
}

function setWidth(itemSlider) {
  width = itemSlider.offsetWidth;
}


function rollSlider(itemSlider, sliderLine) {
  setWidth(itemSlider);

  sliderLine.style.transform = 'translate(-' + count * width + 'px)'
}

sliders.forEach(elem => {
  const list = elem.querySelector('.slider__list');
  const items = elem.querySelectorAll('.slider__item');
  const btns = elem.querySelectorAll('.slider__button');

  items.forEach(item => {
    item.addEventListener('touchstart', sliderStart, false);
    item.addEventListener('touchmove', (event) => {
      if (document.body.offsetWidth <= 767) {
        sliderMove(event, elem, list, items, btns)
      }
    }, false);
  });

  btns.forEach((btn, index) => btn.addEventListener('click', () => {
    count = index;

    for (let i = 0; i < [...btns].length; i++) {
      [...btns][i].classList.remove('slider__button_active');

      if ([...btns][i].dataset.num == count + 1) {
        [...btns][i].classList.add('slider__button_active');
      }
    }


    rollSlider(elem, list)

  }))

})