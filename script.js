document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init();

    // Preloader
    window.addEventListener('load', function() {
        document.querySelector('.preloader').style.display = 'none';
    });

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('bg-white', 'shadow-md');
        } else {
            header.classList.remove('bg-white', 'shadow-md');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Top banner slider
    const bannerSlides = document.querySelectorAll('.banner-slide');
    let currentBannerSlide = 0;
    function showNextBannerSlide() {
        bannerSlides[currentBannerSlide].classList.remove('active');
        currentBannerSlide = (currentBannerSlide + 1) % bannerSlides.length;
        bannerSlides[currentBannerSlide].classList.add('active');
    }
    setInterval(showNextBannerSlide, 5000);

    // Hero slider
    const heroSlider = document.getElementById('heroSlider');
    const heroTitle = document.getElementById('heroTitle');
    const heroDescription = document.getElementById('heroDescription');
    const heroIndicators = document.getElementById('heroIndicators');
    const heroSlides = [
        {
            image: 'https://via.placeholder.com/1920x1080',
            title: 'Expertos en Cercos Perimetrales',
            description: 'Protegemos lo que más valoras'
        },
        {
            image: 'https://via.placeholder.com/1920x1080',
            title: 'Soluciones de Seguridad a Medida',
            description: 'Diseñamos e instalamos cercos para todo tipo de propiedades'
        },
        {
            image: 'https://via.placeholder.com/1920x1080',
            title: 'Calidad y Durabilidad Garantizadas',
            description: 'Materiales de primera calidad y mano de obra especializada'
        }
    ];
    let currentHeroSlide = 0;
    function showHeroSlide(index) {
        heroSlider.style.backgroundImage = `url(${heroSlides[index].image})`;
        heroTitle.textContent = heroSlides[index].title;
        heroDescription.textContent = heroSlides[index].description;
        updateHeroIndicators();
    }
    function updateHeroIndicators() {
        heroIndicators.innerHTML = '';
        heroSlides.forEach((slide, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('w-3', 'h-3', 'rounded-full', 'bg-white', 'opacity-50', 'cursor-pointer');
            if (index === currentHeroSlide) {
                indicator.classList.remove('opacity-50');
                indicator.classList.add('opacity-100');
            }
            indicator.addEventListener('click', () => {
                currentHeroSlide = index;
                showHeroSlide(currentHeroSlide);
            });
            heroIndicators.appendChild(indicator);
        });
    }
    function showNextHeroSlide() {
        currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
        showHeroSlide(currentHeroSlide);
    }
    showHeroSlide(currentHeroSlide);
    setInterval(showNextHeroSlide, 5000);

    // Product slider
    const productSlider = document.getElementById('productSlider');
    const sliderLeft = document.getElementById('sliderLeft');
    const sliderRight = document.getElementById('sliderRight');
    const products = [
        { name: 'Cerco Olímpico', image: 'https://via.placeholder.com/300x200', price: '$XXX', type: 'product' },
        { name: 'Cerco Romboidal', image: 'https://via.placeholder.com/300x200', price: '$XXX', type: 'product' },
        { name: 'Cerco Eléctrico', image: 'https://via.placeholder.com/300x200', price: '$XXX', type: 'product' },
        { name: 'Cinta Cubre Cerco', image: 'https://via.placeholder.com/300x200', price: '$XXX', type: 'product' },
        { name: 'Concertinas', image: 'https://via.placeholder.com/300x200', price: '$XXX', type: 'product' },
        { name: 'Instalación', image: 'https://via.placeholder.com/300x200', price: 'Consultar', type: 'service' },
        { name: 'Mantenimiento', image: 'https://via.placeholder.com/300x200', price: 'Consultar', type: 'service' }
    ];
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover">
            <div class="p-4">
                <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
                <p class="text-gray-600">${product.price}</p>
                <button class="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors add-to-cart" data-name="${product.name}" data-price="${product.price}">
                    ${product.type === 'product' ? 'Agregar al carrito' : 'Solicitar'}
                </button>
            </div>
        `;
        return card;
    }
    products.forEach(product => {
        productSlider.appendChild(createProductCard(product));
    });
    sliderLeft.addEventListener('click', () => {
        productSlider.scrollBy({ left: -300, behavior: 'smooth' });
    });
    sliderRight.addEventListener('click', () => {
        productSlider.scrollBy({ left: 300, behavior: 'smooth' });
    });

    // Product filter
    const filterAll = document.getElementById('filterAll');
    const filterProducts = document.getElementById('filterProducts');
    const filterServices = document.getElementById('filterServices');
    const productCards = productSlider.querySelectorAll('.flex-shrink-0');
    function filterItems(type) {
        productCards.forEach(card => {
            if (type === 'all' || card.querySelector('button').dataset.name.toLowerCase().includes(type)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    filterAll.addEventListener('click', () => filterItems('all'));
    filterProducts.addEventListener('click', () => filterItems('product'));
    filterServices.addEventListener('click', () => filterItems('service'));

    // FAQ accordion
    const faqButtons = document.querySelectorAll('#faq button');
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            content.classList.toggle('hidden');
            button.querySelector('svg').classList.toggle('rotate-180');
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to your server
        alert('Gracias por su mensaje. Nos pondremos en contacto pronto.');
        contactForm.reset();
    });

    // Floating cart functionality
    const floatingCartButton = document.getElementById('floatingCartButton');
    const floatingCart = document.getElementById('floatingCart');
    const closeCart = document.getElementById('closeCart');
    const cartItems = document.getElementById('cartItems');
    const cartItemCount = document.getElementById('cartItemCount');
    const requestQuote = document.getElementById('requestQuote');
    let cart = [];

    floatingCartButton.addEventListener('click', () => {
        floatingCart.classList.toggle('translate-x-full');
    });

    closeCart.addEventListener('click', () => {
        floatingCart.classList.add('translate-x-full');
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const name = e.target.dataset.name;
            const price = e.target.dataset.price;
            addToCart(name, price);
        }
    });

    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCart();
    }

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'flex justify-between items-center mb-2';
            itemElement.innerHTML = `
                <span>${item.name} x${item.quantity}</span>
                <span>${item.price}</span>
            `;
            cartItems.appendChild(itemElement);
            if (item.price !== 'Consultar') {
                total += parseFloat(item.price.replace('$', '')) * item.quantity;
            }
        });
        const totalElement = document.createElement('div');
        totalElement.className = 'font-bold mt-4';
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
        cartItems.appendChild(totalElement);
        cartItemCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    requestQuote.addEventListener('click', () => {
        // Here you would typically send the cart data to your server or open a quote form
        alert('Gracias por su interés. Nos pondremos en contacto para proporcionarle un presupuesto detallado.');
        cart = [];
        updateCart();
        floatingCart.classList.add('translate-x-full');
    });
});