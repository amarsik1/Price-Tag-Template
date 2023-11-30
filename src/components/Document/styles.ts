import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerLeft: {},
    date: {
        fontSize: 5,
        color: 'gray',
    },
    footer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    qrCode: {
        width: 50,
    },
    footerRight: {},
    priceContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
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
    }
});

export default styles;
