import React, { useEffect } from 'react'
import "./main.scss"
import PostForm from './input/PostForm.jsx';
import { useLocation } from 'react-router-dom';
const Main = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#contact') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div>
      <div className="main" id="contact">
        <div className="container">
          <div className="main__box1">

          </div>
          <div className="main__box2">
            <div className="main__texte">
              <h2 className="main__title">
                Fikr-mulohazangizni yozing
              </h2>
              <p className="main__text">
                Muammo bo‘lsa, siz bilan bog‘lanamiz.
              </p>
            </div>
            <div className="main__input">
              <PostForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main