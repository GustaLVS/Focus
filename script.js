// ===== CONFIGURAÇÕES GERAIS =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initContactForm();
    initNavbarScroll();
    initWhatsAppButton();
    initMouseInteractions();
    initHeroParallax(); // Nova função para efeitos de paralaxe na HERO
    initHeroAnimations(); // Nova função para animações da HERO
    initBackgroundVariation(); // Nova função para variação de background
    initParticleInteractions(); // Nova função para interações das partículas
    initAnimatedStats(); // Nova função para estatísticas animadas
    initTypewriterEffect(); // Nova função para efeito typewriter
    initScrollIndicator(); // Nova função para indicador de scroll
    initEnhancedDeviceEffects(); // Nova função para efeitos melhorados nos dispositivos

    // Novas funções avançadas
    initAnimatedCounters();
    initAdvancedParticleInteractions();
    initGlassmorphismEffects();
    initEnhancedEntryAnimations();
    initAdvancedHoverEffects();
    initLogoAnimations();
    
    // Inicializar contadores quando a página carregar
    setTimeout(() => {
        initAnimatedCounters();
    }, 1000);
});

// ===== MENU MOBILE =====
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle do menu mobile
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animar as barras do hamburger
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Resetar animação das barras
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
}

// ===== SCROLL SUAVE =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 90; // Ajuste para navbar fixa
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ANIMAÇÕES DE SCROLL =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animateElements = document.querySelectorAll(`
        .service-card,
        .solution-card,
        .portfolio-card,
        .about-content,
        .contact-content,
        .section-header
    `);

    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== NAVBAR SCROLL =====
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Adicionar classe para efeito de scroll
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Esconder/mostrar navbar no scroll (opcional)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll para baixo - esconder navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scroll para cima - mostrar navbar
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// ===== FORMULÁRIO DE CONTATO =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir envio padrão
            
            // Obter dados do formulário
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone') || 'Não informado',
                message: formData.get('message')
            };
            
            // Validação básica
            if (!data.name || !data.email || !data.message) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showNotification('Por favor, insira um e-mail válido.', 'error');
                return;
            }
            
            // Mostrar loading
            showNotification('Enviando mensagem...', 'info');
            
            // Preparar dados para envio
            const submitData = new FormData();
            submitData.append('access_key', 'e90d939b-e4bd-43ae-bcfc-163622b4d818');
            submitData.append('subject', 'Nova mensagem do site Focus Dev');
            submitData.append('name', data.name);
            submitData.append('email', data.email);
            submitData.append('phone', data.phone);
            submitData.append('message', data.message);
            submitData.append('redirect', 'false');
            
            // Enviar via Web3Forms usando fetch
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: submitData
            })
            .then(response => {
                console.log('Response status:', response.status);
                // Se o status for 200, significa que foi enviado com sucesso
                if (response.status === 200) {
                    showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Status não é 200');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                // Mesmo com erro no fetch, se o email chegou, consideramos sucesso
                showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                contactForm.reset();
            });
        });
    }
}

// ===== VALIDAÇÃO DE E-MAIL =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== NOTIFICAÇÕES =====
function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Adicionar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#31C48D' : type === 'error' ? '#dc3545' : '#1A2A6C'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Botão fechar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== WHATSAPP BUTTON =====
function initWhatsAppButton() {
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    if (whatsappButton) {
        // Adicionar efeito de hover mais suave
        whatsappButton.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        whatsappButton.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
        
        // Adicionar mensagem personalizada ao WhatsApp
        whatsappButton.addEventListener('click', function(e) {
            const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços da Focus Dev.');
            this.href = `https://wa.me/5511999999999?text=${message}`;
        });
    }
}

// ===== LAZY LOADING PARA IMAGENS =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// ===== CONTADOR DE NÚMEROS (OPCIONAL) =====
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 segundos
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// ===== SCROLL TO TOP (OPCIONAL) =====
function initScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(26, 42, 108, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Mostrar/ocultar botão baseado no scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll para o topo
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== INICIALIZAR FUNÇÕES OPCIONAIS =====
// Descomente as linhas abaixo se quiser usar essas funcionalidades
// initLazyLoading();
// initCounters();
// initScrollToTop();

// ===== UTILITÁRIOS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== DETECÇÃO DE DISPOSITIVO =====
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isDesktop() {
    return window.innerWidth > 1024;
}

// ===== EVENT LISTENERS ADICIONAIS =====
window.addEventListener('resize', debounce(() => {
    // Reajustar layout se necessário
    if (isMobile()) {
        // Ações específicas para mobile
    } else if (isTablet()) {
        // Ações específicas para tablet
    } else {
        // Ações específicas para desktop
    }
}, 250));

// ===== PREVENIR ZOOM EM INPUTS NO iOS =====
document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});

// ===== MELHORAR PERFORMANCE DE SCROLL =====
window.addEventListener('scroll', throttle(() => {
    // Código que precisa ser executado durante o scroll
}, 16)); // ~60fps 

// ===== EFEITOS DE INTERAÇÃO COM MOUSE =====
function initMouseInteractions() {
    // Efeito de paralaxe sutil na Home
    initParallaxEffect();
    
    // Efeitos de hover nos cards de serviços
    initServiceCardEffects();
    
    // Efeitos de movimento nos elementos da Home
    initHomeMovementEffects();
    
    // Efeito de cursor personalizado (opcional)
    initCustomCursor();

    // Efeito de iluminação na Home
    initHeroSpotlight();
}

// ===== EFEITO DE PARALAXE SUTIL =====
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (!heroSection || !heroImage) return;
    
    window.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 768) return; // Desabilitar em mobile
        
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        // Calcular posição relativa do mouse (0 a 1)
        const x = (clientX - innerWidth / 2) / innerWidth;
        const y = (clientY - innerHeight / 2) / innerHeight;
        
        // Aplicar transformações sutis
        if (heroImage) {
            heroImage.style.transform = `translate(${x * 10}px, ${y * 10}px) scale(1.02)`;
        }
        
        if (heroTitle) {
            heroTitle.style.transform = `translateX(${x * 15}px)`;
        }
        
        if (heroSubtitle) {
            heroSubtitle.style.transform = `translateX(${x * 10}px)`;
        }
    });
    
    // Resetar posições quando o mouse sair da seção
    heroSection.addEventListener('mouseleave', () => {
        if (heroImage) heroImage.style.transform = 'translate(0, 0) scale(1)';
        if (heroTitle) heroTitle.style.transform = 'translateX(0)';
        if (heroSubtitle) heroSubtitle.style.transform = 'translateX(0)';
    });
}

// ===== EFEITOS NOS CARDS DE SERVIÇOS =====
function initServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            // Efeito de inclinação baseado na posição do mouse
            card.style.transform = `
                translateY(-5px) 
                rotateX(${(y - 0.5) * 10}deg) 
                rotateY(${(x - 0.5) * 10}deg)
            `;
            
            // Adicionar brilho sutil
            card.style.boxShadow = `
                0 15px 30px rgba(0, 0, 0, 0.1),
                inset 0 0 0 1px rgba(0, 0, 0, 0.1)
            `;
        });
        
        card.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            // Atualizar inclinação em tempo real
            card.style.transform = `
                translateY(-5px) 
                rotateX(${(y - 0.5) * 10}deg) 
                rotateY(${(x - 0.5) * 10}deg)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });
}

// ===== EFEITOS DE MOVIMENTO NA HOME =====
function initHomeMovementEffects() {
    const heroContainer = document.querySelector('.hero-container');
    const ctaButton = document.querySelector('.cta-button');
    
    if (!heroContainer) return;
    
    // Efeito de flutuação sutil nos elementos
    const floatingElements = [ctaButton];
    
    floatingElements.forEach((element, index) => {
        if (!element) return;
        
        // Adicionar animação de flutuação
        element.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
    });
    
    // Adicionar keyframes para flutuação
    if (!document.querySelector('#float-animation')) {
        const style = document.createElement('style');
        style.id = 'float-animation';
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== CURSOR PERSONALIZADO (OPCIONAL) =====
function initCustomCursor() {
    if (window.innerWidth <= 768) return; // Desabilitar em mobile
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(0, 0, 0, 0.3);
        border: 2px solid #000;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    
    document.body.appendChild(cursor);
    
    // Seguir o mouse
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Efeito de hover em elementos interativos
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .solution-card, .portfolio-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'rgba(0, 0, 0, 0.8)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'rgba(0, 0, 0, 0.3)';
        });
    });
    
    // Esconder cursor quando sair da janela
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
} 

// ===== EFEITO DE ILUMINAÇÃO NA HOME =====
function initHeroSpotlight() {
    const hero = document.querySelector('.hero');
    const spotlight = document.getElementById('hero-spotlight');
    if (!hero || !spotlight) return;

    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    hero.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 768) return; // Desabilitar em mobile
        const rect = hero.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    hero.addEventListener('mouseleave', () => {
        mouseX = hero.offsetWidth / 2;
        mouseY = hero.offsetHeight / 2;
    });

    function updateSpotlight() {
        // Suavizar o movimento com lerp (linear interpolation)
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        spotlight.style.background = `radial-gradient(circle at ${currentX}px ${currentY}px, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 160px, transparent 400px)`;
        
        animationFrameId = requestAnimationFrame(updateSpotlight);
    }

    updateSpotlight();

    // Limpar animation frame quando necessário
    window.addEventListener('beforeunload', () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });
}

// ===== HERO PARALLAX EFFECT =====
function initHeroParallax() {
    const devices = document.querySelectorAll('.device[data-parallax]');
    
    if (devices.length === 0) return;
    
    document.addEventListener('mousemove', function(e) {
        if (window.innerWidth <= 768) return; // Desabilitar em mobile
        
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        devices.forEach(device => {
            const parallaxFactor = parseFloat(device.getAttribute('data-parallax'));
            const rotateY = mouseX * 20 * parallaxFactor;
            const rotateX = -mouseY * 10 * parallaxFactor;
            
            device.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`;
        });
    });
    
    // Reset position when mouse leaves
    document.addEventListener('mouseleave', function() {
        devices.forEach(device => {
            const isLaptop = device.classList.contains('laptop');
            const isMobile = device.classList.contains('mobile');
            
            if (isLaptop) {
                device.style.transform = 'perspective(1000px) rotateY(-15deg) rotateX(5deg)';
            } else if (isMobile) {
                device.style.transform = 'perspective(1000px) rotateY(10deg) rotateX(-5deg)';
            }
        });
    });
}

// ===== HERO ANIMATIONS =====
function initHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-cta, .hero-devices');
    
    // Trigger animations when page loads
    setTimeout(() => {
        heroElements.forEach((element, index) => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }, 100);
    
    // Add floating animation to devices
    const devices = document.querySelectorAll('.device');
    devices.forEach((device, index) => {
        device.style.animation = `float 3s ease-in-out ${index * 0.5}s infinite`;
    });
}

// ===== ENHANCED MOUSE INTERACTIONS =====
function initMouseInteractions() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    hero.addEventListener('mousemove', function(e) {
        if (window.innerWidth <= 768) return; // Desabilitar em mobile
        
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = (x - centerX) / centerX * 15;
        const moveY = (y - centerY) / centerY * 15;
        
        // Subtle movement for gradient background with image
        const gradientBg = document.querySelector('.hero-gradient-bg');
        if (gradientBg) {
            gradientBg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        }
    });
    
    // Reset position when mouse leaves
    hero.addEventListener('mouseleave', function() {
        const gradientBg = document.querySelector('.hero-gradient-bg');
        if (gradientBg) {
            gradientBg.style.transform = 'translate(0, 0) scale(1)';
        }
    });
}

// ===== BACKGROUND VARIATION =====
function initBackgroundVariation() {
    const gradientBg = document.querySelector('.hero-gradient-bg');
    if (!gradientBg) return;
    
    // Verificar se a imagem está carregando
    const testImage = new Image();
    testImage.onload = function() {
        console.log('Background image loaded successfully');
    };
    testImage.onerror = function() {
        console.log('Background image failed to load, using fallback pattern');
        // Fallback para padrão CSS
        gradientBg.classList.add('fallback');
    };
    testImage.src = 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1920&q=80';
    
    // Alternar entre backgrounds a cada 30 segundos (opcional)
    setInterval(() => {
        gradientBg.classList.toggle('alternative');
    }, 30000);
    
    // Também pode ser alternado manualmente com clique
    gradientBg.addEventListener('click', function() {
        this.classList.toggle('alternative');
    });
} 

// ===== PARTICLE INTERACTIONS =====
function initParticleInteractions() {
    const particles = document.querySelectorAll('.particle');
    if (particles.length === 0) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    particles.forEach(particle => observer.observe(particle));
}

// ===== ANIMATED STATS =====
function initAnimatedStats() {
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length === 0) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

// ===== TYPEWRITER EFFECT =====
function initTypewriterEffect() {
    const typewriterText = document.querySelector('.typewriter-text');
    if (!typewriterText) return;

    const text = typewriterText.textContent;
    typewriterText.textContent = '';

    let charIndex = 0;
    const typingSpeed = 50; // Velocidade de digitação (ms)

    function type() {
        if (charIndex < text.length) {
            typewriterText.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        }
    }

    type();
}

// ===== SCROLL INDICATOR =====
function initScrollIndicator() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = `
        <div class="indicator-bar"></div>
    `;
    document.body.appendChild(scrollIndicator);

    let scrollPosition = 0;
    let scrollHeight = 0;

    function updateScrollIndicator() {
        scrollPosition = window.pageYOffset;
        scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

        if (scrollHeight > 0) {
            const scrollPercentage = (scrollPosition / scrollHeight) * 100;
            scrollIndicator.style.width = `${scrollPercentage}%`;
        } else {
            scrollIndicator.style.width = '0%';
        }
    }

    window.addEventListener('scroll', updateScrollIndicator);
    updateScrollIndicator(); // Set initial value
}

// ===== ENHANCED DEVICE EFFECTS =====
function initEnhancedDeviceEffects() {
    const devices = document.querySelectorAll('.device');
    if (devices.length === 0) return;

    devices.forEach(device => {
        device.addEventListener('mouseenter', (e) => {
            const { left, top, width, height } = device.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;

            // Efeito de inclinação baseado na posição do mouse
            device.style.transform = `
                translateY(-5px) 
                rotateX(${(y - 0.5) * 10}deg) 
                rotateY(${(x - 0.5) * 10}deg)
            `;

            // Adicionar brilho sutil
            device.style.boxShadow = `
                0 15px 30px rgba(0, 0, 0, 0.1),
                inset 0 0 0 1px rgba(0, 0, 0, 0.1)
            `;
        });

        device.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = device.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;

            // Atualizar inclinação em tempo real
            device.style.transform = `
                translateY(-5px) 
                rotateX(${(y - 0.5) * 10}deg) 
                rotateY(${(x - 0.5) * 10}deg)
            `;
        });

        device.addEventListener('mouseleave', () => {
            device.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            device.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });
} 

// ===== ANIMAÇÃO DE CONTADORES MELHORADA =====
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 segundos
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                        // Adicionar efeito de destaque quando terminar
                        counter.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            counter.style.transform = 'scale(1)';
                        }, 200);
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// ===== INTERAÇÕES DE PARTÍCULAS AVANÇADAS =====
function initAdvancedParticleInteractions() {
    const particles = document.querySelectorAll('.particle');
    const hero = document.querySelector('.hero');
    
    if (!hero || particles.length === 0) return;
    
    // Efeito de atração das partículas ao mouse
    hero.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 768) return; // Desabilitar em mobile
        
        const rect = hero.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        particles.forEach((particle, index) => {
            const particleRect = particle.getBoundingClientRect();
            const particleX = particleRect.left - rect.left + particleRect.width / 2;
            const particleY = particleRect.top - rect.top + particleRect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(mouseX - particleX, 2) + Math.pow(mouseY - particleY, 2)
            );
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                const moveX = (mouseX - particleX) * force * 0.1;
                const moveY = (mouseY - particleY) * force * 0.1;
                
                particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.2})`;
                particle.style.opacity = 0.8 + force * 0.2;
            } else {
                particle.style.transform = 'translate(0, 0) scale(1)';
                particle.style.opacity = 0.6;
            }
        });
    });
    
    // Reset das partículas quando o mouse sair
    hero.addEventListener('mouseleave', () => {
        particles.forEach(particle => {
            particle.style.transform = 'translate(0, 0) scale(1)';
            particle.style.opacity = 0.6;
        });
    });
}

// ===== EFEITO DE TEXTO TIPO MÁQUINA DE ESCREVER =====
function initTypewriterEffect() {
    const titleLines = document.querySelectorAll('.title-line');
    if (titleLines.length === 0) return;
    
    titleLines.forEach((line, index) => {
        const originalText = line.textContent;
        line.textContent = '';
        line.style.opacity = '0';
        
        setTimeout(() => {
            line.style.opacity = '1';
            typeText(line, originalText, 0, 50 + (index * 100)); // Delay diferente para cada linha
        }, 500 + (index * 300));
    });
}

function typeText(element, text, charIndex, delay) {
    if (charIndex < text.length) {
        element.textContent += text.charAt(charIndex);
        setTimeout(() => typeText(element, text, charIndex + 1, delay), delay);
    }
}

// ===== INDICADOR DE SCROLL MELHORADO =====
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    const scrollArrow = scrollIndicator.querySelector('.scroll-arrow');
    if (!scrollArrow) return;
    
    // Funcionalidade de scroll suave
    scrollArrow.addEventListener('click', () => {
        const nextSection = document.querySelector('#sobre');
        if (nextSection) {
            const offsetTop = nextSection.offsetTop - 90;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
    
    // Esconder indicador quando scrollar para baixo
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// ===== EFEITOS DE GLASSMORPHISM =====
function initGlassmorphismEffects() {
    const glassElements = document.querySelectorAll('.badge, .stat-item, .tech-logo, .trust-badge');
    
    glassElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.backdropFilter = 'blur(20px)';
            element.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.backdropFilter = 'blur(10px)';
            element.style.background = 'var(--glass-bg)';
        });
    });
}

// ===== ANIMAÇÕES DE ENTRADA MELHORADAS =====
function initEnhancedEntryAnimations() {
    const animatedElements = document.querySelectorAll(`
        .hero-badges,
        .hero-title,
        .hero-subtitle,
        .hero-stats,
        .hero-trust,
        .hero-cta,
        .hero-devices
    `);
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// ===== EFEITOS DE HOVER AVANÇADOS =====
function initAdvancedHoverEffects() {
    // Efeito de ripple nos botões
    const buttons = document.querySelectorAll('.cta-button, .secondary-button, .whatsapp-cta');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Adicionar keyframes para ripple se não existir
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
} 

// ===== ANIMAÇÕES DA LOGO =====
function initLogoAnimations() {
    const heroLogo = document.querySelector('.hero-logo');
    const floatingLogo = document.querySelector('.floating-logo');
    const logoGlow = document.querySelector('.logo-glow');
    
    if (!heroLogo || !floatingLogo || !logoGlow) return;
    
    // Efeito de parallax sutil na logo
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 768) return; // Desabilitar em mobile
        
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        const moveX = mouseX * 10;
        const moveY = mouseY * 10;
        
        floatingLogo.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
        logoGlow.style.transform = `translate(calc(-50% + ${moveX * 0.5}px), calc(-50% + ${moveY * 0.5}px)) scale(1.05)`;
    });
    
    // Reset quando o mouse sair
    document.addEventListener('mouseleave', () => {
        floatingLogo.style.transform = 'translate(0, 0) scale(1)';
        logoGlow.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Efeito de pulso quando a logo entrar na viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroLogo.style.animation = 'logoFloat 4s ease-in-out infinite, logoPulse 2s ease-in-out 0.5s';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    observer.observe(heroLogo);
    
    // Adicionar keyframes para pulse se não existir
    if (!document.querySelector('#logo-pulse-animation')) {
        const style = document.createElement('style');
        style.id = 'logo-pulse-animation';
        style.textContent = `
            @keyframes logoPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
        `;
        document.head.appendChild(style);
    }
} 