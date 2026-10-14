# Design evolution — Doneal's Deck Builder

A living note of **what this site was**, **what stayed**, and **what changed** in the 2026 rebuild.

Live preview: [http://127.0.0.1:3000/](http://127.0.0.1:3000/)  
This file: [http://127.0.0.1:3000/docs/design-evolution.md](http://127.0.0.1:3000/docs/design-evolution.md)

---

## What was here (2022 GitHub Pages)

A senior-project Magic: The Gathering deck builder. Visual language came mostly from **Bootstrap 5 Cover** plus a dark gray gradient. Pages were flat HTML files at the repo root (`index.html`, `about.html`, `cards.html`, `logInPage.html`).

| Surface | Original idea | Original look |
| --- | --- | --- |
| Home | Big title, Get Started, two random Scryfall cards | White Bootstrap button, gray cover page |
| About | One sentence explaining the app | Centered Cover heading |
| Sign up | Username / password / confirm | Bootstrap `form-signin` |
| Decks | Login overlay, then search, add, save, store lists | Bootstrap grid + outline buttons |

```mermaid
flowchart LR
  subgraph pages2022 [GitHub Pages 2022]
    I[index.html]
    A[about.html]
    C[cards.html signup]
    L[logInPage.html login plus decks]
  end
  I -->|Get Started| C
  I -->|Log In| L
  C -->|I already have an account| L
  L -->|Sign up| C
  I --> A
```

---

## What stayed

The product is still **Doneal's Deck Builder**: create, edit, and view MTG decks; pull art and names from **Scryfall**; keep lists behind an account.

```mermaid
mindmap
  root((Kept ideas))
    Home hero plus Get Started
    Two featured cards
    About the deck vault
    Account sign up and sign in
    Search Add Save decks
    Scryfall card data
```

---

## What changed

| Layer | Before | After |
| --- | --- | --- |
| Structure | Root HTML for GitHub Pages | Vite app under `src/` with shared layout |
| Visual system | Bootstrap Cover, gray gradient | Custom playmat UI, no Bootstrap CSS |
| Color | Near-monochrome dark | Five-color mana + gold foil accents |
| Type | Bootstrap / system | Fraunces display + Outfit UI |
| Pages | Misleading filenames (`cards.html` = signup) | `signup.html`, `decks.html` |
| Layout chrome | Copied nav on every page | One header/footer in `layout.js` |
| Notes | None | This hosted markdown file |

```mermaid
flowchart TB
  subgraph now [2026 Vite app]
    L[layout.js header and footer]
    H[index.html Home]
    AB[about.html]
    SU[signup.html]
    DK[decks.html workshop]
    DOC[docs/design-evolution.md]
  end
  L --> H
  L --> AB
  L --> SU
  L --> DK
  L --> DOC
```

---

## Color language

The site now uses Magic's five colors as UI energy, not as a rules engine. Gold is the “foil” accent for primary actions.

```mermaid
pie showData
  title Accent mix in the new UI
  "White" : 18
  "Blue" : 18
  "Black" : 16
  "Red" : 18
  "Green" : 18
  "Gold foil" : 12
```

- **White / gold** — identity, headings, Get Started / Sign in
- **Blue** — search, save, links
- **Black / violet** — playmat background
- **Red** — delete
- **Green** — new deck

---

## Deck workshop flow (unchanged behavior, new chrome)

```mermaid
sequenceDiagram
  actor User
  participant Decks as decks.html
  participant Scryfall
  participant Storage as RestDB account
  User->>Decks: Sign in overlay
  Decks->>Storage: Check username
  User->>Decks: Search a card
  Decks->>Scryfall: Named / fuzzy lookup
  Scryfall-->>Decks: Art, mana, artist
  User->>Decks: Add / New / Save
  Decks->>Storage: Store deck list
```

IDs the old scripts still expect (`login-form`, `deckname`, `addCard`, `deckRoll`, and so on) were kept so the original deck-builder logic still runs.

---

## How to view this note

Open `/docs/design-evolution.md` on the local Vite server, or read it in the repo under `public/docs/`. GitHub will render the Mermaid diagrams on the file when this branch is pushed.
