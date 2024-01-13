import { PDFViewer } from '@react-pdf/renderer';
import PriceTagTemplate from 'components/PriceTagTemplate';
import { useAppData } from 'context';

const PDFPreviewPage = () => {
  const { items } = useAppData();

  return (
    <div className='pdf-preview'>
      <PDFViewer width="100%" height={'100%'}>
        <PriceTagTemplate items={items} />
      </PDFViewer>
    </div>
  );
};

export default PDFPreviewPage;
