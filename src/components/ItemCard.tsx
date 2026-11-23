import type { Item } from '../data'
import './ItemCard.css'

// 옷 한 벌 카드 (옷장 목록, 추천 코디에서 같이 씀)
export function ItemCard({ item }: { item: Item }) {
  return (
    <div className="item-card">
      <img src={item.image} alt={item.name} />
      <p className="name">{item.name}</p>
      <p className="cat">{item.category}</p>
    </div>
  )
}
