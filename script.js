document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init();

    // Preloader
    window.addEventListener('load', function() {
        document.querySelector('.preloader').style.display = 'none';
    });

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('bg-white', 'shadow-md');
        } else {
            header.classList.remove('bg-white', 'shadow-md');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

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

    let currentSlide = 0;

    function showSlide(index) {
        const slide = heroSlides[index];
        heroSlider.style.backgroundImage = `url(${slide.image})`;
        heroTitle.textContent = slide.title;
        heroDescription.textContent = slide.description;

        // Update indicators
        const indicators = heroIndicators.querySelectorAll('div');
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('bg-white');
                indicator.classList.remove('bg-gray-400');
            } else {
                indicator.classList.remove('bg-white');
                indicator.classList.add('bg-gray-400');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(currentSlide);
    }

    // Create indicators
    heroSlides.forEach((_, i) => {
        const indicator = document.createElement('div');
        indicator.classList.add('w-3', 'h-3', 'rounded-full', 'bg-gray-400', 'cursor-pointer');
        indicator.addEventListener('click', () => showSlide(i));
        heroIndicators.appendChild(indicator);
    });

    showSlide(0);
    setInterval(nextSlide, 5000);

    // Top banner
    const topBanner = document.getElementById('topBanner');
    const bannerSlides = topBanner.querySelectorAll('.banner-slide');
    let currentBannerSlide = 0;

    function showBannerSlide(index) {
        bannerSlides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    function nextBannerSlide() {
        currentBannerSlide = (currentBannerSlide + 1) % bannerSlides.length;
        showBannerSlide(currentBannerSlide);
    }

    showBannerSlide(0);
    setInterval(nextBannerSlide, 5000);

    // Products and Services
    const productSlider = document.getElementById('productSlider');
    const products = [
        { name: 'Cinta cubre cerco', type: 'product', description: 'Protección y estética para su cerco', image: 'https://via.placeholder.com/300x200', details: 'Nuestra cinta cubre cerco ofrece una solución elegante y duradera para mejorar la apariencia de su cerco existente. Disponible en varios colores y diseños para adaptarse a cualquier estilo de propiedad.' },
        { name: 'Concertinas', type: 'product', description: 'Máxima seguridad perimetral', image: 'https://via.placeholder.com/300x200', details: 'Las concertinas proporcionan un nivel adicional de seguridad para su perímetro. Fabricadas con acero de alta calidad y diseñadas para una instalación fácil y efectiva.' },
        { name: 'Mallas electrosoldadas', type: 'product', description: 'Resistencia y durabilidad garantizada', image: 'https://via.placeholder.com/300x200', details: 'Nuestras mallas electrosoldadas ofrecen una solución robusta y duradera para cercos industriales y residenciales. Resistentes a la corrosión y disponibles en varios tamaños de malla.' },
        { name: 'Pinches de seguridad', type: 'product', description: 'Protección adicional para muros', image: 'https://via.placeholder.com/300x200', details: 'Los pinches de seguridad son una excelente opción para aumentar la protección de muros y cercos existentes. Fabricados con materiales de alta calidad para una larga vida útil.' },
        { name: 'Puertas y portones a medida', type: 'product', description: 'Soluciones personalizadas', image: 'https://via.placeholder.com/300x200', details: 'Diseñamos y fabricamos puertas y portones a medida para adaptarse perfectamente a sus necesidades. Disponibles en una variedad de estilos y materiales.' },
        { name: 'Instalación de cercos', type: 'service', description: 'Servicio profesional y eficiente', image: 'https://via.placeholder.com/300x200', details: 'Nuestro equipo de expertos se encarga de la instalación completa de su cerco, garantizando un trabajo de calidad y terminado en tiempo y forma.' },
        { name: 'Mantenimiento de cercos', type: 'service', description: 'Cuidado continuo para su inversión', image: 'https://via.placeholder.com/300x200', details: 'Ofrecemos servicios de mantenimiento regular para mantener su cerco en óptimas condiciones, prolongando su vida útil y preservando su apariencia.' },
        { name: 'Asesoramiento personalizado', type: 'service', description: 'Expertos a su disposición', image: 'https://via.placeholder.com/300x200', details: 'Nuestro equipo de asesores está disponible para ayudarle a elegir la mejor solución de cercado para su propiedad, considerando sus necesidades específicas y presupuesto.' },
        { name: 'Reparación de cercos', type: 'service', description: 'Soluciones rápidas y efectivas', image: 'https://via.placeholder.com/300x200', details: 'Contamos con un servicio de reparación rápida para cualquier tipo de daño en su cerco, asegurando que su propiedad permanezca segura en todo momento.' },
    ];

    function renderProducts(filter = 'all') {
        productSlider.innerHTML = '';
        products.forEach(product => {
            if (filter === 'all' || product.type === filter) {
                const productElement = document.createElement('div');
                productElement.className = 'bg-white rounded-lg shadow-md overflow-hidden';
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h3 class="text-xl font-semibold mb-2">${product.name}</h3>
                        <p class="text-gray-600 mb-4">${product.description}</p>
                        <button class="bg-gradient-red text-white px-4 py-2 rounded hover:bg-red-700 transition-colors ver-mas" data-product="${product.name}">Ver más</button>
                    </div>
                `;
                productSlider.appendChild(productElement);
            }
        });

        // Add event listeners to "Ver más" buttons
        document.querySelectorAll('.ver-mas').forEach(button => {
            button.addEventListener('click', function() {
                const productName = this.getAttribute('data-product');
                const product = products.find(p => p.name === productName);
                showProductModal(product);
            });
        });
    }

    renderProducts();

    // Filter buttons
    document.getElementById('filterAll').addEventListener('click', () => renderProducts('all'));
    document.getElementById('filterProducts').addEventListener('click', () => renderProducts('product'));
    document.getElementById('filterServices').addEventListener('click', () => renderProducts('service'));

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

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Gracias por su mensaje. Nos pondremos en contacto pronto.');
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

    // Product Modal
    const modal = document.getElementById('productModal');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.getElementById('closeModal');

    function showProductModal(product) {
        modalDescription.innerHTML = `
            <h4 class="text-lg font-semibold mb-2">${product.name}</h4>
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover mb-4">
            <p>${product.details}</p>
        `;
        modal.classList.remove('hidden');
    }

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
});