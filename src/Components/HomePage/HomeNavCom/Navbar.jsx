import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaAngleDown, FaHome } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import './nav.scss';
import './meidaNav.scss';
import { AiOutlineProduct } from 'react-icons/ai';
import { IoBookOutline } from 'react-icons/io5';
import { MdContactPhone } from 'react-icons/md';
import { IoMdCart } from 'react-icons/io';
import { ImSearch } from 'react-icons/im';
import { TbMenu2 } from "react-icons/tb";
import { IoClose } from "react-icons/io5";

const Navbar = ({ cartCount }) => {
  const { t, i18n } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [language, setLanguage] = useState('uz');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // ✅ qo‘shildi
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      setLanguage(savedLang);
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
    setLangMenuOpen(false);
  };

  const goToContact = () => {
    if (location.pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#contact');
    }
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [location]);

  const goToAbout = () => {
    if (location.pathname === '/') {
      const element = document.getElementById('about');
      if (element) {
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      navigate('/#about');
    }
  };

  useEffect(() => {
    if (location.hash === "#contact") {
      const element = document.getElementById('contact');
      if (element) {
        const yOffset = -200;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div>
      <div className="nav">
        <div className="container">
          <div className="nav__box">
            <a href='/' className="nav__logo">
              <img src="/logo.png" alt="" />
              <span> Anor Furniture</span>
            </a>

            {/* ✅ mobile menu qo‘shildi */}
            <ul className={`nav__item ${menuOpen ? 'nav__item--open' : ''}`}>
              <li className="nav__list">
                <FaHome className='nav__link-icon1' /> <a href='/' className="nav__link">{t('home')}</a>
              </li>
              <li className="nav__list">
                <AiOutlineProduct className='nav__link-icon2' /> <Link to={"/products"} className="nav__link">{t('products')}</Link>
              </li>
              <li className="nav__list">
                <IoBookOutline className='nav__link-icon3' />
                <button
                  className="nav__link"
                  onClick={goToAbout}
                >
                  {t('about')}
                </button>
              </li>
              <li className="nav__list">
                <MdContactPhone className='nav__link-icon4' />
                <button
                  className="nav__link"
                  onClick={goToContact}
                >
                  {t('contact')}
                </button>
              </li>
            </ul>

            <div className="nav__all-actions">
              <div className="nav__lang-box">
                <div className="nav__search-box">
                  <input type="text" />
                  <ImSearch className='nav__search-svg' />
                </div>
                <div className="nav__search-cart">
                  <Link to="/cart" className="cart-link">
                    <IoMdCart className='nav__basket-svg' />
                    <span className="cart-count">{cartCount}</span>
                  </Link>
                </div>
                <li className="nav__list nav__lang">
                  <div className="nav__lang-btn-wrap" onClick={() => setLangMenuOpen(!langMenuOpen)}>
                    <button>{language.toUpperCase()}</button>
                    <FaAngleDown className={`nav__lang-icon ${langMenuOpen ? 'rotated' : ''}`} />
                  </div>

                  {langMenuOpen && (
                    <ul className="nav__lang-menu">
                      {['uz', 'ru', 'en']
                        .filter(l => l !== language)
                        .map((l) => (
                          <li key={l}>
                            <button onClick={() => changeLanguage(l)}>
                              {l.toUpperCase()}
                            </button>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
                <div className="nav__menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                  {menuOpen ? <IoClose size={30} /> : <TbMenu2 size={30} />}
                </div>
                {isLoggedIn ? (
                  <Link to="/profile" className="nav__login-link">{t('profile')}</Link>
                ) : (
                  <Link to="/login" className="nav__login-link">{t('login')}</Link>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Navbar;
