import { Document, Page, View, Font, Text } from '@react-pdf/renderer';
import moment from 'moment';

import QRGenerator from 'components/QRGenerator';
import { Item, TagConfig } from 'interfaces';
import { priceFormatter } from 'formatters';

import RF from 'assets/fonts/Roboto-Medium.ttf';
import MF from 'assets/fonts/Montserrat-Medium.ttf';

import styles from './styles';

Font.register({ family: 'Montserrat', src: MF });
Font.register({ family: 'Roboto', src: RF });

interface PDFComponent {
  items: Item[];
  storeUrl: TagConfig['storeUrl'];
  currencySymbol: TagConfig['currencySymbol'];
  storeName: TagConfig['storeName'];
  discountLabel: TagConfig['discountLabel'];
}

const PriceTagTemplate = ({ items, storeUrl, currencySymbol, storeName, discountLabel }: PDFComponent) => {

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.body}>
          {items.map(
            ({
              name,
              description,
              country,
              id,
              price,
              oldPrice,
              numberCopies,
            }) => {
              const [fullPrice, centPrice] = price.split('.');
              const [oldFullPrice, oldCentPrice] = oldPrice.split('.');

              return Array(numberCopies)
                .fill(0)
                .map((_, i) => (
                  <View style={styles.card} key={id + i} wrap={false}>
                    <View style={styles.header}>
                      <View style={styles.headerLeft}>
                        <Text style={styles.title}>{name}</Text>
                        <Text style={styles.description}>{description}</Text>
                        {Boolean(oldCentPrice) && discountLabel && (
                          <View style={styles.discountLabel}>
                            <Text>{discountLabel}</Text>
                          </View>
                        )}
                      </View>

                      <View>
                        <Text style={styles.date}>
                          {moment(id).format('DD.MM.YYYY')}
                        </Text>

                        {oldFullPrice && oldCentPrice && (
                          <>
                            <Text style={styles.oldPriceLabel}>
                              Стара ціна:
                            </Text>
                            <View style={styles.priceContainer}>
                              <Text style={styles.oldFullPrice}>
                                {priceFormatter(oldFullPrice)}
                              </Text>
                              <View style={styles.priceRightSide}>
                                <Text style={styles.oldCentPrice}>
                                  {oldCentPrice}
                                </Text>
                                <Text style={styles.oldCurrencySymbol}>{currencySymbol}</Text>
                              </View>
                              <View style={styles.redLine}></View>
                            </View>
                          </>
                        )}
                      </View>
                    </View>

                    <View style={styles.footer}>
                      <View style={styles.qrCode}>
                        {storeUrl && (
                          <QRGenerator url={storeUrl} />
                        )}
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

                            <Text
                              style={{
                                ...styles.currencySymbol,
                                color: oldCentPrice ? 'red' : 'black',
                              }}
                            >
                              {currencySymbol}
                            </Text>
                          </View>
                        </View>
                        <Text style={styles.pricePerItemLabel}>
                          Ціна за 1 шт.
                        </Text>
                        <Text style={styles.country}>{country}</Text>
                        <Text style={styles.companyName}>{storeName}</Text>
                      </View>
                    </View>
                  </View>
                ));
            },
          )}
        </View>
      </Page>
    </Document>
  );
};

export default PriceTagTemplate;
