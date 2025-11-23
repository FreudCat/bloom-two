import { useState } from 'react'
import { Link } from '@tanstack/react-router'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Game', path: '/game' }
  ]

  return (
    <header className={'header-wrapper'}>
      <Link
        to="/"
        className='logo'
      >
        <img
          src='../../public/vite.svg' alt='site logo with capital A'
          onClick={closeMenu}
        />
      </Link>
      <nav className={`nav-wrapper ${isMenuOpen ? 'nav-open' : ''}`}>
        {navLinks.map(link => (
          <Link
            key={link.name}
            to={link.path}
            className={`nav-link ${link.name}`}
            activeProps={{ className: 'active' }}
            onClick={closeMenu}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <button
        className={`hamburger ${isMenuOpen ? 'hamburger-open' : ''}`}
        onClick={toggleMenu}
        aria-label='Toggle menu'
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      {isMenuOpen && (
        <div className='overlay' onClick={closeMenu} />
      )}
    </header>
  )
}

export default Header