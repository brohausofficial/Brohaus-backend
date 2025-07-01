import userModel from "../models/userModel.js"


// add products to user cart
const addToCart = async (req,res) => {
    try {
        
        const { itemId, size } = req.body

        const userData = await userModel.findById(req.userId)
        let cartData = await userData.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }
            else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(req.userId, {cartData})

        res.json({ success: true, message: "Added To Cart" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// update user cart
const updateCart = async (req,res) => {
    try {
        
        const { itemId, size, quantity } = req.body

        const userData = await userModel.findById(req.userId)
        let cartData = userData.cartData;

        // Check if itemId exists in cartData, if not create it
        if (!cartData[itemId]) {
            cartData[itemId] = {}
        }

        // Now safely set the quantity
        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(req.userId, { cartData })
        res.json({ success: true, message: "Cart Updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// get user cart data
const getUserCart = async (req,res) => {

    try {
        const userData = await userModel.findById(req.userId)

        res.json({ success: true, cartData: userData.cartData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export { addToCart, updateCart, getUserCart }
