// Inicialização do AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navegação Mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu mobile ao clicar em um link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Smooth scrolling para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contador animado para estatísticas do hero
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 100;
        const duration = 2000;
        const stepTime = duration / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }
        }, stepTime);
    });
}

// Intersection Observer para animações
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('hero-stats')) {
                animateCounters();
            }
            
            // Adicionar classe de animação personalizada
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.hero-stats, .service-card, .feature-item').forEach(el => {
    observer.observe(el);
});

// Slider de depoimentos
class TestimonialsSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.testimonial-item');
        this.navButtons = document.querySelectorAll('.testimonial-nav-btn');
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        this.showSlide(0);
        this.bindEvents();
        this.startAutoPlay();
    }
    
    bindEvents() {
        this.navButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.showSlide(index);
                this.stopAutoPlay();
                this.startAutoPlay();
            });
        });
        
        // Pausar autoplay quando hover
        const slider = document.querySelector('.testimonials-slider');
        slider.addEventListener('mouseenter', () => this.stopAutoPlay());
        slider.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    showSlide(index) {
        // Remover classe active de todos os slides e botões
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.navButtons.forEach(btn => btn.classList.remove('active'));
        
        // Adicionar classe active ao slide e botão atual
        this.slides[index].classList.add('active');
        this.navButtons[index].classList.add('active');
        
        this.currentSlide = index;
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// Inicializar slider de depoimentos
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialsSlider();
});

// FAQ Accordion
class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }
    
    init() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                this.toggleItem(item);
            });
        });
    }
    
    toggleItem(item) {
        const isActive = item.classList.contains('active');
        
        // Fechar todos os outros itens
        this.faqItems.forEach(faqItem => {
            if (faqItem !== item) {
                faqItem.classList.remove('active');
            }
        });
        
        // Toggle do item atual
        if (isActive) {
            item.classList.remove('active');
        } else {
            item.classList.add('active');
        }
    }
}

// Inicializar FAQ
document.addEventListener('DOMContentLoaded', () => {
    new FAQAccordion();
});

// Formulário de contato
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
            
            // Validação em tempo real
            this.addRealTimeValidation();
        }
    }
    
    addRealTimeValidation() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Validações específicas
        switch (fieldName) {
            case 'nome':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Nome deve ter pelo menos 2 caracteres';
                }
                break;
                
            case 'telefone':
                const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
                if (!phoneRegex.test(value) && value.length > 0) {
                    this.formatPhone(field);
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'E-mail inválido';
                }
                break;
                
            case 'servico':
                if (value === '') {
                    isValid = false;
                    errorMessage = 'Selecione um serviço';
                }
                break;
        }
        
        this.showFieldError(field, isValid, errorMessage);
        return isValid;
    }
    
    formatPhone(field) {
        let value = field.value.replace(/\D/g, '');
        
        if (value.length >= 11) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 10) {
            value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        
        field.value = value;
    }
    
    showFieldError(field, isValid, errorMessage) {
        const fieldGroup = field.closest('.form-group');
        let errorElement = fieldGroup.querySelector('.field-error');
        
        if (!isValid) {
            if (!errorElement) {
                errorElement = document.createElement('span');
                errorElement.className = 'field-error';
                fieldGroup.appendChild(errorElement);
            }
            errorElement.textContent = errorMessage;
            field.style.borderColor = '#E53E3E';
        } else {
            if (errorElement) {
                errorElement.remove();
            }
            field.style.borderColor = '#38A169';
        }
    }
    
    clearFieldError(field) {
        const fieldGroup = field.closest('.form-group');
        const errorElement = fieldGroup.querySelector('.field-error');
        
        if (errorElement) {
            errorElement.remove();
        }
        field.style.borderColor = '#E2E8F0';
    }
    
    handleSubmit() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Validar todos os campos
        const inputs = this.form.querySelectorAll('input[required], select[required]');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (isFormValid) {
            this.sendToWhatsApp(data);
        } else {
            this.showFormError('Por favor, corrija os erros antes de enviar.');
        }
    }
    
    sendToWhatsApp(data) {
        const phoneNumber = '5548999999999'; // Substitua pelo número real
        let message = `*Nova consulta jurídica:*\n\n`;
        message += `*Nome:* ${data.nome}\n`;
        message += `*Telefone:* ${data.telefone}\n`;
        message += `*E-mail:* ${data.email}\n`;
        message += `*Problema:* ${data.servico}\n`;
        
        if (data.mensagem) {
            message += `*Detalhes:* ${data.mensagem}\n`;
        }
        
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Mostrar mensagem de sucesso
        this.showSuccessMessage();
        
        // Abrir WhatsApp após 2 segundos
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 2000);
    }
    
    showFormError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-message error';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        this.insertMessage(errorDiv);
    }
    
    showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'form-message success';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i> 
            Formulário enviado com sucesso! Redirecionando para o WhatsApp...
        `;
        
        this.insertMessage(successDiv);
        
        // Limpar formulário
        this.form.reset();
    }
    
    insertMessage(messageElement) {
        // Remover mensagem anterior se existir
        const existingMessage = this.form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Inserir nova mensagem
        const submitButton = this.form.querySelector('.form-submit');
        this.form.insertBefore(messageElement, submitButton);
        
        // Remover mensagem após 5 segundos
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}

// Inicializar formulário
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});

// Parallax effect suave
function addParallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Lazy loading para imagens
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Scroll to top button
function createScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollButton.setAttribute('aria-label', 'Voltar ao topo');
    
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Typing animation para o hero title
function typeWriterEffect() {
    const element = document.querySelector('.hero-title .highlight');
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--primary-color)';
    
    let i = 0;
    const typeTimer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeTimer);
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }, 100);
}

// Inicialização geral
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar classe loaded para animações CSS
    document.body.classList.add('loaded');
    
    // Configurar lazy loading
    setupLazyLoading();
    
    // Adicionar scroll to top
    createScrollToTop();
    
    // Configurar parallax
    addParallaxEffect();
    
    // Efeito de digitação (com delay para carregamento)
    setTimeout(typeWriterEffect, 1500);
});

// Performance: Debounce para scroll events
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

// Aplicar debounce aos eventos de scroll
const debouncedScrollHandler = debounce(() => {
    // Scroll handlers aqui
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Adicionar CSS para mensagens do formulário e scroll to top
const additionalStyles = `
.form-message {
    padding: 15px;
    border-radius: var(--border-radius);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: slideIn 0.3s ease;
}

.form-message.success {
    background: rgba(56, 161, 105, 0.1);
    border: 1px solid #38A169;
    color: #38A169;
}

.form-message.error {
    background: rgba(229, 62, 62, 0.1);
    border: 1px solid #E53E3E;
    color: #E53E3E;
}

.field-error {
    color: #E53E3E;
    font-size: 0.875rem;
    margin-top: 5px;
    display: block;
}

.scroll-to-top {
    position: fixed;
    bottom: 80px;
    right: 20px;
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
    box-shadow: var(--shadow-medium);
}

.scroll-to-top.visible {
    opacity: 1;
    visibility: visible;
}

.scroll-to-top:hover {
    background: var(--secondary-color);
    transform: translateY(-3px);
}

@keyframes slideIn {
    from {
        transform: translateY(-20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* Header scroll animations */
.header.scroll-down {
    transform: translateY(-100%);
}

.header.scroll-up {
    transform: translateY(0);
    box-shadow: var(--shadow-medium);
}

/* Mobile menu animation */
.hamburger.active .bar:nth-child(2) {
    opacity: 0;
}

.hamburger.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
}

.hamburger.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
}

/* Loading animation */
body:not(.loaded) * {
    animation-play-state: paused !important;
}

/* Hover effects para service cards */
.service-card:hover .service-icon {
    transform: scale(1.1) rotate(10deg);
}

.service-card:hover h3 {
    color: var(--primary-color);
}

/* Parallax container */
.parallax-container {
    overflow: hidden;
}

/* Lazy loading */
img.lazy {
    opacity: 0;
    transition: opacity 0.3s;
}

img:not(.lazy) {
    opacity: 1;
}
`;

// Adicionar estilos adicionais
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
