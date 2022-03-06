import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, Alert } from 'react-native';
import * as Location from 'expo-location';

import { useNavigation } from '../utils'
import React from 'react';
import { UserState } from '../redux/model';
import AsyncStorage from '@react-native-community/async-storage';
import { onUpdateLocation } from '../redux/actions';

// const screenWidth = Dimensions.get('screen').width;

interface LandingProps{
    userReducer: UserState,
    onUpdateLocation: Function,
}

const LandingScreen: React.FC<LandingProps> = (props) => {
    const [errorMsg, setErrorMsg] = useState('');
    const [address, setAddress] = useState<Location.Address>();
    const [displayAddress, setDisplayAddress] = useState('Waiting for current location');
    const { navigate } = useNavigation();
    const { userReducer, onUpdateLocation } = props;

    // const { location: { displayAddress } } = userReducer;
    // const { userReducer, onUpdateLocation }  = props;

    const showAlert = (title: string, msg: string) => {
        Alert.alert(
            title,
            msg,
            [{
                text: 'Ok', onPress: () => {
                    // navigate to manual add location
                    navigate('LocationPage')
                }
            }]
        )
    }

    const accessDeviceLocation = async () => {
        try {
            let { status }: any = await Location.requestPermissionsAsync();
    
            if (status !== 'granted') {
                showAlert('Location Permission Needed!', 'Location Permission needed to access your nearest restaurants!');
                return
            }
            let location: any = await Location.getCurrentPositionAsync();
            const { coords } = location;

            if (coords) {
                const { latitude, longitude } = coords;
                let addressResponse: any = await Location.reverseGeocodeAsync({ latitude, longitude });

                for (let item of addressResponse) {

                    let currentAddress = `${item.name}, ${item.street}, ${item.postalCode}, ${item.country}`
                    const { country, city, postalCode } = item;
                    setAddress(item)
                    
                    onUpdateLocation({
                        displayAddress: currentAddress,
                        postalCode,
                        city,
                        country,
                    })
                    setDisplayAddress(currentAddress);

                    if (currentAddress.length > 0) {
                        setTimeout(() => {
                            navigate('homeStack');
                        }, 3000);
                    }
                    return;
                }
                
            } else {
                // notify something went wrong with location
                showAlert('Location Permission Needed!', 'Location Permission needed to access your nearest restaurants!');
            }
                
       
        } catch (err) {
            showAlert('Location Permission Needed!', 'Location Permission needed to access your nearest restaurants!')
       }
        
    }

    const checkExistingLocation = async () => {
        try {
            const locationData = await AsyncStorage.getItem('user_location');
            console.log(locationData)

            if (locationData !== null) {
                const saveAddress = JSON.parse(locationData);
                props.onUpdateLocation(saveAddress)
                setTimeout(() => {
                    navigate('homeStack')
                }, 2000)
            } else {
                await accessDeviceLocation();
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        checkExistingLocation();
    })


    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <View style={styles.body}>
                    <Image source={require('../images/delivery_icon.png')} style={styles.deliveryIcon} />
                    <View style={styles.addressContainer}>
                        <Text style={styles.addressTitle}> Your Delivery Address</Text>
                    </View>
                    <Text style={styles.addressTitle}>{displayAddress}</Text>
                </View>
            </View>
           <View style={styles.footer} />
        </View>
    );
}

export default LandingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(242,242,242,17)'
    },

    navigation: {
        flex: 2,
        backgroundColor: 'red'
    },
    
    body: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },

    footer: {
        flex: 1,
        backgroundColor: 'cyan'
    },

    deliveryIcon: {
        width: 120,
        height: 120
    },

    addressContainer: {
        width: '100%',
        borderBottomColor: 'red',
        borderBottomWidth: 0.5,
        padding: 5,
        marginBottom: 10,
        alignItems: 'center',
    },

    addressTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#707070'
    },

    addressText: {
        fontSize: 20,
        fontWeight: '200',
        colors: '#474747'
    }


})

// const { addressContainer } = styles/// addressContainer

// 20:26