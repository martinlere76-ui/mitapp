document.addEventListener('DOMContentLoaded', () => {
    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('Service Worker registrado', reg))
                .catch(err => console.log('Error al registrar Service Worker', err));
        });
    }

    const greeting = document.getElementById('main-greeting');
    const button = document.getElementById('action-btn');

    const greetings = [
        "Hola Mundo",
        "Hello World",
        "Bonjour le Monde",
        "Ciao Mondo",
        "Olá Mundo",
        "Hallo Welt"
    ];

    let index = 0;

    button.addEventListener('click', () => {
        // Change greeting text with a small animation effect
        greeting.classList.remove('fade-in');
        void greeting.offsetWidth; // Trigger reflow

        index = (index + 1) % greetings.length;
        greeting.textContent = greetings[index];

        greeting.classList.add('fade-in');

        // Dynamic background blob movement enhancement
        const blobs = document.querySelectorAll('.blob');
        blobs.forEach(blob => {
            const randomX = Math.random() * 100 - 50;
            const randomY = Math.random() * 100 - 50;
            blob.style.transform = `translate(${randomX}px, ${randomY}px)`;
        });
    });
});
