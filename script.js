document.addEventListener('DOMContentLoaded', () => {
    const words = document.querySelectorAll('.word');
    let currentIndex = 0;

    // Show first word initially
    words[currentIndex].classList.add('active');

    // Rotate words every 2.5 seconds (faster rotation for more words)
    setInterval(() => {
        words[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % words.length;
        words[currentIndex].classList.add('active');
    }, 2500);
}); 