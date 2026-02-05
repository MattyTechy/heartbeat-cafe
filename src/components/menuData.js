// menuData.js - Your menu items organized by category
// Replace placeholder images with your actual image paths
// Add or remove products as needed

export const menuData = {
  "Coffee Series": [
    {
      id: 1,
      name: "Classic Americano",
      price: 95,
      image: "https://source.unsplash.com/600x600/?americano,coffee",
      shortDesc: "Bold and smooth",
      fullDesc: "A classic espresso-based coffee diluted with hot water, delivering a bold and smooth flavor that's perfect for coffee purists.",
      sizes: ["8oz", "12oz", "16oz"],
      ingredients: ["Espresso", "Hot Water"]
    },
    {
      id: 2,
      name: "Caramel Macchiato",
      price: 135,
      image: "https://source.unsplash.com/600x600/?caramel-macchiato,coffee",
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
      image: "https://source.unsplash.com/600x600/?matcha,latte",
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
      image: "https://source.unsplash.com/600x600/?mango,smoothie",
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
      image: "https://source.unsplash.com/600x600/?club-sandwich",
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
      image: "https://source.unsplash.com/600x600/?chicken-wings",
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
      image: "https://source.unsplash.com/600x600/?breakfast,eggs",
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
      image: "https://source.unsplash.com/600x600/?croffle,waffle",
      shortDesc: "Crispy waffle-croissant",
      fullDesc: "Our signature croffle (croissant + waffle) served with butter and maple syrup.",
      ingredients: ["Croissant Dough", "Butter", "Maple Syrup"]
    }
  ]
};

// NOTES FOR CUSTOMIZATION:
// 
// 1. Each product needs:
//    - id: unique number
//    - name: product name
//    - price: number (in pesos)
//    - image: path to image file
//    - shortDesc: brief tagline for the card
//    - fullDesc: detailed description for modal
//
// 2. Optional fields:
//    - sizes: array of size options (e.g., ["8oz", "12oz", "16oz"])
//    - ingredients: array of ingredient names
//    - options: array of variations (e.g., ["BBQ", "Buffalo"])
//
// 3. To add a new category:
//    Just add a new key with an array of products
//
// 4. Image fallback:
//    If image fails to load, it shows a default coffee image from Unsplash