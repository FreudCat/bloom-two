import Hero from './components/Hero.jsx'
import TwoTruths from './components/TwoTruths.jsx'
import PortfolioGallery from './components/PortfolioGallery.jsx'

const App = () => {
  return (
    <div className='content-wrapper'>
      <Hero />
      <TwoTruths />
      <PortfolioGallery />
    </div>
  )
}

export default App