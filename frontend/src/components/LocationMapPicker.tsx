import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView from 'react-native-maps';
import { MAP_API_KEY } from '../utils';

interface Region {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
}

interface LocationPickProps {
    lastLocation: Region,
    onMarkerChanged: Function
}

const LocationMapPicker: React.FC<LocationPickProps> = ({ lastLocation, onMarkerChanged }) => {

    const onRegionChange = (newRegion: Region) => {
        onMarkerChanged(newRegion)
    }
    
    return (
        <View style={styles.container}>
            <MapView style={{ flex: 1 }}
                initialRegion={lastLocation}
                onRegionChangeComplete={onRegionChange}
            />
            <View style={{ left: '50%', top: '50%', position: 'absolute', marginLeft: -24, marginTop: -48 }}>
                <Image source={require('../images/delivery_icon.png')} style={{ width: 50, height: 50 }} />
            </View>
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex'
    }
})

export default LocationMapPicker;