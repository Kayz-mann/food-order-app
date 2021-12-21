// Email

// Notifications

// OTP
export const GenerateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + (30 * 60 * 1000));
    
    return { otp, expiry };
}

export const onRequestOtp = async (otp: number, toPhoneNumber: string) => {
    const accountSid = 'ACe2561267ca2dfbf063c408f2ec1b9519';
    const authToken = '714f8e4bd2f00f159439acabf0824581';
    const client = require('twilio')(accountSid, authToken);

    const response = await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: '+18324153957',
        to: `+234${toPhoneNumber}`,
    })

    return response;
}

// Payment Notification or emails