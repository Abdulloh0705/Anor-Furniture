import React from 'react';
import "./header.scss";
import { FaArrowRight } from 'react-icons/fa';
import { SlSocialDropbox } from 'react-icons/sl';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goToProducts = () => navigate('/products');
  return (
    <div>
      <div className="header" id='/'>
        <div className="container">
          <div className="header__box">
            <div className="header__banner-text">
              <h1 className="header__title">
                {t('header.title')}
              </h1>
              <p className="header__text">
                {t('header.text')}
              </p>
              <div className="header__banner-btn">
                <button className="header__btn1" onClick={goToProducts}>
                  {t('header.btnExplore')} <FaArrowRight className='header__btn1-svg' />
                </button>

                <button className="header__btn2" onClick={goToProducts}>
                  <SlSocialDropbox className='header__btn2-svg' /> {t('header.btnAllProducts')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
