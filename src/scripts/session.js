const SESSION_COOKIE = 'username'

function cookieValue(name) {
  const prefix = `${name}=`
  const match = document.cookie.split(';').map((part) => part.trim()).find((part) => part.startsWith(prefix))
  return match ? decodeURIComponent(match.slice(prefix.length)) : ''
}

export function getSessionUser() {
  return cookieValue(SESSION_COOKIE)
}

export function setSessionUser(username) {
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `${SESSION_COOKIE}=${encodeURIComponent(username)};expires=${expires};path=/`
}

export function clearSession() {
  document.cookie = `${SESSION_COOKIE}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
}

export function requireSession(redirectTo = '/signin.html') {
  if (getSessionUser()) {
    return true
  }
  const next = encodeURIComponent(`${window.location.pathname}${window.location.search}`)
  window.location.replace(`${redirectTo}?next=${next}`)
  return false
}

export function consumeNextPath(fallback = '/decks.html') {
  const next = new URLSearchParams(window.location.search).get('next')
  if (next && next.startsWith('/') && !next.startsWith('//')) {
    return next
  }
  return fallback
}
