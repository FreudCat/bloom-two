import { createFileRoute } from '@tanstack/react-router'
import Hero from '../components/home/Hero'
import PortfolioGallery from '../components/home/PortfolioGallery'
import TwoTruths from '../components/home/TwoTruths'

export const Route = createFileRoute('/')({
  component: HomePage
})

function HomePage() {
  return (
    <div className='content-wrapper'>
      <Hero />
      <TwoTruths />
      <PortfolioGallery />
    </div>
  )
}
