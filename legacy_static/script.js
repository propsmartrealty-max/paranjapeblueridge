document.addEventListener('DOMContentLoaded', () => {
    
    // PREMIUM FLOATING NAVBAR LOGIC
    const mainNav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });

    // FADE UP INTERSECTION OBSERVER
    const fadeElements = document.querySelectorAll('.fade-up');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));

    // ADVANCED ROI CALCULATOR LOGIC
    const investmentInput = document.getElementById('roi-investment');
    const rateInput = document.getElementById('roi-rate');
    const resultEl = document.getElementById('roi-result');

    const calculateROI = () => {
        const principal = parseFloat(investmentInput.value) || 0;
        const rate = parseFloat(rateInput.value) || 0;
        const years = 5;
        // Compound interest formula: A = P(1 + r/n)^nt
        const amount = principal * Math.pow((1 + (rate/100)), years);
        resultEl.textContent = `₹ ${amount.toFixed(2)} Cr`;
    };

    if (investmentInput && rateInput) {
        investmentInput.addEventListener('input', calculateROI);
        rateInput.addEventListener('input', calculateROI);
    }

    // FAQ ACCORDION LOGIC
    const specHeaders = document.querySelectorAll('.spec-header');
    specHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isOpen = item.classList.contains('open');
            
            // Close all others
            document.querySelectorAll('.spec-item').forEach(i => i.classList.remove('open'));
            
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    // HARDENED TRIPLE-REDUNDANT ENQUIRY PIPELINE
    const form = document.getElementById('enquiryForm');
    const statusEl = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const name = formData.get('name').trim();
            const phone = formData.get('phone').trim();
            const email = formData.get('email').trim();
            const config = formData.get('config');
            const message = formData.get('message').trim();

            if (!name || !phone) {
                updateStatus('Please provide your name and phone number.', '#ff4d4d');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = 'Executing Dispatch...';

            // 1. SOVEREIGN VAULT (Local Persistence)
            const leadEntry = {
                id: `LR-${Date.now()}`,
                name, phone, email, config, message,
                timestamp: new Date().toISOString(),
                project: 'Paranjape Blue Ridge'
            };
            
            try {
                const vault = JSON.parse(localStorage.getItem('blue_ridge_leads') || '[]');
                vault.unshift(leadEntry);
                localStorage.setItem('blue_ridge_leads', JSON.stringify(vault));
                console.log('💎 Sovereign Vault Heartbeat: Lead Cached Locally');
            } catch (err) {
                console.warn('Vault Storage Failure:', err);
            }

            // 2. PRIMARY DISPATCH (Formspree to propsmartrealty@gmail.com)
            let primarySuccess = false;
            try {
                const response = await fetch('https://formspree.io/f/xwpknvry', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        name, phone, email,
                        project_interest: config,
                        message,
                        _subject: `💎 New Blue Ridge Lead: ${name} [${config}]`,
                        _replyto: email || 'noreply@blueridge.com'
                    })
                });
                if (response.ok) primarySuccess = true;
            } catch (err) {
                console.error('Primary Dispatch Error:', err);
            }

            // 3. SECONDARY DISPATCH (WhatsApp Fallback)
            const waMessage = encodeURIComponent(
                `🏢 *BLUE RIDGE PRIORITY LEAD*\n` +
                `━━━━━━━━━━━━━━━━━━━━\n` +
                `👤 *Name:* ${name}\n` +
                `📱 *Phone:* ${phone}\n` +
                `📧 *Email:* ${email || 'N/A'}\n` +
                `🏠 *Interest:* ${config}\n` +
                `💬 *Msg:* ${message || 'Interested in project'}\n` +
                `━━━━━━━━━━━━━━━━━━━━\n` +
                `📍 Source: Blue Ridge Portal\n` +
                `⏰ ${new Date().toLocaleString()}`
            );
            const waUrl = `https://wa.me/919672559666?text=${waMessage}`;

            if (primarySuccess) {
                updateStatus('✅ Dispatch Successful. Our advisor will contact you.', '#d4a853');
                form.reset();
            } else {
                updateStatus('⚠️ Submission Error. Redirecting to WhatsApp...', '#e8c87a');
                setTimeout(() => {
                    window.open(waUrl, '_blank');
                    form.reset();
                }, 1500);
            }

            submitBtn.disabled = false;
            submitBtn.textContent = 'Initiate Secure Dispatch';
        });
    }

    function updateStatus(msg, color) {
        statusEl.textContent = msg;
        statusEl.style.color = color;
        setTimeout(() => {
            statusEl.textContent = '';
        }, 6000);
    }

    // SMOOTH SCROLLING FOR PILL NAV
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetID = this.getAttribute('href');
            const targetElement = document.querySelector(targetID);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});
