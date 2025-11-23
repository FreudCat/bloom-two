import { createFileRoute } from '@tanstack/react-router'
import Game from '../components/game/Game'

export const Route = createFileRoute('/game')({
  component: GamePage
})

function GamePage() {
  return (
    <div className='content-wrapper game'>
      <Game />
    </div>
  )
}
