import { clearSession, getSessionUser } from './session.js'

function navItems(user) {
  const items = [
    { id: 'home', label: 'Welcome', href: '/' },
    { id: 'builder', label: 'Builder', href: '/decks.html' },
  ]

  if (user) {
    items.push({ id: 'signout', label: 'Sign out', href: '#sign-out' })
  } else {
    items.push(
      { id: 'signin', label: 'Sign in', href: '/signin.html' },
      { id: 'signup', label: 'Create account', href: '/signup.html' },
    )
  }

  return items
}

function navMarkup(activePage) {
  const user = getSessionUser()
  const links = navItems(user).map((item) => {
    const isActive = item.id === activePage
    const attrs = [
      `class="nav-link${isActive ? ' active' : ''}${item.id === 'signup' ? ' nav-link--cta' : ''}"`,
      `href="${item.href}"`,
    ]

    if (isActive) {
      attrs.push('aria-current="page"')
    }

    if (item.id === 'signout') {
      attrs.push('data-sign-out')
    }

    return `<a ${attrs.join(' ')}>${item.label}</a>`
  }).join('')

  const who = user
    ? `<span class="nav-user">${user}</span>`
    : ''

  return `
    <header class="site-header">
      <a class="brand" href="/">
        <span class="brand-pips" aria-hidden="true">
          <span class="pip pip-w"></span>
          <span class="pip pip-u"></span>
          <span class="pip pip-b"></span>
          <span class="pip pip-r"></span>
          <span class="pip pip-g"></span>
        </span>
        <span class="brand-name">Doneal's Deck Builder</span>
      </a>
      <nav class="nav-masthead" aria-label="Primary">
        ${who}
        ${links}
      </nav>
    </header>
  `
}

function footerMarkup() {
  return `
    <footer class="site-footer">
      <p>Doneal Bercier</p>
      <nav class="footer-nav" aria-label="Secondary">
        <a href="/about.html">How it works</a>
        <a href="https://scryfall.com/docs/api" target="_blank" rel="noreferrer noopener">Scryfall</a>
        <a href="/design.html">Design notes</a>
      </nav>
    </footer>
  `
}

export function initLayout(activePage) {
  if (getSessionUser()) {
    document.body.classList.add('is-signed-in')
  }

  const header = document.querySelector('[data-layout="header"]')
  const footer = document.querySelector('[data-layout="footer"]')

  if (header) {
    header.outerHTML = navMarkup(activePage)
  }

  if (footer) {
    footer.outerHTML = footerMarkup()
  }

  document.querySelector('[data-sign-out]')?.addEventListener('click', (event) => {
    event.preventDefault()
    clearSession()
    window.location.assign('/')
  })
}
