import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, Alert } from 'react-native';
import * as Location from 'expo-location';

import { useNavigation } from '../utils'
import React from 'react';
import { UserState } from '../redux/model';
import ButtonWithIcon from '../components/Button/ButtonWithIcon';
import { Point } from 'react-native-google-places-autocomplete';
import LocationPicker from '../components/LocationPicker';
import SearchBar from '../components/SearchBar';
import ButtonWithTitle from '../components/Button/ButtonWithTitle';
import LocationMapPicker from '../components/LocationMapPicker';
import { connect } from 'react-redux';
import { ApplicationState } from '../redux/reducers';
import { UserReducer } from '../redux/reducers/userReducer';
import { Address } from 'react-native-maps';
import { onUpdateLocation } from '../redux/actions/userActions';



// const screenWidth = Dimensions.get('screen').width;

interface LocationProps{
    userReducer: UserState,
    onUpdateLocation: Function,
    onFetchLocation: Function
}

interface Region {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
}

const _LocationScreen: React.FC<LocationProps> = (props) => {
    const [errorMsg, setErrorMsg] = useState('');
    const [displayAddress, setDisplayAddress] = useState('Waiting for current location');
    const { navigate } = useNavigation();
    const [isMap, setIsMap] = useState(false);
    const { userReducer, onUpdateLocation } = props;
    const [currentAddress, setCurrentAddress] = useState('Pick a location from map')
    const [selectedAddress, setSelectedAddress] = useState<Address | any >()

    const { pickedAddress } = userReducer

    const [region, setRegion] = useState<Region>({
        latitude: 26.90,
        longitude: 93.701,
        longitudeDelta: 0.0421,
        latitudeDelta: 0.0922
    })

    useEffect(() => {
        if (pickedAddress !== undefined) {
            const { address_components } = pickedAddress;
            if (Array.isArray(address_components)) {
                setCurrentAddress(pickedAddress.formatted_address)

                address_components.map(item => {
                    let city = "";
                    let country = "";
                    let postalCode = "";

                    if (item.types.filter(item => item === 'postal_code').length > 0) {
                        postalCode = item.short_name
                    }
                    if (item.types.filter(item => item === 'country').length > 0) {
                        country = item.short_name
                    }
                    if (item.types.filter(item => item === 'locality').length > 0) {
                        city = item.short_name
                    }
                    setSelectedAddress({
                        displayAddress: pickedAddress.formatted_address,
                        city,
                        country,
                        postalCode
                    })
                })
            }
        }
    })


    // call when picked from auto complete
    const onChangeLocation = (location: Point) => {
        console.log(location, 'Receiving Location from pick Location')
        
        setRegion({
            latitude: location.lat,
            longitude: location.lng,
            longitudeDelta: 0.0421,
            latitudeDelta: 0.0922
        })
        setIsMap(true)
    }

    const onTapConfirmLocation = () => {
        if (selectedAddress?.postalCode !== "") {
            onUpdateLocation(selectedAddress)
            navigate('HomePage');
        }
    };

    // call when location is picked from a map
    const onPickLocationFromMap = (newRegion: Region) => {
        setRegion(newRegion);
        console.log(newRegion)
        // fetch physical address for reverse Geo Code and display in bottom section

    }


    const pickLocationView = () => {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', marginTop: 44,  alignItems: 'center' }}>
                    <View style={{ alignItems: 'center',  }}>
                    <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => navigate('HomePage')}
                        width={15} height={15} />
                    </View>
                    <View style={{ flex: 1, marginRight: 5 }}>
                        <LocationPicker onChangeLocation={onChangeLocation} />
                    </View>
                </View>
                <View style={styles.centerMsg}>
                    <Image source={require(`../images/delivery_icon.png`)} style={styles.deliveryIcon} />
                    <Text style={styles.addressTitle}>Pick your Location</Text>
                </View>
            </View>
        )
    }
        
        const mapView = () => {
            return (
                <View style={styles.container}>
                    <View style={styles.navigation}>
                        <View style={{ display: 'flex', height: 60, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginTop: 4, paddingLeft: 10 }}>
                            <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => navigate('Homepage')} width={30} height={30} />
                            <View style={{ flex: 1, marginLeft: 20 }}>
                                <Text style={{ fontSize: 18, fontWeight: '500', color: '#656565'}}>Pick your Location from Map</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <LocationMapPicker lastLocation={region} onMarkerChanged={onPickLocationFromMap} />
                    </View>
                    <View style={styles.footer}>
                        <View style={{ flex: 1, backgroundColor: 'white', padding: 10, paddingLeft: 20, paddingRight: 20 }}>
                            <Text style={{ fontSize: 18, fontWeight: '500', color: '#545454' }}>
                                {currentAddress}
                            </Text>
                            <ButtonWithTitle title="Confirm" onTap={onTapConfirmLocation} width={320} height={50} />
                        </View>
                    </View>
                    
                </View>
            )
        }

        if (isMap) {
            return mapView()
        } else {
            return pickLocationView()
        }
    
}

const mapStateToProps = (state: ApplicationState) => ({
    userReducer: state.userReducer
})

const LocationScreen = connect(mapStateToProps, { onUpdateLocation })(_LocationScreen)

export { LocationScreen };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(242,242,242,17)'
    },

    navigation: {
        flex: 1,
        marginTop: 44
    },
    
    body: {
        flex: 1
    },

    footer: {
        flex: 2.0,
        backgroundColor: 'cyan'
    },
    centerMsg: {

        alignItems: 'center',
        marginTop: 150,

    },

    deliveryIcon: {
        width: 100,
        height: 100
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
        fontSize: 18,
        fontWeight: '700',
        color: '#707070'
    },

    addressText: {
        fontSize: 20,
        fontWeight: '200',
        color: '#474747'
    }


})

// const { addressContainer } = styles/// addressContainer

// 16:53