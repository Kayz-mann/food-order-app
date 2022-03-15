"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodDetailScreen = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_redux_1 = require("react-redux");
const ButtonWithIcon_1 = __importDefault(require("../components/Button/ButtonWithIcon"));
const FoodCard_1 = __importDefault(require("../components/FoodCard"));
const userActions_1 = require("../redux/actions/userActions");
const utils_1 = require("../utils");
const _FoodDetailScreen = (props) => {
    const { getParam, goBack } = props.navigation;
    const foods = getParam('foods');
    const { navigate } = (0, utils_1.useNavigation)();
    console.log(foods);
    const { Cart } = props.userReducer;
    const onTapFood = (item) => {
        navigate('FoodDetailPage', { food: item });
    };
    return (<react_native_1.View style={styles.container}>
            <react_native_1.View style={styles.navigation}>
                <ButtonWithIcon_1.default icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={30} height={30}/>
                <react_native_1.Text style={{
            fontSize: 22,
            fontWeight: '600',
            marginLeft: 60
        }}>
                    {foods.name}
                </react_native_1.Text>
            </react_native_1.View>
            <react_native_1.View style={styles.body}>
                <react_native_1.ImageBackground source={{ uri: `${foods.images[0]}` }} style={{
            width: react_native_1.Dimensions.get('screen').width,
            height: 300,
            justifyContent: 'flex-end'
        }}>
                    <react_native_1.View style={{ height: 120, backgroundColor: 'rgba(0,0,0,0.6)', padding: 10 }}>
                        <react_native_1.Text style={{ color: '#fff', fontSize: 40, fontWeight: '700' }}>
                            {foods.name}
                        </react_native_1.Text>
                        <react_native_1.Text style={{ color: '#fff', fontSize: 25, fontWeight: '500' }}>
                            {foods.category}
                        </react_native_1.Text>
                    </react_native_1.View>
                </react_native_1.ImageBackground>
                <react_native_1.View style={{ height: 300, padding: 20 }}>
                    <react_native_1.Text> Food Will be ready within {foods.readyTime} Minute(s)</react_native_1.Text>
                    <react_native_1.Text>{foods.description}</react_native_1.Text>
                </react_native_1.View>
                <react_native_1.View style={{ height: 120 }}>
                    <FoodCard_1.default item={(0, utils_1.checkExistence)(foods, Cart)} onTap={() => { }} onUpdateCart={props.onUpdateCart}/>
                </react_native_1.View>

            </react_native_1.View>
      </react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
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
});
const mapStateToProps = (state) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
});
const FoodDetailScreen = (0, react_redux_1.connect)(mapStateToProps, { onUpdateCart: userActions_1.onUpdateCart })(_FoodDetailScreen);
exports.FoodDetailScreen = FoodDetailScreen;
function Cart(foods, Cart) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=FoodDetailScreen.js.map