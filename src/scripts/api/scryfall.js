const SCRYFALL_API = 'https://api.scryfall.com'

export async function getRandomModernCard() {
  const response = await fetch(`${SCRYFALL_API}/cards/random?q=${encodeURIComponent('is:modern')}`)

  if (!response.ok) {
    throw new Error(`Scryfall request failed: ${response.status}`)
  }

  return response.json()
}

export async function loadRandomCardImages(elementIds) {
  await Promise.all(
    elementIds.map(async (id) => {
      const image = document.getElementById(id)
      if (!image) {
        return
      }

      try {
        const card = await getRandomModernCard()
        image.src = card.image_uris?.large ?? ''
        image.alt = card.name ?? 'Magic: The Gathering card'
      } catch {
        image.alt = 'Card image unavailable'
      }
    }),
  )
}
