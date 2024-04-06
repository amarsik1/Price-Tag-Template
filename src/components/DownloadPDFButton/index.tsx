import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button, ButtonProps } from 'baseui/button';
import { Item } from 'baseui/menu';
import classNames from 'classnames';
import { useState } from 'react';

import PriceTagTemplate from 'components/PriceTagTemplate';
import { useAppData } from 'context';

interface Props {
  items: Item[];
  readyLabel: string;
  waitingLabel?: string;
  toReadyLabel?: string;
  buttonProps?: ButtonProps & React.ComponentProps<'button'>;
}
const DownloadPDFButton = ({
  items,
  readyLabel,
  waitingLabel = 'Файл завантажується',
  toReadyLabel = 'Підготувати файл',
  buttonProps,
}: Props) => {
  const { storeUrl, currencySymbol, storeName, discountLabel } = useAppData();
  const [preparedItems, setPreparedItems] = useState<Item[]>([]);

  const handleDownloadFile = () => setTimeout(() => setPreparedItems([]), 0);

  const isEqual =
    JSON.stringify(items.map(({ id }) => id)) ===
    JSON.stringify(preparedItems.map(({ id }) => id));

  return (
    <>
      {isEqual ? (
        <PDFDownloadLink
          className={classNames('downloadBtn', { disabled: !items.length })}
          document={
            <PriceTagTemplate
              discountLabel={discountLabel}
              storeUrl={storeUrl}
              currencySymbol={currencySymbol}
              storeName={storeName}
              items={preparedItems}
            />
          }
          onClick={handleDownloadFile}
        >
          {({ loading }) => (loading ? waitingLabel : readyLabel)}
        </PDFDownloadLink>
      ) : (
        <Button {...buttonProps} onClick={() => setPreparedItems(items)}>
          {toReadyLabel}
        </Button>
      )}
    </>
  );
};

export default DownloadPDFButton;
