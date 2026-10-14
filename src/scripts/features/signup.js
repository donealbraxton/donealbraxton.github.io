import { createAccount } from '../api/vault.js'

function showStatus(message, isError = false) {
  const status = document.getElementById('auth-status')
  if (!status) {
    window.alert(message)
    return
  }
  status.textContent = message
  status.classList.toggle('is-error', isError)
}

document.getElementById('login-form')?.addEventListener('submit', async (event) => {
  event.preventDefault()

  const username = document.getElementById('inputUser').value
  const password = document.getElementById('inputPassword').value
  const confirmPassword = document.getElementById('inputCPassword').value

  if (password !== confirmPassword) {
    showStatus("Passwords don't match.", true)
    return
  }

  try {
    await createAccount(username, password)
    const panel = document.createElement('div')
    panel.className = 'auth-card'
    const link = document.createElement('a')
    link.id = 'aa'
    link.href = '/signin.html'
    link.textContent = 'Account created — log in now'
    panel.append(link)
    document.getElementById('login-form').replaceWith(panel)
  } catch (error) {
    showStatus(error.message, true)
  }
})
