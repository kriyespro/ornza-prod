/* ORNZA shared site footer + newsletter — Tailwind + Alpine + HTMX */
(function () {
  const mount = document.getElementById('ornza-site-footer');
  if (!mount) return;

  const b = getFooterAssetBase();

  mount.innerHTML = `
<section class="ornza-tw relative py-16 px-5 text-center bg-gradient-to-b from-espresso to-[#070501] border-t border-gold/15 overflow-hidden" id="newsletter" x-data="ornzaNewsletter('${b}')">
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(201,168,76,0.1)_0%,transparent_60%)] pointer-events-none"></div>
  <div class="relative z-10 max-w-xl mx-auto">
    <div class="text-[9px] tracking-[0.35em] uppercase text-gold font-medium mb-3">Stay in the Loop</div>
    <h2 class="font-display text-3xl md:text-4xl font-light text-ivory tracking-wide mb-2.5">Get Early Access &amp; <em class="italic text-gold">Exclusive Offers</em></h2>
    <p class="text-sm text-champagne/80 font-light leading-relaxed">Join 5,000+ subscribers who get first access to new arrivals, seasonal sales, and secret discount codes.</p>
    <div class="flex max-w-md mx-auto mt-7">
      <input type="email" class="flex-1 bg-ivory/5 border border-gold/25 border-r-0 text-ivory font-sans text-xs font-light px-5 py-3.5 outline-none rounded-l focus:border-gold placeholder:text-champagne/30" id="nl-email" x-model="email" placeholder="Your email address">
      <button type="button" class="bg-gold border-0 text-espresso font-sans text-[9px] font-bold tracking-[0.2em] uppercase px-6 py-3.5 cursor-pointer rounded-r transition-colors hover:bg-gold-light whitespace-nowrap htmx-request:opacity-70" id="nl-submit" @click="subscribe()">Subscribe</button>
    </div>
    <div class="text-[9px] text-champagne/50 mt-3 tracking-wider" id="nl-msg">No spam, ever. Unsubscribe anytime.</div>
  </div>
</section>
<footer class="ornza-tw bg-[#070501] border-t border-gold/10">
  <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 px-[5%] py-14 pb-10">
    <div class="sm:col-span-2 lg:col-span-1">
      <a href="${b}index.html" class="font-display text-[1.6rem] tracking-[0.12em] text-ivory no-underline inline-block mb-4">ORN<span class="text-gold italic">Z</span>A</a>
      <p class="text-xs text-champagne/60 leading-relaxed mb-5 max-w-xs">Where gold meets brilliance. Handcrafted artificial jewellery from Surat — for the woman who celebrates herself every day.</p>
      <div class="flex gap-2.5">
        <a href="https://instagram.com/ornza.com2026" class="w-9 h-9 flex items-center justify-center border border-gold/20 rounded-full text-[10px] text-gold no-underline transition-all hover:bg-gold/10 hover:border-gold" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
        <a href="https://facebook.com/ornza" class="w-9 h-9 flex items-center justify-center border border-gold/20 rounded-full text-[10px] text-gold no-underline transition-all hover:bg-gold/10 hover:border-gold" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
        <a href="https://wa.me/919999999999" class="w-9 h-9 flex items-center justify-center border border-gold/20 rounded-full text-[10px] text-gold no-underline transition-all hover:bg-gold/10 hover:border-gold" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">WA</a>
        <a href="https://youtube.com/@ornza" class="w-9 h-9 flex items-center justify-center border border-gold/20 rounded-full text-[10px] text-gold no-underline transition-all hover:bg-gold/10 hover:border-gold" target="_blank" rel="noopener noreferrer" aria-label="YouTube">▶</a>
      </div>
    </div>
    <div>
      <div class="text-[9px] tracking-[0.25em] uppercase text-gold font-semibold mb-4">Collections</div>
      <ul class="list-none space-y-2.5">
        <li><a href="${b}women.html" class="text-xs text-champagne/65 no-underline transition-colors hover:text-gold">Women's Jewellery</a></li>
        <li><a href="${b}men.html" class="text-xs text-champagne/65 no-underline transition-colors hover:text-gold">Men's Collection</a></li>
        <li><a href="${b}silver925.html" class="text-xs text-champagne/65 no-underline transition-colors hover:text-gold">925 Silver</a></li>
        <li><a href="${b}hampers.html" class="text-xs text-champagne/65 no-underline transition-colors hover:text-gold">Gift Hampers</a></li>
        <li><a href="${b}women.html#mangalsutras" class="text-xs text-champagne/65 no-underline transition-colors hover:text-gold">Mangalsutras</a></li>
        <li><a href="${b}women.html#pearl" class="text-xs text-champagne/65 no-underline transition-colors hover:text-gold">Pearl Collection</a></li>
      </ul>
    </div>
    <div>
      <div class="text-[9px] tracking-[0.25em] uppercase text-gold font-semibold mb-4">Customer Care</div>
      <ul class="list-none space-y-2.5">
        <li><a href="${b}track-order.html" class="text-xs text-champagne/65 no-underline transition-colors hover:text-gold">Track My Order</a></li>
        <li><a href="${b}dashboard/customer/login.html" class="text-xs text-champagne/65 no-underline transition-colors hover:text-gold">My Account</a></li>
        <li><a href="${b}reviews.html" class="text-xs text-champagne/65 no-underline transition-colors hover:text-gold">Customer Reviews</a></li>
        <li><a href="${b}contact.html" class="text-xs text-champagne/65 no-underline transition-colors hover:text-gold">Contact Us</a></li>
        <li><a href="${b}return-policy.html" class="text-xs text-champagne/65 no-underline transition-colors hover:text-gold">Return Policy</a></li>
        <li><a href="${b}shipping-info.html" class="text-xs text-champagne/65 no-underline transition-colors hover:text-gold">Shipping Info</a></li>
        <li><a href="${b}size-guide.html" class="text-xs text-champagne/65 no-underline transition-colors hover:text-gold">Size Guide</a></li>
      </ul>
    </div>
    <div>
      <div class="text-[9px] tracking-[0.25em] uppercase text-gold font-semibold mb-4">Company</div>
      <ul class="list-none space-y-2.5">
        <li><a href="${b}about.html" class="text-xs text-champagne/65 no-underline transition-colors hover:text-gold">Our Story</a></li>
        <li><a href="${b}collections.html" class="text-xs text-champagne/65 no-underline transition-colors hover:text-gold">All Collections</a></li>
        <li><a href="${b}wholesale-enquiry.html" class="text-xs text-champagne/65 no-underline transition-colors hover:text-gold">Wholesale Enquiry</a></li>
        <li><a href="${b}privacy-policy.html" class="text-xs text-champagne/65 no-underline transition-colors hover:text-gold">Privacy Policy</a></li>
        <li><a href="${b}terms-of-service.html" class="text-xs text-champagne/65 no-underline transition-colors hover:text-gold">Terms of Service</a></li>
      </ul>
    </div>
    <div>
      <div class="text-[9px] tracking-[0.25em] uppercase text-gold font-semibold mb-4">Get in Touch</div>
      <div class="flex gap-2.5 mb-3 text-xs text-champagne/65"><span>📍</span><span>Surat, Gujarat, India — 395001</span></div>
      <div class="flex gap-2.5 mb-3 text-xs text-champagne/65"><span>📞</span><a href="https://wa.me/919999999999" class="text-champagne/65 no-underline hover:text-gold">+91 99999 99999</a></div>
      <div class="flex gap-2.5 mb-3 text-xs text-champagne/65"><span>✉</span><a href="mailto:ornzza.com@gmail.com" class="text-champagne/65 no-underline hover:text-gold">ornzza.com@gmail.com</a></div>
      <div class="flex gap-2.5 mb-5 text-xs text-champagne/65"><span>🕐</span><span>Mon–Sat, 10am–7pm IST</span></div>
      <div class="text-[8px] tracking-[0.2em] uppercase text-gold/70 mb-2">We Accept</div>
      <div class="flex flex-wrap gap-1.5">
        <span class="text-[8px] tracking-wider uppercase px-2 py-1 border border-gold/20 rounded text-champagne/50">UPI</span>
        <span class="text-[8px] tracking-wider uppercase px-2 py-1 border border-gold/20 rounded text-champagne/50">Visa</span>
        <span class="text-[8px] tracking-wider uppercase px-2 py-1 border border-gold/20 rounded text-champagne/50">Mastercard</span>
        <span class="text-[8px] tracking-wider uppercase px-2 py-1 border border-gold/20 rounded text-champagne/50">COD</span>
      </div>
    </div>
  </div>
  <div class="max-w-6xl mx-auto px-[5%] py-5 border-t border-gold/10 flex flex-wrap items-center justify-between gap-4">
    <div class="text-[10px] text-champagne/40 tracking-wide">© 2025 ORNZA. All rights reserved. Made with ♥ in Surat.</div>
    <div class="flex gap-5">
      <a href="${b}privacy-policy.html" class="text-[10px] text-champagne/40 no-underline hover:text-gold transition-colors">Privacy Policy</a>
      <a href="${b}terms-of-service.html" class="text-[10px] text-champagne/40 no-underline hover:text-gold transition-colors">Terms of Service</a>
      <a href="${b}return-policy.html" class="text-[10px] text-champagne/40 no-underline hover:text-gold transition-colors">Return Policy</a>
    </div>
  </div>
</footer>`;

  document.getElementById('nl-email')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.getElementById('nl-submit')?.click();
    }
  });

  const bootAlpine = () => {
    if (window.OrnzaStack) window.OrnzaStack.initTree(mount);
    else if (window.Alpine) window.Alpine.initTree(mount);
  };
  if (window.OrnzaStack) window.OrnzaStack.whenAlpineReady(bootAlpine);
  else document.addEventListener('alpine:init', bootAlpine, { once: true });
})();

function getFooterAssetBase() {
  const scripts = document.querySelectorAll('script[src*="footer.js"]');
  const src = scripts[scripts.length - 1]?.getAttribute('src') || 'footer.js';
  return src.replace(/footer\.js.*$/, '');
}

function ornzaNewsletter(base) {
  return {
    email: '',
    base,
    subscribe() {
      const msg = document.getElementById('nl-msg');
      if (!this.email || !this.email.includes('@')) {
        if (msg) msg.innerHTML = '<span class="text-red-400">Please enter a valid email address.</span>';
        return;
      }
      const url = `${this.base}partials/newsletter-success.html`;
      if (window.htmx) {
        window.htmx.ajax('GET', url, { target: '#nl-msg', swap: 'innerHTML' });
      } else if (msg) {
        msg.innerHTML = '<span class="text-gold font-medium">✓ You\'re subscribed! Welcome to the ORNZA family.</span>';
      }
      this.email = '';
    }
  };
}

document.addEventListener('alpine:init', () => {
  Alpine.data('ornzaNewsletter', (base) => ornzaNewsletter(base));
});
