import React, { useState } from 'react'
import './card.scss'
import { PatternFormat } from 'react-number-format'

const Card = ({ items = [] }) => {
    const [cardNumber, setCardNumber] = useState("")
    const [cardType, setCardType] = useState(null)
    const [expiry, setExpiry] = useState("")
    const [cvv, setCvv] = useState("")
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.count, 0)

    const positions = {
        humo: "18px",
        uzcard: "23px",
        default: "27px"
    }

    const widths = {
        humo: "41px",
        default: "37px"
    }
    const handleCvv = (e) => {
        let value = e.target.value.replace(/\D/g, "")
        if (value.length > 3) value = value.slice(0, 3)
        setCvv(value)
    }
    const detectCardType = (number) => {
        if (number.startsWith("8600")) return "/card_img/uzcard-img.png"
        if (number.startsWith("9860")) return "/card_img/humo-img.png"
        if (number.startsWith("4")) return "/card_img/visa-img.png"
        if (number.startsWith("5")) return "/card_img/master-img.png"
        return null
    }

    const handleInput = (e) => {
        let value = e.target.value.replace(/\D/g, "")
        value = value.slice(0, 16)
        const formatted = value.replace(/(.{4})/g, "$1-").replace(/-$/, "")
        setCardNumber(formatted)
        setCardType(detectCardType(value))
    }
    const handleExpiry = (e) => {
        let value = e.target.value.replace(/\D/g, "")
        if (value.length > 4) value = value.slice(0, 4)


        if (value.length >= 2) {
            let month = parseInt(value.slice(0, 2), 10)
            if (month > 12) month = 12
            value = month.toString().padStart(2, "0") + value.slice(2)
        }


        if (value.length > 2) {
            let month = value.slice(0, 2)
            let year = value.slice(2)
            const currentYear = new Date().getFullYear() % 100

            if (year.length === 2 && parseInt(year, 10) < currentYear) {
                year = currentYear.toString().padStart(2, "0")
            }

            value = month + "/" + year
        }

        setExpiry(value)
    }

    return (
        // <div className="card">
        //     <div className="container">
        //         <div className="card__box">
        //             <div className="card__essay-infos_box">
        //                 <h2 className="card__essay-title">
        //                     To‘lov va yetkazib berish
        //                 </h2>
        //                 <div className="card__essay-card__info">
        //                     <p className="card__essay-card__title">
        //                         Karta turi
        //                     </p>
        //                     <div className="card__essay-card-img__box">
        //                         <img src="/card_img/visa-img.png" alt="" className="card__essay-card-img1" />
        //                         <img src="/card_img/uzcard-img.png" alt="" className="card__essay-card-img2" />
        //                         <img src="/card_img/humo-img.png" alt="" className="card__essay-card-img3" />
        //                         <img src="/card_img/master-img.png" alt="" className="card__essay-card-img4" />
        //                     </div>
        //                 </div>

        //                 <div className="card__number-all__box">
        //                     <div className="card__number-input-box" style={{ position: "relative" }}>
        //                         <span>Karta raqami</span>
        //                         <PatternFormat
        //                             type="text"
        //                             format="####-####-####-####"
        //                             placeholder="0000-0000-0000-0000"
        //                             value={cardNumber}
        //                             onChange={handleInput}
        //                             onValueChange={(values) => setCardNumber(values.value)}
        //                             required
        //                             className='input'
        //                         />
        //                         {cardType && (
        //                             <img
        //                                 src={cardType}
        //                                 alt="card logo"
        //                                 style={{
        //                                     position: "absolute",
        //                                     left: cardType?.includes("humo")
        //                                         ? positions.humo
        //                                         : cardType?.includes("uzcard")
        //                                             ? positions.uzcard
        //                                             : positions.default,
        //                                     top: "47px",
        //                                     transform: "translateY(-50%)",
        //                                     width: cardType?.includes("humo") ? widths.humo : widths.default,
        //                                 }}
        //                             />
        //                         )}

        //                     </div>

        //                     <div className="card__m-y-cvv__box">
        //                         <div className="card__month-year__box">
        //                             <span>Muddati</span>
        //                             <input
        //                                 type="text"
        //                                 placeholder="MM/YY"
        //                                 value={expiry}
        //                                 onChange={handleExpiry}
        //                                 required
        //                             />
        //                         </div>
        //                         {(cardType?.includes("visa") || cardType?.includes("master")) && (
        //                             <div className="card__cvv-box">
        //                                 <span>CVV</span>
        //                                 <input
        //                                     type="text"
        //                                     placeholder="CVV"
        //                                     value={cvv}
        //                                     onChange={handleCvv}
        //                                     required
        //                                 />
        //                             </div>
        //                         )}
        //                     </div>
        //                 </div>
        //                 <div className="card__all-price_th-but-box">
        //                     <p className="card-all-product-price">
        //                         <span className='card-span_p-title'>All Product Price</span> <span className='card-span_p-sum'>{totalPrice}  so'm</span>
        //                     </p>
        //                     <button className="card__but">
        //                         To'lovni tasdiqlash
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="card">
            <div className="container">
                <div className="card__box">
                    
                </div>
            </div>
        </div>
    )
}

export default Card
