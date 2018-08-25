let link = document.querySelectorAll('.nav__link');

link.forEach((item) => {
    let scroll, blockHeight;
    item.addEventListener('click', () => {
        event.preventDefault();
        scroll      = window.pageYOffset;
        blockHeight = document.querySelector(item.getAttribute('href')).offsetTop;

        if(scroll < blockHeight) {
            my_scrollDown();
        } else if(scroll > blockHeight) {
            my_scrollUp();
        }

        function my_scrollDown() {
            if(scroll < blockHeight) {
                window.scrollTo(0, scroll);
                scroll = scroll + 50;
                timer = setTimeout(my_scrollDown, 5);
            }
            else {
                clearTimeout(timer);
                window.scrollTo(0,blockHeight);
            }
        }

        function my_scrollUp() {
            if(scroll > blockHeight) {
                window.scrollTo(0, scroll );
                scroll = scroll - 50;
                timer = setTimeout(my_scrollUp, 5);
            }
            else {
                clearTimeout(timer);
                window.scrollTo(0,blockHeight);
            }
        }
    });
});
