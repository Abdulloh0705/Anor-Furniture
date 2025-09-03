import React from 'react'
import './footer.scss'
const Footer = () => {
    return (
        <div className="footer" id='about'>
            <div className="container">
                <div className="footer__all-box">
                    <div className="footer__box">
                        <div className="footer__logo-box">
                            <h2 className="footer__l-title">
                                Anor Furniture
                            </h2>
                            <p className="footer__l-text">
                                Eng sifatli va ishonchli mahsulotlarni sizga tezkor
                                va qulay tarzda yetkazib beramiz. Har bir xaridingiz
                                uchun kafolat, hamyonbop narx va yuqori darajadagi
                                xizmat taqdim etamiz.
                            </p>
                        </div>
                        <div className="footer__t-i-l__box">
                            <h3 className="footer__i-l__title">
                                Mahsulot Turlari
                            </h3>
                            <div className="footer__i-box">
                                <ul className="footer__item1-box">
                                    <li className="footer__list">Arganayzer</li>
                                    <li className="footer__list">Sumka toshlar</li>
                                    <li className="footer__list">Yengil temir</li>
                                    <li className="footer__list">Ogir temir</li>
                                    <li className="footer__list">Hurstal</li>
                                </ul>
                                <ul className="footer__item2-box">
                                    <li className="footer__list">Metrajni koz</li>
                                    <li className="footer__list">Koz</li>
                                    <li className="footer__list">Biser</li>
                                    <li className="footer__list">Leska sim</li>
                                    <li className="footer__list">Zanjir</li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer__ttg-crt__big-box">
                            <div className="footer__ttg-box">
                                <span> Admin: <a href="tel:+998 (90) 123-45-67">+998 (90) 123-45-67</a></span>
                                <p className="footer__ttg-job-t">Dushanba - Yakshanba: 08:00 - 20:00</p>
                            </div>
                            <div className="footer__crt-box">
                                <p className="footer__crt-title">
                                    To'lov usullari:
                                </p>
                                <div className="footer__crt-img-box">
                                    <img src="/card_img/visa-img.png" alt="" className="footer__crt-img1" />
                                    <img src="/card_img/uzcard-img.png" alt="" className="footer__crt-img2" />
                                    <img src="/card_img/humo-img.png" alt="" className="footer__crt-img3" />
                                    <img src="/card_img/master-img.png" alt="" className="footer__crt-img4" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="developer">
                        <p>Developer:</p>
                        <a href="https://t.me/X_A_N_07" target="_blank" rel="noopener noreferrer">
                            @X_A_N_07
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
