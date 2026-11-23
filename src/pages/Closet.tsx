import { ItemCard, Screen } from '../components'
import { items } from '../data'
import './Closet.css'

// 옷장: 내 옷 목록, 옷 등록 (담당: B)
export default function Closet() {
  return (
    <Screen title={['My', 'Wardrobe']}>
      <p className="sub">총 {items.length}벌</p>
      <div className="closet-grid">
        {items.map((it) => <ItemCard key={it.id} item={it} />)}
      </div>
    </Screen>
  )
}
