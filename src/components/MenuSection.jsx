import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample menu data structure - replace with your actual products
export const menuData = {
  "Coffee Series": [
    {
      id: 1,
      name: "Classic Americano",
      price: 95,
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Bold and smooth",
      fullDesc: "A classic espresso-based coffee diluted with hot water, delivering a bold and smooth flavor that's perfect for coffee purists.",
      sizes: ["8oz", "12oz", "16oz"],
      ingredients: ["Espresso", "Hot Water"]
    },
    {
      id: 2,
      name: "Caramel Macchiato",
      price: 135,
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Sweet and creamy",
      fullDesc: "Layers of vanilla-flavored syrup, steamed milk, and espresso, topped with caramel drizzle for a sweet indulgence.",
      sizes: ["12oz", "16oz"],
      ingredients: ["Espresso", "Steamed Milk", "Vanilla Syrup", "Caramel Sauce"]
    }
  ],

  "Matcha Series": [
    {
      id: 5,
      name: "Classic Matcha Latte",
      price: 125,
      image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Pure and earthy",
      fullDesc: "Premium Japanese matcha powder whisked with steamed milk for a smooth, earthy, and antioxidant-rich beverage.",
      sizes: ["12oz", "16oz"],
      ingredients: ["Matcha Powder", "Steamed Milk", "Simple Syrup"]
    }
  ],

  "Fruits": [
    {
      id: 8,
      name: "Mango Smoothie",
      price: 115,
      image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Tropical refreshment",
      fullDesc: "Blended fresh mangoes with ice and a touch of honey for a refreshing tropical escape in every sip.",
      sizes: ["16oz"],
      ingredients: ["Fresh Mango", "Ice", "Honey", "Milk"]
    }
  ],

  "Meals": [
    {
      id: 11,
      name: "Club Sandwich",
      price: 185,
      image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Triple-layered classic",
      fullDesc: "A hearty triple-decker sandwich with chicken, bacon, lettuce, tomato, and mayo on toasted bread. Served with fries.",
      ingredients: ["Grilled Chicken", "Bacon", "Lettuce", "Tomato", "Mayo", "Toast", "Fries"]
    }
  ],

  "Appetizers": [
    {
      id: 14,
      name: "Chicken Wings",
      price: 155,
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Crispy and flavorful",
      fullDesc: "Golden fried chicken wings tossed in your choice of BBQ, Buffalo, or Honey Garlic sauce.",
      options: ["BBQ", "Buffalo", "Honey Garlic"]
    }
  ],

  "Breakfast": [
    {
      id: 17,
      name: "All-Day Breakfast Platter",
      price: 195,
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Complete morning meal",
      fullDesc: "Two eggs any style, bacon or sausage, hash browns, and toast. Available all day!",
      options: ["Scrambled", "Sunny Side Up", "Over Easy"]
    }
  ],

  "Croffles": [
    {
      id: 20,
      name: "Classic Croffle",
      price: 95,
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Crispy waffle-croissant",
      fullDesc: "Our signature croffle (croissant + waffle) served with butter and maple syrup.",
      ingredients: ["Croissant Dough", "Butter", "Maple Syrup"]
    }
  ]
};

// Product Card Component
const ProductCard = ({ product, onClick }) => (
  <motion.div
    className="bg-white dark:bg-[#5A463F] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
    onClick={onClick}
    whileHover={{ y: -8 }}
    // initial={{ opacity: 0, y: 20 }}
    // animate={{ opacity: 1, y: 0 }}
    // transition={{ duration: 0.3 }}
  >
    <div className="relative overflow-hidden h-48">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-[#F5EFE6] group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
          {product.name}
        </h3>
        <span className="text-orange-600 dark:text-orange-400 font-bold text-lg ml-2">
          ₱{product.price}
        </span>
      </div>
      <p className="text-gray-600 dark:text-[#E6DACD] text-sm">
        {product.shortDesc}
      </p>
      <div className="mt-3 text-orange-500 dark:text-orange-400 text-sm font-medium flex items-center gap-1">
        View Details
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </motion.div>
);

// Product Detail Modal
const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative bg-white dark:bg-[#3B2F2F] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-white/90 dark:bg-[#5A463F]/90 rounded-full p-2 hover:bg-white dark:hover:bg-[#5A463F] transition-colors shadow-lg cursor-pointer"
          >
            <svg className="w-6 h-6 text-gray-900 dark:text-[#F5EFE6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image */}
          <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-2xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-[#F5EFE6]">
                {product.name}
              </h2>
              <span className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 ml-4">
                ₱{product.price}
              </span>
            </div>

            <p className="text-gray-700 dark:text-[#E6DACD] text-base sm:text-lg mb-6 leading-relaxed">
              {product.fullDesc}
            </p>

            {/* Sizes */}
            {product.sizes && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-[#F5EFE6] mb-3 uppercase tracking-wide">
                  Available Sizes
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-lg text-sm font-medium"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Options */}
            {product.options && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-[#F5EFE6] mb-3 uppercase tracking-wide">
                  Options
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {product.options.map((option) => (
                    <span
                      key={option}
                      className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-lg text-sm font-medium"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-[#F5EFE6] mb-3 uppercase tracking-wide">
                  Ingredients
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-[#5A463F] text-gray-700 dark:text-[#E6DACD] rounded-full text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Main Menu Section Component
const MenuSection = ({ selectedProduct, setSelectedProduct }) => {
  const [activeTab, setActiveTab] = useState("Coffee Series");
  const categories = Object.keys(menuData);

  useEffect(() => {
    if (selectedProduct) {
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
  }, [selectedProduct]);

  return (
    <motion.section
      id="menu"
      className="relative py-16 sm:py-24 px-4 bg-gray-50 dark:bg-[#4A352F]/30 scroll-mt-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-[#F5EFE6] mb-4">
            Our Menu
          </h2>
          <p className="text-gray-600 dark:text-[#E6DACD] max-w-2xl mx-auto">
            Discover our carefully curated selection of specialty coffees, beverages, and delicious food.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max py-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeTab === category
                    ? "bg-orange-500 text-white shadow-lg transform scale-105"
                    : "bg-white dark:bg-[#5A463F] text-gray-700 dark:text-[#E6DACD] hover:bg-orange-100 dark:hover:bg-[#6B5147] hover:text-orange-600 dark:hover:text-orange-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          key={activeTab}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {menuData[activeTab].map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </motion.div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </motion.section>
  );
};

export default MenuSection;