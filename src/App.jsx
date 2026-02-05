import React, { useState } from "react";
import { motion } from "framer-motion";
import BackToTopButton from "./components/BackToTopButton";
import MenuSection from "./components/MenuSection";
import GallerySection from "./components/GallerySection";
import { ModeToggle } from "../components/mode-toggle";

const LogoIcon = () => (
  <svg
    className="w-14 h-14 inline-block align-middle transform translate-y-1"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="5" width="12" height="10" rx="2" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="0.75" />
    <path d="M15.5 7.5c1.2 0 2.2 1 2.2 2.2s-1 2.2-2.2 2.2" stroke="#D1D5DB" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M8.8 9.6c0-.9.73-1.6 1.6-1.6.5 0 .9.25 1.2.63.28-.38.68-.63 1.2-.63.87 0 1.6.73 1.6 1.6 0 1.6-1.9 3.2-2.8 3.9-.4.3-.7.45-1 .45s-.6-.15-1-.45c-.9-.65-2.8-2.3-2.8-3.9z" fill="#F97316" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Navigation Link with smooth scroll
const NavLink = ({ href, children, isActive = false }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
        isActive
          ? "text-orange-500 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30"
          : "text-gray-700 dark:text-[#E6DACD] hover:text-orange-500 dark:hover:text-orange-400"
      }`}
    >
      {children}
    </a>
  );
};

// Mobile Menu
const MobileMenu = ({ isOpen, navItems, onLinkClick }) => (
  <div
    className={`
      md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-[#3B2F2F]/95 backdrop-blur-sm border-t border-gray-200 dark:border-[#5A463F] shadow-lg
      transition-all duration-300 ease-in-out
      ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
  `}
  >
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      {navItems.map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase().replace(" ", "-")}`}
          onClick={onLinkClick}
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-[#E6DACD] hover:text-orange-500 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-[#5A463F]"
        >
          {item}
        </a>
      ))}
    </div>
  </div>
);

const HeaderSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ["Menu", "Gallery", "About Us", "Contact"];

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#3B2F2F] shadow-sm pt-[env(safe-area-inset-top)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div
            className="flex-shrink-0 flex items-center gap-1 cursor-pointer transform transition-transform duration-300 hover:scale-105"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <LogoIcon />
            <span className="text-xl font-bold text-gray-900 dark:text-[#F5EFE6]">Heartbeat Cafe</span>
          </div>
          <nav className="hidden md:flex items-center space-x-2 bg-gray-100/50 dark:bg-[#4A352F]/50 p-1 rounded-full">
            {navItems.map((item) => (
              <NavLink
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
              >
                {item}
              </NavLink>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <ModeToggle />
          </div>
          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-[#E6DACD] hover:text-gray-900 dark:hover:text-[#F5EFE6] hover:bg-gray-100 dark:hover:bg-amber-800/30 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 cursor-pointer"
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>
      <MobileMenu isOpen={isMenuOpen} navItems={navItems} onLinkClick={() => setIsMenuOpen(false)} />
    </header>
  );
};

// Section animation variants
const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Hero = () => (
  <motion.section
    className="relative min-h-[85vh] flex items-center justify-center text-center px-4 scroll-mt-20 overflow-hidden"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={sectionVariant}
  >
    <div className="absolute inset-0">
      <img src="/images/img10.jpg" alt="Coffee shop background" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 dark:from-black/70 dark:via-black/60 dark:to-black/80" />
    </div>
    <div className="relative z-10 max-w-4xl mx-auto text-white">
      <h1 className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
        Fueling <span className="text-amber-600">Heartbeats</span> with every{" "}
        <span className="text-amber-600">brew</span>
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-200">
        Savor each handcrafted cup, where rich aromas and bold flavors come together to brighten your day and awaken your senses.
      </p>
    </div>
  </motion.section>
);

// const MenuSection = () => (
//   <motion.section
//     id="menu"
//     className="relative z-10 py-16 sm:py-24 px-4 bg-gray-50 dark:bg-[#4A352F]/30 scroll-mt-20"
//     initial="hidden"
//     whileInView="visible"
//     viewport={{ once: true, amount: 0.2 }}
//     variants={sectionVariant}
//   >
//     <div className="max-w-6xl mx-auto text-center">
//       <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-[#F5EFE6] mb-12">Our Menu</h2>
//       <p className="text-gray-600 dark:text-[#E6DACD] max-w-2xl mx-auto">
//         Discover our carefully curated selection of specialty coffees and beverages.
//       </p>
//     </div>
//   </motion.section>
// );

const AboutSection = () => (
  <motion.section
    id="about-us"
    className="relative z-10 py-16 sm:py-24 px-4 bg-gray-50 dark:bg-[#4A352F]/30 scroll-mt-20"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={sectionVariant}
  >
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-[#F5EFE6] mb-6">About Us</h2>
      <p className="text-gray-700 dark:text-[#E6DACD] text-lg sm:text-xl max-w-3xl mx-auto mb-6">
        At Heartbeat Cafe, we brew more than coffee — we craft moments. Every cup is hand-selected, roasted to perfection, and served with a smile. From our cozy corner to your table, we strive to make every visit feel like home.
      </p>
      <p className="text-gray-600 dark:text-[#D8CFC1] text-base max-w-2xl mx-auto">
        Our passion for coffee drives everything we do. Whether it’s a latte with a perfect heart or a quiet corner to read and relax, Heartbeat Cafe is here to brighten your day, one sip at a time.
      </p>
    </div>
  </motion.section>
);

const ContactSection = () => (
  <motion.section
    id="contact"
    className="relative z-10 py-16 sm:py-24 px-4 scroll-mt-20 bg-gray-50 dark:bg-[#4A352F]/30"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={sectionVariant}
  >
    
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-[#F5EFE6] mb-12">
        Contact Us
      </h2>

      <div className="flex flex-col md:flex-row gap-12 md:gap-8 items-start">
        {/* Left Column: Contact Info */}
        <div className="md:w-1/2 space-y-6">
          <p className="text-gray-600 dark:text-[#E6DACD] text-lg">
            We'd love to hear from you! Reach out for inquiries, reservations, or just to say hello.
          </p>

          <div className="space-y-3">
            <p className="flex items-center gap-2 text-gray-700 dark:text-[#F5EFE6]">
              <span className="font-semibold">Phone:</span>
              <a href="tel:+639171234567" className="text-orange-500 hover:underline">
                +63 917 123 4567
              </a>
            </p>

            {/* <p className="flex items-center gap-2 text-gray-700 dark:text-[#F5EFE6]">
              <span className="font-semibold">Address:</span>Rafael Building, Del Pilar Street In front of Woodside Restaurant Cabanatuan City, Nueva Ecija 3100, Philippines
            </p> */}

            <p className="flex gap-2 text-gray-700 dark:text-[#F5EFE6] items-start">
              <span className="font-semibold">Address:</span>
              <span className="flex flex-col">
                <span>Rafael Building, Del Pilar Street</span>
                <span>In front of Woodside Restaurant</span>
                <span>Cabanatuan City, Nueva Ecija 3100, Philippines</span>
              </span>
            </p>

            <p className="flex items-center gap-2 text-gray-700 dark:text-[#F5EFE6]">
              <span className="font-semibold">Opening Hours:</span>
              <span className="text-amber-600">Mon-Sat: 9:00 AM – 8:00 PM</span>
            </p>

            <p className="flex items-center gap-3">
              <span className="font-semibold text-gray-700 dark:text-[#F5EFE6]">Follow us on:</span>
              <a
                href="https://www.facebook.com/profile.php?id=100093558631874"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                <img src="/images/fb.png" alt="Facebook" className="w-6 h-6 inline-block" />
              </a>
              <a
                href="https://www.instagram.com/heartbeatcafeee"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                <img src="/images/ig.png" alt="Instagram" className="w-6 h-6 inline-block" />
              </a>
            </p>
          </div>
        </div>

        {/* Right Column: Map */}
        <div className="w-full md:w-1/2 h-64 md:h-[270px] rounded-lg overflow-hidden shadow-lg">
          {/* <iframe
            title="Heartbeat Cafe Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.1234567890!2d121.034567!3d14.554321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b1234567890%3A0xabcdef1234567890!2sYour%20Cafe%20Name!5e0!3m2!1sen!2sph!4v1678901234567!5m2!1sen!2sph"
            width="100%"
            height="100%"
            className="rounded-lg"
            allowFullScreen
            loading="lazy"
          ></iframe> */}
          <iframe 
            title="Heartbeat Cafe Location"
            src="https://www.google.com/maps/embed?pb=!4v1770210584146!6m8!1m7!1sDct_wZfxkexDs9rw9cuwkw!2m2!1d15.49251071660898!2d120.9732260924528!3f73.70910102390005!4f-6.448400501939446!5f0.4000000000000002" 
            width="100%"
            height="100%"
            className="rounded-lg"
            allowFullScreen
            loading="lazy"
            ></iframe>
        </div>
      </div>
    </div>
  </motion.section>
);

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="w-full bg-white dark:bg-[#3B2F2F]">
      <HeaderSection />
      <main>
        <Hero />
        <MenuSection selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
        <GallerySection selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
        <AboutSection />
        <ContactSection />
      </main>
      <BackToTopButton hide={!!selectedImage || !!selectedProduct} />
    </div>
  );
}
