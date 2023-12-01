import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { Controller, useForm } from "react-hook-form";
import { Checkbox } from "baseui/checkbox";

import { Item } from "../../interfaces";

import './styles.css';

interface Props {
  addItem: (item: Item) => void;
}

const defaultValues = {
  name: '',
  description: '',
  fullPrice: '',
  centPrice: '',
  country: '',
  isDiscount: false,
  oldFullPrice: '',
  oldCentPrice: '',
}

const Form = ({ addItem }: Props) => {
  const {
    handleSubmit,
    control,
    reset,
    watch,
  } = useForm({ defaultValues });

  const isDiscount = watch('isDiscount');

  const onSubmit = (data: Omit<Item, 'id'>) => {
    addItem({
      ...data,
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
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div>
              <FormControl
                label="Назва продукту"
              >
                <Input error={!!error?.type} value={value} onChange={({ target: { value } }) => onChange(value)} />
              </FormControl>
            </div>
          )}
        />

        <Controller
          rules={{ required: true }}
          name="description"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div>
              <FormControl
                label="Опис продукту"
              >
                <Input error={!!error?.type} value={value} onChange={({ target: { value } }) => onChange(value)} />
              </FormControl>
            </div>
          )}
        />

        <Controller
          rules={{ required: true, pattern: /^[0-9]/ }}
          name="fullPrice"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div>
              <FormControl
                label="Ціна (ціле число)"
                caption="Тільки числа"
              >
                <Input error={!!error?.type} value={value} onChange={({ target: { value } }) => onChange(value)} />
              </FormControl>
            </div>
          )}
        />

        <Controller
          name="centPrice"
          rules={{ required: true, maxLength: 2, pattern: /[0-9]{2}/ }}
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div>
              <FormControl
                label="Ціна (копійки)"
                caption="Тільки два числа"
              >
                <Input error={!!error?.type} value={value} onChange={({ target: { value } }) => onChange(value)} />
              </FormControl>
            </div>
          )}
        />

        <Controller
          name="country"
          rules={{ required: true }}
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div>
              <FormControl
                label="Країна"
              >
                <Input error={!!error?.type} value={value} onChange={({ target: { value } }) => onChange(value)} />
              </FormControl>
            </div>
          )}
        />

        <Controller
          name="isDiscount"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div>
              <FormControl>
                <Checkbox
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
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <div>
                  <FormControl
                    label="Стара ціна (ціле число)"
                    caption="Тільки числа"
                  >
                    <Input error={!!error?.type} value={value} onChange={({ target: { value } }) => onChange(value)} />
                  </FormControl>
                </div>
              )}
            />

            <Controller
              name="oldCentPrice"
              rules={{ required: true, maxLength: 2, pattern: /[0-9]{2}/ }}
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <div>
                  <FormControl
                    label="Стара ціна (копійки)"
                    caption="Тільки два числа"
                  >
                    <Input error={!!error?.type} value={value} onChange={({ target: { value } }) => onChange(value)} />
                  </FormControl>
                </div>
              )}
            />
          </>
        )}
      </div>

      <Button className="form-submitBtn" type="submit">Додати товар</Button>
    </form>
  )
}

export default Form;
