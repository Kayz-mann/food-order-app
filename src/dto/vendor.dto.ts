export interface CreateVendorInput{
    name: string;
    ownerName: string;
    foodType: [string];
    pinCode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
}

export interface VendorLoginInputs {
    email: string;
    password: string;
}

export interface VendorPayload {
    _id: string;
    email: string;
    name: string;
    foodTypes: [string];
}

export interface EditVendorInputs{
    name: string;
    address: string;
    phone: string;
    foodTypes: [string];
}

export interface CustomerOfferInputs {
    offerType: string;      
    vendors: [any];
    title: string;  
    description: string; 
    minValue: number;  
    offerAmount: number;
    startValidity: Date;
    endValidity: Date;
    promoCode: string;  
    promoType: string;  
    bank: [any];
    bins: [any];
    pinCode: string;
    isActive: boolean;
}