// DATA PRODUK (Harga sudah disesuaikan)
const products = [
    { id: 1, title: "Website Company Profile", description: "Website profesional untuk citra bisnis.", image: "images/product-1.jpg", price: "Mulai Rp 500 Ribu" },
    { id: 2, title: "Landing Page", description: "Halaman promosi konversi tinggi.", image: "images/product-2.jpg", price: "Mulai Rp 300 Ribu" },
    { id: 3, title: "Aplikasi Kasir", description: "Sistem POS modern untuk bisnis.", image: "images/product-3.jpg", price: "Mulai Rp 300 Ribu" },
    { id: 4, title: "Sistem Manajemen Bisnis", description: "Platform terintegrasi operasional.", image: "images/product-4.jpg", price: "Mulai Rp 300 Ribu" },
    { id: 5, title: "Website Toko Online", description: "E-commerce lengkap untuk jualan.", image: "images/product-5.jpg", price: "Mulai Rp 500 Ribu" },
    { id: 6, title: "Aplikasi Mobile", description: "Aplikasi Android & iOS.", image: "images/product-6.jpg", price: "Mulai Rp 500 Ribu" },
    { id: 7, title: "Sistem Inventory", description: "Manajemen stok berbasis cloud.", image: "images/product-7.jpg", price: "Mulai Rp 300 Ribu" },
    { id: 8, title: "CRM System", description: "Kelola hubungan pelanggan.", image: "images/product-8.jpg", price: "Mulai Rp 300 Ribu" },
    { id: 9, title: "Booking System", description: "Sistem reservasi online.", image: "images/product-9.jpg", price: "Mulai Rp 300 Ribu" },
    { id: 10, title: "Custom Development", description: "Solusi sesuai kebutuhan spesifik.", image: "images/product-10.jpg", price: "Konsultasi" }
];

const portfolio = [
    { id: 1, title: "Dashboard Fintech", client: "PT. FinTech Indonesia", description: "Platform analitik real-time.", image: "images/portfolio-1.jpg" },
    { id: 2, title: "E-Commerce Fashion", client: "Fashion House ID", description: "Toko online premium.", image: "images/portfolio-2.jpg" }
];

const team = [
    { name: "Alexander Zheng", role: "Founder & CEO", image: "images/team-1.jpg" },
    { name: "Sarah Wijaya", role: "Lead Developer", image: "images/team-2.jpg" },
    { name: "Michael Pratama", role: "Design Director", image: "images/team-3.jpg" }
];

// CHATBOT AI
const responses = {
    greetings: ["halo", "hai", "hi", "hello", "hey", "selamat"],
    products: ["produk", "layanan", "jasa", "tersedia"],
    prices: ["harga", "biaya", "berapa", "price"],
    contact: ["kontak", "hubungi", "wa", "whatsapp"],
    portfolio: ["portfolio", "project", "contoh"],
    time: ["waktu", "lama", "selesai"],
    location: ["alamat", "kantor", "dimana"],
    thanks: ["terima kasih", "makasih", "thanks"]
};
const answers = {
    greetings: "Halo! Selamat datang di Zheng Digital Lab. Ada yang bisa saya bantu?",
    products: "Kami menyediakan jasa pembuatan Website, Aplikasi Mobile, dan Sistem Bisnis. Mau info yang mana?",
    prices: "Harga kami sangat kompetitif! Website mulai 500rb, Aplikasi mulai 500rb, dan sistem lainnya mulai 300rb. Tertarik yang mana?",
    contact: "Anda bisa hubungi kami via WhatsApp di +62 812-3456-7890 atau email info@zhengdigitallab.com",
    portfolio: "Kami telah menyelesaikan 150+ project. Silakan cek halaman Portfolio untuk contoh karya.",
    time: "Waktu pengerjaan cepat! Landing page 3-7 hari, Website 7-14 hari, Aplikasi 1-3 bulan.",
    location: "Kantor kami di Jl. Teknologi Digital No. 123, Jakarta Selatan.",
    thanks: "Sama-sama! Senang bisa membantu. Jangan ragu untuk bertanya lagi."
};

// INIT
document.addEventListener('DOMContentLoaded', () => {
    initLoading();
    initNav();
    renderProducts();
    renderPortfolio();
    renderTeam();
    initChatbot();
    handleForm();
    initReveal();
});

function initLoading() {
    const el = document.getElementById('loading-screen');
    if (el) setTimeout(() => el.classList.add('hidden'), 2500);
}
function initNav() {
    const nav = document.getElementById('navbar');
    const ham = document.getElementById('hamburger');
    const menu = document.getElementById('mobileMenu');
    
    window.addEventListener('scroll', () => nav && nav.classList.toggle('scrolled', window.scrollY > 50));
    ham && ham.addEventListener('click', () => { ham.classList.toggle('active'); menu && menu.classList.toggle('active'); });
}
function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.1 });
    reveals.forEach(el => obs.observe(el));
    
    // Counter
    document.querySelectorAll('.counter-number').forEach(c => {
        const obs2 = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                let target = +c.dataset.target;
                let suffix = c.dataset.suffix || '+';
                let curr = 0;
                let inc = target / 60;
                let timer = setInterval(() => {
                    curr += inc;
                    curr >= target ? (c.textContent = target + suffix, clearInterval(timer)) : c.textContent = Math.floor(curr);
                }, 33);
                obs2.unobserve(c);
            }
        }, {threshold: 0.5});
        obs2.observe(c);
    });
}

// RENDER
function renderProducts() {
    const grid = document.getElementById('products-grid');
    if(!grid) return;
    grid.innerHTML = products.map((p, i) => `
        <div class="product-card reveal" style="transition-delay: ${i*0.05}s">
            <img src="${p.image}" alt="${p.title}" class="product-image" onerror="this.src='https://via.placeholder.com/400x200/0a0a12/00d4ff?text=Product'">
            <div class="product-overlay"></div>
            <div class="relative p-4">
                <h3 class="font-display text-sm font-bold mb-1">${p.title}</h3>
                <p class="text-gray-400 text-xs mb-2">${p.description}</p>
                <p class="text-xs font-bold mb-3" style="color:var(--accent)">${p.price}</p>
                <a href="https://wa.me/6281234567890?text=Halo, saya tertarik dengan ${encodeURIComponent(p.title)}" target="_blank" class="cta-btn text-xs py-2 px-3">Detail</a>
            </div>
        </div>
    `).join('');
}
function renderPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    if(!grid) return;
    grid.innerHTML = portfolio.map((p, i) => `
        <div class="portfolio-item reveal" style="transition-delay: ${i*0.1}s">
            <img src="${p.image}" alt="${p.title}" onerror="this.src='https://via.placeholder.com/800x450/0a0a12/00d4ff?text=Portfolio'">
            <div class="portfolio-overlay">
                <div>
                    <span class="font-display font-bold text-base block mb-1">${p.title}</span>
                    <span class="text-gray-400 text-xs block mb-2">${p.client}</span>
                    <p class="text-gray-300 text-xs">${p.description}</p>
                </div>
            </div>
        </div>
    `).join('');
}
function renderTeam() {
    const grid = document.getElementById('team-grid');
    if(!grid) return;
    grid.innerHTML = team.map((m, i) => `
        <div class="team-card reveal" style="transition-delay: ${i*0.1}s">
            <img src="${m.image}" alt="${m.name}" onerror="this.src='https://via.placeholder.com/400x300/0a0a12/00d4ff?text=Team'">
            <div class="p-4 text-center">
                <h4 class="font-display font-bold text-sm">${m.name}</h4>
                <p class="text-gray-400 text-xs">${m.role}</p>
            </div>
        </div>
    `).join('');
}

// CHATBOT
function initChatbot() {
    setTimeout(() => {
        addBotMsg("Halo! Selamat datang di Zheng Digital Lab. Ada yang bisa saya bantu?");
        addQuickBtn(['Produk apa saja?', 'Berapa harga?', 'Hubungi kami']);
    }, 3000);
}
function toggleChatbot() {
    document.getElementById('chatbot').classList.toggle('active');
}
function toggleMinimize() {
    document.getElementById('chatbot').classList.toggle('minimized');
}
function addBotMsg(text) {
    const body = document.getElementById('chatbot-body');
    const time = new Date().toLocaleTimeString('id-ID', {hour:'2-digit',minute:'2-digit'});
    body.innerHTML += `<div class="chat-message bot">${text}<span class="time">${time}</span></div>`;
    body.scrollTop = body.scrollHeight;
}
function addUserMsg(text) {
    const body = document.getElementById('chatbot-body');
    const time = new Date().toLocaleTimeString('id-ID', {hour:'2-digit',minute:'2-digit'});
    body.innerHTML += `<div class="chat-message user">${text}<span class="time">${time}</span></div>`;
    body.scrollTop = body.scrollHeight;
}
function addQuickBtn(arr) {
    const body = document.getElementById('chatbot-body');
    const div = document.createElement('div');
    div.className = 'quick-replies';
    arr.forEach(r => {
        let b = document.createElement('button');
        b.className = 'quick-reply'; b.textContent = r;
        b.onclick = () => { handleChat(r); div.remove(); };
        div.appendChild(b);
    });
    body.appendChild(div); body.scrollTop = body.scrollHeight;
}
function showTyping() {
    const body = document.getElementById('chatbot-body');
    body.innerHTML += `<div class="typing-indicator" id="typing"><span></span><span></span><span></span></div>`;
    body.scrollTop = body.scrollHeight;
}
function removeTyping() { document.getElementById('typing')?.remove(); }
function getResponse(msg) {
    let m = msg.toLowerCase();
    for(let k in responses) if(responses[k].some(x => m.includes(x))) return answers[k];
    return "Maaf saya tidak paham. Anda bisa tanya tentang Produk, Harga, atau Kontak.";
}
function handleChat(msg) {
    if(!msg.trim()) return;
    addUserMsg(msg);
    showTyping();
    setTimeout(() => {
        removeTyping();
        addBotMsg(getResponse(msg));
        addQuickBtn(['Produk lainnya', 'Hubungi kami']);
    }, 1000);
}
function sendChat() {
    let inp = document.getElementById('chatbot-input');
    if(inp.value.trim()) { handleChat(inp.value); inp.value = ''; }
}

// FORM
function handleForm() {
    const form = document.getElementById('contact-form');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        let msg = 'Halo Zheng Digital Lab,%0A%0A';
        form.querySelectorAll('.form-input').forEach(inp => {
            if(inp.tagName === 'TEXTAREA') msg += 'Pesan:%0A' + encodeURIComponent(inp.value);
            else msg += inp.previousElementSibling.textContent + ' ' + encodeURIComponent(inp.value) + '%0A';
        });
        window.open('https://wa.me/6281234567890?text=' + msg, '_blank');
        form.reset();
    });
}

// Welcome Animation
window.addEventListener('load', () => {
    const title = document.getElementById('welcome-title');
    if(title) {
        let txt = title.textContent; title.innerHTML = '';
        txt.split('').forEach((c, i) => {
            let s = document.createElement('span');
            s.textContent = c === ' ' ? '\u00A0' : c;
            s.className = 'letter'; s.style.animationDelay = (i*0.03)+'s';
            title.appendChild(s);
        });
    }
});
