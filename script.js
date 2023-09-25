const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollBar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollBar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    //scrollbarı fare ile sürükleme
    scrollbarThumb.addEventListener('mousedown', (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;

        const  handleMouseMove = (e) => {
            const deltaX = e.clientX -startX;
            const newThumbPosition = thumbPosition + deltaX;
            //scrollbar thumb' ın scrollbar divinin dışına çıkmaması için 
            const maxThumbPosition = sliderScrollBar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition))

            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        //fareye tıklamayı bırakınca sürüklemeyi durdurma
        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        //sürükleme işlemini ekleme
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

    });


    //butonlar ile slide ın kaydırma işlemi
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;  //buton id' sine göre +1 veya -1 değer
            const scrollAmount = imageList.clientWidth * direction; //kaydırma boyutu imageList boyutu ve tıklanan butona göre hesaplandı
            imageList.scrollBy({left: scrollAmount, behavior: "smooth"});   //kaydırma işlemi
        })
    })

    //En solda prev butonunun en sağda next butonunun gizlenmesi
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    }

    //slider ın pozisoynuna göre scrollbarın hareketini ayarlama
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollBar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    imageList.addEventListener('scroll', () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    })

}

window.addEventListener("load", initSlider);

