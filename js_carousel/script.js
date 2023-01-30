(function () {
    "use strict";

    const get = (target) => {
        return document.querySelector(target);
    };

    class Carousel {
        constructor(carouselElement) {
            this.carouselElement = carouselElement;
            this.itemClassName = "carousel_item";
            this.items = this.carouselElement.querySelectorAll(".carousel_item");

            this.totalItems = this.items.length;
            this.current = 0;
            this.isMoving = false;
            this.stopCarousel = null;
        }

        initCarousel() {
            this.items[0].classList.add("active");
            this.items[1].classList.add("next");
            this.items[this.totalItems - 1].classList.add("prev");
        }

        setEventListener() {
            this.prevButton = this.carouselElement.querySelector(".carousel_button--prev");
            this.nextButton = this.carouselElement.querySelector(".carousel_button--next");

            this.prevButton.onclick = () => this.movePrev();
            this.nextButton.onclick = () => this.moveNext();

            // 케러셀 자동 이벤트 중지
            this.items.forEach((item) => {
                item.onmousedown = () => clearInterval(this.stopCarousel);
                item.onmouseup = () => this.autoNextCarousel();
                item.ondragend = () => this.autoNextCarousel();
            });
        }

        // 케러셀 자동
        autoNextCarousel() {
            this.stopCarousel = setInterval(() => {
                this.moveNext();
            }, 4000);
        }

        // 케러셀 지연
        disabledInteraction() {
            this.isMoving = true;
            setTimeout(() => {
                this.isMoving = false;
            }, 800);
        }

        movePrev() {
            if (this.isMoving) return;
            if (this.current == 0) {
                this.current = this.totalItems - 1;
            } else {
                this.current--;
            }
            this.moveCarouselTo();
        }

        moveNext() {
            if (this.isMoving) return;
            if (this.current == this.totalItems - 1) {
                this.current = 0;
            } else {
                this.current++;
            }
            this.moveCarouselTo();
        }

        moveCarouselTo() {
            if (this.isMoving) return;
            this.disabledInteraction();
            let prev = this.current - 1;
            let next = this.current + 1;

            if (this.current === 0) {
                prev = this.totalItems - 1;
            } else if (this.current === this.totalItems - 1) {
                next = 0;
            }

            for (let i = 0; i < this.totalItems; i++) {
                if (i === this.current) {
                    this.items[i].className = this.itemClassName + " active";
                } else if (i === prev) {
                    this.items[i].className = this.itemClassName + " prev";
                } else if (i === next) {
                    this.items[i].className = this.itemClassName + " next";
                } else {
                    this.items[i].className = this.itemClassName;
                }
            }
        }
    }

    const init = () => {
        const carouselElement = get(".carousel");
        const carousel = new Carousel(carouselElement);

        carousel.initCarousel();
        carousel.setEventListener();
        carousel.autoNextCarousel();
    };

    init();
})();
