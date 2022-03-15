import { FoodModel } from "../redux/model";




const checkExistence = (item: FoodModel, Cart: [FoodModel]) => {

    if(Array.isArray(Cart)){

        let currentItem = Cart.filter((cartItem) => cartItem._id == item._id)
    
        if(currentItem.length > 0){
            return currentItem[0]
        }
    }
   return item;
}

export { checkExistence };