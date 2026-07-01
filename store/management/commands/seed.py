import shutil
from pathlib import Path
from django.core.management.base import BaseCommand
from django.conf import settings
from store.models import Category, Product


# Map category slug → static image filename
CAT_IMAGES = {
    'earrings':     'earring_preview.png',
    'rings':        'ring_preview.png',
    'chains':       'necklaces.png',
    'bracelets':    'bracelet_preview.png',
    'mangalsutras': 'necklaces.png',
    'silver-925':   'ring_preview.png',
    'bangles':      'bangle_preview.png',
    'pendants':     'necklace_preview.png',
    'pearl':        'necklace_preview.png',
    'hampers':      'hampers.png',
    'men-bracelets':'bracelet_preview.png',
    'men-chains':   'necklaces.png',
    'men-pendants': 'diamond_preview.png',
    'men-rings':    'ring_preview.png',
    'women':        'earrings.png',
    'men':          'bracelets.png',
}

# Map category slug → category hero image
CAT_HERO_IMAGES = {
    'earrings':     'earrings.png',
    'rings':        'rings.png',
    'chains':       'necklaces.png',
    'bracelets':    'bracelets.png',
    'bangles':      'bangles.png',
    'hampers':      'hampers.png',
}

# Product-specific image overrides (slug → image filename from images/ or ornza-images/)
PRODUCT_IMAGES = {
    'aurora-drop-earrings':      'earring_preview.png',
    'classic-jhumka-set':        'earring_preview.png',
    'diamond-stud-earrings':     'diamond_preview.png',
    'celestial-hoop-set':        'earring_preview.png',
    'aurelia-solitaire-ring':    'ring_preview.png',
    'celestine-solitaire-ring':  'ring_preview.png',
    'vesper-chevron-ring':       'ring_preview.png',
    'empress-marquise-ring':     'ring_preview.png',
    'pearl-pendant-set':         'necklace_preview.png',
    'diamond-cut-mangalsutra':   'necklace_preview.png',
    'celestial-star-pendant':    'diamond_preview.png',
    'cz-tennis-bracelet':        'bracelet_preview.png',
    'cuban-link-bracelet':       'bracelet_preview.png',
    'charm-bracelet':            'bracelet_preview.png',
    'silver-vesper-ring':        'ring_preview.png',
    'silver-hoop-set-3-sizes':   'earring_preview.png',
    'silver-solitaire-studs':    'diamond_preview.png',
    'filigree-gold-bangles':     'bangle_preview.png',
    'peacock-bangle':            'bangle_preview.png',
    'anniversary-gold-hamper':   'hamper-anniversary.png',
    'birthday-sparkle-hamper':   'hamper-birthday.png',
    'bridal-jewellery-set':      'hamper-brides.png',
    'pearl-choker-necklace':     'necklace_preview.png',
    'pearl-drop-earrings':       'earring_preview.png',
}

CATEGORIES = [
    {'name': 'Earrings', 'slug': 'earrings', 'sort_order': 1, 'description': 'Studs, hoops, drops, jhumkas and chandelier earrings'},
    {'name': 'Rings', 'slug': 'rings', 'sort_order': 2, 'description': 'Solitaire rings, eternity bands, stackable rings'},
    {'name': 'Necklace Sets', 'slug': 'chains', 'sort_order': 3, 'description': 'Chains, pendants, and necklace sets'},
    {'name': 'Bracelets', 'slug': 'bracelets', 'sort_order': 4, 'description': 'Tennis bracelets, charm bracelets, cuffs'},
    {'name': 'Mangalsutras', 'slug': 'mangalsutras', 'sort_order': 5, 'description': 'Diamond cut and gold plated mangalsutras'},
    {'name': '925 Silver', 'slug': 'silver-925', 'sort_order': 6, 'description': 'BIS hallmarked 925 sterling silver collection'},
    {'name': 'Bangles', 'slug': 'bangles', 'sort_order': 7, 'description': 'Kada, bangles and payal'},
    {'name': 'Pendants', 'slug': 'pendants', 'sort_order': 8, 'description': 'Diamond and gold pendants'},
    {'name': 'Pearl Collection', 'slug': 'pearl', 'sort_order': 9, 'description': 'Freshwater pearl jewellery'},
    {'name': 'Gift Hampers', 'slug': 'hampers', 'sort_order': 10, 'description': 'Curated luxury jewellery gift sets'},
    {'name': "Women's Collection", 'slug': 'women', 'sort_order': 11, 'description': "Women's artificial jewellery"},
    {'name': "Men's Collection", 'slug': 'men', 'sort_order': 12, 'description': "Men's chains, bracelets and rings"},
    {'name': "Men's Bracelets", 'slug': 'men-bracelets', 'sort_order': 13, 'description': 'Cuban link and chain bracelets for men'},
    {'name': "Men's Chains", 'slug': 'men-chains', 'sort_order': 14, 'description': 'Bold chains for men'},
    {'name': "Men's Pendants", 'slug': 'men-pendants', 'sort_order': 15, 'description': 'Pendants for men'},
    {'name': "Men's Rings", 'slug': 'men-rings', 'sort_order': 16, 'description': 'Signet and statement rings for men'},
]

PRODUCTS = [
    # Earrings
    {'name': 'Aurora Drop Earrings', 'slug': 'aurora-drop-earrings', 'category': 'earrings',
     'price': 1799, 'compare_price': 2499, 'stock': 50, 'is_featured': True, 'is_bestseller': False,
     'material': '18K Gold Plated · CZ Crystals', 'stones': 'Hypoallergenic Swiss Zirconia',
     'description': 'Delicate drop earrings with brilliant CZ crystals set in 18k gold plated brass. Lightweight design perfect for daily wear or special occasions.'},
    {'name': 'Classic Jhumka Set', 'slug': 'classic-jhumka-set', 'category': 'earrings',
     'price': 1299, 'compare_price': 1849, 'stock': 75, 'is_featured': True, 'is_bestseller': True,
     'material': '22K Gold Plated Brass', 'stones': 'Ruby Red Stones & CZ',
     'description': 'Traditional jhumka earrings with intricate filigree work. A timeless Indian design that complements both western and ethnic outfits.'},
    {'name': 'Diamond Stud Earrings', 'slug': 'diamond-stud-earrings', 'category': 'earrings',
     'price': 1499, 'compare_price': 1999, 'stock': 100, 'is_featured': False, 'is_bestseller': True,
     'material': 'Platinum Plated Sterling Silver', 'stones': 'VVS1 Grade Round CZ (1.5ct each)',
     'description': 'Pure, classic elegance. Flawless round diamond simulants set in platinum-plated four-prong settings with secure threaded screw backs.'},
    {'name': 'Celestial Hoop Set', 'slug': 'celestial-hoop-set', 'category': 'earrings',
     'price': 1299, 'compare_price': 1849, 'stock': 60, 'is_featured': False, 'is_bestseller': True,
     'material': '18K Gold Plated Silver', 'stones': 'Polished Gold Finish',
     'description': 'Set of 3 graduated gold hoop earrings. Lightweight hinged closure, perfect for stacking. Hypoallergenic posts.'},

    # Rings
    {'name': 'Aurelia Solitaire Ring', 'slug': 'aurelia-solitaire-ring', 'category': 'rings',
     'price': 4999, 'compare_price': 6500, 'stock': 30, 'is_featured': True, 'is_bestseller': True,
     'material': '18K Gold Vermeil', 'stones': 'VVS1 Moissanite Solitaire (2.5ct)',
     'description': 'An exceptional piece crafted with a signature center solitaire, held by claw prongs in solid 18k gold vermeil. Elegant filigree details line the inner band.'},
    {'name': 'Celestine Solitaire Ring', 'slug': 'celestine-solitaire-ring', 'category': 'rings',
     'price': 1599, 'compare_price': 2499, 'stock': 45, 'is_featured': True, 'is_bestseller': False,
     'material': '18K Gold Vermeil', 'stones': 'VVS Moissanite Centre · Adjustable Sizes 5-10',
     'description': 'Stunning solitaire ring with anti-tarnish finish. Adjustable band fits sizes 5-10. Perfect everyday luxury ring.'},
    {'name': 'Vesper Chevron Ring', 'slug': 'vesper-chevron-ring', 'category': 'rings',
     'price': 3499, 'compare_price': None, 'stock': 25, 'is_featured': False, 'is_bestseller': True,
     'material': '925 Sterling Silver', 'stones': 'Graduated Diamond Simulants',
     'description': 'A stylized wishbone silhouette embellished with graduated sparklers. Locks perfectly with solitaire rings or sits as a sleek geometric daily accent.'},
    {'name': 'Empress Marquise Ring', 'slug': 'empress-marquise-ring', 'category': 'rings',
     'price': 4899, 'compare_price': 6200, 'stock': 20, 'is_featured': True, 'is_bestseller': False,
     'material': '18K Rose Gold Vermeil', 'stones': 'East-West Marquise Moissanite',
     'description': 'Elongated marquise center stone set horizontally on an organic-style rose gold band. A modern interpretation of antique solitaire settings.'},

    # Necklace Sets
    {'name': 'Pearl Pendant Set', 'slug': 'pearl-pendant-set', 'category': 'chains',
     'price': 2999, 'compare_price': 3799, 'stock': 35, 'is_featured': True, 'is_bestseller': False,
     'material': 'Freshwater Pearl · 18k Gold Setting', 'stones': "18\" Box Chain Included",
     'description': 'Lustrous freshwater pearl centre piece set in 18k gold. Includes an 18-inch box chain. Perfect for weddings and festive occasions.'},
    {'name': 'Diamond Cut Mangalsutra', 'slug': 'diamond-cut-mangalsutra', 'category': 'mangalsutras',
     'price': 2499, 'compare_price': 3200, 'stock': 40, 'is_featured': False, 'is_bestseller': True,
     'material': '22K Gold Vermeil · CZ Pendant', 'stones': "20\" Double Strand · Anti-tarnish",
     'description': 'Classic 22k gold vermeil mangalsutra with diamond-cut beads and CZ pendant. 20-inch double strand design with anti-tarnish coating.'},
    {'name': 'Celestial Star Pendant', 'slug': 'celestial-star-pendant', 'category': 'pendants',
     'price': 3999, 'compare_price': 5200, 'stock': 30, 'is_featured': True, 'is_bestseller': False,
     'material': '925 Sterling Silver', 'stones': "Hearts & Arrows Cut CZ Solitaire",
     'description': 'A geometric star pendant with high-refraction gems cut using premium Hearts & Arrows techniques. On a delicate rhodium-plated sterling silver rope chain.'},

    # Bracelets
    {'name': 'CZ Tennis Bracelet', 'slug': 'cz-tennis-bracelet', 'category': 'bracelets',
     'price': 1799, 'compare_price': 2299, 'stock': 55, 'is_featured': True, 'is_bestseller': True,
     'material': '18K Gold Plated · AAA Cubic Zirconia', 'stones': "7.5\" Length · Lobster Clasp",
     'description': 'A breathtaking stream of AAA cubic zirconia stones linked to lay flat on the wrist. Designed with double-safety lock for high-luxury assurance.'},
    {'name': 'Cuban Link Bracelet', 'slug': 'cuban-link-bracelet', 'category': 'men-bracelets',
     'price': 2499, 'compare_price': 3499, 'stock': 40, 'is_featured': False, 'is_bestseller': True,
     'material': '18K Gold Plated · 8mm Width', 'stones': "7-9\" Adjustable · Heavy duty clasp",
     'description': 'Bold Miami-style Cuban link bracelet in 18k gold plated finish. 8mm width, 7-9 inch adjustable length.'},
    {'name': 'Charm Bracelet', 'slug': 'charm-bracelet', 'category': 'bracelets',
     'price': 1899, 'compare_price': 2499, 'stock': 45, 'is_featured': True, 'is_bestseller': False,
     'material': '18K Gold Plated', 'stones': 'Mixed CZ Charms',
     'description': 'Delicate charm bracelet with 6 removable CZ-studded charms. Each charm tells a story. Perfect gift for loved ones.'},

    # 925 Silver
    {'name': 'Silver Vesper Ring', 'slug': 'silver-vesper-ring', 'category': 'silver-925',
     'price': 3499, 'compare_price': 4500, 'stock': 30, 'is_featured': True, 'is_bestseller': True,
     'material': 'BIS Hallmarked 925 Sterling Silver', 'stones': 'Graduated Diamond Simulants',
     'description': 'BIS hallmarked 925 sterling silver ring with graduated diamond simulants. Hypoallergenic, perfect for sensitive skin.'},
    {'name': 'Silver Hoop Set (3 sizes)', 'slug': 'silver-hoop-set-3-sizes', 'category': 'silver-925',
     'price': 2199, 'compare_price': 2999, 'stock': 50, 'is_featured': True, 'is_bestseller': True,
     'material': 'BIS Hallmarked 925 Sterling Silver', 'stones': 'Polished Silver Finish',
     'description': 'Set of 3 graduated 925 silver hoop earrings (small, medium, large). 100% hypoallergenic. Perfect for everyday wear.'},
    {'name': 'Silver Solitaire Studs', 'slug': 'silver-solitaire-studs', 'category': 'silver-925',
     'price': 2499, 'compare_price': 3200, 'stock': 60, 'is_featured': False, 'is_bestseller': True,
     'material': 'Platinum Plated 925 Sterling Silver', 'stones': 'VVS1 Grade Round CZ (1.5ct each)',
     'description': 'Pure, classic elegance in 925 silver. Flawless round diamond simulants in platinum-plated four-prong settings with screw-back security.'},

    # Bangles
    {'name': 'Filigree Gold Bangles (Set of 2)', 'slug': 'filigree-gold-bangles', 'category': 'bangles',
     'price': 3999, 'compare_price': 5200, 'stock': 25, 'is_featured': False, 'is_bestseller': False,
     'material': '22K Gold Plated Brass', 'stones': 'Intricate Filigree Work',
     'description': 'Pair of handcrafted filigree bangles in 22k gold plating. Traditional design. Available in sizes XS to XXL.'},
    {'name': 'Peacock Bangle', 'slug': 'peacock-bangle', 'category': 'bangles',
     'price': 4799, 'compare_price': 6200, 'stock': 20, 'is_featured': True, 'is_bestseller': False,
     'material': '18K Gold Plated Brass', 'stones': 'Multicolor Enamel & CZ',
     'description': 'Stunning peacock design bangle with multicolor enamel work and CZ embellishments. A statement piece for festive occasions.'},

    # Gift Hampers
    {'name': 'Anniversary Gold Hamper', 'slug': 'anniversary-gold-hamper', 'category': 'hampers',
     'price': 8999, 'compare_price': 11500, 'stock': 15, 'is_featured': True, 'is_bestseller': True,
     'material': 'Mixed 18K Gold Plated Items', 'stones': 'Full Luxury Set',
     'description': 'The ultimate anniversary gift. Includes necklace set, earrings, ring, and bracelet — all in 18k gold plating. In our signature luxury box with calligraphy note.'},
    {'name': 'Birthday Sparkle Hamper', 'slug': 'birthday-sparkle-hamper', 'category': 'hampers',
     'price': 5999, 'compare_price': 7500, 'stock': 20, 'is_featured': True, 'is_bestseller': True,
     'material': 'Mixed Gold Plated Items', 'stones': 'CZ Embellishments',
     'description': 'A sparkling birthday surprise! Includes curated earrings, a ring, and a bracelet. Beautifully packed in our premium gift box.'},
    {'name': 'Bridal Jewellery Set', 'slug': 'bridal-jewellery-set', 'category': 'hampers',
     'price': 15999, 'compare_price': 20000, 'stock': 10, 'is_featured': True, 'is_bestseller': False,
     'material': '22K Gold Plated Complete Set', 'stones': 'CZ & Kundan Stones',
     'description': 'Complete bridal set: necklace, earrings, maang tikka, bangles, and ring. 22k gold plated with CZ and kundan stone work.'},

    # Pearl Collection
    {'name': 'Pearl Choker Necklace', 'slug': 'pearl-choker-necklace', 'category': 'pearl',
     'price': 3799, 'compare_price': 4999, 'stock': 25, 'is_featured': True, 'is_bestseller': False,
     'material': 'Freshwater Pearls · Gold Clasp', 'stones': 'Lustrous Pearl Strand',
     'description': 'Elegant freshwater pearl choker with 18k gold-plated clasp. 5-strand design sits beautifully on the collarbone.'},
    {'name': 'Pearl Drop Earrings', 'slug': 'pearl-drop-earrings', 'category': 'pearl',
     'price': 1999, 'compare_price': 2699, 'stock': 40, 'is_featured': False, 'is_bestseller': True,
     'material': '18K Gold Plated · Freshwater Pearl', 'stones': 'Single Drop Pearl',
     'description': 'Timeless single freshwater pearl drop earrings with 18k gold-plated hooks. Lustrous pearls sourced for uniform shape and brilliant sheen.'},
]


class Command(BaseCommand):
    help = 'Seed database with categories, products, and assign images'

    def handle(self, *args, **options):
        static_img = Path(settings.BASE_DIR) / 'static' / 'images'
        media_products = Path(settings.MEDIA_ROOT) / 'products'
        media_categories = Path(settings.MEDIA_ROOT) / 'categories'
        media_products.mkdir(parents=True, exist_ok=True)
        media_categories.mkdir(parents=True, exist_ok=True)

        # ── Categories ──
        self.stdout.write('Seeding categories...')
        cat_map = {}
        for c in CATEGORIES:
            img_file = CAT_HERO_IMAGES.get(c['slug'])
            img_path = ''
            if img_file:
                src = static_img / img_file
                if src.exists():
                    dest = media_categories / img_file
                    shutil.copy2(str(src), str(dest))
                    img_path = f'categories/{img_file}'

            obj, created = Category.objects.update_or_create(
                slug=c['slug'],
                defaults={
                    'name': c['name'],
                    'sort_order': c['sort_order'],
                    'description': c.get('description', ''),
                    'is_active': True,
                    'image': img_path or None,
                }
            )
            cat_map[c['slug']] = obj
            self.stdout.write(f'  {"created" if created else "updated"}: {obj.name}')

        # ── Products ──
        self.stdout.write('\nSeeding products...')
        for p in PRODUCTS:
            cat = cat_map.get(p['category'])

            # Pick best image: product-specific → category fallback
            img_file = PRODUCT_IMAGES.get(p['slug']) or CAT_IMAGES.get(p['category'], 'ring_preview.png')
            src = static_img / img_file
            img_path = ''
            if src.exists():
                dest_name = f"{p['slug']}.png"
                dest = media_products / dest_name
                shutil.copy2(str(src), str(dest))
                img_path = f'products/{dest_name}'

            obj, created = Product.objects.update_or_create(
                slug=p['slug'],
                defaults={
                    'name': p['name'],
                    'category': cat,
                    'price': p['price'],
                    'compare_price': p.get('compare_price'),
                    'stock': p['stock'],
                    'is_featured': p.get('is_featured', False),
                    'is_bestseller': p.get('is_bestseller', False),
                    'is_active': True,
                    'material': p.get('material', ''),
                    'stones': p.get('stones', ''),
                    'description': p.get('description', ''),
                    'image': img_path,
                }
            )
            self.stdout.write(f'  {"created" if created else "updated"}: {obj.name} → {img_path}')

        self.stdout.write(self.style.SUCCESS(
            f'\n✓ {Category.objects.count()} categories, {Product.objects.count()} products with images.'
        ))
