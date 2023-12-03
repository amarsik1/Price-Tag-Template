import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { Controller, useForm } from "react-hook-form";
import { Checkbox } from "baseui/checkbox";

import Stepper from "../Stepper";
import { Item } from "../../interfaces";

import './styles.css';

const defaultValues = {
  name: '',
  description: '',
  fullPrice: '',
  centPrice: '',
  country: '',
  isDiscount: false,
  numberCopies: 1,
  oldFullPrice: '',
  oldCentPrice: '',
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
    watch,
  } = useForm({ defaultValues: values });

  const isDiscount = watch('isDiscount');

  const onSubmit = (data: FormValues) => {
    const { isDiscount, oldCentPrice, oldFullPrice } = data;
    addItem({
      ...data,
      oldCentPrice: isDiscount ? oldCentPrice : '',
      oldFullPrice: isDiscount ? oldFullPrice : '',
      id: Date.now(),
    });
    reset();
  }

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
                <Input id={name} error={!!error?.type} value={value} onChange={({ target: { value } }) => onChange(value)} />
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
                <Input id={name} error={!!error?.type} value={value} onChange={({ target: { value } }) => onChange(value)} />
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
                <Input id={name} error={!!error?.type} value={value} onChange={({ target: { value } }) => onChange(value)} />
              </FormControl>
            </div>
          )}
        />

        <Controller
          rules={{ required: true, pattern: /^[0-9]/ }}
          name="fullPrice"
          control={control}
          render={({ field: { value, onChange, name }, fieldState: { error } }) => (
            <div className="form-inputContainer__fullPrice">
              <FormControl
                label="Ціна (ціле число)"
                caption="Тільки числа"
              >
                <Input
                  id={name}
                  error={!!error?.type}
                  value={value}
                  onChange={({ target: { value } }) => onChange(value)}
                  inputMode="numeric"
                />
              </FormControl>
            </div>
          )}
        />

        <Controller
          name="centPrice"
          rules={{ required: true, maxLength: 2, pattern: /[0-9]{2}/ }}
          control={control}
          render={({ field: { value, onChange, name }, fieldState: { error } }) => (
            <div className="form-inputContainer__centPrice">
              <FormControl
                label="Ціна (копійки)"
                caption="Тільки два числа"
              >
                <Input
                  id={name}
                  error={!!error?.type}
                  value={value}
                  onChange={({ target: { value } }) => onChange(value)}
                  inputMode="numeric"
                />
              </FormControl>
            </div>
          )}
        />

        <Controller
          name="numberCopies"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="form-inputContainer__numberCopies">
              <FormControl label="Кількість копій" caption="&nbsp;">
                <Stepper
                  minValue={1}
                  value={value || 1}
                  onChange={onChange}
                />
              </FormControl>
            </div>
          )}
        />

        <Controller
          name="isDiscount"
          control={control}
          render={({ field: { value, onChange, name } }) => (
            <div className="form-inputContainer__isDiscount">
              <FormControl>
                <Checkbox
                  id={name}
                  checked={value}
                  onChange={e => onChange(e.target.checked)}
                >
                  Товар зі знижкою?
                </Checkbox>
              </FormControl>
            </div>
          )}
        />

        {isDiscount && (
          <>
            <Controller
              rules={{ required: true, pattern: /^[0-9]/ }}
              name="oldFullPrice"
              control={control}
              render={({ field: { value, onChange, name }, fieldState: { error } }) => (
                <div className="form-inputContainer__oldFullPrice">
                  <FormControl
                    label="Стара ціна (ціле число)"
                    caption="Тільки числа"
                  >
                    <Input
                      id={name}
                      error={!!error?.type}
                      value={value}
                      onChange={({ target: { value } }) => onChange(value)}
                      inputMode="numeric"
                    />
                  </FormControl>
                </div>
              )}
            />

            <Controller
              name="oldCentPrice"
              rules={{ required: true, maxLength: 2, pattern: /[0-9]{2}/ }}
              control={control}
              render={({ field: { value, onChange, name }, fieldState: { error } }) => (
                <div className="form-inputContainer__oldCentPrice">
                  <FormControl
                    label="Стара ціна (копійки)"
                    caption="Тільки два числа"
                  >
                    <Input
                      id={name}
                      error={!!error?.type}
                      value={value}
                      onChange={({ target: { value } }) => onChange(value)}
                      inputMode="numeric"
                    />
                  </FormControl>
                </div>
              )}
            />
          </>
        )}
      </div>

      <Button className="form-submitBtn" type="submit">
        {values?.name ? "Зберегти" : "Додати товар"}
      </Button>
    </form>
  )
}

export default Form;
