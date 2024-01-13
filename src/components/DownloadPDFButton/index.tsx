import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from 'baseui/button';
import { Item } from 'baseui/menu';
import classNames from 'classnames';
import { useState } from 'react';

import PriceTagTemplate from 'components/PriceTagTemplate';

interface Props {
  items: Item[];
  readyLabel: string;
  waitingLabel?: string;
  toReadyLabel?: string;
}
const DownloadPDFButton = ({
  items,
  readyLabel,
  waitingLabel = 'Файл завантажується',
  toReadyLabel = 'Підготувати файл',
}: Props) => {
  const [preparedItems, setPreparedItems] = useState<Item[]>([]);

  const handleDownloadFile = () => setTimeout(() => setPreparedItems([]), 0);

  const isEqual = JSON.stringify(items.map(({ id }) => id)) === JSON.stringify(preparedItems.map(({ id }) => id));

  return (
    <>
      {isEqual ? (
        <PDFDownloadLink
          className={classNames('downloadBtn', { disabled: !items.length })}
          document={<PriceTagTemplate items={preparedItems} />}
          onClick={handleDownloadFile}
        >
          {({ loading }) => (loading ? waitingLabel : readyLabel)}
        </PDFDownloadLink>

      ) : (
        <Button onClick={() => setPreparedItems(items)}>
          {toReadyLabel}
        </Button>
      )}
    </>
  );
};

export default DownloadPDFButton;
