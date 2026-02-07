// Get elements
const questionPage = document.getElementById('questionPage');
const wishPage = document.getElementById('wishPage');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

// Create additional floating hearts and roses dynamically
function createFloatingElements() {
    const heartsContainer = document.querySelectorAll('.hearts-background');
    const rosesContainer = document.querySelectorAll('.roses-float');
    
    heartsContainer.forEach(container => {
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.textContent = '❤️';
            heart.style.position = 'absolute';
            heart.style.fontSize = Math.random() * 20 + 20 + 'px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animation = `floatHearts ${Math.random() * 10 + 10}s infinite`;
            heart.style.animationDelay = Math.random() * 5 + 's';
            heart.style.opacity = '0.6';
            container.appendChild(heart);
        }
    });
    
    rosesContainer.forEach(container => {
        for (let i = 0; i < 6; i++) {
            const rose = document.createElement('div');
            rose.textContent = '🌹';
            rose.style.position = 'absolute';
            rose.style.fontSize = Math.random() * 30 + 30 + 'px';
            rose.style.left = Math.random() * 100 + '%';
            rose.style.animation = `floatRoses ${Math.random() * 15 + 15}s infinite`;
            rose.style.animationDelay = Math.random() * 5 + 's';
            rose.style.opacity = '0.7';
            container.appendChild(rose);
        }
    });
}

// Move No button away from cursor
function moveNoButton(e) {
    const noButtonRect = noBtn.getBoundingClientRect();
    const buttonCenterX = noButtonRect.left + noButtonRect.width / 2;
    const buttonCenterY = noButtonRect.top + noButtonRect.height / 2;
    
    const distanceX = e.clientX - buttonCenterX;
    const distanceY = e.clientY - buttonCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // If cursor is within 150px of the button, move it
    if (distance < 150) {
        const container = document.querySelector('.buttons-container');
        const containerRect = container.getBoundingClientRect();
        
        // Calculate new random position
        const maxX = window.innerWidth - noButtonRect.width - 100;
        const maxY = window.innerHeight - noButtonRect.height - 100;
        
        let newX = Math.random() * maxX;
        let newY = Math.random() * maxY;
        
        // Make sure it's far from the cursor
        while (Math.abs(newX - e.clientX) < 200 && Math.abs(newY - e.clientY) < 200) {
            newX = Math.random() * maxX;
            newY = Math.random() * maxY;
        }
        
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
    }
}

// Initialize No button position
function initNoButton() {
    noBtn.style.position = 'fixed';
    noBtn.style.left = '60%';
    noBtn.style.top = '50%';
    noBtn.style.transform = 'translate(-50%, -50%)';
}

// Yes button click handler
yesBtn.addEventListener('click', () => {
    questionPage.style.opacity = '0';
    setTimeout(() => {
        questionPage.classList.remove('active');
        wishPage.classList.add('active');
        wishPage.style.opacity = '1';
    }, 500);
});

// No button hover/mousemove handler
document.addEventListener('mousemove', (e) => {
    if (questionPage.classList.contains('active')) {
        moveNoButton(e);
    }
});

// Prevent No button click
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Move button on click attempt
    const maxX = window.innerWidth - noBtn.offsetWidth - 100;
    const maxY = window.innerHeight - noBtn.offsetHeight - 100;
    
    noBtn.style.left = Math.random() * maxX + 'px';
    noBtn.style.top = Math.random() * maxY + 'px';
});

// Initialize
initNoButton();
createFloatingElements();
