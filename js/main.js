document.addEventListener('DOMContentLoaded', function() {
    // ========== TICKER DE NOTICIAS ==========
    const ticker = document.getElementById('ticker-content');
    const tickerItems = ticker.querySelectorAll('li');
    const tickerContainer = document.querySelector('.ticker-container');
    let tickerSpeed = 0;
    let isTickerPaused = false;
    let animationId;
    let tickerWidth = 0;

    // Calcular ancho total del ticker
    function calculateTickerWidth() {
        tickerWidth = 0;
        tickerItems.forEach(item => {
            tickerWidth += item.offsetWidth + 32;
        });
        return tickerWidth;
    }

    // Animación del ticker
    function animateTicker() {
        if (!isTickerPaused) {
            const firstItem = tickerItems[0];
            const firstItemWidth = firstItem.offsetWidth + 32;

            if (tickerSpeed > firstItemWidth) {
                ticker.appendChild(firstItem);
                ticker.style.transform = 'translateX(0)';
                tickerSpeed = 0;
            } else {
                ticker.style.transform = `translateX(-${tickerSpeed}px)`;
                tickerSpeed += 0.5;
            }
        }
        animationId = requestAnimationFrame(animateTicker);
    }

    // Pausar al interactuar
    tickerContainer.addEventListener('mouseenter', () => {
        isTickerPaused = true;
        ticker.style.transition = 'transform 0.3s ease-out';
    });

    tickerContainer.addEventListener('mouseleave', () => {
        isTickerPaused = false;
        ticker.style.transition = 'none';
    });

    // ========== MENÚ MÓVIL ==========
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
        
        // Cambiar icono
        const icon = this.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // ========== DROPDOWNS ==========
    const dropdowns = document.querySelectorAll('.dropdown > a');

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
                
                // Cerrar otros dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.parentElement.classList.remove('active');
                    }
                });
            }
        });
    });

    // Cerrar menú al hacer clic en enlace
    document.querySelectorAll('#main-nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                mainNav.classList.remove('active');
            }
        });
    });

    // ========== CARRUSEL HERO ==========
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Controles manuales
    document.querySelector('.carousel-btn.next').addEventListener('click', nextSlide);
    document.querySelector('.carousel-btn.prev').addEventListener('click', prevSlide);

    // Auto-avance
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Pausar al interactuar
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
    carousel.addEventListener('mouseleave', startSlideShow);

    // ========== INICIALIZACIÓN ==========
    calculateTickerWidth();
    animateTicker();
    startSlideShow();
    showSlide(0);

    // Limpieza al salir
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationId);
        clearInterval(slideInterval);
    });

    // Recalcular al redimensionar
    window.addEventListener('resize', () => {
        calculateTickerWidth();
    });
});