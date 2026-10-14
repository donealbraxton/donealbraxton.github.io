import { initLayout } from '../layout.js'
import { login } from '../api/vault.js'
import { consumeNextPath, getSessionUser, setSessionUser } from '../session.js'

initLayout('signin')

if (getSessionUser()) {
  window.location.replace('/decks.html')
}

const form = document.getElementById('login-form')
const status = document.getElementById('auth-status')

form?.addEventListener('submit', async (event) => {
  event.preventDefault()
  try {
    const account = await login(
      document.getElementById('inputUser').value,
      document.getElementById('inputPassword').value,
    )
    setSessionUser(account.username)
    window.location.assign(consumeNextPath('/decks.html'))
  } catch (error) {
    if (status) {
      status.textContent = error.message
      status.classList.add('is-error')
    }
  }
})
