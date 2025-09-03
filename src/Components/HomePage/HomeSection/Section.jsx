import React from 'react'
import "./section.scss"
import { FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
const Section = () => {
    const navigate = useNavigate();
    const goToProducts = () => navigate('/products');
    return (
        <div>
            <div className="section">
                <div className="container">
                    <div className="section__box">
                        <div className="section__text">
                            <h2 className="section__title">Turkum bo'yicha xarid qiling</h2>
                            <p className="section__t-text">
                                Har bir ish uchun kerakli asboblar bir joyda.
                            </p>
                        </div>
                        <div className="section__type">
                            <div className="section__type_1">
                                <img src="/section_t-img/t1.png" alt="" className="section__t1-img" />
                                <h2 className="section__t1-title">
                                    Premium matolar <FaArrowRight className='section__t1-icon' />
                                </h2>
                                <p className="section__t1-text">
                                    Professional tikuvchilik loyihalari uchun
                                    yuqori sifatli materiallar
                                </p>
                                <p className="section__t1-star">
                                    Ko‘rishlar: 180+
                                </p>
                            </div>
                           <div className="section__type_1">
                                <img src="/section_t-img/t1.png" alt="" className="section__t1-img" />
                                <h2 className="section__t1-title">
                                    Premium matolar <FaArrowRight className='section__t1-icon' />
                                </h2>
                                <p className="section__t1-text">
                                    Professional tikuvchilik loyihalari uchun
                                    yuqori sifatli materiallar
                                </p>
                                <p className="section__t1-star">
                                    Ko‘rishlar: 180+
                                </p>
                            </div>
                           <div className="section__type_1">
                                <img src="/section_t-img/t1.png" alt="" className="section__t1-img" />
                                <h2 className="section__t1-title">
                                    Premium matolar <FaArrowRight className='section__t1-icon' />
                                </h2>
                                <p className="section__t1-text">
                                    Professional tikuvchilik loyihalari uchun
                                    yuqori sifatli materiallar
                                </p>
                                <p className="section__t1-star">
                                    Ko‘rishlar: 180+
                                </p>
                            </div>
                            <div className="section__type-all_but">
                                <button className="section__type-but" onClick={goToProducts}>
                                    Barcha toifalarni ko'rish <FaArrowRight className='section__type-svg' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section