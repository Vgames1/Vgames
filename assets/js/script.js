let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('visible');
        if (i === index) slide.classList.add('visible');
    });
}

function startSlideShow() {
    let slideInterval = setInterval(() => {
        if (currentSlide === 2) { // Hold Slide 3 for 2 minutes (120 seconds)
            showSlide(currentSlide); // Show current slide
            setTimeout(() => {
                currentSlide++;
                showSlide(currentSlide);
            }, 120000);
            clearInterval(slideInterval);
        } else {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
    }, 5000); // 5 seconds for other slides
}

startSlideShow();

function updateClock() {
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.querySelectorAll('.clock').forEach(clock => {
        clock.innerText = timeString;
    });
}
setInterval(updateClock, 1000);

function redirectTo(url) {
    if (currentSlide === 2) {
        window.location.href = url;
    } else {
        alert("Buttons will be active on the 'Explore Endless Fun!' slide.");
    }
}
