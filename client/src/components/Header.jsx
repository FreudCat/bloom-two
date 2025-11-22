import { useState } from 'react'
import { Link } from '@tanstack/react-router'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Game', path: '/path' }
  ]

  return (
    <header className={`header-wrapper ${isMenuOpen ? 'is-open' : ''}`}>
      <Link
        to="/"
        className='logo'
      >
        <img
          src='../../public/vite.svg' alt='site logo with capital A'
        />
      </Link>
      <nav className='nav-wrapper'>
        {navLinks.map(link => (
          <Link
            key={link.name}
            to={link.path}
            className={`nav-link ${link.name}`}
            activeProps={{ className: 'active' }}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  )
}

export default Header