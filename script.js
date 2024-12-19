// Initialize AOS
AOS.init();

// Updated products array with descriptions instead of prices
const products = [
    {
        name: 'Cinta cubre cerco',
        image: 'img/cinta.png',
        description: 'Cinta de alta calidad para cubrir y proteger cercos, mejorando su apariencia y durabilidad.',
        type: 'product'
    },
    {
        name: 'Concertinas',
        image: 'img/concertinas.png',
        description: 'Alambre de seguridad en espiral, ideal para reforzar la protección en la parte superior de cercos y muros.',
        type: 'product'
    },
    {
        name: 'Mallas electrosoldadas',
        image: 'img/mallas.png',
        description: 'Mallas resistentes y duraderas, perfectas para cercos de seguridad en áreas industriales y residenciales.',
        type: 'product'
    },
    {
        name: 'Pinches de seguridad',
        image: 'img/pinches.png',
        description: 'Elementos disuasorios para la parte superior de muros y cercos, aumentando la seguridad perimetral.',
        type: 'product'
    },
    {
        name: 'Puertas y portones a medida',
        image: 'img/PORTONES.jpg''img/PUERTAS.jpg',
        description: 'Soluciones personalizadas para accesos seguros y estéticos, adaptadas a sus necesidades específicas.',
        type: 'product'
    },
    {
        name: 'Tejidos romboidales',
        image: 'img/romboidal.png',
        description: 'Malla versátil y económica, ideal para cercos residenciales y deportivos.',
        type: 'product'
    },
    {
        name: 'Tejido exagonal',
        image: 'img/hexagonal.png',
        description: 'Malla de diseño hexagonal, perfecta para cercos de jardín y contención de animales.',
        type: 'product'
    },
    {
        name: 'Tela mosquitera',
        image: 'img/mosquitero.png',
        description: 'Malla fina para protección contra insectos, ideal para ventanas y puertas.',
        type: 'product'
    },
    {
        name: 'Tela para cercos',
        image: 'img/tela.png',
        description: 'Tela resistente y duradera para cercos temporales o permanentes en construcciones y eventos.',
        type: 'product'
    },
    {
        name: 'Instalación de Cercos',
        image: 'img/instalacioncercos.jpg',
        description: 'Servicio profesional de instalación de cercos perimetrales para hogares, empresas e industrias.',
        type: 'service'
    },
    {
        name: 'Mantenimiento de Cercos',
        image: 'img/mantenimientocercos.jpg',
        description: 'Servicio de mantenimiento y reparación para mantener sus cercos en óptimas condiciones.',
        type: 'service'
    },
    {
        name: 'Asesoramiento Personalizado',
        image: 'img/atencionpersonalizada.jpg',
        description: 'Consultoría experta para ayudarle a elegir la mejor solución de cercado para su propiedad.',
        type: 'service'
    },
    {
        name: 'Accesorios para cercos',
        image: 'img/accesorios.jpg',
        description: 'Variedad de accesorios para complementar y mejorar sus cercos perimetrales.',
        type: 'product'
    },
    {
        name: 'Accesorios para piletas',
        image: 'img/accesorios pileta.jpg',
        description: 'Accesorios de alta calidad para el mantenimiento y seguridad de su piscina.',
        type: 'product'
    },
    {
        name: 'Cadenas y sogas',
        image: 'img/sogas.jpg',
        description: 'Amplia selección de cadenas y sogas para diversos usos en seguridad y construcción.',
        type: 'product'
    }
];

// Hero slider data
const heroSlides = [
    {
        image: 'img/hero.png',
        title: 'Expertos en Cercos Perimetrales',
        description: 'Protegemos su propiedad con soluciones de alta calidad'
    },
    {
        image: 'img/hero1.png',
        title: 'Seguridad y Estética',
        description: 'Diseños personalizados que se adaptan a su estilo'
    },
    {
        image: 'img/hero2.png',
        title: 'Servicio Profesional',
        description: 'Más de una década de experiencia a su servicio'
    }
];

// Initialize hero slider
let currentSlide = 0;
const heroSlider = document.getElementById('heroSlider');
const heroTitle = document.getElementById('heroTitle');
const heroDescription = document.getElementById('heroDescription');
const heroIndicators = document.getElementById('heroIndicators');

function updateHeroSlider() {
    heroSlider.style.backgroundImage = `url(${heroSlides[currentSlide].image})`;
    heroTitle.textContent = heroSlides[currentSlide].title;
    heroDescription.textContent = heroSlides[currentSlide].description;
    updateHeroIndicators();
}

function updateHeroIndicators() {
    heroIndicators.innerHTML = '';
    heroSlides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('w-3', 'h-3', 'rounded-full', 'bg-white', 'opacity-50', 'cursor-pointer');
        if (index === currentSlide) {
            indicator.classList.add('opacity-100', 'active');
        }
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateHeroSlider();
        });
        heroIndicators.appendChild(indicator);
    });
}

function nextHeroSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    updateHeroSlider();
}

updateHeroSlider();
setInterval(nextHeroSlide, 5000); // Cambia cada 5 segundos

// Initialize product slider
const productSlider = document.getElementById('productSlider');
const sliderLeft = document.getElementById('sliderLeft');
const sliderRight = document.getElementById('sliderRight');

function createProductCard(product) {
    const template = document.getElementById('productCardTemplate');
    const card = template.content.cloneNode(true);

    card.querySelector('img').src = product.image;
    card.querySelector('img').alt = product.name;
    card.querySelector('h3').textContent = product.name;
    card.querySelector('p').textContent = product.description;

    const button = card.querySelector('button');
    button.dataset.name = product.name;
    button.dataset.type = product.type;

    return card;
}

function populateProductSlider() {
    productSlider.innerHTML = '';
    products.forEach(product => {
        const card = createProductCard(product);
        productSlider.appendChild(card);
    });
}

populateProductSlider();

sliderLeft.addEventListener('click', () => {
    productSlider.scrollBy({ left: -300, behavior: 'smooth' });
});

sliderRight.addEventListener('click', () => {
    productSlider.scrollBy({ left: 300, behavior: 'smooth' });
});

// Product filtering
const filterAll = document.getElementById('filterAll');
const filterProducts = document.getElementById('filterProducts');
const filterServices = document.getElementById('filterServices');

filterAll.addEventListener('click', () => {
    populateProductSlider();
    updateFilterButtons(filterAll);
});

filterProducts.addEventListener('click', () => {
    const filteredProducts = products.filter(product => product.type === 'product');
    productSlider.innerHTML = '';
    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        productSlider.appendChild(card);
    });
    updateFilterButtons(filterProducts);
});

filterServices.addEventListener('click', () => {
    const filteredServices = products.filter(product => product.type === 'service');
    productSlider.innerHTML = '';
    filteredServices.forEach(service => {
        const card = createProductCard(service);
        productSlider.appendChild(card);
    });
    updateFilterButtons(filterServices);
});

function updateFilterButtons(activeButton) {
    [filterAll, filterProducts, filterServices].forEach(button => {
        button.classList.remove('bg-gradient', 'text-white');
        button.classList.add('bg-gray-200', 'text-gray-700');
    });
    activeButton.classList.remove('bg-gray-200', 'text-gray-700');
    activeButton.classList.add('bg-gradient', 'text-white');
}

// FAQ accordion
const faqButtons = document.querySelectorAll('#faq button');

faqButtons.forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        content.classList.toggle('hidden');
        const icon = button.querySelector('svg');
        icon.classList.toggle('rotate-180');
    });
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Floating cart functionality
const floatingCartButton = document.getElementById('floatingCartButton');
const floatingCart = document.getElementById('floatingCart');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const requestQuote = document.getElementById('requestQuote');

floatingCartButton.addEventListener('click', () => {
    floatingCart.classList.toggle('translate-x-full');
});

closeCart.addEventListener('click', () => {
    floatingCart.classList.add('translate-x-full');
});

// Update cart functionality to handle information requests and quantities
function addToCart(name, type, quantity) {
    const existingItem = Array.from(cartItems.children).find(item => item.dataset.name === name);

    if (existingItem) {
        const quantitySpan = existingItem.querySelector('.item-quantity');
        const currentQuantity = parseInt(quantitySpan.textContent);
        quantitySpan.textContent = currentQuantity + quantity;
    } else {
        const item = document.createElement('div');
        item.classList.add('flex', 'justify-between', 'items-center', 'mb-2');
        item.dataset.name = name;
        item.innerHTML = `
            <span>${name} <span class="item-quantity">${quantity}</span></span>
            <button class="text-red-500 hover:text-red-700">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(item);

        const removeButton = item.querySelector('button');
        removeButton.addEventListener('click', () => {
            cartItems.removeChild(item);
        });
    }
}

// Event delegation for add to cart buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const card = e.target.closest('.flex-shrink-0');
        const name = card.querySelector('h3').textContent;
        const type = e.target.dataset.type;
        const quantityInput = card.querySelector('.product-quantity');
        const quantity = parseInt(quantityInput.value);
        addToCart(name, type, quantity);
    }
});

requestQuote.addEventListener('click', () => {
    const items = Array.from(cartItems.children).map(item => {
        const name = item.firstElementChild.textContent.split(' ')[0];
        const quantity = item.querySelector('.item-quantity').textContent;
        return `${name} (${quantity})`;
    });
    const message = `Me interesa obtener más información sobre los siguientes productos/servicios:\n\n${items.join('\n')}`;
    window.open(`https://wa.me/543518047696?text=${encodeURIComponent(message)}`, '_blank');
});

// WhatsApp integration for contact form
function sendToWhatsApp(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const whatsappNumber = '543518047696';
    const whatsappMessage = `*Nuevo contacto desde web*%0A%0A*Nombre:* ${name}%0A*Email:* ${email}%0A*Mensaje:* ${message}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');

    // Reset form
    event.target.reset();
}

// Top banner slider
const bannerSlides = document.querySelectorAll('.banner-slide');
let currentBannerSlide = 0;

function showBannerSlide(index) {
    bannerSlides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('active');
            slide.style.display = 'flex';
        } else {
            slide.classList.remove('active');
            slide.style.display = 'none';
        }
    });
}

function nextBannerSlide() {
    currentBannerSlide = (currentBannerSlide + 1) % bannerSlides.length;
    showBannerSlide(currentBannerSlide);
}

showBannerSlide(currentBannerSlide);
setInterval(nextBannerSlide, 5000);

// Sticky header
const header = document.getElementById('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        header.style.top = '0';
    } else {
        header.style.top = '40px';
    }
    lastScrollTop = scrollTop;
});

