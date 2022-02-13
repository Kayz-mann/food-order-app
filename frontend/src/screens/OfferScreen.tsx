import React, { useEffect, useReducer, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { onGetOffers } from '../redux/actions/shoppingActions';

import { ShoppingState, UserState } from '../redux/model';
import { ApplicationState } from '../redux/reducers';



interface OfferScreenProps{
    shoppingReducer: ShoppingState
    userReducer: UserState
    onUpdateCart: Function
    onGetOffers: Function
}


const _OfferScreen: React.FC<OfferScreenProps> = ({ userReducer, shoppingReducer, onGetOffers }) => {
   
    const { location } = userReducer;
    const { offers } = shoppingReducer;



    useEffect(() => {
        onGetOffers(location.postalCode);
    })

    if (Array.isArray(offers)) {
        alert(offers.length)
    }


    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <View style={{ display: 'flex', height: 60, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginLeft: 4, paddingLeft: 20, paddingRight: 20 }}>
                    <Text style={{ fontSize: 22, fontWeight: '600'}}>Offers & Deals</Text>
               </View>
            </View>
            <View style={styles.body}>
               
            </View>
      </View>
  );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2f2f2'
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
    footer: {
        flex: 1,
        // backgroundColor: 'cyan'
    }

})

const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})

const OfferScreen = connect(mapStateToProps, { onGetOffers })(_OfferScreen)

export { OfferScreen };