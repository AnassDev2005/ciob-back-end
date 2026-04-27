import { useState } from "react";

// ─── Icons (inline SVG helpers) ───────────────────────────────────────────────
const Icon = ({ d, size = 20, stroke = "currentColor", fill = "none", strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const DownloadIcon = () => <Icon d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />;
const ChevronDown = () => <Icon d="M6 9l6 6 6-6" size={16} />;
const ChevronLeft = () => <Icon d="M15 18l-6-6 6-6" size={22} />;
const ChevronRight = () => <Icon d="M9 18l6-6-6-6" size={22} />;
const MenuIcon = () => <Icon d="M3 12h18M3 6h18M3 18h18" size={22} />;
const CloseIcon = () => <Icon d="M18 6L6 18M6 6l12 12" size={22} />;
const ShieldCheck = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
  </svg>
);
const AwardIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);
const HandshakeIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
  </svg>
);
const LoaderIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" style={{ animation: "spin 1s linear infinite" }}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
const FacebookIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const YoutubeIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);
const WhatsappIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12.004 2C6.477 2 2 6.477 2 12c0 1.885.518 3.648 1.418 5.16L2 22l4.985-1.394A9.962 9.962 0 0 0 12.004 22C17.527 22 22 17.523 22 12S17.527 2 12.004 2z" />
  </svg>
);
const MapPinIcon = () => <Icon d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" size={16} />;
const PhoneIcon = () => <Icon d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" size={16} />;

// ─── Color Palette & Styles ────────────────────────────────────────────────────
const NAVY = "#0f1f3d";
const NAVY_LIGHT = "#1a3260";
const RED = "#e31e24";
const GRAY_BG = "#f7f7f8";
const BORDER = "#e5e7eb";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #fff; color: #1a1a2e; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .fade-up { animation: fadeUp 0.6s ease forwards; }
  .fade-in { animation: fadeIn 0.5s ease forwards; }
  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #f1f1f1; } ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
  /* Nav */
  .nav-link { color: ${NAVY}; text-decoration: none; font-size: 14px; font-weight: 500; padding: 6px 0; transition: color .2s; }
  .nav-link:hover { color: ${RED}; }
  /* Buttons */
  .btn-navy { background: ${NAVY}; color: #fff; border: none; border-radius: 8px; padding: 12px 28px; font-size: 14px; font-weight: 600; cursor: pointer; transition: background .2s, transform .15s; font-family: 'DM Sans', sans-serif; }
  .btn-navy:hover { background: ${NAVY_LIGHT}; transform: scale(1.03); }
  .btn-navy:active { transform: scale(0.97); }
  .btn-outline { background: transparent; color: ${NAVY}; border: 2px solid ${NAVY}; border-radius: 8px; padding: 10px 26px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all .2s; display: inline-flex; align-items: center; gap: 8px; font-family: 'DM Sans', sans-serif; text-decoration: none; }
  .btn-outline:hover { background: ${NAVY}; color: #fff; transform: scale(1.03); }
  .btn-red { background: ${RED}; color: #fff; border: none; border-radius: 8px; padding: 12px 28px; font-size: 14px; font-weight: 600; cursor: pointer; transition: opacity .2s, transform .15s; font-family: 'DM Sans', sans-serif; }
  .btn-red:hover { opacity: 0.88; }
  .btn-red:disabled { opacity: 0.5; cursor: not-allowed; }
  /* Cards */
  .card { background: #fff; border: 1px solid ${BORDER}; border-radius: 16px; }
  /* Form inputs */
  .form-input { width: 100%; border: 1px solid ${BORDER}; border-radius: 8px; padding: 10px 14px; font-size: 14px; font-family: 'DM Sans', sans-serif; outline: none; transition: border-color .2s, box-shadow .2s; background: #fff; color: #1a1a2e; }
  .form-input:focus { border-color: ${NAVY}; box-shadow: 0 0 0 3px rgba(15,31,61,.08); }
  .form-label { font-size: 12px; font-weight: 500; color: #444; display: block; margin-bottom: 6px; }
  /* Tags */
  .tag-red { background: rgba(227,30,36,.1); color: ${RED}; font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; padding: 4px 10px; border-radius: 6px; display: inline-block; }
  .tag-dark { background: ${NAVY}; color: #fff; font-size: 11px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; }
  /* Filter tabs */
  .filter-btn { border: 1px solid ${BORDER}; background: #fff; border-radius: 20px; padding: 6px 18px; font-size: 13px; font-weight: 500; cursor: pointer; color: #555; transition: all .2s; font-family: 'DM Sans', sans-serif; }
  .filter-btn.active { background: ${NAVY}; color: #fff; border-color: ${NAVY}; }
  /* Product card hover */
  .product-card { transition: box-shadow .25s, transform .25s; cursor: pointer; }
  .product-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,.12); transform: translateY(-4px); }
  /* Dot nav */
  .dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,.4); border: none; cursor: pointer; padding: 0; transition: all .2s; }
  .dot.active { background: ${RED}; width: 28px; border-radius: 4px; }
  /* Grayscale logos */
  .logo-img { filter: grayscale(100%); opacity: .75; transition: all .3s; cursor: pointer; }
  .logo-img:hover { filter: none; opacity: 1; }
  /* Quality icon bg */
  .quality-icon { width: 40px; height: 40px; border-radius: 10px; background: rgba(255,255,255,.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #fff; }
  /* Social button */
  .social-btn { display: flex; flex-direction: column; align-items: center; gap: 8px; color: ${NAVY}; font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; text-decoration: none; opacity: .8; transition: opacity .2s; }
  .social-btn:hover { opacity: 1; }
  .social-icon { width: 44px; height: 44px; border-radius: 50%; border: 1.5px solid ${BORDER}; display: flex; align-items: center; justify-content: center; background: #fff; color: ${NAVY}; }
  /* Footer */
  .footer-link { color: rgba(255,255,255,.55); font-size: 13px; text-decoration: none; line-height: 2; transition: color .2s; display: block; }
  .footer-link:hover { color: #fff; }
  /* Responsive helpers */
  @media (max-width: 900px) {
    .hide-mobile { display: none !important; }
    .grid-2 { grid-template-columns: 1fr !important; }
    .grid-3 { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 600px) {
    .grid-3 { grid-template-columns: 1fr !important; }
    .hero-title { font-size: 38px !important; }
  }
`;

// ─── Mock Data ────────────────────────────────────────────────────────────────
const HERO_SLIDES = [
  { title: "Faitout Alu Anses Bak", desc: "A classic aluminum cooking pot with heat-resistant Bakelite handles", tag: "ALUMINIUM 100%", bg: "#d4d8df" },
  { title: "Bouilloire Alu", desc: "A traditional aluminum stovetop kettle featuring a decorative embossed pattern on the lower half.", tag: "ALUMINIUM 100%", bg: "#c8cdd6" },
  { title: "Friteuse Conic Alu", desc: "A specialized deep-frying pan with a conical shape and removable wire mesh strainer", tag: "ALUMINIUM 100%", bg: "#dddfe3" },
];

const PRODUCTS = [
  { name: "Poêle Alu", desc: "Poêle en aluminium avec manche", ref: "Réf: Poele Alu / بولى ألو", sizes: "20 · 24 · 26 · 28 · 30 · 32 · 36 · 40 · 50 mm", tag: "ALUMINIUM 100%", cat: "Aluminium" },
  { name: "Mahracha Alu", desc: "Râpe traditionnelle marocaine en aluminium", ref: "Réf: Mahracha Alu / محراشة", sizes: "24 · 26 · 30 · 36 mm", tag: "ALUMINIUM 100%", cat: "Aluminium" },
  { name: "Bouilloire Alu", desc: "Bouilloire en aluminium pour chauffer l'eau", ref: "Réf: Bouilloire Alu / كتلى", sizes: "21 · 25 · 31 · 41 · 51 · 61 mm", tag: "ALUMINIUM 100%", cat: "Aluminium" },
  { name: "Poêle Antiadhésive", desc: "Poêle avec revêtement Teflon haute durabilité", ref: "Réf: Poele Anti / بوالى أنتي", sizes: "24 · 26 · 28 · 30 cm", tag: "ANTIADHÉSIF", cat: "Antiadhesive" },
  { name: "Tajine Antiadhésif", desc: "Tajine traditionnel avec revêtement premium", ref: "Réf: Tajine Anti / طاجين", sizes: "26 · 28 · 30 · 32 cm", tag: "ANTIADHÉSIF", cat: "Antiadhesive" },
  { name: "Marmite Inox", desc: "Marmite en acier inoxydable 18/10", ref: "Réf: Marmite Inox / مرمة إينوكس", sizes: "20 · 24 · 28 · 32 · 36 cm", tag: "INOX 18/10", cat: "Inox" },
];

const STATS = [
  { icon: "🏭", value: "+30 ans", label: "D'EXPERTISE" },
  { icon: "🍳", value: "3 Familles", label: "DE PRODUITS" },
  { icon: "🤝", value: "Membre", label: "CGEM & CFCIM" },
];

const SPECIALITES = [
  { icon: "🔥", title: "Aluminium", desc: "Performance thermique exceptionnelle et légèreté pour une cuisine quotidienne efficace.", color: RED },
  { icon: "🛡️", title: "Antiadhésif", desc: "Revêtements Granite et Teflon haute durabilité pour une cuisson saine sans ajout de graisse.", color: RED },
  { icon: "✨", title: "Inox", desc: "Acier Inoxydable 15/10 pour une durabilité illimitée et une hygiène irréprochable.", color: RED },
];

const QUALITIES = [
  { icon: <ShieldCheck />, title: "Certification ISO 9001", desc: "Garantie de processus industriels maîtrisés." },
  { icon: <AwardIcon />, title: "Membre CGEM & CFCIM", desc: "Acteur engagé du tissu économique marocain." },
  { icon: <HandshakeIcon />, title: "Partenaire Retail", desc: "Présent chez Marjane, Carrefour et Aswaq Assalam." },
];

const FOOTER_NAV = ["Accueil", "L'entreprise", "Nos produits", "Recettes"];
const FOOTER_SUPPORT = ["Maintenance", "Réclamations", "Service Client", "Mentions Légales"];

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav style={{ background: "#fff", borderBottom: `1px solid ${BORDER}`, position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, background: NAVY, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 13 }}>T</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15, color: NAVY, lineHeight: 1 }}>TITANIC</div>
            <div style={{ fontSize: 9, color: "#888", letterSpacing: ".1em", textTransform: "uppercase" }}>Industrie Productive</div>
          </div>
        </div>
        {/* Desktop Nav */}
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {["Accueil", "L'entreprise", "Nos produits", "Recettes", "Contact"].map((item) => (
            <a key={item} href="#" className="nav-link" style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {item}
              {(item === "Nos produits" || item === "Recettes") && <ChevronDown />}
            </a>
          ))}
        </div>
        {/* CTA + Admin */}
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="btn-red" style={{ padding: "9px 20px", fontSize: 13 }}>Demander un devis</button>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#666", cursor: "pointer" }}>
            <div style={{ width: 28, height: 28, background: GRAY_BG, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: NAVY }}>A</div>
            admin
          </div>
        </div>
        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: NAVY }} className="hide-desktop">
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      {menuOpen && (
        <div style={{ background: "#fff", borderTop: `1px solid ${BORDER}`, padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          {["Accueil", "L'entreprise", "Nos produits", "Recettes", "Contact"].map((item) => (
            <a key={item} href="#" className="nav-link">{item}</a>
          ))}
          <button className="btn-red" style={{ alignSelf: "flex-start" }}>Demander un devis</button>
        </div>
      )}
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const [active, setActive] = useState(0);

  const ProductVisual = ({ slide, isActive }) => (
    <div style={{
      width: "100%", height: "100%", background: slide.bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "absolute", inset: 0,
      opacity: isActive ? 1 : 0,
      transition: "opacity .6s ease",
    }}>
      <div style={{ fontSize: 120, userSelect: "none" }}>🍳</div>
    </div>
  );

  return (
    <section style={{ background: "#fff", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="grid-2">
        {/* Left */}
        <div style={{ animation: "fadeUp .7s ease forwards" }}>
          <span className="tag-red" style={{ marginBottom: 16 }}>Industrie Marocaine Premium</span>
          <h1 className="hero-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 58, fontWeight: 800, lineHeight: 1.05, color: NAVY, marginTop: 12 }}>
            Articles ménagers fabriqués au Maroc
          </h1>
          <p style={{ marginTop: 20, fontSize: 15, lineHeight: 1.75, color: "#666", maxWidth: 420 }}>
            L'excellence de la cuisson industrielle et domestique depuis plus de 30 ans. Maîtrise parfaite de l'aluminium, de l'inox et des revêtements antiadhésifs.
          </p>
          <div style={{ marginTop: 28, display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
            <button className="btn-navy">Voir nos produits</button>
            <a href="#" className="btn-outline">
              <DownloadIcon /> Catalogue
            </a>
          </div>
        </div>

        {/* Right — Carousel */}
        <div style={{ position: "relative", animation: "fadeIn .8s .2s ease both" }}>
          {/* Main image area */}
          <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.14)", border: `1px solid ${BORDER}`, background: GRAY_BG, aspectRatio: "4/3", position: "relative" }}>
            {HERO_SLIDES.map((slide, i) => (
              <ProductVisual key={i} slide={slide} isActive={active === i} />
            ))}
            {/* Dots */}
            <div style={{ position: "absolute", top: 20, right: 20, display: "flex", gap: 8 }}>
              {HERO_SLIDES.map((_, i) => (
                <button key={i} className={`dot ${active === i ? "active" : ""}`} onClick={() => setActive(i)} />
              ))}
            </div>
          </div>

          {/* Info badge */}
          <div className="card" style={{ position: "absolute", bottom: -24, left: -20, right: 40, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 8px 32px rgba(0,0,0,.12)", background: "rgba(255,255,255,.97)", backdropFilter: "blur(8px)" }}>
            <div style={{ width: 52, height: 52, background: GRAY_BG, borderRadius: 12, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, border: `1px solid ${BORDER}` }}>
              🍳
            </div>
            <div style={{ overflow: "hidden", flex: 1 }}>
              <div style={{ fontWeight: 700, color: NAVY, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {HERO_SLIDES[active].title}
              </div>
              <div style={{ fontSize: 12, color: "#888", marginTop: 2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.4 }}>
                {HERO_SLIDES[active].desc}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <section style={{ background: GRAY_BG, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: "28px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, textAlign: "center" }} className="grid-3">
        {STATS.map((s) => (
          <div key={s.value} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, padding: "16px 24px", background: "#fff", borderRadius: 14, border: `1px solid ${BORDER}`, boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}>
            <span style={{ fontSize: 24 }}>{s.icon}</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: NAVY }}>{s.value}</div>
              <div style={{ fontSize: 10, letterSpacing: ".1em", color: "#999", textTransform: "uppercase", fontWeight: 600 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Specialties Section ──────────────────────────────────────────────────────
function SpecialtiesSection() {
  return (
    <section style={{ padding: "80px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: NAVY }}>Nos Spécialités Industrielles</h2>
          <p style={{ marginTop: 10, color: "#777", fontSize: 14, maxWidth: 480, margin: "10px auto 0" }}>
            Une gamme complète répondant aux exigences des particuliers comme des professionnels de la gastronomie.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }} className="grid-3">
          {SPECIALITES.map((s) => (
            <div key={s.title} className="card" style={{ padding: "28px 24px" }}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, color: NAVY, marginBottom: 8 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: "#777", lineHeight: 1.65 }}>{s.desc}</div>
              <div style={{ width: 32, height: 3, background: RED, borderRadius: 2, marginTop: 18 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Catalogue / Products Section ─────────────────────────────────────────────
function CatalogueSection() {
  const [filter, setFilter] = useState("Tout");
  const [page, setPage] = useState(0);
  const filters = ["Tout", "Antiadhesive", "Aluminium", "Inox"];
  const filtered = filter === "Tout" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === filter);
  const perPage = 3;
  const totalPages = Math.ceil(filtered.length / perPage);
  const visible = filtered.slice(page * perPage, page * perPage + perPage);

  const handleFilter = (f) => { setFilter(f); setPage(0); };

  return (
    <section id="catalogue" style={{ padding: "80px 24px", background: GRAY_BG }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: NAVY }}>Catalogue TITANIC</h2>
            <p style={{ color: "#777", fontSize: 13, marginTop: 6 }}>Explorez nos best-sellers et innovations récentes.</p>
          </div>
          <a href="#" className="btn-outline" style={{ alignSelf: "flex-start" }}>
            <DownloadIcon /> Télécharger le catalogue complet (PDF)
          </a>
        </div>
        {/* Filters */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
          {filters.map((f) => (
            <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => handleFilter(f)}>{f}</button>
          ))}
        </div>
        {/* Products Grid */}
        <div style={{ display: "flex", gap: 0, alignItems: "center" }}>
          <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: page === 0 ? "not-allowed" : "pointer", opacity: page === 0 ? 0.4 : 1, flexShrink: 0, marginRight: 12, transition: "all .2s" }}>
            <ChevronLeft />
          </button>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, flex: 1 }} className="grid-3">
            {visible.map((p) => (
              <div key={p.name} className="card product-card" style={{ overflow: "hidden" }}>
                {/* Image area */}
                <div style={{ background: "#eee", height: 180, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, position: "relative" }}>
                  🍳
                  <span className="tag-dark" style={{ position: "absolute", top: 12, left: 12, fontSize: 10 }}>{p.tag}</span>
                </div>
                {/* Info */}
                <div style={{ padding: "16px 18px 18px" }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: NAVY }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>{p.desc}</div>
                  <div style={{ fontSize: 11, color: "#aaa", marginTop: 10 }}>{p.ref}</div>
                  <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{p.sizes}</div>
                  <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 12, color: RED, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
                    Voir fiche →
                  </a>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: page >= totalPages - 1 ? "not-allowed" : "pointer", opacity: page >= totalPages - 1 ? 0.4 : 1, flexShrink: 0, marginLeft: 12, transition: "all .2s" }}>
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Quality + Contact Section ────────────────────────────────────────────────
function QualityContactSection() {
  const [form, setForm] = useState({ fullName: "", company: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSent(true);
    setForm({ fullName: "", company: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section style={{ padding: "80px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="grid-2">
        {/* Quality card */}
        <div style={{ background: NAVY, borderRadius: 20, padding: "40px 36px", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, lineHeight: 1.2 }}>Engagement Qualité & Partenariats</h2>
            <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 22 }}>
              {QUALITIES.map((q) => (
                <div key={q.title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div className="quality-icon">{q.icon}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{q.title}</div>
                    <div style={{ fontSize: 13, opacity: .65, marginTop: 2 }}>{q.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Logo area */}
          <div style={{ marginTop: 40, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,.1)" }}>
            <div style={{ fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", opacity: .3, textAlign: "center", marginBottom: 20 }}>Accréditations & Distribution</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 28, flexWrap: "wrap" }}>
              {["ISO 9001", "Marjane", "Marjane Market"].map((name) => (
                <div key={name} className="logo-img" style={{ width: 100, height: 60, background: "rgba(255,255,255,.9)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: NAVY, padding: "0 8px", textAlign: "center" }}>
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card" style={{ padding: "40px 36px", boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: NAVY }}>Demander un devis</h2>
          <p style={{ marginTop: 6, fontSize: 13, color: "#888" }}>Nos experts vous répondent sous 24h pour vos besoins pro ou particuliers.</p>
          <form style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16 }} onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="grid-2">
              <div>
                <label className="form-label">Nom Complet</label>
                <input required className="form-input" placeholder="Votre nom" value={form.fullName} onChange={set("fullName")} />
              </div>
              <div>
                <label className="form-label">Entreprise (Optionnel)</label>
                <input className="form-input" placeholder="Nom société" value={form.company} onChange={set("company")} />
              </div>
            </div>
            <div>
              <label className="form-label">Email</label>
              <input required type="email" className="form-input" placeholder="email@exemple.com" value={form.email} onChange={set("email")} />
            </div>
            <div>
              <label className="form-label">Message & Produits</label>
              <textarea required rows={4} className="form-input" placeholder="Décrivez vos besoins..." value={form.message} onChange={set("message")} style={{ resize: "none" }} />
            </div>
            <button type="submit" className="btn-red" disabled={submitting} style={{ width: "100%", padding: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 14 }}>
              {submitting ? (<><LoaderIcon /> Envoi en cours...</>) : sent ? "✓ Demande envoyée !" : "Envoyer ma demande"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ─── Social Section ───────────────────────────────────────────────────────────
function SocialSection() {
  const socials = [
    { icon: <FacebookIcon />, name: "FACEBOOK" },
    { icon: <InstagramIcon />, name: "INSTAGRAM" },
    { icon: <YoutubeIcon />, name: "YOUTUBE" },
    { icon: <WhatsappIcon />, name: "WHATSAPP" },
  ];
  return (
    <section style={{ padding: "60px 24px", background: GRAY_BG, textAlign: "center" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: NAVY }}>Restons Connectés</h2>
        <p style={{ marginTop: 8, fontSize: 13, color: "#888" }}>Suivez nos actualités et découvrez nos nouveaux produits sur les réseaux sociaux.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 28, flexWrap: "wrap" }}>
          {socials.map((s) => (
            <a key={s.name} href="#" className="social-btn">
              <div className="social-icon">{s.icon}</div>
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: NAVY, color: "#fff", padding: "60px 24px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: 40, paddingBottom: 48 }} className="grid-2" >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, background: RED, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 14 }}>T</span>
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 16, letterSpacing: ".04em" }}>STE<span style={{ color: RED }}>GDB</span></div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.75, color: "rgba(255,255,255,.55)", maxWidth: 240 }}>
              L'excellence de la cuisson industrielle au service du Maroc. Côté Maroc, fabrique des ustensiles de cuisine haut de gamme depuis 1991.
            </p>
          </div>
          {/* Navigation */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 16 }}>Navigation</div>
            {FOOTER_NAV.map((item) => <a key={item} href="#" className="footer-link">{item}</a>)}
          </div>
          {/* Support */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 16 }}>Support</div>
            {FOOTER_SUPPORT.map((item) => <a key={item} href="#" className="footer-link">{item}</a>)}
          </div>
          {/* Contact */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 16 }}>Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start", color: "rgba(255,255,255,.55)", fontSize: 13 }}>
                <span style={{ marginTop: 1, opacity: .7 }}><MapPinIcon /></span>
                Fès, Maroc — Zone Industrielle
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", color: "rgba(255,255,255,.55)", fontSize: 13 }}>
                <span style={{ opacity: .7 }}><PhoneIcon /></span>
                +212 535 728 168
              </div>
            </div>
          </div>
        </div>
        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", padding: "20px 0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,.3)" }}>© 2026 TITANIC — L'atelier de la Cuisson Industrielle.</span>
          <div style={{ display: "flex", gap: 20 }}>
            {["Confidentialité", "Cookies"].map((t) => (
              <a key={t} href="#" style={{ color: "rgba(255,255,255,.3)", fontSize: 12, textDecoration: "none" }}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function TitanicLandingPage() {
  return (
    <>
      <style>{css}</style>
      <Navbar />
      <HeroSection />
      <StatsBar />
      <SpecialtiesSection />
      <CatalogueSection />
      <QualityContactSection />
      <SocialSection />
      <Footer />
    </>
  );
}
