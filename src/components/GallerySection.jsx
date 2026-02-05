import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  { id: 1, imageUrl: "images/img1.jpg", title: "Our Heart" },
  { id: 2, imageUrl: "images/img5.jpg", title: "Handcrafted Brews" },
  { id: 3, imageUrl: "images/img8.jpg", title: "Crafted Daily" },
  { id: 4, imageUrl: "images/img2.jpg", title: "Cafe Favorites" },
  { id: 5, imageUrl: "images/img3.jpg", title: "Little Details" },
];

const TRANSITION = { duration: 0.3, ease: [0.4, 0, 0.2, 1] };

const GridItem = memo(({ item, onClick }) => {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    onClick(item);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.div
      className="relative cursor-pointer overflow-hidden rounded-2xl shadow-md focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 outline-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${item.title}`}
      whileHover={{
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={TRANSITION}
    >
      <motion.img
        src={item.imageUrl}
        alt={item.title}
        className="w-full h-full object-cover block aspect-square"
        loading="lazy"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/400?text=Image+Not+Found";
        }}
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      />
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={TRANSITION}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none"
          >
            <div className="flex items-end h-full p-5">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="text-white text-base font-semibold drop-shadow-lg"
              >
                {item.title}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

GridItem.displayName = "GridItem";

function ImageViewer({ image, onClose, onNext, onPrev }) {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight") onNext();
    if (e.key === "ArrowLeft") onPrev();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={TRANSITION}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="
          absolute top-4 right-4
          text-white dark:text-black
          p-3
          rounded-full
          bg-black/30 dark:bg-white/30      /* background adapts */
          hover:bg-black/50 dark:hover:bg-white/50  /* hover adapts */
          transition-colors
          focus:outline-none
          focus:ring-2
          focus:ring-white dark:focus:ring-black
          flex items-center justify-center
        "
        aria-label="Close viewer"
      >
        <X size={32} />
      </button>

      {/* Previous button */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="
          absolute left-4
          text-white dark:text-black
          p-3
          rounded-full
          bg-black/30 dark:bg-white/30
          hover:bg-black/50 dark:hover:bg-white/50
          transition-colors
          focus:outline-none
          focus:ring-2
          focus:ring-white dark:focus:ring-black
          flex items-center justify-center
        "
        aria-label="Previous image"
      >
        <ChevronLeft size={40} />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="
          absolute right-4
          text-white dark:text-black
          p-3
          rounded-full
          bg-black/30 dark:bg-white/30
          hover:bg-black/50 dark:hover:bg-white/50
          transition-colors
          focus:outline-none
          focus:ring-2
          focus:ring-white dark:focus:ring-black
          flex items-center justify-center
        "
        aria-label="Next image"
      >
        <ChevronRight size={40} />
      </button>

      {/* Image */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={TRANSITION}
        onClick={(e) => e.stopPropagation()}
        className="max-w-7xl max-h-[90vh] w-full flex flex-col items-center"
      >
        <img
          src={image.imageUrl}
          alt={image.title}
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="text-white text-xl font-semibold mt-6 text-center"
        >
          {image.title}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default function GallerySection({ selectedImage, setSelectedImage }) {

  useEffect(() => {
    if (selectedImage) {
      // lock background scroll
      document.body.style.overflow = "hidden";
    } else {
      // restore scroll
      document.body.style.overflow = "";
    }

    // cleanup (important!)
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  const handleImageClick = (item) => {
    setSelectedImage(item);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleNext = () => {
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  return (
    <>
      <section
        id="gallery"
        className="relative z-10 py-16 sm:py-24 px-4 scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
            Gallery
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Cozy moments, handcrafted brews, and warm vibes.
          </p>
          {/* Stable Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 auto-rows-fr">
            {images.map((item) => (
              <GridItem key={item.id} item={item} onClick={handleImageClick} />
            ))}
          </div>
        </div>
      </section>

      {/* Image Viewer Modal */}
      <AnimatePresence>
        {selectedImage && (
          <ImageViewer
            image={selectedImage}
            onClose={handleClose}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </>
  );
}