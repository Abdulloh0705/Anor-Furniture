import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import productArr from "../ProductBackend/product"
import './product.scss';

const Product = ({addToCart, cartItems }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const product = productArr.find(item => item.id == id)

    const [mainImg, setMainImg] = useState(product?.img)

    const existing = cartItems.find(item => item.id == id);
    const [count, setCount] = useState(existing ? existing.count : 0);

    const handleAddToCart = () => {
        addToCart({ ...product, count });
        navigate('/cart');
    };


    if (!product) {
        return <div>Mahsulot topilmadi</div>
    }

    

    return (
        <div className="product-page">
            <div className="container">
                <div className="product-page__box">
                    <div className="product-page__img-box">
                        <div className="product-page__min-box1">
                            <img
                                className='product-page__img'
                                src={mainImg}
                                alt={product.title}
                            />
                        </div>
                        <div className="product-page__min-box2">
                            {[product.img, product.pls1, product.pls2, product.pls3].map((img, index) => (
                                <img
                                    key={index}
                                    className={`product-page__imgs ${mainImg === img ? "active" : ""}`}
                                    src={img}
                                    alt={product.title}
                                    onClick={() => setMainImg(img)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="product-page__infos-box">
                        <h2 className="product-page__i-title">{product.title}</h2>
                        <p className="product-page__i-text">{product.text}</p>

                        <div className="product-page__i-colors">
                            <p className="product-page__i-color__title">Colors</p>
                            <div className="product-page__i-color-list">
                                {product.colors?.map((color, index) => (
                                    <div
                                        key={index}
                                        className="product-page__i-color"
                                        style={{ background: color }}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        <p className="product-page__i-price">
                            Price:
                            <span className='product-page__i_span1'>{product.price}</span>
                            <span className='product-page__i_span2'>so'm</span>
                        </p>
                        <div className="product-page__i-but-counter">
                            <div className="product-page__i-counter">
                                <button
                                    className='product-page__i-subtraction'
                                    onClick={() => setCount(count > 1 ? count - 1 : 0)}
                                >-</button>

                                <span className='product-page__i-count'>{count}</span>
                                <button
                                    className='product-page__i-add'
                                    onClick={() => setCount(count + 1)}
                                >+</button>
                            </div>

                            <button
                                className="product-page__i-but"
                                onClick={handleAddToCart}
                            >
                                {count > 1
                                    ? `${product.price * count} so'm`
                                    : "Add to Cart"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
