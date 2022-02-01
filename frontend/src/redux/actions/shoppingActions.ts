import { FoodAvailability, FoodModel } from "../model";
import { Dispatch } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils";


export interface AvailabilityAction {
    readonly type: 'ON_AVAILABILITY',
    payload: FoodAvailability
}

export interface ShoppingErrorAction {
    readonly type: 'ON_SHOPPING_ERROR',
    payload: any
}

export interface FoodSearchAction {
    readonly type: 'ON_FOOD_SEARCH',
    payload: any
}

// Trigger actions from components


export const onAvailability = (postCode: string) => {
    console.log(`Post Code with Request ${postCode}`);
    
    return async ( dispatch: Dispatch<ShoppingAction> ) => {
        try {
            const response = await axios.get<FoodAvailability>(`${BASE_URL}/food/availability/${postCode}`)

            if (!response) {
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Availability error'
                })
            } else {
                //  save our location in local storage
                dispatch({
                    type: 'ON_AVAILABILITY',
                    payload: response.data
                })
            }
        } catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }
    }
}

export const onSearchFoods = (postCode: string) => {
    console.log(`Post Code with Request ${postCode}`);
    
    return async ( dispatch: Dispatch<ShoppingAction> ) => {
        try {
            const response = await axios.get<[FoodModel]>(`${BASE_URL}/food/search/${postCode}`)

            if (!response) {
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Availability error'
                })
            } else {
                //  save our location in local storage
                dispatch({
                    type: 'ON_FOOD_SEARCH',
                    payload: response.data
                })
            }
        } catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }
    }
}
export type ShoppingAction = AvailabilityAction | ShoppingErrorAction | FoodSearchAction;