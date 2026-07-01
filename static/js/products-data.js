/* ORNZA — Shared product catalog for PDP, cart, and quick view */
(function () {
  const productPrices = {
    "ring-aurelia": "₹4,999", "ring-filigree": "₹3,799", "ring-midnight": "₹5,299",
    "ring-eternity": "₹4,299", "ring-marquise": "₹4,899", "ring-vesper": "₹3,499",
    "diamond-star": "₹3,999", "diamond-studs": "₹2,499", "diamond-tennis": "₹8,999",
    "diamond-nova": "₹5,499", "diamond-cluster": "₹3,299", "diamond-choker": "₹6,999",
    "necklace-rajputana": "₹5,999", "necklace-haar": "₹7,499", "necklace-aria": "₹2,199",
    "necklace-hasli": "₹4,499", "necklace-collar": "₹6,299", "necklace-pearl": "₹3,799",
    "bangle-filigree": "₹3,999", "bangle-peacock": "₹4,799", "bangle-kada": "₹3,499",
    "bangle-duo": "₹2,999", "bangle-antique": "₹5,499", "bangle-classic": "₹2,499",
    "earring-chandeliers": "₹2,799", "earring-jhumkas": "₹1,999", "earring-studs": "₹1,499",
    "earring-threaders": "₹1,299", "earring-hoops": "₹1,799", "earring-tassel": "₹3,499",
    "bracelet-charm": "₹1,899", "bracelet-cuff": "₹2,499", "bracelet-herringbone": "₹2,199",
    "bracelet-rope": "₹1,699", "bracelet-pearl": "₹1,599", "bracelet-cosmic": "₹3,299",
  };

  const productsData = {
    // Rings
    "ring-aurelia": {
      title: "Aurelia Solitaire Ring",
      desc: "An exceptional piece crafted with a signature center solitaire, held by claw prongs in solid 18k gold vermeil. Elegant filigree details line the inner band, delivering comfort and heritage charm.",
      material: "18K Gold Vermeil",
      stones: "VVS1 Moissanite Solitaire (2.5ct)",
      image: "assets/ring_preview.png"
    },
    "ring-filigree": {
      title: "Filigree Crown Ring",
      desc: "Inspired by classical Mughal court styling, this crown ring showcases intricate wirefiling on a sterling silver band layered in heavy gold. Delicate beads frame the top crescent.",
      material: "18K Gold Plated Silver",
      stones: "Micro-paved AAA Swiss Zirconia",
      image: "assets/ring_preview.png"
    },
    "ring-midnight": {
      title: "Midnight Halo Ring",
      desc: "An editorial statement featuring a dark ruthenium band offset by a bright halo. Deep black spinel contrasts against flawless white simulant stones for high-fashion drama.",
      material: "Ruthenium Plated Silver",
      stones: "Black Spinel & Moissanite accents",
      image: "assets/ring_preview.png"
    },
    "ring-eternity": {
      title: "Eternal Eternity Band",
      desc: "A continuous loop of flawless brilliance. Perfectly matched round-cut stones line this highly comfortable band, representing infinite light and timeless styling.",
      material: "18K White Gold Plated Silver",
      stones: "Round Cut Swiss Zirconia (4mm)",
      image: "assets/ring_preview.png"
    },
    "ring-marquise": {
      title: "Empress Marquise Ring",
      desc: "Elongated marquise center stone set horizontally on an organic-style rose gold band. A modern interpretation of antique solitaire settings, ideal for layering.",
      material: "18K Rose Gold Vermeil",
      stones: "East-West Marquise Moissanite",
      image: "assets/ring_preview.png"
    },
    "ring-vesper": {
      title: "Vesper Chevron Ring",
      desc: "A stylized wishbone silhouette embellished with graduated sparklers. Designed to lock perfectly with solitaire rings or sit as a sleek, geometric daily accent.",
      material: "925 Sterling Silver",
      stones: "Graduated Diamond Simulants",
      image: "assets/ring_preview.png"
    },

    // Diamonds
    "diamond-star": {
      title: "Celestial Star Pendant",
      desc: "A geometric star pendant featuring high-refraction gems cut using premium Hearts & Arrows techniques. Suspended on a delicate rhodium-plated sterling silver rope chain.",
      material: "925 Sterling Silver",
      stones: "Hearts & Arrows Cut CZ Solitaire",
      image: "assets/diamond_preview.png"
    },
    "diamond-studs": {
      title: "Solitaire Studs",
      desc: "Pure, classic elegance. Flawless round diamonds set in platinum-plated four-prong settings. Features secure threaded screw backs for everyday luxury security.",
      material: "Platinum Plated Sterling Silver",
      stones: "VVS1 Grade Round CZ (1.5ct each)",
      image: "assets/diamond_preview.png"
    },
    "diamond-tennis": {
      title: "Eternity Tennis Bracelet",
      desc: "A breathtaking stream of individual stones linked dynamically to lay flat on the wrist. Designed with a double-safety lock for high-luxury assurance.",
      material: "White Gold Plated Alloy",
      stones: "VVS Simulant Diamonds (Total 12ct)",
      image: "assets/diamond_preview.png"
    },
    "diamond-nova": {
      title: "Nova Diamond Ring",
      desc: "A bold, modern ring centering an Asscher-cut gem with stepped facets. Flanked by tapered baguette stones in a high-polished modern mounting.",
      material: "925 Sterling Silver",
      stones: "Asscher Cut Simulant Diamond (3ct)",
      image: "assets/diamond_preview.png"
    },
    "diamond-cluster": {
      title: "Halo Cluster Earrings",
      desc: "Clustering pear and round diamonds to form a classic floral droplet. Captures ambient light with every slight movement, framing the face in rich brilliance.",
      material: "Sterling Silver Base",
      stones: "Brilliant Round & Pear CZ Elements",
      image: "assets/diamond_preview.png"
    },
    "diamond-choker": {
      title: "Constellation Choker",
      desc: "A statement neckpiece with cascading elements that sit flat on the collarbone. Imparts an ethereal constellation pattern constructed with micro-paved settings.",
      material: "Rhodium Plated Brass",
      stones: "Micro-paved Diamond Simulants",
      image: "assets/diamond_preview.png"
    },

    // Necklaces
    "necklace-rajputana": {
      title: "Rajputana Choker",
      desc: "An elaborate traditional choker set referencing royal heritage. Hand-set flat kundan glass in rich gold plating, accented by emerald green beads and gold tassels.",
      material: "22K Gold Plated Brass",
      stones: "Premium Uncut Polki & Kundan Glass",
      image: "assets/necklace_preview.png"
    },
    "necklace-haar": {
      title: "Empress Polki Haar",
      desc: "A long, multi-layered festive necklace featuring ornate medallion spacers. Incorporates hand-worked floral meenakari on the reverse for authentic luxury styling.",
      material: "22K Gold Vermeil",
      stones: "Polki, Kundan & Ruby Simulants",
      image: "assets/necklace_preview.png"
    },
    "necklace-aria": {
      title: "Aria Delicate Pendant",
      desc: "A minimalist daily necklace carrying a single bezel-set marquise stone. Designed on an adjustable cable chain for versatile neck layering.",
      material: "18K Gold Plated Silver",
      stones: "Single Drop Marquise Zirconia",
      image: "assets/necklace_preview.png"
    },
    "necklace-hasli": {
      title: "Royal Hasli Neckpiece",
      desc: "A rigid golden collar featuring detailed engraving and hand-applied enamel work. Adapts to neck curves and ties at the back with a matching gold cord.",
      material: "Antique Gold Plated Brass",
      stones: "Hand-painted Meenakari & CZ",
      image: "assets/necklace_preview.png"
    },
    "necklace-collar": {
      title: "Sunderban Floral Collar",
      desc: "A majestic floral-motif collar necklace displaying alternating ruby and emerald elements. Represents natural elegance, perfect for wedding receptions.",
      material: "22K Gold Plated Brass",
      stones: "Premium Emerald & Ruby Simulants",
      image: "assets/necklace_preview.png"
    },
    "necklace-pearl": {
      title: "Avanti Pearl String",
      desc: "A strand of premium freshwater pearls separated by intricate gold-filleted spacers. Combines classic maritime luster with heavy gold elements.",
      material: "18K Gold Vermeil Spacers",
      stones: "Natural Freshwater Baroque Pearls",
      image: "assets/necklace_preview.png"
    },

    // Bangles
    "bangle-filigree": {
      title: "Vaikunth Filigree Kada",
      desc: "An openable wrist kada showcasing delicate wirefiling and scrollwork. Heavy gold alloy ensures durability while maintaining standard flexibility.",
      material: "Anti-tarnish Gold Alloy",
      stones: "Micro-paved Swiss Zirconia",
      image: "assets/bangle_preview.png"
    },
    "bangle-peacock": {
      title: "Mayur Peacock Bangle",
      desc: "Featuring twin peacock heads meeting at the center with a screw mechanism. Embellished with fine blue and green enamel highlighting their feathers.",
      material: "22K Gold Plated Brass",
      stones: "Emerald, Ruby CZ & Hand-Enamel",
      image: "assets/bangle_preview.png"
    },
    "bangle-kada": {
      title: "Swiss Zirconia Kada",
      desc: "A highly modern bracelet featuring alternating baguette and brilliant-cut stones. Sleek click clasp makes it easy to stack or wear alone.",
      material: "18K Gold Plated Alloy",
      stones: "Baguette & Round Swiss Zirconia",
      image: "assets/bangle_preview.png"
    },
    "bangle-duo": {
      title: "Ganga-Jamuna Duo",
      desc: "Two tone classic bangles showing intricate twists of silver and gold plating. A versatile accessory matching both gold and platinum jewelry setups.",
      material: "Dual Gold-Silver Plated Brass",
      stones: "Micro-set Diamond Simulants",
      image: "assets/bangle_preview.png"
    },
    "bangle-antique": {
      title: "Royal Antique Kada",
      desc: "Thick antique-finish kada presenting detailed deities and floral motifs in relief. Lined inside with soft-brushed gold for a comfortable fit.",
      material: "Antique Gold Plated Brass",
      stones: "Uncut Polki & Ruby Accents",
      image: "assets/bangle_preview.png"
    },
    "bangle-classic": {
      title: "Udaya Classic Bangles",
      desc: "A set of four slender slip-on bangles studded with deep red and green kemp elements. Emits traditional South Indian temple jewelry vibes.",
      material: "22K Gold Plated Alloy",
      stones: "Red and Green Kemp Stones",
      image: "assets/bangle_preview.png"
    },

    // Earrings
    "earring-chandeliers": {
      title: "Aria Pearl Chandeliers",
      desc: "Cascading earring droplets featuring gold branches that hold natural baroque pearls. Handcrafted with lightweight cores to allow comfortable all-day wear.",
      material: "Hypoallergenic Gold Plating",
      stones: "Baroque Pearls & Marquise CZ",
      image: "assets/earring_preview.png"
    },
    "earring-jhumkas": {
      title: "Celestial Jhumkas",
      desc: "Charming traditional dome-shaped earrings with fine wire hangings. The bell is lined with tiny pearls and gold beads that chime softly with head movements.",
      material: "22K Gold Plated Silver Base",
      stones: "Kundan work & Small Pearls",
      image: "assets/earring_preview.png"
    },
    "earring-studs": {
      title: "Solitaire Marquise Studs",
      desc: "Minimalist studs carrying marquise gems pointed outwards, creating an eye-opening framing effect. Standard friction back ensures everyday security.",
      material: "18K White Gold Plated Silver",
      stones: "VVS Marquise Simulant Diamonds",
      image: "assets/earring_preview.png"
    },
    "earring-threaders": {
      title: "Ethereal Threaders",
      desc: "Delicate chain earrings that thread through the lobe. A tiny star charm and a hanging drop diamond capture light at both front and back.",
      material: "18K Gold Plated Silver",
      stones: "Delicate Star-cut Zirconia",
      image: "assets/earring_preview.png"
    },
    "earring-hoops": {
      title: "Royal Gold Hoops",
      desc: "Medium hoops decorated with rows of micro-paved stones on both outer front and inner back surfaces, maximizing front-facing sparkle.",
      material: "18K Gold Vermeil",
      stones: "Micro-paved Swiss CZ Lining",
      image: "assets/earring_preview.png"
    },
    "earring-tassel": {
      title: "Aura Tassel Drops",
      desc: "Dramatic long drop earrings ending in fine chains tipped with teardrop emeralds. Designed for elegant galas and wedding receptions.",
      material: "18K White Gold Plated",
      stones: "Graduated Emerald Simulants",
      image: "assets/earring_preview.png"
    },

    // Bracelets
    "bracelet-charm": {
      title: "Minimalist Charm Link",
      desc: "A delicate trace chain carrying five symbolic gold charms (star, moon, gem, shell, and key). Features a secure lobster clasp and adjustable ring extensions.",
      material: "18K Gold Plated Sterling Silver",
      stones: "Round Cut Diamond Simulants",
      image: "assets/bracelet_preview.png"
    },
    "bracelet-cuff": {
      title: "Eternity Slip-on Cuff",
      desc: "A sleek, semi-flexible bangle cuff ending in two brilliant diamond caps. Stretches slightly to accommodate different wrist contours.",
      material: "18K Gold Plated Brass",
      stones: "Micro-pave Zirconia Band",
      image: "assets/bracelet_preview.png"
    },
    "bracelet-herringbone": {
      title: "Vikas Herringbone Chain",
      desc: "A flat-woven herringbone chain that sits perfectly flat against the wrist. Features multi-faceted mirror polish that reflects light like liquid gold.",
      material: "18K Gold Vermeil",
      stones: "None (Highly Polished Gold)",
      image: "assets/bracelet_preview.png"
    },
    "bracelet-rope": {
      title: "Twisted Rope Bracelet",
      desc: "A classic rope twist pattern bracelet carrying large gold end-caps. Very soft and fluid drape on the wrist, perfect for stacking with cuffs.",
      material: "18K Gold Plated Sterling Silver",
      stones: "Zirconia End Caps",
      image: "assets/bracelet_preview.png"
    },
    "bracelet-pearl": {
      title: "Luna Pearl Bracelet",
      desc: "Alternating freshwater pearls and small gold beads on an elasticated cord. Carrying a single hanging crescent moon gold charm.",
      material: "18K Gold Plated Silver",
      stones: "Freshwater Pearls & CZ Charms",
      image: "assets/bracelet_preview.png"
    },
    "bracelet-cosmic": {
      title: "Cosmic Star Cuff",
      desc: "A wide structural statement cuff carrying starburst etchings. Studded with individual diamonds at the center of each starburst.",
      material: "925 Sterling Silver Base",
      stones: "Round Brilliant Simulant Diamonds",
      image: "assets/bracelet_preview.png"
    }
  };

  Object.keys(productsData).forEach((id) => {
    productsData[id].id = id;
    productsData[id].price = productPrices[id] || '₹0';
    const prefix = id.split('-')[0];
    const cats = {
      ring: 'Rings', diamond: 'Diamonds', necklace: 'Necklaces', bangle: 'Bangles',
      earring: 'Earrings', bracelet: 'Bracelets',
    };
    productsData[id].category = cats[prefix] || 'Jewellery';
  });

  function productUrl(id) {
    return `product.html?id=${encodeURIComponent(id)}`;
  }

  function getProduct(id) {
    return productsData[id] || null;
  }

  window.ORNZA_PRODUCTS = productsData;
  window.OrnzaProducts = { getProduct, productUrl, prices: productPrices };
})();
