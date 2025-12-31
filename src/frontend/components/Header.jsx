import React, { useState, memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaLinkedin, FaGithub, FaEnvelope, FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  }, []);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm shadow-lg px-4 sm:px-6 md:px-10 py-4'>
      <nav className='flex text-base sm:text-lg md:text-xl font-mono items-center justify-between max-w-7xl mx-auto'>
        <Link to="/" className='text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-bold cursor-pointer hover:text-green-400 transition-colors duration-700'>
          Ahmad<span className='text-green-400'>Nawaz</span>
        </Link>

        <button 
          onClick={toggleMenu} 
          className='md:hidden text-3xl sm:text-4xl text-green-400 z-50 hover:scale-110 transition-transform duration-300'
          aria-label='Toggle menu'
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className='hidden md:flex items-center gap-6 lg:gap-8'> 
          <ul className='flex gap-x-6 lg:gap-x-8 text-base lg:text-lg'>
            <li 
              onClick={() => scrollToSection('about')}
              className='cursor-pointer text-gray-300 hover:text-green-400 transition-colors duration-300 font-semibold'
            >
              About
            </li>
            <li 
              onClick={() => scrollToSection('projects')}
              className='cursor-pointer text-gray-300 hover:text-green-400 transition-colors duration-300 font-semibold'
            >
              Projects
            </li>
            <li 
              onClick={() => scrollToSection('contact')}
              className='cursor-pointer text-gray-300 hover:text-green-400 transition-colors duration-300 font-semibold'
            >
              Contact
            </li>
          </ul>
          
          <ul className='flex items-center gap-4'>
            <li>
              <a 
                href="https://www.linkedin.com/in/ahmad-nawaz-b97b85327/" 
                target="_blank" 
                rel="noopener noreferrer"
                className='text-gray-300 hover:text-blue-500 transition-colors duration-300 transform hover:scale-110 inline-block'
              >
                <FaLinkedin className='text-2xl' />
              </a>
            </li>
            <li>
              <a 
                href="https://github.com/mehar99197" 
                target="_blank" 
                rel="noopener noreferrer"
                className='text-gray-300 hover:text-gray-400 transition-colors duration-300 transform hover:scale-110 inline-block'
              >
                <FaGithub className='text-2xl' />
              </a>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('contact')}
                className='font-semibold text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg transition-all duration-500 flex items-center gap-2 transform hover:scale-105 shadow-lg'
              >
                <FaEnvelope className='text-lg' /> 
                <span>Contact</span>
              </button>
            </li>
           
          </ul>
        </div>

        <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:hidden fixed top-0 left-0 w-full h-screen bg-black/98 bg-[linear-gradient(54deg,gray,black,black)] z-40 flex-col items-center justify-center gap-8 animate-fade-in`}>
          <ul className='flex flex-col items-center gap-6 text-3xl font-bold'>
            <li 
              onClick={() => scrollToSection('home')}
              className='cursor-pointer text-gray-300 hover:text-green-400 transition-colors duration-700 hover:scale-150 transform'
            >
              Home
            </li>
            <li 
              onClick={() => scrollToSection('about')}
              className='cursor-pointer text-gray-300 hover:text-green-400 transition-colors duration-300 hover:scale-110 transform'
            >
              About
            </li>
            <li 
              onClick={() => scrollToSection('projects')}
              className='cursor-pointer text-gray-300 hover:text-green-400 transition-colors duration-300 hover:scale-110 transform'
            >
              Projects
            </li>
            <li 
              onClick={() => scrollToSection('contact')}
              className='cursor-pointer text-gray-300 hover:text-green-400 transition-colors duration-300 hover:scale-110 transform'
            >
              Contact
            </li>
          </ul>
          
          <div className='w-16 h-0.5 bg-gray-700'></div>
          
          <ul className='flex flex-col items-center gap-6 text-xl'>
            <li>
              <a 
                href="https://www.linkedin.com/in/ahmad-nawaz-b97b85327/" 
                target="_blank" 
                rel="noopener noreferrer"
                className='cursor-pointer hover:text-blue-500 transition-colors flex items-center gap-3 text-gray-300' 
                onClick={toggleMenu}
              >
                <FaLinkedin className='text-3xl' /> LinkedIn
              </a>
            </li>
            <li>
              <a 
                href="https://github.com/mehar99197" 
                target="_blank" 
                rel="noopener noreferrer"
                className='cursor-pointer hover:text-gray-400 transition-colors flex items-center gap-3 text-gray-300' 
                onClick={toggleMenu}
              >
                <FaGithub className='text-3xl' /> Github
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
});

export default Header;
