import React, { useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, ScrollView } from 'react-native';

import SearchBar from '../components/SearchBar';
import ButtonWithIcon from '../components/Button/ButtonWithIcon';
import { FoodModel, Restaurant, ShoppingState, UserState } from '../redux/model';
import { useNavigation } from '../utils';
import CategoryCard from '../components/CategoryCard';
import RestaurantCard from '../components/RestaurantCard';
import { ApplicationState } from '../redux/reducers';
import { connect } from 'react-redux';
import { onAvailability, onSearchFoods } from '../redux/actions/shoppingActions';


interface HomeProps{
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onAvailability: Function,
    onSearchFoods: Function
}

const _HomeScreen: React.FC<HomeProps> = (props) => {

    const { navigate } = useNavigation();
    const { location } = props.userReducer;
    const { availability } = props.shoppingReducer;
    const { categories, foods, restaurants } = availability;
    console.log(foods);

    useEffect(() => {
        props.onAvailability(location.postalCode)
        setTimeout(() => {
            props.onSearchFoods(location.postalCode)
        }, 1000)
    });

    const onTapRestaurant = (item: Restaurant) => {
        navigate('RestaurantPage', { restaurants: item})
    }

    const onTapFood = (item: FoodModel) => {
        navigate('FoodDetailPage', { foods: item})
    }

    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <View style={{ marginTop: 50, flex: 4, backgroundColor: 'white', paddingLeft: 20, paddingRight: 20 }}>
                    <Text>{`${location.name}, ${location.street}, ${location.city}`}</Text>
                    <Text>Edit</Text>
                </View>
                <View style={{ height: 60, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingLeft: 4 }}>
                <SearchBar
                    didTouch={() => {
                       navigate('SearchPage')
                    }}
                        onTextChange={() => { }}
                    />
                    <ButtonWithIcon onTap={() => { } } icon={require('../images/hambar.png')} width={50} height={40} />
                </View>
            </View>
            <View style={styles.body}>
                <ScrollView>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={categories}
                        renderItem={({ item }) => <CategoryCard item={item} onTap={() => { alert(`Category tapped`) }} />}
                        keyExtractor={(item) => `${item.id}`}
                    />
                    <View>
                        <Text style={{ fontSize: 25, fontWeight: '600', color: '#f1fbfd', marginLeft: 20 }}>
                            Top Restaurants
                        </Text>
                    </View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={restaurants}
                        renderItem={({ item }) => <RestaurantCard item={item} onTap={onTapRestaurant} />}
                        keyExtractor={(item) => `${item._id}`}
                    />
                     <View>
                        <Text style={{ fontSize: 25, fontWeight: '600', color: '#f1fbfd', marginLeft: 20 }}>
                            30 Minutes Food
                        </Text>
                    </View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={foods}
                        renderItem={({ item }) => <RestaurantCard item={item} onTap={onTapFood} />}
                        keyExtractor={(item) => `${item._id}`}
                    />
                </ScrollView>
            </View>

        </View>
    );
}

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
})

const HomeScreen = connect(mapToStateProps, { onAvailability, onSearchFoods })(_HomeScreen)

export { HomeScreen };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green'
    },

    navigation: {
        flex: 2,
        backgroundColor: 'red'
    },
    
    body: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },

    footer: {
        flex: 1,
        backgroundColor: 'cyan'
    }
})

// 44:06