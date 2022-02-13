import { ShoppingAction } from "../actions/shoppingActions"
import { FoodAvailability, FoodModel, OfferModel, ShoppingState } from "../model"

const initialState = {
    availability: {} as FoodAvailability,
    availableFoods: {} as [FoodModel],
    offers: {} as [OfferModel]
}

const shoppingReducer = (state: ShoppingState = initialState, action: ShoppingAction) => {
    switch (action.type) {
        case 'ON_AVAILABILITY':
            return {
                ...state,
                availability: action.payload
            }
        case 'ON_FOOD_SEARCH':
            return {
                ...state,
                availableFoods: action.payload
            }
        case 'ON_OFFER_SEARCH':
            return {
                ...state,
                availableFoods: action.payload
            }
        
        default: 
            return state
}
}

export { shoppingReducer }