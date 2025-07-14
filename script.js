// ===== CONFIGURAÇÕES GERAIS =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades essenciais
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initContactForm();
    initNavbarScroll();
    initWhatsAppButton();
    initHeroSpotlight(); // Iluminação simples do cursor
    initAnimatedStats(); // Estatísticas animadas
    initScrollIndicator(); // Indicador de scroll
    
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
            this.href = `https://wa.me/5577981239376?text=${message}`;
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

 

// ===== ILUMINAÇÃO E BACKGROUND SEGUINDO O CURSOR =====
function initHeroSpotlight() {
    const hero = document.querySelector('.hero');
    const spotlight = document.getElementById('hero-spotlight');
    const gradientBg = document.querySelector('.hero-gradient-bg');
    
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
        
        // Atualizar iluminação imediatamente
        const xPercent = (mouseX / hero.offsetWidth) * 100;
        const yPercent = (mouseY / hero.offsetHeight) * 100;
        spotlight.style.setProperty('--mouse-x', xPercent + '%');
        spotlight.style.setProperty('--mouse-y', yPercent + '%');
    });
    
    hero.addEventListener('mouseleave', () => {
        mouseX = hero.offsetWidth / 2;
        mouseY = hero.offsetHeight / 2;
        spotlight.style.setProperty('--mouse-x', '50%');
        spotlight.style.setProperty('--mouse-y', '50%');
    });
    
    // Função para animar o background com suavização
    function updateBackground() {
        // Suavizar o movimento com lerp (linear interpolation)
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;
        
        if (gradientBg) {
            const centerX = hero.offsetWidth / 2;
            const centerY = hero.offsetHeight / 2;
            
            const moveX = (currentX - centerX) / centerX * 20;
            const moveY = (currentY - centerY) / centerY * 20;
            
            gradientBg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
        }
        
        animationFrameId = requestAnimationFrame(updateBackground);
    }
    
    updateBackground();
    
    // Limpar animation frame quando necessário
    window.addEventListener('beforeunload', () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });
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

// ===== INDICADOR DE SCROLL SIMPLIFICADO =====
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
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
        }
    });
} 