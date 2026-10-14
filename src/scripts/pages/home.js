import { initLayout } from '../layout.js'
import { loadRandomCardImages } from '../api/scryfall.js'

initLayout('home')

loadRandomCardImages(['home-card-left', 'home-card-right'])
