const STORAGE_KEY = 'doneal-deck-vault-v1'

function emptyDb() {
  return { accounts: [] }
}

function loadDb() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '')
    if (parsed && Array.isArray(parsed.accounts)) {
      return parsed
    }
  } catch {
    // Ignore corrupt storage and start clean.
  }
  return emptyDb()
}

function saveDb(db) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
}

function newId() {
  return crypto.randomUUID()
}

async function hashPassword(password, salt) {
  const payload = new TextEncoder().encode(`${salt}:${password}`)
  const digest = await crypto.subtle.digest('SHA-256', payload)
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

export async function createAccount(username, password) {
  const name = username.trim()
  if (!name || !password) {
    throw new Error('Username and password are required.')
  }

  const db = loadDb()
  if (db.accounts.some((account) => account.username.toLowerCase() === name.toLowerCase())) {
    throw new Error('That username is already taken.')
  }

  const salt = newId()
  const account = {
    _id: newId(),
    username: name,
    salt,
    passwordHash: await hashPassword(password, salt),
    decks: [],
  }
  db.accounts.push(account)
  saveDb(db)
  return { _id: account._id, username: account.username }
}

export function findAccount(username) {
  const name = username.trim().toLowerCase()
  return loadDb().accounts.find((account) => account.username.toLowerCase() === name) ?? null
}

export async function login(username, password) {
  const account = findAccount(username)
  if (!account) {
    throw new Error('No account found for that username.')
  }

  const passwordHash = await hashPassword(password, account.salt)
  if (passwordHash !== account.passwordHash) {
    throw new Error('Incorrect password.')
  }

  return { _id: account._id, username: account.username }
}

export function listDecks(accountId) {
  const account = loadDb().accounts.find((item) => item._id === accountId)
  return account ? account.decks.map((deck) => ({ ...deck })) : []
}

export function saveDeck(accountId, deck) {
  const db = loadDb()
  const account = db.accounts.find((item) => item._id === accountId)
  if (!account) {
    throw new Error('You need to be signed in to save a deck.')
  }

  const record = {
    _id: deck._id || newId(),
    deckName: deck.deckName || 'New Deck',
    lands: { ...(deck.lands || {}) },
    nonlands: { ...(deck.nonlands || {}) },
  }

  const index = account.decks.findIndex((item) => item._id === record._id)
  if (index >= 0) {
    account.decks[index] = record
  } else {
    account.decks.push(record)
  }

  saveDb(db)
  return { ...record }
}

export function deleteDeck(accountId, deckId) {
  const db = loadDb()
  const account = db.accounts.find((item) => item._id === accountId)
  if (!account) {
    return
  }
  account.decks = account.decks.filter((deck) => deck._id !== deckId)
  saveDb(db)
}
