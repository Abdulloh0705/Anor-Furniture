import React, { useState } from 'react'
import './card.scss'
import { PatternFormat } from 'react-number-format'
import { IoIosArrowDown } from 'react-icons/io'

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
        <div className="card">
            <div className="container">
                <div className="card__box">
                    <div className="card__essays-all__box">
                        <div className="card__essays-title">
                            <h2>OctoBank orqali Anor Furniture to'lovi</h2>
                        </div>
                        <div className="card__payment-box">
                            <div className="card__essay-box 1">
                                <h3>To‘lov qanday amalga oshiriladi?</h3>
                                <p>“To'lovni tasdiqlash” tugmasini bosing, karta ma’lumotlarini kiriting va operatsiyani tasdiqlang.</p>
                            </div>
                            <div className="card__essay-box 2">
                                <h3>Xavfsizlik</h3>
                                <p>To‘lov OctoBank’ning himoyalangan sahifasida amalga oshiriladi. Anor Furniture sizning karta raqamingizni saqlamaydi.</p>
                            </div>
                            <div className="card__essay-box 3">
                                <h3>To‘lov holati</h3>
                                <p>Muvaffaqiyatli to‘lovdan so‘ng buyurtma holati avtomatik yangilanadi va sizga tasdiq xabari ko‘rsatiladi.</p>
                            </div>
                            <div className="card__essay-box 4">
                                <h3>Qo‘llab-quvvatlash</h3>
                                <p>Agar to‘lovda muammo yuz bersa, Anor Furniture mijozlarga xizmat ko‘rsatish bo‘limiga murojaat qiling. Buyurtma raqamingizni tayyor tuting.</p>
                            </div>
                        </div>
                    </div>
                    <div className="card__all-price_th-but-box">
                        <p className="card-all-product-price">
                            <span className='card-span_p-title'>All Product Price</span> <span className='card-span_p-sum'>{totalPrice}  so'm</span>
                        </p>
                        <button className="card__but">
                            To'lovni tasdiqlash
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
