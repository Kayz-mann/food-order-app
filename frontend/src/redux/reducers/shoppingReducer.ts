import { ShoppingAction } from "../actions/shoppingActions"
import { FoodAvailability, FoodModel, ShoppingState } from "../model"

const initialState = {
    availability: {} as FoodAvailability,
    availableFoods: {} as [FoodModel]
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
        default: 
            return state
}
}

export { shoppingReducer }