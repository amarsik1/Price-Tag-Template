import {
    Document as PDFDocument,
    Page,
    View,
    Font,
    Text,
} from '@react-pdf/renderer';
import moment from 'moment';

import { Item } from '../../interfaces';
import QRCode from '../QRCode';
import { priceFormatter } from '../../formatters';
import UAHSvg from '../UAHSvg';

import styles from './styles';

Font.register({
    family: "Roboto",
    src:
        "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
});

interface PDFComponent {
    items: Item[];
}

const Document = ({ items }: PDFComponent) => (
    <PDFDocument>
        <Page size="A4">
            <View style={styles.body}>
                {items.map(({ name, description, fullPrice, centPrice, country, id, oldCentPrice, oldFullPrice }) => (
                    <View style={styles.card} key={id} wrap={false}>
                        <View style={styles.header}>
                            <View style={styles.headerLeft}>
                                <Text style={styles.title}>{name}</Text>
                                <Text style={styles.description}>{description}</Text>
                                {Boolean(oldCentPrice) && (
                                    <View style={styles.discountLabel}>
                                        <Text>Розпродаж!</Text>
                                    </View>
                                )}
                            </View>

                            <View>
                                <Text style={styles.date}>{moment(id).format('DD.MM.YYYY')}</Text>
                                {oldFullPrice && oldCentPrice && (
                                    <>
                                        <Text style={styles.oldPriceLabel}>Стара ціна:</Text>
                                        <View style={styles.priceContainer}>
                                            <Text style={styles.oldFullPrice}>{priceFormatter(oldFullPrice)}</Text>
                                            <View>
                                                <Text style={styles.oldCentPrice}>{oldCentPrice}</Text>
                                                <UAHSvg style={styles.oldCurrencySymbol} />
                                            </View>
                                            <View style={styles.redLine}></View>
                                        </View>
                                    </>
                                )}
                            </View>
                        </View>


                        <View style={styles.footer}>
                            <View style={styles.qrCode}>
                                <QRCode />
                            </View>

                            <View style={styles.footerRight}>

                                <View style={styles.priceContainer}>
                                    <Text
                                        style={{
                                            ...styles.fullPrice,
                                            color: oldCentPrice ? 'red' : 'black',
                                        }}
                                    >
                                        {priceFormatter(fullPrice)}
                                    </Text>

                                    <View>
                                        <Text
                                            style={{
                                                ...styles.centPrice,
                                                color: oldCentPrice ? 'red' : 'black',
                                            }}
                                        >
                                            {centPrice}
                                        </Text>
                                        <UAHSvg style={styles.currencySymbol} fillColor={oldCentPrice ? 'red' : 'black'} />
                                    </View>
                                </View>
                                <Text style={styles.pricePerItemLabel}>Ціна за 1 шт.</Text>
                                <Text style={styles.country}>{country}</Text>
                                <Text style={styles.companyName}>PREMIUM ALCOHOL</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </Page>
    </PDFDocument>
);

export default Document;