import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MAP_API_KEY } from '../utils';

interface LocationPickProps {
    onChangeLocation: Function;
}

const LocationPicker: React.FC<LocationPickProps> = ({ onChangeLocation }) => {
    return (
        <View>
            <GooglePlacesAutocomplete
                minLength={4}
                placeholder="Search Your Address"
                fetchDetails={true}
                onPress={(_, details = null) => {
                    if (details?.geometry) {
                        onChangeLocation(details.geometry.location);
                    }
                    console.log(JSON.stringify(details?.geometry.location))
                }}
                query={{
                    key: MAP_API_KEY,
                    location: 'en'
                }}
                debounce={300}
            
            />
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex'
    }
})

export default LocationPicker;