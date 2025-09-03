// import pult from '/public/productImg/pult.png'
// const product = [
//     {
//         id: 1,
//         title: "HAVIT HV-G92 Gamepad",
//         text: "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.",
//           img: "/productImg/pult.png",
//         price: "$120"
//     }
// ]

// export default product




const baseProduct = {
    title: "HAVIT HV-G92 Gamepad",
    text: "PlayStatioN 5  Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.",
    img: "/productImg/pult.png",
    pls1: "/productImg/1.jpg",
    pls2: "/productImg/2.jpg",
    pls3: "/productImg/3.jpg",
    price: "120",
    colors: ["black", "yellow", "red"]
}

const product = Array.from({ length: 100 }, (_, i) => ({
    ...baseProduct,
    id: i + 1
}))

export default product
// ...existing code...
