import {
    Document as PDFDocument,
    Page,
    View,
    Font,
    Text,
    Svg,
    Image,
    Path,
} from '@react-pdf/renderer';

import { Item } from '../../interfaces';
import qr from '../../qr.png';
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
                {items.map(({ name, description, fullPrice, centPrice }) => (
                    <View style={styles.card} key={name} wrap={false}>
                        <View style={styles.header}>
                            <View style={styles.headerLeft}>
                                <Text style={styles.title}>{name}</Text>
                                <Text style={styles.description}>{description}</Text>
                            </View>

                            <Text style={styles.date}>01.01.2023</Text>
                        </View>


                        <View style={styles.footer}>
                            <View style={styles.qrCode}>
                                <Image src={qr} />
                            </View>

                            <View style={styles.footerRight}>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.fullPrice}>{fullPrice}</Text>
                                    <View>
                                        <Text style={styles.centPrice}>{centPrice}</Text>
                                        <Svg viewBox="0 0 325 435" style={styles.currencySymbol}>
                                            <Path
                                                fill="black"
                                                d="M226.8,197.6l-49.1,39.7h144.2v43.9h-187c-12.5,9.4-19.9,20.9-19.9,35.5c0,25.1,19.9,38.7,55.4,38.7
          c30.3,0,56.4-14.6,77.3-44.9l57.5,38.7c-31.3,48.1-87.8,72.1-141.1,72.1c-70,0-122.2-33.4-122.2-88.8c0-17.8,6.3-36.6,18.8-51.2
          H3.2v-43.9h91.9l50.2-39.7H3.2v-43.9h186c13.6-12.5,19.9-24,19.9-37.6c0-21.9-19.9-37.6-50.2-37.6c-29.3,0-54.3,16.7-72.1,44.9
          L31.4,85.8c30.3-48.1,79.4-72.1,132.7-72.1c72.1,0,119.1,37.6,119.1,88.8c0,18.8-6.3,37.6-16.7,51.2h55.4v43.9H226.8z"
                                            />
                                        </Svg>
                                    </View>
                                </View>
                                <Text style={styles.pricePerItemLabel}>Ціна за 1 шт.</Text>
                                <Text style={styles.country}>Україна</Text>
                                <Text style={styles.companyName}>Назва магазину</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </Page>
    </PDFDocument>
);

export default Document;