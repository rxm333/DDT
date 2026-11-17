#!/usr/bin/env python3
"""Conversion unique du site statique (../site, export Webflow nettoyé) vers le projet Astro.

Ce script a servi UNE fois à créer src/ et public/ ; il reste dans le dépôt pour mémoire et pour
pouvoir rejouer la conversion si besoin. Après la bascule, on édite directement src/.

Principe : rien n'est réécrit à la main. Chaque page garde son HTML d'origine (fragments/), seules
les adresses changent (/atelier au lieu de atelier.html, /images/… au lieu de ../images/…).
Ce qui deviendra éditable dans Sanity (articles, cartes d'actualités) est extrait en données.
"""
import glob
import html
import json
import os
import re
import shutil
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # web/
SITE = os.path.join(os.path.dirname(ROOT), 'site')
SRC = os.path.join(ROOT, 'src')
PUBLIC = os.path.join(ROOT, 'public')

ARTICLE_DIR = 'actualites'
SKIP = {'style-guide.html', '404.html'}


def read(path):
    with open(path, encoding='utf-8') as f:
        return f.read()


def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(text)


# ---------------------------------------------------------------- adresses
CDN = re.compile(r'https://cdn\.jsdelivr\.net/gh/rxm333/DDT@[0-9a-f]{40}/(?:site-scripts/)?')


def page_url(target):
    """« ../atelier.html#x » → « /atelier#x », « index.html » → « / »."""
    if re.match(r'^(https?:|mailto:|tel:)', target):
        return target
    frag = ''
    if '#' in target:
        target, frag = target.split('#', 1)
        frag = '#' + frag
    target = re.sub(r'^(\.\./)+', '', target)
    if target in ('', 'index.html'):
        return '/' + frag if target else frag
    return '/' + re.sub(r'\.html$', '', target) + frag


def rewrite(text):
    # Scripts / styles / polices / modèles 3D : servis par le site lui-même (plus de jsDelivr)
    text = CDN.sub('/site-scripts/', text)
    text = text.replace('/site-scripts/fonts/', '/site-scripts/fonts/')
    # Ressources locales : chemins absolus (les pages peuvent être à /actualites/…)
    text = re.sub(r'(?<=["\s(,])(?:\.\./)*(images|css|js|fonts)/', r'/\1/', text)

    # Liens vers les pages
    def repl(m):
        attr, val = m.group(1), m.group(2)
        if re.match(r'^(https?:|mailto:|tel:|#|/|javascript:)', val) or not re.search(r'\.html(#|$)', val):
            return m.group(0)
        return f'{attr}="{page_url(val)}"'

    return re.sub(r'\b(href)="([^"]*)"', repl, text)


# ---------------------------------------------------------------- découpe des pages
def parts(src):
    return {
        'html': re.search(r'<html[^>]*>', src).group(0),
        'head': re.search(r'<head>(.*?)</head>', src, re.S).group(1),
        'global': re.search(r'(<div class="global-styles">.*?)\n\s*<header', src, re.S).group(1),
        'navbar': re.search(r'(<header class="navbar_wrapper".*?</header>)', src, re.S).group(1),
        'main': re.search(r'(<main .*?</main>)', src, re.S).group(1),
        'footer': re.search(r'(<footer.*?</footer>)', src, re.S).group(1),
        # (ancolie-noir.html : une navbar en double après le footer, reste de l'export — ignorée)
        'tail': re.search(r'</footer>.*?</div>\s*(<script.*?)\s*</body>', src, re.S).group(1),
    }


def meta(head, prop):
    for pat in (rf'<meta content="([^"]*)" (?:name|property)="{prop}">', rf'<meta (?:name|property)="{prop}" content="([^"]*)">'):
        m = re.search(pat, head)
        if m:
            return html.unescape(m.group(1))
    return None


def current_links(segment):
    """Adresses marquées « page actuelle » (aria-current) dans la nav ou le pied de page."""
    return sorted({page_url(m) for m in re.findall(r'<a href="([^"]*)" [^>]*aria-current="page"', segment)})


def strip_current(segment):
    segment = segment.replace(' aria-current="page"', '')
    return segment.replace(' w--current', '')


# ---------------------------------------------------------------- gabarits partagés
def shared(index_src):
    p = parts(index_src)
    head = rewrite(p['head'])
    # Balises propres à chaque page → jetons remplis par Base.astro
    head = re.sub(r'<title>.*?</title>', '<title>{{title}}</title>', head)
    for prop, tok in [('description', 'description'), ('og:title', 'ogTitle'), ('og:description', 'ogDescription'),
                      ('og:image', 'ogImage'), ('twitter:title', 'twitterTitle'), ('twitter:description', 'twitterDescription')]:
        head = re.sub(rf'<meta content="[^"]*" (name|property)="{re.escape(prop)}">', rf'<meta content="{{{{{tok}}}}}" \1="{prop}">', head)
    head = re.sub(r'<meta property="og:type" content="[^"]*">', '<meta property="og:type" content="{{ogType}}">\n  {{{seo}}}', head)
    head = head.replace('  <meta content="Webflow" name="generator">\n', '')
    head = re.sub(r'\s*<link rel="preconnect" href="https://cdn\.jsdelivr\.net" crossorigin="">', '\n  ', head)
    head = head.replace('/site-scripts/dist/dame-de-tours.min.css', '/site-scripts/dist/dame-de-tours.min.css?v={{v_css}}')
    write(os.path.join(SRC, 'partials/head.html'), head.strip() + '\n')
    write(os.path.join(SRC, 'partials/global-styles.html'), rewrite(p['global']).rstrip() + '\n')
    write(os.path.join(SRC, 'partials/navbar.html'), strip_current(rewrite(p['navbar'])) + '\n')
    write(os.path.join(SRC, 'partials/footer.html'), strip_current(rewrite(p['footer'])) + '\n')
    tail = rewrite(p['tail']).replace('/site-scripts/dist/dame-de-tours.min.js', '/site-scripts/dist/dame-de-tours.min.js?v={{v_js}}')
    write(os.path.join(SRC, 'partials/tail.html'), tail.strip() + '\n')
    return p


# ---------------------------------------------------------------- actualités
def text_of(fragment):
    return html.unescape(re.sub(r'<[^>]+>', '', fragment)).strip()


def article_data(slug, src, cards):
    m = parts(src)['main']
    g = lambda pat: re.search(pat, m, re.S)
    body = g(r'<div data-article-body="" class="article-body_richtext w-richtext">(.*?)</div><div class="article-body_end">').group(1)
    cover = g(r'<div class="article-cover_component"><img src="([^"]*)"[^>]*alt="([^"]*)"')
    cta = g(r'<a data-article-cta="" href="([^"]*)" class="button w-button">(.*?)</a>')
    prod = g(r'<div class="article-product_media"><img src="([^"]*)"[^>]*class="article-product_image"/></div><div class="article-product_info"><p class="article-product_name"><a href="([^"]*)" class="article-product_link">(.*?)</a></p><p class="article-product_detail">(.*?)</p><p data-cart-price="([^"]*)" class="article-product_price">(.*?)</p>')
    head = parts(src)['head']
    card = cards[slug]
    return {
        'slug': slug,
        'title': text_of(g(r'<h1 class="article-header_title">(.*?)</h1>').group(1)),
        'category': text_of(g(r'<span class="article-header_category">(.*?)</span>').group(1)),
        'date': card['date'],
        'intro': text_of(g(r'<p class="article-header_intro">(.*?)</p>').group(1)),
        'cover': {'src': rewrite(f'"{cover.group(1)}')[1:], 'alt': html.unescape(cover.group(2))},
        'body': rewrite(body),
        'cta': {'label': text_of(cta.group(2)), 'href': page_url(cta.group(1))} if cta else None,
        'product': {
            'image': rewrite(f'"{prod.group(1)}')[1:], 'href': page_url(prod.group(2)), 'name': text_of(prod.group(3)),
            'detail': text_of(prod.group(4)), 'priceKey': prod.group(5), 'price': text_of(prod.group(6)),
        } if prod else None,
        'card': {'text': card['text'], 'image': card['image'], 'alt': card['alt']},
        'seo': {'title': html.unescape(re.search(r'<title>(.*?)</title>', head).group(1)), 'description': meta(head, 'description'),
                'ogImage': meta(head, 'og:image')},
    }


def news_cards(list_src):
    """Cartes de la page Actualités (variante « news-index ») : date visible, texte, image."""
    from datetime import datetime
    cards = {}
    for item in re.findall(r'<div role="listitem" class="news-index_item w-dyn-item">(.*?)</article></div>', list_src, re.S):
        slug = re.search(r'data-article-slug="([^"]*)"', item).group(1)
        img = re.search(r'<img src="([^"]*)"[^>]*alt="([^"]*)" class="news-card_image"', item)
        raw = text_of(re.search(r'<p data-news-date="" class="news-card_meta">(.*?)</p>', item).group(1))
        cards[slug] = {
            'date': datetime.strptime(raw, '%B %d, %Y').strftime('%Y-%m-%d'),
            'text': text_of(re.search(r'<p class="news-card_text">(.*?)</p>', item, re.S).group(1)),
            'image': rewrite(f'"{img.group(1)}')[1:], 'alt': html.unescape(img.group(2)),
        }
    return cards


def card_template(item, index_variant):
    c = re.sub(r'<img src="[^"]*" loading="lazy" alt="[^"]*" class="news-card_image"/>', '<img src="{{image}}" loading="lazy" alt="{{alt}}" class="news-card_image"/>', item)
    c = re.sub(r'<h([23]) class="news-card_title">.*?</h[23]>', r'<h\1 class="news-card_title">{{title}}</h\1>', c)
    c = re.sub(r'<p class="news-card_text">.*?</p>', '<p class="news-card_text">{{text}}</p>', c, flags=re.S)
    c = re.sub(r'<p data-news-date="" class="news-card_meta">.*?</p>', '<p data-news-date="" class="news-card_meta">{{dateLabel}}</p>', c)
    c = re.sub(r'data-news-date="[^"]+" data-article-slug', 'data-news-date="{{dateIso}}" data-article-slug', c)
    c = re.sub(r'data-article-slug="[^"]*" href="[^"]*"', 'data-article-slug="{{slug}}" href="/actualites/{{slug}}"', c)
    c = re.sub(r'<span class="dds-sr">.*?</span>', '<span class="dds-sr">{{title}}</span>', c)
    return c


def empty_news_lists(text):
    """Vide chaque [data-news-list] (on compte les <div> pour trouver sa fermeture) → <!--news-->."""
    out, pos = [], 0
    for m in re.finditer(r'<div[^>]*data-news-list=""[^>]*>', text):
        if m.start() < pos:
            continue
        depth, i = 1, m.end()
        for t in re.finditer(r'<(/?)div\b[^>]*>', text[m.end():]):
            depth += -1 if t.group(1) else 1
            if depth == 0:
                i = m.end() + t.start()
                break
        out.append(text[pos:m.end()] + '<!--news-->')
        pos = i
    out.append(text[pos:])
    return ''.join(out)



def templates(article_src, list_page_src):
    main = rewrite(parts(article_src)['main'])
    item = re.search(r'(<div role="listitem" class="news_item w-dyn-item">.*?</article></div>)', main, re.S).group(1)
    write(os.path.join(SRC, 'templates/news-card.html'), card_template(item, False) + '\n')
    lst = rewrite(parts(list_page_src)['main'])
    item = re.search(r'(<div role="listitem" class="news-index_item w-dyn-item">.*?</article></div>)', lst, re.S).group(1)
    write(os.path.join(SRC, 'templates/news-index-card.html'), card_template(item, True) + '\n')

    # Page article
    t = main
    t = re.sub(r'<span class="article-header_category">.*?</span>', '<span class="article-header_category">{{category}}</span>', t)
    t = re.sub(r'<time data-article-date="" class="article-header_date">.*?</time>', '<time data-article-date="" datetime="{{dateIso}}" class="article-header_date">{{dateLabel}}</time>', t)
    t = re.sub(r'<span data-article-reading="" class="article-header_reading">.*?</span>', '<span data-article-reading="{{readingMinutes}}" class="article-header_reading">Lecture {{readingMinutes}} min</span>', t)
    t = re.sub(r'<h1 class="article-header_title">.*?</h1>', '<h1 class="article-header_title">{{title}}</h1>', t)
    t = re.sub(r'<p class="article-header_intro">.*?</p>', '<p class="article-header_intro">{{intro}}</p>', t)
    t = re.sub(r'(<div class="article-cover_component"><img src=")[^"]*("[^>]*alt=")[^"]*(")', r'\1{{coverSrc}}\2{{coverAlt}}\3', t)
    t = re.sub(r'(<div data-article-body="" class="article-body_richtext w-richtext">).*?(</div><div class="article-body_end">)', r'\1{{{body}}}\2', t, flags=re.S)
    t = re.sub(r'<div class="article-body_cta">.*?</div>(?=<div class="article-product_component">)', '{{{cta}}}', t, flags=re.S)
    t = re.sub(r'<div class="article-product_component">.*?</div></div></div>(?=</div></div></div></div></div></section>)', '{{{product}}}', t, flags=re.S)
    t = re.sub(r'(<div data-news-limit="3" data-article-related="" data-news-list="" role="list" class="news_list w-dyn-items">).*?(</div></div></div></div></div></section></main>)', r'\1{{{related}}}\2', t, flags=re.S)
    write(os.path.join(SRC, 'templates/article.html'), t + '\n')

    cta = re.search(r'(<div class="article-body_cta">.*?</div>)(?=<div class="article-product_component">)', main, re.S).group(1)
    cta = re.sub(r'href="[^"]*" class="button w-button">.*?</a>', 'href="{{href}}" class="button w-button">{{label}}</a>', cta)
    write(os.path.join(SRC, 'templates/article-cta.html'), cta + '\n')
    prod = re.search(r'(<div class="article-product_component">.*?</div></div></div>)(?=</div></div></div></div></div></section>)', main, re.S).group(1)
    prod = re.sub(r'<img src="[^"]*" loading="lazy" alt="" class="article-product_image"/>', '<img src="{{image}}" loading="lazy" alt="" class="article-product_image"/>', prod)
    prod = re.sub(r'<a href="[^"]*" class="article-product_link">.*?</a>', '<a href="{{href}}" class="article-product_link">{{name}}</a>', prod)
    prod = re.sub(r'<p class="article-product_detail">.*?</p>', '<p class="article-product_detail">{{detail}}</p>', prod)
    prod = re.sub(r'<p data-cart-price="[^"]*" class="article-product_price">.*?</p>', '<p data-cart-price="{{priceKey}}" class="article-product_price">{{price}}</p>', prod)
    write(os.path.join(SRC, 'templates/article-product.html'), prod + '\n')


def empty_product_markup():
    src = read(os.path.join(SITE, ARTICLE_DIR, 'chateau-de-la-mothe-chandeniers.html'))
    main = rewrite(parts(src)['main'])
    m = re.search(r'(<div class="article-product_component">.*?</div></div></div>)(?=</div></div></div></div></div></section>)', main, re.S)
    write(os.path.join(SRC, 'templates/article-product-empty.html'), m.group(1) + '\n')


# ---------------------------------------------------------------- programme
def main():
    if os.path.exists(os.path.join(SRC, 'fragments')) and '--force' not in sys.argv:
        sys.exit('src/fragments existe déjà : conversion déjà faite (ajouter --force pour la rejouer).')

    index_src = read(os.path.join(SITE, 'index.html'))
    shared(index_src)

    # Fichiers servis tels quels
    for d in ('images', 'css', 'js', 'fonts'):
        shutil.copytree(os.path.join(SITE, d), os.path.join(PUBLIC, d), dirs_exist_ok=True)
    shutil.copy(os.path.join(SITE, 'robots-preprod.txt'), os.path.join(PUBLIC, 'robots-preprod.txt'))
    shutil.copy(os.path.join(SITE, 'style-guide.html'), os.path.join(PUBLIC, 'style-guide.html'))

    # Actualités → données
    cards = news_cards(parts(read(os.path.join(SITE, 'actualites.html')))['main'])
    for f in sorted(glob.glob(os.path.join(SITE, ARTICLE_DIR, '*.html'))):
        slug = os.path.basename(f)[:-5]
        data = article_data(slug, read(f), cards)
        write(os.path.join(SRC, 'content/articles', slug + '.json'), json.dumps(data, ensure_ascii=False, indent=2) + '\n')
    templates(read(os.path.join(SITE, ARTICLE_DIR, 'collection-ancolie.html')), read(os.path.join(SITE, 'actualites.html')))
    empty_product_markup()

    # Pages → fragments + métadonnées
    pages = []
    for f in sorted(glob.glob(os.path.join(SITE, '*.html'))):
        name = os.path.basename(f)
        if name in SKIP:
            continue
        src = read(f)
        p = parts(src)
        key = name[:-5]
        main_html = rewrite(p['main'])
        # Listes d'actualités : générées à la construction (tri + limite), on garde le conteneur vide
        main_html = empty_news_lists(main_html)
        write(os.path.join(SRC, 'fragments', key + '.html'), main_html + '\n')
        head = p['head']
        pages.append({
            'key': key,
            'path': page_url(name),
            'title': html.unescape(re.search(r'<title>(.*?)</title>', head).group(1)),
            'description': meta(head, 'description'),
            'ogTitle': meta(head, 'og:title'), 'ogDescription': meta(head, 'og:description'),
            'twitterTitle': meta(head, 'twitter:title'), 'twitterDescription': meta(head, 'twitter:description'),
            'ogImage': meta(head, 'og:image'), 'ogType': meta(head, 'og:type') or 'website',
            'wfPage': re.search(r'data-wf-page="([^"]*)"', p['html']).group(1),
            'navCurrent': current_links(p['navbar']), 'footerCurrent': current_links(p['footer']),
        })
    write(os.path.join(SRC, 'data/pages.json'), json.dumps(pages, ensure_ascii=False, indent=2) + '\n')

    # Page article : métadonnées communes (data-wf-page, liens actifs)
    art = parts(read(os.path.join(SITE, ARTICLE_DIR, 'collection-ancolie.html')))
    write(os.path.join(SRC, 'data/article-page.json'), json.dumps({
        'wfPage': re.search(r'data-wf-page="([^"]*)"', art['html']).group(1),
        'navCurrent': current_links(art['navbar']), 'footerCurrent': current_links(art['footer']),
    }, ensure_ascii=False, indent=2) + '\n')
    print(f'{len(pages)} pages, {len(cards)} articles')


if __name__ == '__main__':
    main()
