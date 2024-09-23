import userModel from '../models/userModel.js';


//add item to user cart
const addToCart = async (req, res) => {
    try{
        
        let userData = await userModel.findById(req.body.userId);        
        let cartDatas = await userData.cartData;
        
        if(!cartDatas[req.body.itemId])
        {
            cartDatas[req.body.itemId] = 1;
        }
        else{
            cartDatas[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: cartDatas });
        res.status(200).json({success:true, message: "Item added to cart" });

    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
   
};



//remove item from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        // console.log(req.body);
        
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: cartData });
        res.status(200).json({success:true, message: "Item removed from cart" });
        
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//fetch user cart data
const getCart = async (req, res) => {
    try{
        let userData = await userModel.findById(req.body.userId);
        
        let cartData = await userData.cartData;        
        res.json({success:true, cartData});
    }
    catch(error){ 
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    } 
}



export {
    addToCart,
    removeFromCart,
    getCart
}