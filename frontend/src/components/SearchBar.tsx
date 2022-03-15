import React from 'react';
import { View , StyleSheet, Image} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


interface SearchBarProps {
    onEndEditing?: any | undefined;
    didTouch?: any | undefined;
    autoFocus?: boolean | undefined;
    onTextChange: Function;
}

const SearchBar: React.FC<SearchBarProps> = ({ onEndEditing, didTouch, autoFocus, onTextChange}) => {
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <Image style={{ width: 15, height: 15 }} source={require('../images/search.png')} />
                <TextInput
                    style={{ marginLeft: 5, flex: 9, fontSize: 15, height: 42 }}
                    placeholder='Search Foods'
                    autoFocus={autoFocus}
                    onTouchStart={didTouch}
                    onChangeText={(text) => onTextChange(text)}
                    onEndEditing={onEndEditing}
                />

              

            </View>
      </View>  
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    searchBar: {
        height: 32,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ededed',
        alignItems: 'center',
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: '#e5e5e5',
        borderWidth: 2
    }
})

export default SearchBar;