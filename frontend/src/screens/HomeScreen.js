"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeScreen = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const SearchBar_1 = __importDefault(require("../components/SearchBar"));
const ButtonWithIcon_1 = __importDefault(require("../components/Button/ButtonWithIcon"));
const utils_1 = require("../utils");
const CategoryCard_1 = __importDefault(require("../components/CategoryCard"));
const RestaurantCard_1 = __importDefault(require("../components/RestaurantCard"));
const react_redux_1 = require("react-redux");
const shoppingActions_1 = require("../redux/actions/shoppingActions");
const _HomeScreen = (props) => {
    const { navigate } = (0, utils_1.useNavigation)();
    const { location } = props.userReducer;
    const { availability } = props.shoppingReducer;
    const { categories, foods, restaurants } = availability;
    console.log(foods);
    (0, react_1.useEffect)(() => {
        props.onAvailability(location.postalCode);
        setTimeout(() => {
            props.onSearchFoods(location.postalCode);
        }, 1000);
    }, [, location]);
    const onTapRestaurant = (item) => {
        navigate('RestaurantPage', { restaurants: item });
    };
    const onTapFood = (item) => {
        navigate('FoodDetailPage', { foods: item });
    };
    return (<react_native_1.View style={styles.container}>
            <react_native_1.View style={styles.navigation}>
                <react_native_1.View style={{ marginTop: 50, flex: 4, backgroundColor: 'white', paddingLeft: 30, paddingRight: 20, alignItems: 'center', justifyContent: 'flex-start' }}>
                    <react_native_1.Image source={require('../images/delivery_icon.png')} style={{ width: 32, height: 32 }}/>
                    {/* <Text>{`${location.name}, ${location.street}, ${location.city}`}</Text> */}
                    <react_native_1.Text style={{ width: 280, marginRight: 5 }}>{`${location.displayAddress}`}</react_native_1.Text>
                    <ButtonWithIcon_1.default onTap={() => { navigate('LocationPage'); }} icon={require('../images/edit_icon.png')} width={24} height={40}/>
                </react_native_1.View>
                <react_native_1.View style={{ height: 60, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingLeft: 4 }}>
                <SearchBar_1.default didTouch={() => {
            navigate('SearchPage');
        }} onTextChange={() => { }}/>
                    <ButtonWithIcon_1.default onTap={() => { }} icon={require('../images/hambar.png')} width={50} height={40}/>
                </react_native_1.View>
            </react_native_1.View>
            <react_native_1.View style={styles.body}>
                <react_native_1.ScrollView>
                    <react_native_1.FlatList horizontal showsHorizontalScrollIndicator={false} data={categories} renderItem={({ item }) => <CategoryCard_1.default item={item} onTap={() => { alert(`Category tapped`); }}/>} keyExtractor={(item) => `${item.id}`}/>
                    <react_native_1.View>
                        <react_native_1.Text style={{ fontSize: 25, fontWeight: '600', color: '#f1fbfd', marginLeft: 20 }}>
                            Top Restaurants
                        </react_native_1.Text>
                    </react_native_1.View>
                    <react_native_1.FlatList horizontal showsHorizontalScrollIndicator={false} data={restaurants} renderItem={({ item }) => <RestaurantCard_1.default item={item} onTap={onTapRestaurant}/>} keyExtractor={(item) => `${item._id}`}/>
                     <react_native_1.View>
                        <react_native_1.Text style={{ fontSize: 25, fontWeight: '600', color: '#f1fbfd', marginLeft: 20 }}>
                            30 Minutes Food
                        </react_native_1.Text>
                    </react_native_1.View>
                    <react_native_1.FlatList horizontal showsHorizontalScrollIndicator={false} data={foods} renderItem={({ item }) => <RestaurantCard_1.default item={item} onTap={onTapFood}/>} keyExtractor={(item) => `${item._id}`}/>
                </react_native_1.ScrollView>
            </react_native_1.View>

        </react_native_1.View>);
};
const mapToStateProps = (state) => ({
    userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
});
const HomeScreen = (0, react_redux_1.connect)(mapToStateProps, { onAvailability: shoppingActions_1.onAvailability, onSearchFoods: shoppingActions_1.onSearchFoods })(_HomeScreen);
exports.HomeScreen = HomeScreen;
const styles = react_native_1.StyleSheet.create({
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
});
// 44:06
//# sourceMappingURL=HomeScreen.js.map