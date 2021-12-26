import mongoose, { Schema, Document } from 'mongoose';


export interface TransactionDoc extends Document{
    customer: string;
    vendorId: string;
    orderId: string;
    orderValue: number;
    offerUsed: string;
    status: string;
    paymentMode: string;
    paymentResponse: string;
}

const TransactionSchema = new Schema({
    customer: String,
    vendorId: String,
    orderId: String,
    orderValue: String,
    offerUsed: String,
    status: String,
    paymentMode: String,
    paymentResponse: String
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

const Transaction = mongoose.model<TransactionDoc>('transaction', TransactionSchema);
export { Transaction };
