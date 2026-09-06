// workers/seo-optimiser.js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const response = await fetch(request)
  const contentType = response.headers.get('Content-Type') || ''
  if (!contentType.includes('text/html')) {
    return response
  }

  const ldJson = generateLDJSON(url)
  const canonicalUrl = url.origin + url.pathname

  const rewriter = new HTMLRewriter()
    .on('head', {
      element(head) {
        // Preload hero image for LCP optimisation
        head.append(
          '<link rel="preload" href="/assets/images/hero.jpg" as="image" fetchpriority="high">',
          { html: true }
        )
        // Canonical URL
        head.append(
          '<link rel="canonical" href="' + canonicalUrl + '">',
          { html: true }
        )
        // Fallback description (appended; browsers use the first one they find)
        head.prepend(
          '<meta name="description" content="Explore Paranjape Blue Ridge – a 138-acre integrated township in Hinjewadi Phase 1, Pune. Luxury 2 &amp; 3 BHK apartments, world-class amenities and RERA compliance.">',
          { html: true }
        )
      }
    })
    .on('body', {
      element(body) {
        body.append(
          '<script type="application/ld+json">' + JSON.stringify(ldJson) + '<\/script>',
          { html: true }
        )
      }
    })

  return rewriter.transform(response)
}

function generateLDJSON(url) {
  var segments = url.pathname.split('/').filter(function(s) { return s.length > 0 })
  var breadcrumbs = [{
    '@type': 'ListItem',
    position: 1,
    name: 'Home',
    item: url.origin
  }]

  for (var i = 0; i < segments.length; i++) {
    breadcrumbs.push({
      '@type': 'ListItem',
      position: i + 2,
      name: decodeURIComponent(segments[i].replace(/-/g, ' ')),
      item: url.origin + '/' + segments.slice(0, i + 1).join('/')
    })
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: url.href,
    name: 'Paranjape Blue Ridge – Luxury Real Estate Hinjewadi Pune',
    description: 'Paranjape Blue Ridge is a 138-acre integrated township in Hinjewadi Phase 1, Pune offering 2 & 3 BHK apartments.',
    publisher: {
      '@type': 'Organization',
      name: 'Paranjape Schemes Construction Ltd',
      url: url.origin
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs
    },
    potentialAction: {
      '@type': 'ReadAction',
      target: [{
        '@type': 'EntryPoint',
        urlTemplate: url.origin + url.pathname
      }]
    }
  }
}
