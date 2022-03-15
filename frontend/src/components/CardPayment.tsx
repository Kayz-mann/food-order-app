import { CardField, CardFieldInput, PaymentMethodCreateParams, useConfirmPayment } from '@stripe/stripe-react-native';
import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import ButtonWithTitle from './Button/ButtonWithTitle';

interface CardPaymentProps{
    onPaymentSuccess: Function,
    onPaymentFailed: Function,
    onPaymentCancel: Function,
    amount: number
}


const CardPayment: React.FC<CardPaymentProps> = ({ onPaymentSuccess, onPaymentFailed, onPaymentCancel, amount}) => {
    const [name, setName] = useState('');
    const { confirmPayment, loading } = useConfirmPayment();

    const initPayment = async() => {
        const response = await axios.post('https://kays-mart.herokuapp.com/create-paymen-intent', {
            amount,
            currency: 'NGN',
            paymentMethod: 'card'
        });

        if (response.data) {
            // perform charge the card
            const clientSecret = response.data;

            const billingDetails: PaymentMethodCreateParams.BillingDetails = {
                name
            }

            const { error, paymentIntent } = await confirmPayment(clientSecret, {
                type: 'Card',
                billingDetails
            });

            if (error) {
                console.log('Failed', error.message)
                onPaymentFailed(error.message)
            } else {
                console.log('Success', paymentIntent)
                onPaymentSuccess(paymentIntent)
            }
        } else {
            // show error
            console.log('Intent server is not responding correctly...')
            onPaymentFailed('Payment secret not found')
        }
    }
    return (
        <View style={styles.container}>
        <View style={styles.navigation}>
            <View style={{ display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginLeft: 4, paddingLeft: 20, paddingRight: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>Make Payment</Text>
               
            </View>
        </View>
            <View style={styles.body}>
                <View style={{ marginTop: 60, marginBottom: 30 }}>
                    <View style={styles.amountView}>
                        <Text style={{ fontSize: 10 }}>
                            Payable Total
                        </Text>
                        <Text style={{ fontSize: 10 }}>
                            NGN{amount.toFixed(2)}
                        </Text>
                    </View>
                </View>

                <View style={styles.creditCard}>
                    <TextInput
                        autoCapitalize='none'
                        placeholder='Name on card'
                        keyboardType='name-phone-pad'
                        onChange={(value) => setName(value.nativeEvent.text)}
                        style={styles.input}
                    />
                    <CardField
                        placeholder={{
                            number: '0000 0000 0000 0000'
                        }}
                        onCardChange={(cardDetails) => {
                            console.log(cardDetails)
                        }}
                        onFocus={(focusField) => {
                            console.log('Focus on', focusField)
                        }}
                        cardStyle={inputStyle}
                        style={styles.cardField}
                    />

                </View>
                
                <ButtonWithTitle disable={loading} isNoBg={true} title="Cancel Payment" onTap={onPaymentCancel} height={50} width={250} />
                <ButtonWithTitle disable={loading} title="Pay" onTap={initPayment} height={50} width={250} />
        </View>
        <View style={styles.footer}>
           
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    navigation: {
        flex: 1,
        marginTop: 43,
    },
    body: {
        flex: 9.5,

        
    },
    footer: {
        flex: 2,
        backgroundColor: 'cyan',
        padding: 10
    },
    creditCard: {
        backgroundColor: '#fff',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 50,
        padding: 12,
        borderRadius: 20,
        borderColor: '#D3D3D3',
        borderWidth: 5,
    },
    input: {
        height: 44,
        fontSize: 17,
        borderBottomColor: '#DEDEDE',
        borderBottomWidth: 1,
        marginBottom: 20
    },
    cardField: {
        width: '100%',
        height: 90,
        marginVertical: 30
    },
    amountView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20
    },
});

const inputStyle: CardFieldInput.Styles = {
    borderWidth: 0,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderRadius: 0,
    fontSize: 10,
    placeholderColor: '#999'
}

export default CardPayment;