import React from 'react';
import { View, StyleSheet, Text, ImageBackground, Dimensions, FlatList } from 'react-native';
import { connect } from 'react-redux';
import ButtonWithIcon from '../components/Button/ButtonWithIcon';
import FoodCard from '../components/FoodCard';
import { onUpdateCart } from '../redux/actions/userActions';
import { FoodModel, Restaurant, UserState } from '../redux/model';
import { ApplicationState } from '../redux/reducers';
import { checkExistence, useNavigation } from '../utils';

interface RestaurantProps{
    userReducer: UserState,
    onUpdateCart: Function
    navigation: { getParam: Function, goBack: Function}
}

const _RestaurantScreen: React.FC<RestaurantProps> = (props) => {
    const { getParam, goBack } = props.navigation;
    const restaurant = getParam('restaurant') as Restaurant;
    const { navigate } = useNavigation();
    console.log(restaurant);

    const { Cart } = props.userReducer;

    const onTapFood = (item: FoodModel) => {
        navigate('FoodDetailPage', { food: item })
    };

    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <ButtonWithIcon
                    icon={require('../images/back_arrow.png')} onTap={() => goBack()}
                    width={30}
                    height={30}
                />
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: '600',
                        marginLeft: 80
                    }}>
                    {restaurant.name}
                </Text>
            </View>
            <View style={styles.body}>
                <ImageBackground
                    source={{ uri: `${restaurant.images[0]}` }}
                    style={{
                        width: Dimensions.get('screen').width,
                        height: 300,
                        justifyContent: 'flex-end'
                    }}
                >
                    <View style={{ height: 120, backgroundColor: 'rgba(0,0,0,0.6)', padding: 10 }}>
                        <Text style={{ color: '#fff', fontSize: 40, fontWeight: '700' }}>
                            {restaurant.name}
                        </Text>
                        <Text style={{ color: '#fff', fontSize: 25, fontWeight: '500' }}>
                            {restaurant.address}
                        </Text>
                    </View>
                </ImageBackground>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={restaurant.foods}
                    renderItem={({ item }) => <FoodCard item={checkExistence(item, Cart)} onTap={onTapFood} onUpdateCart={props.onUpdateCart} />}
                    keyExtractor={(item) => `${item._id}`}

                />
            </View>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    navigation: {
        flex: 1,
        marginTop: 43,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    body: {
        flex: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    footer: {
        flex: 1,
        backgroundColor: 'cyan'
    }
})

const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})

const RestaurantScreen = connect(mapStateToProps, { onUpdateCart })(_RestaurantScreen)

export { RestaurantScreen };

