import React, { ChangeEvent, FocusEvent } from 'react';
import { Input, InputProps } from "baseui/input";
import { priceRegExp } from 'appConstants';

interface PriceInputProps extends Omit<InputProps, 'onChange'> {
  id?: string;
  onChange: (value: string) => void;
}

const PriceInput: React.FC<PriceInputProps> = ({ id, value, onChange, onBlur, ...rest }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const input = e.target.value;
    const regex = priceRegExp;

    if (regex.test(input) || input === '') {
      onChange(input);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    onBlur?.(e);

    if (inputValue && !/\.\d{2}$/.test(inputValue)) {
      const updatedValue = inputValue.replace(/\.$/, '');

      onChange(updatedValue.includes('.') ? `${updatedValue}0` : `${updatedValue}.00`);
    }
  };

  return (
    <Input
      overrides={{
        Input: {
          props: {
            'data-testid': id
          },
        },
      }}
      id={id}
      value={value}
      onChange={handleInputChange}
      onBlur={handleBlur}
      {...rest}
    />
  );
};

export default PriceInput;
