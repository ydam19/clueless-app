import { Button, ItemCard, Screen } from '../components'
import { itemById, outfits } from '../data'
import './Home.css'

// 홈: 오늘의 코디 추천 (담당: A)
// 지금은 가짜 데이터의 첫 번째 코디만 보여 주는 뼈대. 프로토타입 홈을 보고 채운다.
export default function Home() {
  const o = outfits[0]
  const wear = [o.top, o.layer, o.bottom, o.outer].map(itemById).filter((x) => x !== undefined)
  return (
    <Screen title={['Today’s', 'Outfit']}>
      <p className="sub">{o.reason}</p>
      <div className="home-wear">
        {wear.map((it) => <ItemCard key={it.id} item={it} />)}
      </div>
      <div className="home-dock">
        <Button variant="pink">다음 추천 코디로 맞추기</Button>
        <Button variant="solid">이 코디로 입을래요</Button>
      </div>
    </Screen>
  )
}
