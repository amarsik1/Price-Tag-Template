import { PDFViewer } from '@react-pdf/renderer';
import PriceTagTemplate from 'components/PriceTagTemplate';
import { useAppData } from 'context';

const PDFPreviewPage = () => {
  const { items, storeUrl, currencySymbol, storeName, discountLabel } = useAppData();

  return (
    <div className="pdf-preview">
      <PDFViewer width="100%" height={'100%'}>
        <PriceTagTemplate
          discountLabel={discountLabel}
          storeUrl={storeUrl}
          currencySymbol={currencySymbol}
          storeName={storeName}
          items={items}
        />
      </PDFViewer>
    </div>
  );
};

export default PDFPreviewPage;
