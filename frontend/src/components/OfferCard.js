"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const OfferCard = ({ item, onTapApply, onTapRemove, isApplied }) => {
    return (<react_native_1.View style={styles.container}>
            <react_native_1.Image source={{ uri: `${item.images[0]}` }} style={{ width: react_native_1.Dimensions.get('screen').width - 20, height: 200, borderRadius: 20, backgroundColor: '#eaeaea' }}/>
            <react_native_1.View style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                <react_native_1.View style={{ display: 'flex', flex: 7.5, padding: 10 }}>
                    <react_native_1.Text style={{ fontSize: 16, fontWeight: '700' }}>{item.title}</react_native_1.Text>
                    <react_native_1.Text style={{ fontSize: 12 }}>{item.description}</react_native_1.Text>
                </react_native_1.View>
                <react_native_1.View style={{ flexDirection: 'row', flex: 4.5, padding: 10 }}>
                    {isApplied ?
            <react_native_1.TouchableOpacity onPress={() => onTapRemove(item)} style={[styles.applyPromo, { backgroundColor: '#ff4673' }]}>
                           <react_native_1.Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>Remove</react_native_1.Text>       
                        </react_native_1.TouchableOpacity>
            :
                <react_native_1.TouchableOpacity onPress={() => onTapApply(item)} style={styles.applyPromo}>
                            <react_native_1.Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>Apply</react_native_1.Text>  
                            <react_native_1.Text style={{ fontSize: 13, fontWeight: '600', color: '#fff' }}>{item.promoCode}</react_native_1.Text> 
                        </react_native_1.TouchableOpacity>}
                </react_native_1.View>
            </react_native_1.View>

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
        height: 270,
        justifyContent: 'flex-start',
        borderWidth: 1,
        // flexDirection: 'row'
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
    },
    applyPromo: {
        flexDirection: 'row',
        backgroundColor: '#8fc777',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    }
});
exports.default = OfferCard;
//# sourceMappingURL=OfferCard.js.map