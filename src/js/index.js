document.addEventListener('DOMContentLoaded', () => {
    
    // 1. AOS INIT
    if (typeof AOS !== 'undefined') AOS.init({ once: true, duration: 1000, easing: 'ease-out-cubic' });

    // 2. LUCIDE INIT
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // 3. SWIPER INIT
    let swiper;
    if (document.querySelector('.portfolioSwiper')) {
        swiper = new Swiper('.portfolioSwiper', {
            slidesPerView: 1, spaceBetween: 24, loop: false,
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
        });
    }

    // 4. PORTFOLIO FILTER
    window.filterPortfolio = (category, button) => {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        if (button) button.classList.add('active');
        const slides = document.querySelectorAll('.portfolioSwiper .swiper-slide');
        slides.forEach(slide => {
            const cat = slide.getAttribute('data-category');
            slide.style.opacity = '0'; slide.style.transform = 'scale(0.95)';
            setTimeout(() => {
                if (category === 'all' || cat === category) {
                    slide.style.display = 'block';
                    setTimeout(() => { slide.style.opacity = '1'; slide.style.transform = 'scale(1)'; }, 50);
                } else { slide.style.display = 'none'; }
                if (swiper) { swiper.update(); swiper.slideTo(0); }
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }, 300);
        });
    };

    // 5. FAQ TOGGLE (PILL STYLE)
    window.toggleFaq = (button) => {
        const item = button.parentElement;
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(other => {
            if (other !== item) {
                other.classList.remove('active');
                other.querySelector('.faq-answer').style.maxHeight = '0';
                const otherIcon = other.querySelector('.faq-icon');
                if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                other.style.backgroundColor = "#f4f7ff";
                other.style.borderColor = "transparent";
            }
        });
        if (isActive) {
            item.classList.remove('active'); answer.style.maxHeight = '0';
            icon.style.transform = 'rotate(0deg)'; item.style.backgroundColor = "#f4f7ff";
        } else {
            item.classList.add('active'); answer.style.maxHeight = answer.scrollHeight + "px";
            icon.style.transform = 'rotate(45deg)'; item.style.backgroundColor = "#ffffff";
            item.style.borderColor = "#e2e8f0";
        }
    };

    // 6. NAVBAR & MOBILE MENU
    const navbar = document.querySelector('nav');
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) { navbar.classList.add('py-1', 'shadow-md', 'bg-white/95'); navbar.classList.remove('py-2'); }
            else { navbar.classList.remove('py-1', 'shadow-md', 'bg-white/95'); navbar.classList.add('py-2'); }
        });
    }
    if (mobileMenu) {
        const toggleMenu = () => { mobileMenu.classList.toggle('translate-x-full'); document.body.style.overflow = mobileMenu.classList.contains('translate-x-full') ? 'auto' : 'hidden'; };
        if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
        if (menuClose) menuClose.addEventListener('click', toggleMenu);
        document.querySelectorAll('.mobile-link').forEach(link => link.addEventListener('click', toggleMenu));
    }
});
setTimeout(() => { if (typeof lucide !== 'undefined') lucide.createIcons(); }, 700);