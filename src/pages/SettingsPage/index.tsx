import { ToasterContainer } from 'baseui/toast';
import { useAppData } from 'context';
import SingleInputForm from 'components/SingleInputForm';
import { RadioGroup, Radio } from 'baseui/radio';
import { FormControl } from 'baseui/form-control';

import { CurrencySymbol } from 'interfaces';

import './styles.css';

const SettingsPage = () => {
  const {
    storeUrl,
    storeName,
    currencySymbol,
    discountLabel,
    setCurrencySymbol,
    setStoreName,
    setStoreUrl,
    setDiscountLabel,
  } = useAppData();

  const handleSaveStoreUrl = (newValue: string) => {
    setStoreUrl(newValue);
    alert('Успішно збережено');
  };

  const handleSaveStoreName = (newValue: string) => {
    setStoreName(newValue);
    alert('Успішно збережено');
  };

  const handleSaveDiscountLabel = (newValue: string) => {
    setDiscountLabel(newValue);
    alert('Успішно збережено');
  };

  return (
    <ToasterContainer>
      <div className="settingsPage">
        <div className="settingsPage_formWrapper">
          <div>
            <FormControl label="Текст QR-коду">
              <SingleInputForm
                onSave={handleSaveStoreUrl}
                defaultValue={storeUrl}
                placeholder="Наприклад: 'google.com'"
              />
            </FormControl>
          </div>

          <div>
            <FormControl label="Назва магазину">
              <SingleInputForm
                onSave={handleSaveStoreName}
                defaultValue={storeName}
                placeholder="Наприклад: 'АТБ'"
                maxLength={35}
              />
            </FormControl>
          </div>

          <div>
            <FormControl label="Акційний напис">
              <SingleInputForm
                onSave={handleSaveDiscountLabel}
                defaultValue={discountLabel}
                placeholder="Наприклад: 'Акція!'"
                maxLength={9}
              />
            </FormControl>
          </div>

          <div>
            <FormControl label="Валюта">
              <RadioGroup
                value={currencySymbol}
                onChange={(e) => setCurrencySymbol(e.currentTarget.value as CurrencySymbol)}
                name="number"
              >
                <Radio value={CurrencySymbol.EUR}>{CurrencySymbol.EUR}</Radio>
                <Radio value={CurrencySymbol.UAH}>{CurrencySymbol.UAH}</Radio>
                <Radio value={CurrencySymbol.USD}>{CurrencySymbol.USD}</Radio>
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </div>
    </ToasterContainer>
  );
};

export default SettingsPage;
