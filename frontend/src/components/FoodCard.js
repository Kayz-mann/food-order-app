"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const AddRemove_1 = __importDefault(require("../components/Button/AddRemove"));
const FoodCard = ({ item, onTap, onUpdateCart, unit }) => {
    const didUpdateCart = (unit) => {
        item.unit = unit;
        onUpdateCart(item);
    };
    return (<react_native_1.View style={styles.container}>
            <react_native_1.TouchableOpacity onPress={() => onTap(item)} style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row'
        }}>
                <react_native_1.View style={{ display: 'flex', flex: 4, padding: 10, justifyContent: 'space-around', alignItems: 'center' }}>
                    <react_native_1.Text>{item.name}</react_native_1.Text>
                    <react_native_1.Text>{item.category}</react_native_1.Text>
                </react_native_1.View>
                <react_native_1.View style={{
            display: 'flex',
            flex: 4,
            padding: 10,
            justifyContent: 'space-around',
            alignItems: 'center',
            marginRight: 10
        }}>
                    <react_native_1.Text style={{ fontSize: 18, fontWeight: '600', color: '#7c7c7c' }}>
                        ${item.price}
                    </react_native_1.Text>
                    {unit !== undefined ?
            <react_native_1.Text style={{ fontSize: 18, fontWeight: '700' }}>
                            Qty: {unit}
                        </react_native_1.Text>
            :
                <AddRemove_1.default onAdd={() => {
                        let unit = isNaN(item.unit) ? 0 : item.unit;
                        didUpdateCart(unit + 1);
                    }} onRemove={() => {
                        let unit = isNaN(item.unit) ? 0 : item.unit;
                        didUpdateCart(unit > 0 ? unit - 1 : unit);
                    }} unit={item.unit}/>}
                  
                </react_native_1.View>
            </react_native_1.TouchableOpacity>
        </react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        borderColor: '#e5e5e5',
        width: react_native_1.Dimensions.get('screen').width - 20,
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#fff',
        height: 100,
        justifyContent: 'flex-start',
        borderWidth: 1,
        flexDirection: 'row'
    },
    navigation: {
        flex: 2,
        backgroundColor: 'red'
    },
    body: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    footer: {
        flex: 1,
        backgroundColor: 'cyan'
    }
});
exports.default = FoodCard;
//# sourceMappingURL=FoodCard.js.map