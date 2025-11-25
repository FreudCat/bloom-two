import { createFileRoute } from '@tanstack/react-router'
import Hero from '../components/home/Hero'
import GameCTA from '../components/home/GameCTA'
import TwoTruths from '../components/home/TwoTruths'

export const Route = createFileRoute('/')({
  component: HomePage
})

function HomePage() {
  return (
    <div className='content-wrapper'>
      <Hero />
      <TwoTruths />
      <GameCTA />
    </div>
  )
}
