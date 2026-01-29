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
    const installBtn = document.getElementById('install-btn');
    let deferredPrompt;

    // Handle PWA installation
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI to notify the user they can add to home screen
        installBtn.style.display = 'inline-block';
    });

    installBtn.addEventListener('click', () => {
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
                installBtn.style.display = 'none';
            }
            deferredPrompt = null;
        });
    });

    window.addEventListener('appinstalled', () => {
        console.log('PWA instalada');
        installBtn.style.display = 'none';
    });

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
