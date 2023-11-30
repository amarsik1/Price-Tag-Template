import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";

import { Item } from "../../interfaces";

import './styles.css';
import { Controller, useForm } from "react-hook-form";

interface Props {
  addItem: (item: Item) => void;
}

const defaultValues = {
  name: '',
  description: '',
  fullPrice: '',
  centPrice: '',
}

const Form = ({ addItem }: Props) => {
  const {
    handleSubmit,
    control,
    reset,
  } = useForm({ defaultValues });

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
      </div>

      <Button className="form-submitBtn" type="submit">Додати товар</Button>
    </form>
  )
}

export default Form;
