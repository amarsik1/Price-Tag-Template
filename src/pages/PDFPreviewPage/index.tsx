import { PDFViewer } from "@react-pdf/renderer";
import Document from "components/Document";
import { useAppData } from "context";

const PDFPreviewPage = () => {
  const { items } = useAppData();

  return (
    <div className='pdf-preview'>
      <PDFViewer width="100%" height={"100%"}>
        <Document items={items} />
      </PDFViewer>
    </div>
  )
}

export default PDFPreviewPage;
