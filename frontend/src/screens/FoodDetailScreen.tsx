import React from 'react';
import { View, StyleSheet, Text, ImageBackground, Dimensions, FlatList } from 'react-native';
import { connect } from 'react-redux';
import ButtonWithIcon from '../components/Button/ButtonWithIcon';
import FoodCard from '../components/FoodCard';
import { onUpdateCart } from '../redux/actions/userActions';
import { FoodModel, Restaurant, UserState } from '../redux/model';
import { ApplicationState } from '../redux/reducers';
import { checkExistence, useNavigation } from '../utils';

interface FoodDetailProps{
    userReducer: UserState,
    onUpdateCart: Function,
    navigation: { getParam: Function, goBack: Function}
}

const _FoodDetailScreen: React.FC<FoodDetailProps> = (props) => {
    const { getParam, goBack } = props.navigation;
    const foods = getParam('foods') as FoodModel;
    const { navigate } = useNavigation();
    console.log(foods);

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
                        marginLeft: 60
                    }}>
                    {foods.name}
                </Text>
            </View>
            <View style={styles.body}>
                <ImageBackground
                    source={{ uri: `${foods.images[0]}` }}
                    style={{
                        width: Dimensions.get('screen').width,
                        height: 300,
                        justifyContent: 'flex-end'
                    }}
                >
                    <View style={{ height: 120, backgroundColor: 'rgba(0,0,0,0.6)', padding: 10 }}>
                        <Text style={{ color: '#fff', fontSize: 40, fontWeight: '700' }}>
                            {foods.name}
                        </Text>
                        <Text style={{ color: '#fff', fontSize: 25, fontWeight: '500' }}>
                            {foods.category}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={{ height: 300, padding: 20 }}>
                    <Text> Food Will be ready within {foods.readyTime} Minute(s)</Text>
                    <Text>{foods.description}</Text>
                </View>
                <View style={{ height: 120 }}>
                    <FoodCard item={checkExistence(foods, Cart) } onTap={() => {}} onUpdateCart={props.onUpdateCart} />
                </View>

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
        backgroundColor: '#fff',
        paddingBottom: 100
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

const FoodDetailScreen = connect(mapStateToProps, { onUpdateCart })(_FoodDetailScreen)

export { FoodDetailScreen };

function Cart(foods: FoodModel, Cart: any): FoodModel {
    throw new Error('Function not implemented.');
}
