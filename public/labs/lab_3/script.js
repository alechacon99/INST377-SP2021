const slideArray = [];
for (let i = 0; i < document.querySelectorAll('body img').length; i++) {
  slideArray.push(document.querySelectorAll('body img')[i].src);
};
console.log(slideArray);

let currentSlideIndex = 0;

function nextImage() {
    const nextArrow = document.querySelector('#next');
nextArrow.addEventListener('click', (event) => {
    currentSlideIndex++;

    if (currentSlideIndex+2 >= slideArray.length) {
        currentSlideIndex = 4;
    }
    
    document.querySelector('.img_bay_1').style.cssText = 'background: url("' + slideArray[currentSlideIndex] + '") no-repeat center center; background-size: cover;';
    document.querySelector('.img_bay_2').style.cssText = 'background: url("' + slideArray[currentSlideIndex+1] + '") no-repeat center center; background-size: cover;';
    document.querySelector('.img_bay_3').style.cssText = 'background: url("' + slideArray[currentSlideIndex+2] + '") no-repeat center center; background-size: cover;';
});
};

function prevImage() {
    const prevArrow = document.querySelector('#prev')
prevArrow.addEventListener('click', (event) => {
    currentSlideIndex--;

    if (currentSlideIndex < 0) {
        currentSlideIndex = 0;
    }
    document.querySelector('.img_bay_1').style.cssText = 'background: url("' + slideArray[currentSlideIndex] + '") no-repeat center center; background-size: cover;';
    document.querySelector('.img_bay_2').style.cssText = 'background: url("' + slideArray[currentSlideIndex+1] + '") no-repeat center center; background-size: cover;';
    document.querySelector('.img_bay_3').style.cssText = 'background: url("' + slideArray[currentSlideIndex+2] + '") no-repeat center center; background-size: cover;';
});
};

nextImage();
prevImage();