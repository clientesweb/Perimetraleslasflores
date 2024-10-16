// Data
const heroSlides = [
    { image: "https://via.placeholder.com/1920x1080", title: "Seguridad para su hogar", description: "Proteja su propiedad con nuestros cercos de alta calidad" },
    { image: "https://via.placeholder.com/1920x1080", title: "Soluciones industriales", description: "Cercos resistentes para grandes áreas industriales" },
    { image: "https://via.placeholder.com/1920x1080", title: "Instalación profesional", description: "Nuestro equipo experto garantiza una instalación perfecta" },
];

const products = [
    { id: 1, name: "Cerco Olímpico", description: "Ideal para grandes perímetros", category: 'product', image: "https://via.placeholder.com/300x200" },
    { id: 2, name: "Cerco Romboidal", description: "Perfecto para áreas residenciales", category: 'product', image: "https://via.placeholder.com/300x200" },
    { id: 3, name: "Cerco Eléctrico", description: "Máxima seguridad para su propiedad", category: 'product', image: "https://via.placeholder.com/300x200" },
    { id: 4, name: "Portón Automático", description: "Comodidad y seguridad en su entrada", category: 'product', image: "https://via.placeholder.com/300x200" },
    { id: 5, name: "Concertina", description: "Protección adicional para muros", category: 'product', image: "https://via.placeholder.com/300x200" },
    { id: 6, name: "Instalación Estándar", description: "Servicio de instalación profesional", category: 'service', image: "https://via.placeholder.com/300x200" },
    { id: 7, name: "Mantenimiento de Cercos", description: "Servicio de mantenimiento periódico", category: 'service', image: "https://via.placeholder.com/300x200" },
    { id: 8, name: "Reparación de Cercos", description: "Soluciones rápidas y efectivas", category: 'service', image: "https://via.placeholder.com/300x200" },
];

// State
let currentSlide = 0;
let cart = [];
let currentFilter = 'all';

// DOM Elements
const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const heroSlider = document.getElementById('heroSlider');
const heroTitle = document.getElementById('heroTitle');
const heroDescription = document.getElementById('heroDescription');
const heroIndicators = document.getElementById('heroIndicators');
const productSlider = document.getElementById('productSlider');
const sliderLeft = document.getElementById('sliderLeft');
const sliderRight = document.getElementById('sliderRight');
const filterAll = document.getElementById('filterAll');
const filterProducts = document.getElementById('filterProducts');
const filterServices = document.getElementById('filterServices');
const floatingCart = document.getElementById('floatingCart');
const cartItems = document.getElementById('cartItems');
const cartButton = document.getElementById('cartButton');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const requestQuote = document.getElementById('requestQuote');
const contactForm = document.getElementById('contactForm');
const faqButtons = document.querySelectorAll('#faq button');

// Functions
function updateHeroSlide() {
    heroSlider.innerHTML = '';
    const slide = document.createElement('div');
    slide.className = 'hero-slide absolute inset-0 hero-image';
    slide.style.backgroundImage = `url(${heroSlides[currentSlide].image})`;
    heroSlider.appendChild(slide);
    heroTitle.textContent = heroSlides[currentSlide].title;
    heroDescription.textContent = heroSlides[currentSlide].description;
    updateHeroIndicators();
}

function updateHeroIndicators() {
    heroIndicators.innerHTML = '';
    heroSlides.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.className = `w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-400'}`;
        indicator.onclick = () => {
            currentSlide = index;
            updateHeroSlide();
        };
        heroIndicators.appendChild(indicator);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1)  % heroSlides.length;
    updateHeroSlide();
}

function renderProducts() {
    productSlider.innerHTML = '';
    const filteredProducts = currentFilter === 'all' ? products : products.filter(p => p.category === currentFilter);
    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'bg-gray-100 p-6 rounded-lg shadow-md flex-shrink-0 w-72';
        productElement.setAttribute('data-aos', 'fade-up');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover rounded-lg mb-4">
            <h3 class="text-xl font-semibold mb-2">${product.name}</h3>
            <p class="mb-4">${product.description}</p>
            <button class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors flex items-center add-to-cart" data-id="${product.id}">
                <i class="fas fa-plus mr-2"></i>
                Agregar al carrito
            </button>
        `;
        productSlider.appendChild(productElement);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.product.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ product, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    updateCart();
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.product.id === productId);
    if (item) {
        if (newQuantity < 1) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
        }
        updateCart();
    }
}

function updateCart() {
    cartItems.innerHTML = '';
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Su carrito está vacío.</p>';
        requestQuote.style.display = 'none';
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'flex items-center justify-between py-2 border-b';
            itemElement.innerHTML = `
                <div>
                    <h4 class="font-semibold">${item.product.name}</h4>
                    <div class="flex items-center mt-1">
                        <button class="text-gray-500 hover:text-red-600 update-quantity" data-id="${item.product.id}" data-action="decrease">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="text-gray-500 hover:text-red-600 update-quantity" data-id="${item.product.id}" data-action="increase">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <button class="text-gray-500 hover:text-red-600 remove-from-cart" data-id="${item.product.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartItems.appendChild(itemElement);
        });
        requestQuote.style.display = 'block';
    }
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

function requestQuoteViaWhatsApp() {
    const message = cart.map(item => `${item.quantity}x ${item.product.name}`).join('\n');
    const encodedMessage = encodeURIComponent(`Hola, me gustaría solicitar un presupuesto para:\n\n${message}`);
    window.open(`https://wa.me/543518047696?text=${encodedMessage}`, '_blank');
}

function updateFilterButtons() {
    [filterAll, filterProducts, filterServices].forEach(button => {
        button.classList.remove('bg-red-600', 'text-white', 'bg-gray-200');
        button.classList.add('bg-gray-200');
    });
    const activeButton = currentFilter === 'all' ? filterAll : 
                         currentFilter === 'product' ? filterProducts : filterServices;
    activeButton.classList.remove('bg-gray-200');
    activeButton.classList.add('bg-red-600', 'text-white');
}

// Event Listeners
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('bg-white', 'shadow-md');
    } else {
        header.classList.remove('bg-white', 'shadow-md');
    }
});

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

sliderLeft.addEventListener('click', () => {
    productSlider.scrollBy({ left: -300, behavior: 'smooth' });
});

sliderRight.addEventListener('click', () => {
    productSlider.scrollBy({ left: 300, behavior: 'smooth' });
});

filterAll.addEventListener('click', () => {
    currentFilter = 'all';
    renderProducts();
    updateFilterButtons();
});

filterProducts.addEventListener('click', () => {
    currentFilter = 'product';
    renderProducts();
    updateFilterButtons();
});

filterServices.addEventListener('click', () => {
    currentFilter = 'service';
    renderProducts();
    updateFilterButtons();
});

productSlider.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.dataset.id);
        addToCart(productId);
    }
});

cartButton.addEventListener('click', () => {
    floatingCart.classList.toggle('translate-x-full');
});

closeCart.addEventListener('click', () => {
    floatingCart.classList.add('translate-x-full');
});

cartItems.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-from-cart')) {
        const productId = parseInt(e.target.dataset.id);
        removeFromCart(productId);
    } else if (e.target.classList.contains('update-quantity')) {
        const productId = parseInt(e.target.dataset.id);
        const action = e.target.dataset.action;
        const item = cart.find(item => item.product.id === productId);
        if (item) {
            updateQuantity(productId, action === 'increase' ? item.quantity + 1 : item.quantity - 1);
        }
    }
});

requestQuote.addEventListener('click', requestQuoteViaWhatsApp);

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    alert('Formulario enviado. Nos pondremos en contacto pronto.');
    contactForm.reset();
});

faqButtons.forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        const icon = button.querySelector('svg');
        answer.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
    });
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 200,
    });
    updateHeroSlide();
    setInterval(nextSlide, 5000);
    renderProducts();
    updateCart();
});