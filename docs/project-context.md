# Project context (keep this file current)

Read this instead of the long chat history. Update it when a decision or layout changes.

## What this is

Doneal’s Magic: The Gathering deck builder. 2022 GitHub Pages senior project, now a Vite app on branch `rebuild`. Remote: `https://github.com/donealbraxton/donealbraxton.github.io.git`. Live GitHub Pages is still `main` — do not push `rebuild` unless asked.

Local path: `C:\Users\donea_iua8xs7\donealbraxton.github.io`

## How to run

```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
npm run dev
```

Vite: `http://127.0.0.1:3000/` (`strictPort`, host `127.0.0.1`). Node is installed at `C:\Program Files\nodejs` but is often missing from PATH. `ERR_CONNECTION_REFUSED` on :3000 almost always means this process died — restart it. Express `server.js` was removed; it never served the static pages.

## Layout (do not flatten back to GitHub Pages root HTML)

```
src/                 Vite root
  index.html         Welcome (three-step path)
  about.html         How it works
  signup.html        Create account
  signin.html        Sign in
  decks.html         Builder + vault (requires session)
  login.html         Redirects to signin
  design.html        Human-readable design notes
  styles/            tokens, base, layout, components, workshop
  scripts/
    layout.js        Shared header/footer
    pages/           One entry per page
    api/scryfall.js
    api/vault.js     Local accounts + decks
    features/        signup.js, deck-builder.js (legacy jQuery)
public/fonts/        Glass Antiqua
public/docs/design-evolution.md
```

Keep HTML IDs the deck builder already uses: `login-form`, `inputUser`, `inputPassword`, `inputCPassword`, `deckname`, `name`, `search`, `add-count`, `addCard`, `myImg`, `cardName`, `artist`, `card-fill`, `land-fill`, `deckRoll`, `newDeck`, `saveDeck`, `deleteDeck`, `overlay`.

## How pages are used

1. **Welcome** (`/`) — splash, three steps, CTAs
2. **Create account** / **Sign in** — local vault login (not a fake “Log In” tab)
3. **Builder** (`/decks.html`) — search, preview, counts, spells/lands; redirects to sign-in if logged out
4. **Vault** — saved decks live at the bottom of the builder
5. **How it works** / Scryfall / Design notes — footer only

Nav: Welcome, Builder, then Sign in + Create account (logged out) or username + Sign out (logged in). Session cookie: `username`. Helpers in `src/scripts/session.js`.

## Design language

Not Bootstrap, and not a generic SaaS template. Dark playmat, WUBRG used for meaning (blue search/save, red delete, green new, gold primary). Type: Fraunces for titles, Outfit for UI. Tokens live in `src/styles/tokens.css`.

Splash page introduces the product. The **workshop** is a wide CSS grid: toolbar, search row, large preview, spell slots, land slots, vault (`src/styles/workshop.css`). Account screens stay task-shaped.

UI work follows `.cursor/rules/ui-design.mdc`: extend this system; do not add gradient chrome, glass panels, card-around-everything layouts, pill controls, or decorative motion. Do not restyle unrelated screens while touching one.

## Storage (not RestDB)

RestDB (`doncards-fa13.restdb.io`) is retired in this codebase. It stored plaintext passwords behind a public API key. Replacement: `src/scripts/api/vault.js` → `localStorage` key `doneal-deck-vault-v1`. Passwords SHA-256+salt in the browser. Data is **this origin, this browser**. Cross-device cloud (e.g. Supabase) is not wired yet.

Do not put RestDB keys or old account dumps back in the repo.

## Known issues / next likely work

- Dev server does not survive overnight; restart `npm run dev`
- Deck-builder logic is still jQuery (`deck-builder.js`); Scryfall calls can be slow/sync
- Local vault does not sync across devices
- Workshop layout may still need tuning at mid-widths

## Design notes

- Page: `/design.html`
- Markdown diagrams: `/docs/design-evolution.md` (also `public/docs/design-evolution.md`)
