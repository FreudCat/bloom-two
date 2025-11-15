import Hero from './components/Hero.jsx'
import TwoTruths from './components/TwoTruths.jsx'
import PortfolioGallery from './components/PortfolioGallery.jsx'
import Game from './components/game/Game.jsx'

const App = () => {
  return (
    <div className='content-wrapper'>
      <Hero />
      <TwoTruths />
      <PortfolioGallery />
      <Game />
    </div>
  )
}

export default App