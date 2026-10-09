import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ArrowRight, Play, Leaf, ShieldCheck, Thermometer, Recycle, Globe2, Droplets, ShoppingBag, Plus, Minus, X, Star, Menu, Instagram, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { products, cartTotal } from '@/lib/products';
import hero from '@/assets/sippin-hero.jpg';
import hike from '@/assets/sippin-hike.jpg';
import sand from '@/assets/sippin-sand.jpg';
import forest from '@/assets/sippin-forest.jpg';
import midnight from '@/assets/sippin-midnight.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'SIPPIN — Sip Sustainably.' },
    { name: 'description', content: 'Meet your everyday reusable bottle. Recycled steel, 24-hour cold insulation, and three nature-inspired colors. Find your Sippin for $34.' },
    { property: 'og:title', content: 'SIPPIN — Sip Sustainably.' },
    { property: 'og:description', content: 'Designed for life. Made for the planet. Discover SIPPIN reusable water bottles.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

const images = { sand, forest, midnight };
const reviews = [
  { quote: 'Finally, a bottle that looks as good as it feels. It goes everywhere with me.', name: 'Alex M.', label: 'The everyday essential' },
  { quote: 'Ice cold after a whole day on the trail. My new favorite adventure buddy.', name: 'Jamie R.', label: 'Made for the long haul' },
  { quote: 'A little change that makes a big difference. I haven’t bought a plastic bottle since.', name: 'Taylor S.', label: 'Small sip. Big difference.' },
];

function Index() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [modal, setModal] = useState<'cart' | 'story' | 'faq' | 'contact' | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [offer, setOffer] = useState(false);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const add = (id: string) => { setCart(c => ({ ...c, [id]: (c[id] ?? 0) + 1 })); setModal('cart'); };
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <>
    <header className="site-header">
      <a className="wordmark" href="#" aria-label="SIPPIN home">SIPPIN<span>®</span></a>
      <nav className={menuOpen ? 'main-nav menu-open' : 'main-nav'} aria-label="Main navigation">
        {['Features', 'Shop', 'Impact'].map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
      </nav>
      <div className="nav-actions">
        <Button variant="ghost" size="icon" className="bag-button" aria-label={`Open bag, ${count} items`} onClick={() => setModal('cart')}><ShoppingBag />{count > 0 && <span className="bag-count">{count}</span>}</Button>
        <Button asChild variant="brand" className="nav-buy"><a href="#shop">Buy Now <span className="button-divider">—</span> $34 <ArrowRight /></a></Button>
        <Button variant="ghost" size="icon" className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </div>
    </header>

    <main>
      <section className="hero-section">
        <img className="hero-image" src={hero} alt="Sage SIPPIN bottle on sunlit stone with leaf shadows" width={1536} height={1024} fetchPriority="high" />
        <div className="hero-copy">
          <span className="eyebrow"><Leaf size={14} /> BETTER SIPS. SMALLER FOOTPRINT.</span>
          <h1>Sip<br />Sustainably<span className="sage-dot">.</span></h1>
          <p>The last bottle you’ll ever need.<br />100% BPA-free. Cold for 24hrs. Hot for 12hrs.</p>
          <div className="hero-actions"><Button asChild variant="brand" size="lg"><a href="#shop">Shop Collection <ArrowRight /></a></Button><Button variant="story" size="lg" onClick={() => setModal('story')}><span className="play-circle"><Play size={13} fill="currentColor" /></span> Watch Story</Button></div>
          <div className="hero-note"><span className="tiny-leaf"><Leaf size={15} /></span> A little less plastic. A lot more possibility.</div>
        </div>
        <div className="hero-caption"><span>YOUR EVERYDAY, REIMAGINED.</span><span>01 / 03</span></div>
      </section>

      <section className="feature-section section-wrap" id="features">
        {[
          { Icon: ShieldCheck, title: 'BPA Free & Non-Toxic', text: 'Nothing extra. Just pure, clean hydration.' },
          { Icon: Thermometer, title: 'Double-Wall Insulated', text: '24 hours cold. 12 hours hot. All day you.' },
          { Icon: Recycle, title: 'Made from Recycled Steel', text: 'Good for your routine. Better for the planet.' },
        ].map(({ Icon, title, text }) => <div className="feature-item" key={title}><span className="feature-icon"><Icon strokeWidth={1.4} /></span><div><h3>{title}</h3><p>{text}</p></div></div>)}
      </section>

      <section className="collection-section section-wrap reveal" id="shop">
        <div className="section-heading"><div><span className="eyebrow">ONE BOTTLE. YOUR KIND OF EVERYDAY.</span><h2>Find Your Sippin<span className="sage-dot">.</span></h2></div><p>Nature-inspired colors.<br />Adventure-ready by design.</p></div>
        <div className="product-grid">{products.map((product, i) => <article className="product" key={product.id}>
          <div className="product-photo"><img src={images[product.id]} alt={`${product.name} SIPPIN reusable water bottle`} width={512} height={1024} loading="lazy" />{i === 1 && <span className="product-tag">THE EVERYDAY FAVORITE</span>}<Button variant="brand" className="product-add" onClick={() => add(product.id)}>Add to Bag <Plus /></Button></div>
          <div className="product-info"><div><h3><span className={`color-swatch swatch-${product.id}`} />{product.name}</h3><p>The Sippin Original</p></div><span className="price">${product.price}</span></div>
        </article>)}</div>
      </section>

      <section className="impact-section reveal" id="impact"><div className="impact-inner"><div className="impact-icons"><Globe2 /><Recycle /><Droplets /></div><span className="eyebrow">SMALL HABITS. REAL IMPACT.</span><h2>1 Sippin = <strong>167</strong> Plastic Bottles<br />Saved Per Year<span>.</span></h2><p>One refill at a time, we’re changing the way the world drinks.</p></div><span className="impact-side">LESS WASTE. MORE LIFE.</span></section>

      <section className="about-section section-wrap reveal" id="story"><div className="about-photo"><img src={hike} alt="Hiker carrying a SIPPIN bottle in the mountains" width={1024} height={1024} loading="lazy" /><span>TAKE THE SCENIC ROUTE.</span></div><div className="about-copy"><span className="eyebrow">A BETTER WAY TO HYDRATE</span><h2>Designed for Life.<br />Made for the Planet<span className="sage-dot">.</span></h2><p>We started Sippin to end single-use plastic. Not with a grand gesture, but with something simple: a bottle you’ll want to take everywhere.</p><p>From your morning commute to the trail less traveled, it’s made to keep up — and leave less behind.</p><Button variant="link" className="story-link" onClick={() => setModal('story')}>Our story <ArrowRight /></Button></div></section>

      <section className="reviews-section section-wrap reveal"><div className="section-heading"><div><span className="eyebrow">GOOD COMPANY. GREAT SIPS.</span><h2>Love at first sip.</h2></div><span className="review-disclosure">Community reviews · illustrative</span></div><div className="reviews-grid">{reviews.map(review => <article className="review" key={review.name}><div className="stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={15} fill="currentColor" />)}</div><h3>{review.label}</h3><p>“{review.quote}”</p><span className="review-name">{review.name}</span></article>)}</div></section>

      <section className="signup-section reveal"><Leaf size={27} strokeWidth={1.4} /><h2>Ready to make the switch?</h2><p>A fresh start. A lighter footprint. Get 10% off your first Sippin.</p><form className="email-form" onSubmit={e => { e.preventDefault(); setOffer(true); }}><label className="sr-only" htmlFor="email">Email address</label><input id="email" type="email" required placeholder="Your email address" value={email} onChange={e => { setEmail(e.target.value); setOffer(false); }} /><Button variant="brand" type="submit">Get 10% Off <ArrowRight /></Button></form>{offer ? <p className="offer-message"><Check size={16} /> Preview offer: SIP10 · 10% off. Email signup and checkout aren’t live yet.</p> : <small>Good things only. No noise.</small>}</section>
    </main>

    <footer className="site-footer section-wrap"><div className="footer-top"><a href="#" className="wordmark">SIPPIN<span>®</span></a><p>Stay hydrated. Leave less behind.</p><nav aria-label="Footer navigation"><Button variant="link" onClick={() => setModal('contact')}><Instagram size={14} /> Instagram</Button><Button variant="link" onClick={() => setModal('contact')}>TikTok</Button><Button variant="link" onClick={() => setModal('faq')}>FAQ</Button><Button variant="link" onClick={() => setModal('contact')}>Contact</Button></nav></div><div className="footer-bottom"><span>© 2026 Sippin. All rights reserved.</span><span><Leaf size={12} /> Thoughtfully made. Endlessly refillable.</span></div></footer>
    <div className="mobile-buy"><span>Your everyday essential <strong>$34</strong></span><Button asChild variant="brand"><a href="#shop">Find Your Sippin <ArrowRight /></a></Button></div>

    <Dialog open={modal !== null} onOpenChange={open => { if (!open) setModal(null); }}><DialogContent className="sippin-dialog"><DialogTitle>{modal === 'cart' ? `Your bag (${count})` : modal === 'story' ? 'Every refill is a fresh start.' : modal === 'faq' ? 'A few good questions.' : 'Let’s keep in touch.'}</DialogTitle><DialogDescription>{modal === 'cart' ? 'Your next everyday essential.' : modal === 'story' ? 'Designed for life. Made for the planet.' : modal === 'faq' ? 'All about your Sippin.' : 'SIPPIN’s contact and social details are coming soon.'}</DialogDescription>
      {modal === 'cart' && <>{count === 0 ? <div className="empty-bag"><ShoppingBag size={36} strokeWidth={1} /><p>A little room for something good.</p><Button variant="brand" onClick={() => { setModal(null); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }); }}>Explore the collection <ArrowRight /></Button></div> : <><div className="cart-items">{products.filter(p => (cart[p.id] ?? 0) > 0).map(p => <div className="cart-item" key={p.id}><img src={images[p.id]} alt={p.name} /><div><h3>{p.name}</h3><p>${p.price}</p><div className="quantity-control"><Button variant="ghost" size="icon" aria-label={`Remove one ${p.name}`} onClick={() => setCart(c => ({ ...c, [p.id]: Math.max(0, (c[p.id] ?? 0) - 1) }))}><Minus /></Button><span>{cart[p.id]}</span><Button variant="ghost" size="icon" aria-label={`Add one ${p.name}`} onClick={() => setCart(c => ({ ...c, [p.id]: (c[p.id] ?? 0) + 1 }))}><Plus /></Button></div></div><strong>${p.price * (cart[p.id] ?? 0)}</strong></div>)}</div><div className="cart-total"><span>Subtotal</span><strong>${cartTotal(cart)}</strong></div><p className="checkout-note">This is a preview bag. Payments and checkout are not connected yet.</p><Button variant="brand" onClick={() => setModal(null)}>Keep exploring <ArrowRight /></Button></>}</>}
      {modal === 'story' && <div className="story-modal"><img src={hike} alt="Refilling on the mountain trail" /><p>We started Sippin to end single-use plastic. A simple habit, a thoughtfully made bottle, and a little less left behind.</p><p>Recycled steel. Clean hydration. More adventures.</p><Button variant="brand" onClick={() => { setModal(null); document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' }); }}>See the impact <ArrowRight /></Button></div>}
      {modal === 'faq' && <div className="faq-list">{[['How long will my drink stay cold?', 'Double-wall insulation keeps drinks cold for 24 hours and hot for 12 hours.'], ['What is Sippin made from?', 'Recycled stainless steel. 100% BPA-free and non-toxic.'], ['What colors can I choose?', 'Sand Beige, Forest, and Midnight. Every bottle is $34.']].map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>}
    </DialogContent></Dialog>
  </>;
}
