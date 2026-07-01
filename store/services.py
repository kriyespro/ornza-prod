def get_product_gallery(product):
    """Build ordered gallery list: primary image first, then extra ProductImage rows."""
    gallery = []
    seen_urls = set()

    if product.image:
        url = product.image.url
        seen_urls.add(url)
        gallery.append({
            'url': url,
            'alt': product.name,
            'is_primary': True,
        })

    for extra in product.images.all():
        url = extra.image.url
        if url in seen_urls:
            continue
        seen_urls.add(url)
        gallery.append({
            'url': url,
            'alt': extra.alt_text or product.name,
            'is_primary': False,
        })

    return gallery
