import React, { useEffect, useReducer, useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { ItemAssignmentPage } from 'twilio/lib/rest/numbers/v2/regulatoryCompliance/bundle/itemAssignment';
import OfferCard from '../components/OfferCard';
import { onApplyOffer } from '../redux/actions';
import { onGetOffers } from '../redux/actions/shoppingActions';

import { OfferModel, ShoppingState, UserState } from '../redux/model';
import { ApplicationState } from '../redux/reducers';



interface OfferScreenProps{
    shoppingReducer: ShoppingState,
    userReducer: UserState,
    onUpdateCart: Function,
    onGetOffers: Function,
    onApplyOffer: Function
}


const _OfferScreen: React.FC<OfferScreenProps> = ({ userReducer, shoppingReducer, onGetOffers, onApplyOffer }) => {
   
    const { location, Cart, appliedOffer } = userReducer;
    const { offers } = shoppingReducer;



    useEffect(() => {
        onGetOffers(location.postalCode);
    })

    if (Array.isArray(offers)) {
        alert(offers.length)
    }

    const onTapApplyOffer = (item: OfferModel) => {
        let total = 0;

        if (Array.isArray(Cart)) {
            Cart.map(food => {
                total += food.price * food.unit
            })
        }

        const taxAmount = (total / 100 * 0.9) + 40;
        const orderAmount = taxAmount + total;

        if (orderAmount >= item.minValue) {
            onApplyOffer(item, false) 
            showAlert('Offer Applied!', `Offer Applied with discount of ${item.offerPercentage}%`)

        } else {
            showAlert('This Offer is not applicable!', `This offer is appicable with minimum order amount ${item.minValue} only`)
        }
    }

    const showAlert = (title: string, msg: string) => {
        Alert.alert(
            title,
            msg,
            [
                { text: 'OK', onPress: () => {}}
            ]
        )
    }

    const onTapRemoveOffer = (item: OfferModel) => {
        onApplyOffer(item, true)
    }

    const checkOfferExistence = (item: OfferModel) => {
        if (appliedOffer._id !== undefined) {
            return item._id.toString() === appliedOffer._id.toString()
        } 

        return false;
    }


    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <View style={{ display: 'flex', height: 60, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginLeft: 4, paddingLeft: 20, paddingRight: 20 }}>
                    <Text style={{ fontSize: 22, fontWeight: '600', color: 'orange'}}>Offers & Deals</Text>
               </View>
            </View>
            <View style={styles.body}>
               {Array.isArray(offers) && 
               <FlatList 
               showsVerticalScrollIndicator={false}
                    data={offers}
                    renderItem={({ item }) => 
                        <OfferCard
                            onTapApply={onTapApplyOffer}
                            onTapRemove={onTapRemoveOffer}
                            item={item}
                            isApplied={checkOfferExistence(item)}
                        
                        /> 
                    }
                keyExtractor={(item) => `${item._id}`}
               />
               }
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
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        
    },

})

const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})

const OfferScreen = connect(mapStateToProps, { onGetOffers, onApplyOffer })(_OfferScreen)

export { OfferScreen };

// 9:29