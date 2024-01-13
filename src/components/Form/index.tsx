import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { Controller, useForm } from 'react-hook-form';

import Stepper from 'components/Stepper';
import { Item } from 'interfaces';
import PriceInput from 'components/PriceInput';
import { priceRegExp } from 'appConstants';

import './styles.css';

const defaultValues = {
  name: '',
  description: '',
  price: '',
  oldPrice: '',
  country: '',
  numberCopies: 1,
};

type FormValues = typeof defaultValues;

interface Props {
  values?: FormValues;
  addItem: (item: Item) => void;
}

const Form = ({ addItem, values = defaultValues }: Props) => {
  const {
    handleSubmit,
    control,
    reset,
  } = useForm({ defaultValues: values });

  const onSubmit = (data: FormValues) => {
    addItem({ ...data, id: Date.now() });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form-inputs">

        <Controller
          name="name"
          rules={{ required: true }}
          control={control}
          render={({ field: { value, onChange, name }, fieldState: { error } }) => (
            <div className="form-inputContainer__name">
              <FormControl
                label="Назва продукту"
              >
                <Input id={name} error={!!error?.type} value={value} onChange={({ target }) => onChange(target.value)} />
              </FormControl>
            </div>
          )}
        />

        <Controller
          rules={{ required: true }}
          name="description"
          control={control}
          render={({ field: { value, onChange, name }, fieldState: { error } }) => (
            <div className="form-inputContainer__description">
              <FormControl
                label="Опис продукту"
              >
                <Input id={name} error={!!error?.type} value={value} onChange={({ target }) => onChange(target.value)} />
              </FormControl>
            </div>
          )}
        />

        <Controller
          name="country"
          rules={{ required: true }}
          control={control}
          render={({ field: { value, onChange, name }, fieldState: { error } }) => (
            <div className="form-inputContainer__country">
              <FormControl
                label="Країна"
              >
                <Input id={name} error={!!error?.type} value={value} onChange={({ target }) => onChange(target.value)} />
              </FormControl>
            </div>
          )}
        />

        <Controller
          rules={{ required: true, pattern: priceRegExp }}
          name="price"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div className="form-inputContainer__price">
              <FormControl label="Ціна">
                <PriceInput value={value} error={!!error?.type} onChange={onChange} inputMode="numeric" />
              </FormControl>
            </div>
          )}
        />

        <Controller
          rules={{ pattern: priceRegExp }}
          name="oldPrice"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div className="form-inputContainer__oldPrice">
              <FormControl label="Стара ціна">
                <PriceInput value={value} error={!!error?.type} onChange={onChange} inputMode="numeric" />
              </FormControl>
            </div>
          )}
        />

        <Controller
          name="numberCopies"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="form-inputContainer__numberCopies">
              <FormControl label="Кількість копій">
                <Stepper
                  minValue={1}
                  value={value || 1}
                  onChange={onChange}
                />
              </FormControl>
            </div>
          )}
        />
      </div>

      <Button className="form-submitBtn" type="submit">
        {values?.name ? 'Зберегти' : 'Додати товар'}
      </Button>
    </form>
  );
};

export default Form;
