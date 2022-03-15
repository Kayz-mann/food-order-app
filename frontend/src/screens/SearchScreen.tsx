import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import ButtonWithIcon from '../components/Button/ButtonWithIcon';
import FoodCard from '../components/FoodCard';
import SearchBar from '../components/SearchBar';
import { onUpdateCart } from '../redux/actions';
import { FoodModel, ShoppingState, UserState } from '../redux/model';
import { ApplicationState } from '../redux/reducers';
import { checkExistence, useNavigation } from '../utils';


interface SearchScreenProps{
    shoppingReducer: ShoppingState
    userReducer: UserState
    onUpdateCart: Function
}


const _SearchScreen: React.FC<SearchScreenProps> = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [keyword, setKeyword] = useState('');

    const { availableFoods } = props.shoppingReducer;
    const { navigate } = useNavigation();
    const { Cart } = props.userReducer;

    const onTapFood = (item: FoodModel) => {
        navigate('FoodDetailPage', { food: item })
    };


    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <View style={{ display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginTop: 30 }} />
                <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => navigate('Homepage')} width={30} height={30} />
                <SearchBar onTextChange={setKeyword} onEndEditing={() => setIsEditing(false)} didTouch={true} />
            </View>
            <View style={styles.body}>
                <FlatList
                    showsHorizontalScrollIndicator={true}
                    data={isEditing
                        ?
                        availableFoods.filter((item) => {
                            return item.name.includes(keyword);
                        })
                        : availableFoods}
                    renderItem={({ item }) => <FoodCard
                        onTap={onTapFood}
                        item={checkExistence(item, Cart)}
                        onUpdateCart={props.onUpdateCart}
                        
                    />
                    }
                    keyExtractor={(item) => `${item._id}`}
                />
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
    footer: {
        flex: 1,
        // backgroundColor: 'cyan'
    }

})

const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})

const SearchScreen = connect(mapStateToProps, { onUpdateCart })(_SearchScreen)

export { SearchScreen };