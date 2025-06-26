import React, {useState, useMemo, FormEvent} from 'react'
import {
  usePopularProducts,
  ProductCard,
  useShopNavigation,
} from '@shopify/shop-minis-react'
import {FiSend} from 'react-icons/fi'
import shopsData from './data/shops.json'   // ← local JSON import ✅

const API_ORIGIN = import.meta.env.DEV ? 'http://localhost:4001' : ''

/* -------- stop-words for loose matching -------- */
const STOP_WORDS = [
  'buy','online','shop','store','order','purchase',
  'the','a','an','to','for','and','of',
]

type Shop = {
  id: string
  name: string
  description: string
  logoUrl?: string
}

export function App() {
  /* user input */
  const [input, setInput]       = useState('')
  const [keywords, setKeywords] = useState('')

  /* popular products */
  const {products: popular, isLoading: loadingPopular} = usePopularProducts()

  /* convert JSON to typed array once */
  const shops: Shop[] = shopsData

  /* token-based filter against **description** OR name  */
  const displayShops: Shop[] = useMemo(() => {
    if (!keywords) return []

    const tokens = keywords
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w && !STOP_WORDS.includes(w))

    if (tokens.length === 0) return []

    return shops.filter((s) => {
      const hay = `${s.name} ${s.description}`.toLowerCase()
      return tokens.some((t) => hay.includes(t))
    })
  }, [shops, keywords])

  /* deep-link (still works if ids are real) */
  const {navigateToShop} = useShopNavigation()

  /* refine keywords via /api/refine (unchanged) */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    try {
      const res = await fetch(`${API_ORIGIN}/api/refine`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({text: input}),
      })
      if (!res.ok) throw new Error(await res.text())

      const {searchPhrase} = await res.json()
      const cleaned = (searchPhrase ?? '').replace(/^"+|"+$/g, '')
      if (cleaned) {
        setInput('')
        setKeywords(cleaned)
      }
    } catch (err) {
      console.error('❌ refine failed', err)
    }
  }

  /* UI flags */
  const showingShops = !!keywords
  const isLoading    = showingShops ? false : loadingPopular
  const hasNoResults =
    showingShops ? displayShops.length === 0 : popular?.length === 0

  /* ---------- render ---------- */
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {showingShops ? `Shops for “${keywords}”` : "Royian's Hackathon Shop Mini"}
      </h1>

      {/* search bar */}
      <form onSubmit={handleSubmit} className="flex mb-4">
        <input
          className="flex-1 border p-2 rounded-l"
          placeholder="Search products or shops…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-purple-600 p-2 rounded-r text-white disabled:opacity-40"
          disabled={!input.trim()}
        >
          <FiSend />
        </button>
      </form>

      {/* states */}
      {isLoading && <p>Loading…</p>}
      {!isLoading && hasNoResults && (
        <p>No {showingShops ? 'shops' : 'products'} found.</p>
      )}

      {/* results */}
      {!isLoading && (
        showingShops ? (
          <ul className="space-y-2">
            {displayShops.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => navigateToShop({shopId: s.id})}
                  className="w-full border p-4 rounded text-left hover:shadow"
                >
                  {s.logoUrl && (
                    <img
                      src={s.logoUrl}
                      alt={s.name}
                      className="w-full h-28 object-cover rounded mb-2"
                    />
                  )}
                  <h2 className="font-medium">{s.name}</h2>
                  <p className="text-sm text-gray-600">{s.description}</p>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {popular?.map((p: { id: React.Key | null | undefined }) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )
      )}
    </div>
  )
}
