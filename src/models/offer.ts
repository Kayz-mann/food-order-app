import mongoose, { Schema, Document } from 'mongoose';
import { OrderDoc } from './order';

export interface OfferDoc extends Document{
    offerType: string;    //VENDOR // GENERIC
    vendors: [any];
    title: string;  //200 off on week days
    description: string;   // any descp with terms and conditions
    minValue: number;      //min value - 300
    offerAmount: number;
    startValidity: Date;
    endValidity: Date;
    promoCode: string;     //WEEK20
    promoType: string;      // USER // ALL // BANK // CARD
    bank: [any];
    bins: [any];
    pinCode: string;
    isActive: boolean;
}

const OfferSchema = new Schema({
    offerType: { type: String, require: true },
    vendors: [
        {
            type: Schema.Types.ObjectId, ref: 'vendor'
        }
    ],
    title: { type: String, require: true },
    description: String,
    minValue: { type: Number, require: true },
    offerAmount: { type: Number, require: true },
    startValidity: Date,
    endValidity: Date,
    promoCode: { type: String, require: true },
    promoType: { type: String, require: true },
    bank: [
        { type: String }
    ],
    pinCode: { type: String, require: true },
    isActive: Boolean
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
            delete ret.crearedAt;
            delete ret.updatedAt;

        }
    },
    timestamps: true
})

const Offer = mongoose.model<OfferDoc>('offer', OfferSchema);
export { Offer };
