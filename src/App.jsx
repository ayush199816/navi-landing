import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const packageData = {
  pkg1: {
    title: "Phuket & Phi Phi Island Escape",
    price: "USD 149 per pax",
    duration: "4N / 5D",
    itinerary: [
      { day: "Day 1", text: "Arrival at Phuket International Airport (HKT). Private van transfer to beach resort & leisure evening." },
      { day: "Day 2", text: "Full day Phi Phi Islands tour by private speedboat with lunch, snorkeling, and Maya Bay visit." },
      { day: "Day 3", text: "Phuket City Tour: Big Buddha, Wat Chalong, Old Phuket Town & Promthep Cape Sunset." },
      { day: "Day 4", text: "Leisure day at Patong Beach or optional Elephant Sanctuary / Hanuman World Zip line activity." },
      { day: "Day 5", text: "Breakfast at hotel, souvenir shopping, and private airport drop-off for departure." }
    ]
  },
  pkg2: {
    title: "Bangkok & Pattaya Highlights",
    price: "USD 189 per pax",
    duration: "5N / 6D",
    itinerary: [
      { day: "Day 1", text: "Arrival in Bangkok Suvarnabhumi Airport (BKK). Private transfer to Pattaya hotel & evening Alcazar Show." },
      { day: "Day 2", text: "Coral Island (Koh Larn) Speedboat Tour with Indian buffet lunch & water sports activities." },
      { day: "Day 3", text: "Check-out Pattaya. En-route Bangkok City & Temple Tour (Golden Buddha & Marble Temple)." },
      { day: "Day 4", text: "Full Day Safari World & Marine Park with international buffet lunch." },
      { day: "Day 5", text: "Shopping day at Platinum Fashion Mall, MBK Center & Chao Phraya Princess Dinner Cruise." },
      { day: "Day 6", text: "Breakfast, hotel check-out, and private transfer to Bangkok Airport." }
    ]
  },
  pkg3: {
    title: "Romantic Krabi & Phuket Island Getaway",
    price: "USD 299 per pax",
    duration: "5N / 6D",
    itinerary: [
      { day: "Day 1", text: "Arrival at Krabi Airport (KBV). Private transfer to cliffside resort in Ao Nang." },
      { day: "Day 2", text: "Krabi 4-Island Tour by Speedboat (Phra Nang Cave, Tup Island, Chicken Island & Poda Island)." },
      { day: "Day 3", text: "Scenic land transfer from Krabi to Phuket with a stop at Samet Nangshe Viewpoint." },
      { day: "Day 4", text: "Check-in to Phuket Private Pool Villa. Evening romantic candlelight dinner." },
      { day: "Day 5", text: "James Bond Island & Phang Nga Bay Sea Canoe Tour by Speedboat." },
      { day: "Day 6", text: "In-villa breakfast, leisure time, and private transfer to Phuket Airport." }
    ]
  }
};

export default function App() {
  const heroWrapperRef = useRef(null);
  const shadeGroupRef = useRef(null);
  const isShadeClosedRef = useRef(false);

  // Modal State
  const [activePackage, setActivePackage] = useState(null);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    contactNumber: '',
    paxCount: '',
    travelDates: '',
    estimatedBudget: ''
  });

  useEffect(() => {
    // Parallax ScrollTrigger Animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroWrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    tl.to("#windowShadeGroup", { y: -380, duration: 1.5, ease: "power1.out" }, 0)
      .to("#heroContent", { opacity: 0, scale: 0.8, y: -100, duration: 1, ease: "power2.inOut" }, 0)
      .to("#windowFrame", { scale: 5, transformOrigin: "center center", opacity: 0, duration: 3, ease: "power2.inOut" }, 0.5)
      .to("#skyBg", { scale: 1.15, y: -40, filter: "brightness(1.1) contrast(1.0)", duration: 3, ease: "power1.out" }, 0);

    // Header Background Scroll Trigger
    gsap.to("#siteHeader", {
      backgroundColor: "rgba(255, 255, 255, 0.92)",
      color: "#0f172a",
      boxShadow: "0 18px 60px rgba(15, 23, 42, 0.12)",
      backdropFilter: "blur(16px)",
      scrollTrigger: {
        trigger: heroWrapperRef.current,
        start: "60% top",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleShadeClick = (e) => {
    e.stopPropagation();
    gsap.to("#windowShadeGroup", {
      y: isShadeClosedRef.current ? -180 : 0,
      duration: 0.6,
      ease: "power2.out"
    });
    isShadeClosedRef.current = !isShadeClosedRef.current;
  };

  const openModal = (packageKey) => {
    setActivePackage(packageData[packageKey]);
  };

  const closeModal = () => {
    setActivePackage(null);
    setFormData({
      companyName: '',
      contactPerson: '',
      contactNumber: '',
      paxCount: '',
      travelDates: '',
      estimatedBudget: ''
    });
  };

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if (!activePackage) return;

    const itineraryText = activePackage.itinerary
      .map(i => `• *${i.day}:* ${i.text}`)
      .join('\n');

    const message = 
`*B2B CUSTOMIZATION REQUEST - NAVIGATIO ASIA DMC*
---------------------------------------
*Package:* ${activePackage.title} (${activePackage.duration})
*Base Price:* ${activePackage.price}

*PARTNER DETAILS:*
🏢 *Company Name:* ${formData.companyName}
👤 *Contact Person:* ${formData.contactPerson}
📞 *WhatsApp / Phone:* ${formData.contactNumber}

*TRIP REQUIREMENTS:*
👥 *Number of Pax:* ${formData.paxCount} Pax
📅 *Expected Dates:* ${formData.travelDates}
💰 *Estimated Budget:* ${formData.estimatedBudget || 'Flexible'}

*INCLUDED ITINERARY:*
${itineraryText}

---------------------------------------
_Please share a customized B2B quotation for this requirement._`;

    window.open(`https://wa.me/919628912345?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      {/* Site Header */}
      <header class="site-header" id="siteHeader">
        <div class="site-logo">Navigatio Asia</div>
        <nav class="nav-links">
          <a class="nav-link" href="#heroWrapper">Home</a>
          <a class="nav-link" href="#tours">Tours</a>
          <a class="nav-link" href="#packages">Packages</a>
          <a class="nav-link" href="#advantages">Advantages</a>
          <a class="nav-link" href="#confidence">Confidence</a>
          <a class="nav-link" href="#howItWorks">Process</a>
          <a class="nav-link" href="#whyChoose">Why Us</a>
          <a class="nav-link" href="#clients">Clients</a>
          <a class="nav-link" href="#contact">Contact</a>
        </nav>
        <a class="btn-nav" href="https://wa.me/919628912345" target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </header>

      {/* Hero Wrapper */}
      <div class="hero-wrapper" id="heroWrapper" ref={heroWrapperRef}>
        <div class="sticky-viewport">
          <video
            class="sky-bg"
            id="skyBg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
            src="https://res.cloudinary.com/dqlcup2s7/video/upload/v1786101488/Untitled_design_ecocje.mp4"
          >
            Your browser does not support video playback.
          </video>

          <div class="window-frame-container" id="windowFrame">
            <svg class="window-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <mask id="windowMask">
                  <rect width="100%" height="100%" fill="white" />
                  <rect x="710" y="240" width="500" height="600" rx="220" fill="black" />
                </mask>

                <clipPath id="windowClip">
                  <rect x="710" y="240" width="500" height="600" rx="220" />
                </clipPath>

                <linearGradient id="shadeBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#d8dcde" />
                  <stop offset="70%" stopColor="#bdc3c7" />
                  <stop offset="100%" stopColor="#a4abaf" />
                </linearGradient>

                <linearGradient id="handleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#91989d" />
                  <stop offset="50%" stopColor="#b0b6ba" />
                  <stop offset="100%" stopColor="#d4d8db" />
                </linearGradient>

                <linearGradient id="bevelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#e6eaed" />
                  <stop offset="50%" stopColor="#b1b7bc" />
                  <stop offset="100%" stopColor="#8a9095" />
                </linearGradient>

                <filter id="shadeShadow" x="-20%" y="-20%" width="140%" height="160%">
                  <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#000000" floodOpacity="0.35" />
                </filter>
              </defs>
              
              <rect width="100%" height="100%" fill="#dbeafe" mask="url(#windowMask)" />
              <rect x="690" y="220" width="540" height="640" rx="240" fill="none" stroke="url(#bevelGrad)" strokeWidth="24" />
              <rect x="704" y="234" width="512" height="612" rx="226" fill="none" stroke="#1e252f" strokeWidth="12" opacity="0.6" />

              <g clipPath="url(#windowClip)">
                <g id="windowShadeGroup" class="window-shade-group" transform="translate(0, -180)" onClick={handleShadeClick} ref={shadeGroupRef}>
                  <rect x="700" y="0" width="520" height="520" fill="url(#shadeBodyGrad)" filter="url(#shadeShadow)" />
                  <path d="M 700 500 Q 960 545 1220 500 L 1220 535 Q 960 575 700 535 Z" fill="url(#bevelGrad)" />
                  <path d="M 840 512 Q 960 534 1080 512 Q 960 522 840 512 Z" fill="url(#handleGrad)" />
                  <path d="M 840 512 Q 960 534 1080 512" fill="none" stroke="#71777b" strokeWidth="2" opacity="0.6" />
                </g>
              </g>
            </svg>
          </div>

          <div class="hero-content" id="heroContent">
            <div class="hero-tagline">Beach. Water. Air. Travel. Sleep.</div>
            <h1 class="hero-title">Plan a trip<br />that feels effortless</h1>
            <p class="hero-description">Tell us your dates and budget on WhatsApp. We’ll recommend the best tours, transfers, and stays.</p>
          </div>

          <div class="vignette-overlay"></div>
        </div>
      </div>

      {/* Section 1 */}
      <section class="content-section section-blue" id="tours">
        <div class="section-inner">
          <div class="panel-header-wrapper" style={{ marginBottom: '2rem' }}>
            <div class="panel-header-left">
              <div class="panel-tagline" style={{ color: '#032b5e' }}>Beach. Water. Air. Travel. Sleep.</div>
              <h2>Plan a trip that feels effortless</h2>
            </div>
            <div class="panel-header-right">
              <p>Tell us your dates and budget on WhatsApp. We’ll recommend the best tours, transfers, and stays.</p>
            </div>
          </div>
          <div class="button-group">
            <a class="btn-primary" href="https://wa.me/919628912345" target="_blank" rel="noopener noreferrer">Get a plan on WhatsApp</a>
            <a class="btn-secondary" href="https://www.bookmysight.com/tours" target="_blank" rel="noopener noreferrer">Explore BookMySight Tours</a>
          </div>
          <div class="badge-list">
            <span class="badge">Handpicked itineraries</span>
            <span class="badge">Fast quotes</span>
            <span class="badge">On-trip support</span>
          </div>
        </div>
      </section>

      {/* Section 2: Packages */}
      <section class="content-section section-white" id="packages">
        <div class="section-inner">
          <div class="panel-header-wrapper">
            <div class="panel-header-left">
              <div class="panel-tagline" style={{ color: '#032b5e' }}>Curated Thailand Itineraries</div>
              <h2>Featured Packages</h2>
            </div>
            <div class="panel-header-right">
              <p>Handcrafted B2B packages with direct ground handling, competitive net rates, and flexible customization • Currency: USD</p>
            </div>
          </div>

          <div class="packages-grid">
            <div class="package-card">
              <div class="package-image-container">
                <img class="package-image" src="https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQsv7TtGRXgSUwiarxsPfU6kmO5KXLkWY2KaeRzVkHHs1Krv4V7itzUlZtTYxwbb1TWNgTZ16pdH_zC_r4" alt="Phuket Island Explorer" />
                <div class="duration-badge">📅 4N / 5D</div>
                <div class="price-badge">USD 149 <span>per pax</span></div>
              </div>
              <div class="package-content">
                <h3 class="package-card-title">Phuket & Phi Phi Island Escape</h3>
                <div class="accommodation-section">
                  <span class="accommodation-label">Accommodation</span>
                  <span class="hotel-tag">4N Phuket Beach Resort • Superior Room</span>
                  <span class="hotel-tag">Speedboat Transfers + Phi Phi Tour Included</span>
                </div>
                <div class="package-actions">
                  <button class="btn-pkg-primary" onClick={() => openModal('pkg1')}>Request Customization</button>
                  <button class="btn-pkg-outline" onClick={() => openModal('pkg1')}>Enquire Now</button>
                </div>
              </div>
            </div>

            <div class="package-card">
              <div class="package-image-container">
                <img class="package-image" src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSiI7AgKCLN4VbNFzy5DH8J6hnWOIv9EPYzSumEX0WDjJ0gvtBJD3Hv8wU13ecvLE5-NM7H_WLYei843Fk" alt="Bangkok & Pattaya Discovery" />
                <div class="duration-badge">📅 5N / 6D</div>
                <div class="price-badge">USD 189 <span>per pax</span></div>
              </div>
              <div class="package-content">
                <h3 class="package-card-title">Bangkok & Pattaya Highlights</h3>
                <div class="accommodation-section">
                  <span class="accommodation-label">Accommodation</span>
                  <span class="hotel-tag">2N Pattaya City Hotel • Deluxe Room</span>
                  <span class="hotel-tag">3N Bangkok Central Stay • Standard Room</span>
                </div>
                <div class="package-actions">
                  <button class="btn-pkg-primary" onClick={() => openModal('pkg2')}>Request Customization</button>
                  <button class="btn-pkg-outline" onClick={() => openModal('pkg2')}>Enquire Now</button>
                </div>
              </div>
            </div>

            <div class="package-card">
              <div class="package-image-container">
                <img class="package-image" src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTU_8my1CoNU4-XiOsVw9FnF-soB6gckmMgOoC4rOKqUHdojx4mA8C9wTfrONfNYpxEgR1l5g67TnvY-z8" alt="Romantic Krabi & Phuket" />
                <div class="duration-badge">📅 5N / 6D</div>
                <div class="price-badge">USD 299 <span>per pax</span></div>
              </div>
              <div class="package-content">
                <h3 class="package-card-title">Romantic Krabi & Phuket Island Getaway</h3>
                <div class="accommodation-section">
                  <span class="accommodation-label">Accommodation</span>
                  <span class="hotel-tag">3N Krabi Cliffside Resort • Deluxe Room</span>
                  <span class="hotel-tag">2N Phuket Private Pool Villa</span>
                </div>
                <div class="package-actions">
                  <button class="btn-pkg-primary" onClick={() => openModal('pkg3')}>Request Customization</button>
                  <button class="btn-pkg-outline" onClick={() => openModal('pkg3')}>Enquire Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Advantages */}
      <section class="content-section section-blue" id="advantages">
        <div class="section-inner">
          <div class="panel-header-wrapper">
            <div class="panel-header-left">
              <div class="panel-tagline" style={{ color: '#032b5e' }}>Ground Handling & Logistics</div>
              <h2>Direct Operations.<br />Zero Middlemen.</h2>
            </div>
            <div class="panel-header-right">
              <p>We own and manage our core ground infrastructure in Thailand to deliver competitive rates, guaranteed asset quality, and uninterrupted execution for travel partners.</p>
            </div>
          </div>

          <div class="b2b-grid">
            <div class="b2b-card">
              <div class="b2b-card-icon">🚤</div>
              <h3>Owned Speedboats</h3>
              <p>Private fleet for island hopping, Phi Phi, and Krabi transfers with guaranteed departure schedules.</p>
            </div>
            <div class="b2b-card">
              <div class="b2b-card-icon">🚐</div>
              <h3>Owned Vehicles</h3>
              <p>Modern fleet of SUVs and passenger vans maintained for reliable, comfortable airport & intra-city transfers.</p>
            </div>
            <div class="b2b-card">
              <div class="b2b-card-icon">📍</div>
              <h3>Local Office</h3>
              <p>On-ground operational offices in Thailand providing direct control over logistics and local supplier coordination.</p>
            </div>
            <div class="b2b-card">
              <div class="b2b-card-icon">🎧</div>
              <h3>24/7 B2B Operations</h3>
              <p>Dedicated round-the-clock partner desk for quick booking confirmations, re-routing, and live guest assistance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Confidence */}
      <section class="content-section section-white" id="confidence">
        <div class="section-inner">
          <div class="panel-header-wrapper">
            <div class="panel-header-left">
              <div class="panel-tagline" style={{ color: '#032b5e' }}>Partner Peace of Mind</div>
              <h2>Book with Confidence</h2>
            </div>
            <div class="panel-header-right">
              <p>Flexible terms, safe bookings, and reliable ground support — so you can focus entirely on growing your client relationships.</p>
            </div>
          </div>

          <div class="confidence-grid">
            <div class="confidence-card">
              <div class="confidence-icon">🔒</div>
              <h3>Secure Your Spot</h3>
              <p>Pay 20% to confirm your client's reservation.</p>
            </div>
            <div class="confidence-card">
              <div class="confidence-icon">🔄</div>
              <h3>Free Cancellation</h3>
              <p>Flexible cancellation terms available on group trips.</p>
            </div>
            <div class="confidence-card">
              <div class="confidence-icon">📅</div>
              <h3>Reschedule Anytime</h3>
              <p>Adjust travel dates with zero extra administrative charges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Process */}
      <section class="content-section section-blue" id="howItWorks">
        <div class="section-inner">
          <div class="panel-header-wrapper">
            <div class="panel-header-left">
              <div class="panel-tagline" style={{ color: '#032b5e' }}>Seamless Collaboration</div>
              <h2>How It Works</h2>
            </div>
            <div class="panel-header-right">
              <p>Our streamlined process makes it simple for travel partners to deliver exceptional experiences to their clients.</p>
            </div>
          </div>

          <div class="steps-container">
            <div class="step-card">
              <div class="step-number-badge">1</div>
              <h3>Share Client Requirements</h3>
              <p>Simply tell us what your clients need – destination preferences, budget, group size, and special requests. We'll handle the rest.</p>
            </div>
            <div class="step-connector">➔</div>
            <div class="step-card">
              <div class="step-number-badge">2</div>
              <h3>Get Proposal</h3>
              <p>Receive a comprehensive, customized itinerary with pricing, accommodations, and activities tailored for your request.</p>
            </div>
            <div class="step-connector">➔</div>
            <div class="step-card">
              <div class="step-number-badge">3</div>
              <h3>Confirm & Relax</h3>
              <p>Once approved, we take care of all ground arrangements, local coordination, and 24/7 support so you can focus on your clients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Dark Banner */}
      <section class="content-section section-dark" id="whyChoose">
        <div class="section-inner">
          <div class="panel-header-wrapper" style={{ marginBottom: 0 }}>
            <div class="panel-header-left">
              <div class="panel-tagline">Destination Excellence</div>
              <h2>Why Choose Navigatio Asia?</h2>
              <p style={{ color: '#38bdf8', fontSize: '1.3rem', fontWeight: 700, marginTop: '0.5rem', lineHeight: 1.3 }}>
                Your Trusted Partner Ground Handling in Thailand.
              </p>
            </div>
            <div class="panel-header-right">
              <p>100% Customisation · 24×7 Concierge · Direct Ground Operations · 95% Visa Success · 150k+ Travellers Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Clients */}
      <section class="content-section section-white" id="clients">
        <div class="section-inner">
          <div class="panel-header-wrapper" style={{ marginBottom: '2rem' }}>
            <div class="panel-header-left">
              <div class="panel-tagline" style={{ color: '#032b5e' }}>Trusted Partnerships</div>
              <h2>Our Valuable Clients</h2>
            </div>
            <div class="panel-header-right">
              <p>Empowering leading travel brands, agencies, and group operators with seamless DMC handling across Thailand.</p>
            </div>
          </div>

          <div class="clients-grid">
            <div class="client-card">
              <img class="client-logo-img" src="https://storage.googleapis.com/storage.justwravel.com/remote-public/logo/JW-logo-dark.png" alt="Just Wravel" />
            </div>
            <div class="client-card">
              <img class="client-logo-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHx48dVxZw5mQleZlRYo9g28OsLIX2s-L198fgjJCsCmW_HPPlVamYCoI&s=10" alt="Capture A Trip" />
            </div>
            <div class="client-card">
              <img class="client-logo-img" src="https://www.deshvideshtravels.com/_next/image?url=https%3A%2F%2Fdeshvideshprod.s3.ap-south-1.amazonaws.com%2Fwebsite-static%2Flogo-light-theme.webp&w=1920&q=75" alt="Desh Videsh" />
            </div>
            <div class="client-card">
              <svg class="client-logo-svg" viewBox="0 0 240 60" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 42 L32 15 L46 42 L39 42 L32 27 L25 42 Z" fill="#2563eb" />
                <circle cx="32" cy="18" r="3" fill="#10b981" />
                <text x="54" y="32" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="18" fill="#0f172a">ASIATIC</text>
                <text x="132" y="32" fontFamily="system-ui, sans-serif" fontWeight="400" fontSize="18" fill="#2563eb">IDEA</text>
              </svg>
            </div>
            <div class="client-card">
              <div class="client-more-badge">+ And Many More</div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Detail Modal */}
      {activePackage && (
        <div class="package-modal-overlay active" id="packageModal">
          <div class="package-modal-box">
            <button class="modal-close-btn" onClick={closeModal}>✕</button>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
              📅 {activePackage.duration}
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#041c3d', marginBottom: '0.5rem' }}>
              {activePackage.title}
            </h3>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0284c7', marginBottom: '1.25rem' }}>
              {activePackage.price}
            </div>

            <div class="itinerary-section">
              <h4><span>🗓️</span> Day-wise Itinerary</h4>
              <div class="itinerary-timeline">
                {activePackage.itinerary.map((item, idx) => (
                  <div key={idx} class="itinerary-day-item">
                    <div class="day-item-header">{item.day}</div>
                    <div class="day-item-text">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>

            <form class="custom-form" onSubmit={handleWhatsAppSubmit}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#041c3d', marginBottom: '0.25rem' }}>
                Request B2B Customization
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>
                Fill in your details below. We'll immediately compile and send your request via WhatsApp.
              </p>
              
              <div class="form-grid">
                <div class="form-group">
                  <label htmlFor="companyName">Company Name *</label>
                  <input type="text" id="companyName" class="form-input" placeholder="e.g. Travel Express India" required value={formData.companyName} onChange={handleFormChange} />
                </div>
                <div class="form-group">
                  <label htmlFor="contactPerson">Contact Person *</label>
                  <input type="text" id="contactPerson" class="form-input" placeholder="e.g. Rahul Sharma" required value={formData.contactPerson} onChange={handleFormChange} />
                </div>
                <div class="form-group">
                  <label htmlFor="contactNumber">WhatsApp Number *</label>
                  <input type="tel" id="contactNumber" class="form-input" placeholder="e.g. +91 9876543210" required value={formData.contactNumber} onChange={handleFormChange} />
                </div>
                <div class="form-group">
                  <label htmlFor="paxCount">Number of Pax *</label>
                  <input type="number" id="paxCount" class="form-input" min="1" placeholder="e.g. 12" required value={formData.paxCount} onChange={handleFormChange} />
                </div>
                <div class="form-group">
                  <label htmlFor="travelDates">Expected Dates *</label>
                  <input type="text" id="travelDates" class="form-input" placeholder="e.g. Oct 15 - Oct 20" required value={formData.travelDates} onChange={handleFormChange} />
                </div>
                <div class="form-group">
                  <label htmlFor="estimatedBudget">Budget (Per Pax / Total)</label>
                  <input type="text" id="estimatedBudget" class="form-input" placeholder="e.g. USD 150 / pax" value={formData.estimatedBudget} onChange={handleFormChange} />
                </div>
              </div>

              <button type="submit" class="btn-submit-whatsapp">
                <span>💬</span> Send Customization Request via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer class="site-footer" id="contact">
        <div class="footer-container">
          <div class="footer-col-about">
            <div class="footer-logo">
              Navigatio Asia
              <span class="footer-logo-sub">DMC</span>
            </div>
            <p class="footer-about-text">
              Navigatio Asia DMC is a premier Thailand Destination Management Company helping Indian travel partners create unforgettable Southeast Asian experiences. Combining local on-ground knowledge, owned infrastructure, and dedicated B2B service to make ground handling effortless.
            </p>
            <div class="footer-social-wrapper">
              <h5>Connect With Us</h5>
              <div class="social-icons-list">
                <a href="#" class="social-icon-btn" aria-label="Facebook">f</a>
                <a href="#" class="social-icon-btn" aria-label="Instagram">ig</a>
                <a href="#" class="social-icon-btn" aria-label="LinkedIn">in</a>
              </div>
            </div>
          </div>

          <div class="footer-col-links">
            <h4>Quick Links</h4>
            <ul class="footer-links-list">
              <li><a href="#tours">Packages</a></li>
              <li><a href="#advantages">Visa Assistance</a></li>
              <li><a href="#whyChoose">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div class="footer-col-links">
            <h4>Travel Partners</h4>
            <ul class="footer-links-list">
              <li><a href="https://wa.me/919628912345" target="_blank" rel="noopener noreferrer">Partner Login</a></li>
              <li><a href="https://wa.me/919628912345" target="_blank" rel="noopener noreferrer">Become a Partner</a></li>
              <li><a href="https://wa.me/919628912345" target="_blank" rel="noopener noreferrer">Agent Support</a></li>
            </ul>
          </div>

          <div class="footer-col-contact">
            <h4>Contact Info</h4>
            <div class="contact-block">
              <div class="contact-block-title">Thailand Office</div>
              <div class="contact-block-text">
                912 Rama 3rd Road, Bang Phong Phang,<br />
                Yan Nawa, Bangkok - 10120, Thailand
              </div>
            </div>
            <div class="contact-block">
              <div class="contact-block-title">India Office</div>
              <div class="contact-block-text">
                Navigatio Operations HQ<br />
                New Delhi, India
              </div>
            </div>
            <div class="contact-block">
              <div class="contact-block-title">Phone & WhatsApp</div>
              <div class="contact-block-text">
                <a href="https://wa.me/919628912345" target="_blank" rel="noopener noreferrer">+91 96289 12345</a><br />
                <a href="https://wa.me/919219755463" target="_blank" rel="noopener noreferrer">+91 92197 55463</a>
              </div>
            </div>
            <div class="contact-block">
              <div class="contact-block-title">Email</div>
              <div class="contact-block-text">
                <a href="mailto:navigatio.asia@hotmail.com">navigatio.asia@hotmail.com</a><br />
                <a href="mailto:navigatio.connect@hotmail.com">navigatio.connect@hotmail.com</a><br />
                <a href="mailto:contact@navigatioasia.com">contact@navigatioasia.com</a><br />
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div>© 2026 Navigatio Asia DMC. All rights reserved.</div>
          <div>Powering B2B Travel Experiences Across Thailand</div>
        </div>
      </footer>
    </>
  );
}