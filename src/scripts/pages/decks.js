import { initLayout } from '../layout.js'
import { bootDeckBuilder } from '../features/deck-builder.js'
import { requireSession } from '../session.js'

initLayout('builder')

if (requireSession('/signin.html')) {
  bootDeckBuilder()
}
