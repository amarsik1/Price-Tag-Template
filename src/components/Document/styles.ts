import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: '1cm'
    },
    body: {
        flexDirection: 'row',
        flexGrow: 1,
        flexWrap: 'wrap',
        gap: 5,
    },
    card: {
        width: '6cm',
        height: '4cm',
        padding: 5,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        fontFamily: 'Roboto',
        border: '1px black solid'
    },
    discountLabel: {
        marginLeft: -5,
        marginTop: 5,
        width: "100",
        fontSize: 16,
        paddingBottom: 5,
        paddingLeft: 5,
        backgroundColor: 'red',
        color: 'yellow',
        position: 'relative',
    },
    oldPriceLabel: {
        fontSize: 4,
        paddingLeft: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 5,
    },
    headerLeft: {
        textOverflow: 'ellipsis',
    },
    date: {
        fontSize: 5,
        color: 'gray',
    },
    footer: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row',
    },
    qrCode: {
        width: 50,
        marginLeft: '-5px',
        marginBottom: '-5px',
    },
    footerRight: {
        textAlign: 'right',
        alignItems: 'flex-end',
        flex: 1,
    },
    priceContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',
    },
    fullPrice: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    centPrice: {
        fontSize: 10,
        fontWeight: 300,
        marginBottom: 2,
    },
    currencySymbol: {
        width: 6,
        height: 6,
    },
    oldFullPrice: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    oldCentPrice: {
        fontSize: 5,
        fontWeight: 300,
        marginBottom: 2,
    },
    oldCurrencySymbol: {
        width: 4,
        height: 4,
    },
    pricePerItemLabel: {
        fontSize: 6
    },
    country: {
        fontSize: 5,
        color: 'gray',
    },
    companyName: {
        fontSize: 5,
        color: 'gray',
    },
    title: {
        fontSize: 10,
        marginBottom: 1,
    },
    description: {
        fontSize: 8,
        width: '75%',
        color: '#444',
        lineHeight: 1,
    },
    redColor: {
        color: '#900',
    },
    redLine: {
        borderBottom: '2px solid red',
        position: 'absolute',
        left: 0,
        width: '100%',
        height: '5px',
        transform: 'rotate(-22deg)',
    },
});

export default styles;
