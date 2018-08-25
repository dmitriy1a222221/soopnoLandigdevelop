
class Navigation {
    constructor(btnToggle, navList) {
        this.btnToggle = (btnToggle) ? document.querySelector(`${btnToggle}`) : undefined;
        this.navList = (navList) ? document.querySelector(`${navList}`) : undefined;
    }
    navLogic() {
        this.btnToggle.addEventListener('click', () => {
            this.btnToggle.classList.toggle('active-nav');
            this.navList.classList.toggle('active_nav-list');
        })
    }
}

class RotateBlock {
    constructor(btnInput, btnOut, block1, block2) {
        this.buttonInput = document.querySelectorAll(`.${btnInput}`);
        this.buttonOut = document.querySelectorAll(`.${btnOut}`);
        this.element1 = document.querySelectorAll(`.${block1}`);
        this.element2 = document.querySelectorAll(`.${block2}`);
    }
    rotateLogic() {
        for(let i = 0; i < this.buttonInput.length; i++) {
            this.buttonInput[i].addEventListener('click', () => {
                this.element1[i].style.cssText = 'transform: rotateY(180deg)';
                this.element2[i].style.cssText = 'transform: rotateY(360deg)';
            })
        }
        for(let i = 0; i < this.buttonOut.length; i++) {
            this.buttonOut[i].addEventListener('click', () => {
                this.element1[i].style.cssText = 'transform: rotateY(0deg)';
                this.element2[i].style.cssText = 'transform: rotateY(180deg)';
            })
        }
    }
}

class Slider {
    constructor(wrapSlide1 , wrapSlide2, slide1, slide2, btnPrev, btnNext, dishes) {
        this.btnPrev = (btnPrev) ? document.querySelector(`${btnPrev}`) : undefined;
        this.btnNext = (btnNext) ? document.querySelector(`${btnNext}`) : undefined;
        this.wrapSlide1 = (wrapSlide1) ? document.querySelector(`${wrapSlide1}`) : undefined;
        this.wrapSlide2 = (wrapSlide2) ? document.querySelector(`${wrapSlide2}`) : undefined;
        this.slide1 = (slide1) ? document.querySelectorAll(`${slide1}`) : undefined;
        this.slide2 = (slide2) ? document.querySelectorAll(`${slide2}`) : undefined;
        this.dishes = (dishes) ? document.querySelectorAll(`${dishes}`) : undefined;
        this.wrapSlide1Width = (this.slide1) ? this.slide1.length * 100 : undefined;
        this.wrapSlide2Width = (this.slide2) ? this.slide2.length * 100 : undefined;
        this.slide1Width = (this.slide1) ? 100 / this.slide1.length : undefined;
        this.slide2Width = (this.slide2) ? 100 / this.slide2.length : undefined;
        this.arrPush = [];

        (this.wrapSlide1) ? this.wrapSlide1.style.width = `${this.wrapSlide1Width}%` : undefined;
        (this.wrapSlide2) ? this.wrapSlide2.style.width = `${this.wrapSlide2Width}%` : undefined;
        (this.slide1) ? this.slide1.forEach(item => {
           item.style.width = `${this.slide1Width}%`;
        }) : undefined;
        (this.slide2) ? this.slide2.forEach(item => {
            item.style.width = `${this.slide2Width}%`;
        }) : undefined;

        for(let i = 0; i <= 100; i += this.slide1Width) {
            this.arrPush.push(i)
        }
    }

    logicSlider() {
        let arrPosition = [...this.arrPush],
            counter = 0,
            delNull = arrPosition.pop();

        let set = (pos) => {
            (this.wrapSlide1) ? this.wrapSlide1.style.transform = `translateX(-${pos}%)` : undefined;
            (this.wrapSlide2) ? this.wrapSlide2.style.transform = `translateX(-${pos}%)` : undefined;
        };
        let init = () => {
            set(arrPosition[counter]);
        };
        let prev = () => {
            counter--;
            if(counter < 0 ) counter = arrPosition.length-1;
            set(arrPosition[counter]);
            this.dishes.forEach(item => {
                item.classList.remove('active')
            });
            this.dishes[counter].classList.add('active')
        };
        let next = () => {
            counter++;
            if(counter === arrPosition.length) counter = 0;
            set(arrPosition[counter]);
            this.dishes.forEach(item => {
                item.classList.remove('active')
            });
            this.dishes[counter].classList.add('active')
        };
        let dishesNav = () => {
            for(let i = 0; i < this.dishes.length; i++) {
                this.dishes[i].addEventListener('click', (e) => {
                    counter = i;
                    set(arrPosition[counter]);
                    this.dishes.forEach(el => {
                        el.classList.remove('active');
                    });
                    this.dishes[i].classList.add('active');
                });
            }
        };
        if(this.dishes){
            dishesNav();
        }
        if (this.btnPrev || this.btnNext){
            this.btnPrev.addEventListener('click', prev);
            this.btnNext.addEventListener('click', next);
        }

        return init();
    }

}

class ValidateForm {
    constructor(form, formElement) {
        this.form = (form) ? document.querySelector(`${form}`) : undefined;
        this.formElement = (formElement) ? this.form.querySelectorAll(`${formElement}`) : undefined;
        this.types = {
            'name': /^[_a-zA-Z0-9а-яА-ЯёЁ ]+$/,
            'subject': /.+/,
            'email': /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            'text': /.+/
        };

    }
    validateLogic() {
        this.formElement.forEach(item => {
            item.addEventListener('focus', focus = () => {
                item.style.cssText = 'border-bottom: 2px solid #02cfb4';
                let regEx;
                function valid() {
                    if(!(regEx.test(item.value))){
                        item.style.cssText = 'border-bottom: 2px solid #cf5402';
                    } else {
                        item.style.cssText = 'border-bottom: 2px solid #02cfb4';
                    }
                }
                switch (item.dataset.id){
                    case 'name':
                        regEx = this.types.name;
                        item.addEventListener('input', valid);
                        break;
                    case 'subject':
                        regEx = this.types.subject;
                        item.addEventListener('input', valid);
                        break;
                    case 'email':
                        regEx = this.types.email;
                        item.addEventListener('input', valid);
                        break;
                    case 'message':
                        regEx = this.types.text;
                        item.addEventListener('input', valid);
                        break;
                }

            });
            item.addEventListener('blur', function refocus() {
                //let spanFocus = item.nextSibling.nextSibling;
                if(item.value !== ''){
                    item.style.cssText = 'border-bottom: 2px solid #58616d';
                } else {
                    //spanFocus.classList.remove('span_focus');
                    item.style.cssText = 'border-bottom: 2px solid #58616d';
                }
            })
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let navigation = new Navigation('.navigation', '.nav-list');
    navigation.navLogic();

    let rotateBlock = new RotateBlock('click_p', 'service__ul-hover_click_p-arrow', 'service__ul-description', 'service__ul-hover_description');
    rotateBlock.rotateLogic();

    let slider1 = new Slider('.aboutus__slides', '', '.aboutus__slide', '', '', '', '.aboutus-swich');
    slider1.logicSlider();

    let slider2 = new Slider('.thenSay__slides', '.thenSay__slides-wrap', '.thenSay__slides-img', '.thenSay__slide', '.thenSay__arrow_prev','.thenSay__arrow_next', '.thenSay-swich' );
    slider2.logicSlider();

    let validateForm = new ValidateForm('.form', '[data-id]');
    validateForm.validateLogic();

});
