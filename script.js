// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Header scroll effect
const header = document.getElementById('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    if (scrollTop > 100) {
        header.classList.add('bg-white', 'shadow-md');
    } else {
        header.classList.remove('bg-white', 'shadow-md');
    }
    
    lastScrollTop = scrollTop;
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Hero Slider
const heroSlider = document.getElementById('heroSlider');
const heroTitle = document.getElementById('heroTitle');
const heroDescription = document.getElementById('heroDescription');
const heroIndicators = document.getElementById('heroIndicators');

const heroSlides = [
    {
        image: 'https://via.placeholder.com/1920x1080',
        title: 'Expertos en Cercos Perimetrales',
        description: 'Protegemos su propiedad con soluciones de alta calidad'
    },
    {
        image: 'https://via.placeholder.com/1920x1080',
        title: 'Seguridad y Estética',
        description: 'Diseños personalizados para cada necesidad'
    },
    {
        image: 'https://via.placeholder.com/1920x1080',
        title: 'Servicio Profesional',
        description: 'Más de 10 años de experiencia en el mercado'
    }
];

let currentHeroSlide = 0;

function createHeroSlides() {
    heroSlides.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.classList.add('hero-slide', 'absolute', 'inset-0', 'opacity-0', 'transition-opacity', 'duration-1000', 'ease-in-out');
        slideDiv.style.backgroundImage = `url(${slide.image})`;
        heroSlider.appendChild(slideDiv);

        const indicator = document.createElement('div');
        indicator.classList.add('w-3', 'h-3', 'rounded-full', 'bg-white', 'opacity-50', 'cursor-pointer');
        indicator.addEventListener('click', () => showHeroSlide(index));
        heroIndicators.appendChild(indicator);
    });
}

function showHeroSlide(index) {
    const slides = heroSlider.querySelectorAll('.hero-slide');
    const indicators = heroIndicators.querySelectorAll('div');

    slides[currentHeroSlide].classList.remove('opacity-100');
    indicators[currentHeroSlide].classList.remove('opacity-100');

    currentHeroSlide = index;

    slides[currentHeroSlide].classList.add('opacity-100');
    indicators[currentHeroSlide].classList.add('opacity-100');

    heroTitle.textContent = heroSlides[currentHeroSlide].title;
    heroDescription.textContent = heroSlides[currentHeroSlide].description;
}

function nextHeroSlide() {
    showHeroSlide((currentHeroSlide + 1) % heroSlides.length);
}

createHeroSlides();
showHeroSlide(0);
setInterval(nextHeroSlide, 5000);

// Top Banner
const topBanner = document.getElementById('topBanner');
const bannerSlides = topBanner.querySelectorAll('.banner-slide');
let currentBannerSlide = 0;

function showBannerSlide(index) {
    bannerSlides[currentBannerSlide].classList.remove('active');
    currentBannerSlide = index;
    bannerSlides[currentBannerSlide].classList.add('active');
}

function nextBannerSlide() {
    showBannerSlide((currentBannerSlide + 1) % bannerSlides.length);
}

setInterval(nextBannerSlide, 5000);

// Products and Services
const products = [
    { id: 1, name: "Cinta cubre cerco", description: "Protección y estética para su cerco", image: "https://via.placeholder.com/300x200", type: "product" },
    { id: 2, name: "Concertinas", description: "Máxima seguridad perimetral", image: "https://via.placeholder.com/300x200", type: "product" },
    { id: 3, name: "Mallas electrosoldadas", description: "Resistencia y durabilidad garantizada", image: "https://via.placeholder.com/300x200", type: "product" },
    { id: 4, name: "Pinches de seguridad", description: "Protección adicional para muros", image: "https://via.placeholder.com/300x200", type: "product" },
    { id: 5, name: "Puertas y portones a medidas", description: "Soluciones personalizadas", image: "https://via.placeholder.com/300x200", type: "product" },
    { id: 6, name: "Tejidos romboidales", description: "Cercado clásico y resistente", image: "https://via.placeholder.com/300x200", type: "product" },
    { id: 7, name: "Tejido exagonal", description: "Versatilidad y protección", image: "https://via.placeholder.com/300x200", type: "product" },
    { id: 8, name: "Tela mosquitera", description: "Protección contra insectos", image: "https://via.placeholder.com/300x200", type: "product" },
    { id: 9, name: "Tela para cercos", description: "Privacidad y seguridad", image: "https://via.placeholder.com/300x200", type: "product" },
    { id: 10, name: "Instalación de cercos", description: "Servicio profesional de instalación", image: "https://via.placeholder.com/300x200", type: "service" },
    { id: 11, name: "Mantenimiento de cercos", description: "Cuidado y reparación de cercos existentes", image: "https://via.placeholder.com/300x200", type: "service" },
    { id: 12, name: "Asesoramiento personalizado", description: "Consultoría experta para su proyecto", image: "https://via.placeholder.com/300x200", type: "service" },
];

const productSlider = document.getElementById('productSlider');
const sliderLeft = document.getElementById('sliderLeft');
const sliderRight = document.getElementById('sliderRight');
const filterAll = document.getElementById('filterAll');
const filterProducts = document.getElementById('filterProducts');
const filterServices = document.getElementById('filterServices');

function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('flex-shrink-0', 'w-64', 'bg-white', 'rounded-lg', 'shadow-md', 'overflow-hidden');
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover">
        <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
            <p class="text-gray-600 mb-4">${product.description}</p>
            <button class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors add-to-cart" data-id="${product.id}">
                Agregar al carrito
            </button>
        </div>
    `;
    return card;
}

function renderProducts(filteredProducts = products) {
    productSlider.innerHTML = '';
    filteredProducts.forEach(product => {
        productSlider.appendChild(createProductCard(product));
    });
}

renderProducts();

sliderLeft.addEventListener('click', () => {
    productSlider.scrollBy({ left: -300, behavior: 'smooth' });
});

sliderRight.addEventListener('click', () => {
    productSlider.scrollBy({ left: 300, behavior: 'smooth' });
});

filterAll.addEventListener('click', () => {
    filterAll.classList.add('bg-red-600', 'text-white');
    filterProducts.classList.remove('bg-red-600', 'text-white');
    filterServices.classList.remove('bg-red-600', 'text-white');
    renderProducts();
});

filterProducts.addEventListener('click', () => {
    filterAll.classList.remove('bg-red-600', 'text-white');
    filterProducts.classList.add('bg-red-600', 'text-white');
    filterServices.classList.remove('bg-red-600', 'text-white');
    renderProducts(products.filter(p => p.type === 'product'));
});

filterServices.addEventListener('click', () => {
    filterAll.classList.remove('bg-red-600', 'text-white');
    filterProducts.classList.remove('bg-red-600', 'text-white');
    filterServices.classList.add('bg-red-600', 'text-white');
    renderProducts(products.filter(p => p.type === 'service'));
});

// FAQ Accordion
const faqButtons = document.querySelectorAll('#faq button');

faqButtons.forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        content.classList.toggle('hidden');
        const icon = button.querySelector('svg');
        icon.classList.toggle('rotate-180');
    });
});

// Floating Cart
const floatingCart = document.getElementById('floatingCart');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const requestQuote = document.getElementById('requestQuote');

let cart = [];

function updateCart() {
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('flex', 'justify-between', 'items-center', 'mb-2');
        itemElement.innerHTML = `
            <span>${item.name}</span>
            <button class="text-red-600 remove-from-cart" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(itemElement);
    });

    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            cart = cart.filter(item => item.id !== id);
            updateCart();
        });
    });
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(p => p.id === id);
        if (product && !cart.some(item => item.id === id)) {
            cart.push(product);
            updateCart();
            floatingCart.classList.remove('translate-x-full');
        }
    }
});

closeCart.addEventListener('click', () => {
    floatingCart.classList.add('translate-x-full');
});

requestQuote.addEventListener('click', () => {
    if (cart.length > 0) {
        const message = `Hola, me gustaría solicitar un presupuesto para los siguientes productos:\n\n${cart.map(item => item.name).join('\n')}`;
        const whatsappLink = `https://wa.me/543518047696?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    } else {
        alert('Por favor, agregue productos al carrito antes de solicitar un presupuesto.');
    }
});

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const whatsappMessage = `Nombre: ${name}%0AEmail: ${email}%0AMensaje: ${message}`;
    const whatsappLink = `https://wa.me/543518047696?text=${whatsappMessage}`;
    window.open(whatsappLink, '_blank');

    contactForm.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});