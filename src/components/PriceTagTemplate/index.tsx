import {
  Document as PDFDocument,
  Page,
  View,
  Font,
  Text as PDFText,
} from '@react-pdf/renderer';
import moment from 'moment';

import { Item } from 'interfaces';
import QRCode from 'components/QRCode';
import { priceFormatter } from 'formatters';
import UAHSvg from 'components/UAHSvg';

import styles from './styles';

Font.register({
  family: 'Roboto',
  src:
        'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
});

interface PDFComponent {
  items: Item[];
}

const PriceTagTemplate = ({ items }: PDFComponent) => (
    <PDFDocument>
        <Page size="A4" style={styles.page}>
            <View style={styles.body}>
                {items.map(({ name, description, country, id, price, oldPrice, numberCopies }) => {
                  const [fullPrice, centPrice] = price.split('.');
                  const [oldFullPrice, oldCentPrice] = oldPrice.split('.');

                  return Array(numberCopies).fill(0).map((_, i) => (
                        <View style={styles.card} key={id + i} wrap={false}>
                            <View style={styles.header}>
                                <View style={styles.headerLeft}>
                                    <PDFText style={styles.title}>{name}</PDFText>
                                    <PDFText style={styles.description}>{description}</PDFText>
                                    {Boolean(oldCentPrice) && (
                                        <View style={styles.discountLabel}>
                                            <PDFText>Акція!</PDFText>
                                        </View>
                                    )}
                                </View>

                                <View>
                                    <PDFText style={styles.date}>{moment(id).format('DD.MM.YYYY')}</PDFText>
                                    {oldFullPrice && oldCentPrice && (
                                        <>
                                            <PDFText style={styles.oldPriceLabel}>Стара ціна:</PDFText>
                                            <View style={styles.priceContainer}>
                                                <PDFText style={styles.oldFullPrice}>{priceFormatter(oldFullPrice)}</PDFText>
                                                <View>
                                                    <PDFText style={styles.oldCentPrice}>{oldCentPrice}</PDFText>
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
                                        <PDFText
                                            style={{
                                              ...styles.fullPrice,
                                              color: oldCentPrice ? 'red' : 'black',
                                            }}
                                        >
                                            {priceFormatter(fullPrice)}
                                        </PDFText>

                                        <View>
                                            <PDFText
                                                style={{
                                                  ...styles.centPrice,
                                                  color: oldCentPrice ? 'red' : 'black',
                                                }}
                                            >
                                                {centPrice}
                                            </PDFText>
                                            <UAHSvg style={styles.currencySymbol} fillColor={oldCentPrice ? 'red' : 'black'} />
                                        </View>
                                    </View>
                                    <PDFText style={styles.pricePerItemLabel}>Ціна за 1 шт.</PDFText>
                                    <PDFText style={styles.country}>{country}</PDFText>
                                    <PDFText style={styles.companyName}>PREMIUM ALCOHOL</PDFText>
                                </View>
                            </View>
                        </View>
                  ));
                })}
            </View>
        </Page>
    </PDFDocument>
);

export default PriceTagTemplate;