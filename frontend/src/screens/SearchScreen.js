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
exports.SearchScreen = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const react_redux_1 = require("react-redux");
const ButtonWithIcon_1 = __importDefault(require("../components/Button/ButtonWithIcon"));
const FoodCard_1 = __importDefault(require("../components/FoodCard"));
const SearchBar_1 = __importDefault(require("../components/SearchBar"));
const actions_1 = require("../redux/actions");
const utils_1 = require("../utils");
const _SearchScreen = (props) => {
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const [keyword, setKeyword] = (0, react_1.useState)('');
    const { availableFoods } = props.shoppingReducer;
    const { navigate } = (0, utils_1.useNavigation)();
    const { Cart } = props.userReducer;
    const onTapFood = (item) => {
        navigate('FoodDetailPage', { food: item });
    };
    return (<react_native_1.View style={styles.container}>
            <react_native_1.View style={styles.navigation}>
                <react_native_1.View style={{ display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginTop: 30 }}/>
                <ButtonWithIcon_1.default icon={require('../images/back_arrow.png')} onTap={() => navigate('Homepage')} width={30} height={30}/>
                <SearchBar_1.default onTextChange={setKeyword} onEndEditing={() => setIsEditing(false)} didTouch={true}/>
            </react_native_1.View>
            <react_native_1.View style={styles.body}>
                <react_native_gesture_handler_1.FlatList showsHorizontalScrollIndicator={true} data={isEditing
            ?
                availableFoods.filter((item) => {
                    return item.name.includes(keyword);
                })
            : availableFoods} renderItem={({ item }) => <FoodCard_1.default onTap={onTapFood} item={(0, utils_1.checkExistence)(item, Cart)} onUpdateCart={props.onUpdateCart}/>} keyExtractor={(item) => `${item._id}`}/>
            </react_native_1.View>
      </react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2f2f2'
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
});
const mapStateToProps = (state) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
});
const SearchScreen = (0, react_redux_1.connect)(mapStateToProps, { onUpdateCart: actions_1.onUpdateCart })(_SearchScreen);
exports.SearchScreen = SearchScreen;
//# sourceMappingURL=SearchScreen.js.map