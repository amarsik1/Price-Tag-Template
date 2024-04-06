import { useState } from 'react';
import { Input, InputProps } from 'baseui/input';
import { Button } from 'baseui/button';
import { Upload } from 'baseui/icon';

export interface SingleInputFormProps extends Omit<InputProps, 'defaultValue'> {
  defaultValue: string;
  onSave: (newValue: string) => void;
}

const SingleInputForm = ({
  defaultValue,
  onSave,
  ...rest
}: SingleInputFormProps) => {
  const [value, setValue] = useState(defaultValue);

  const isDisabled = defaultValue === value;

  const handleSave = () => onSave(value);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      endEnhancer={
        <Button
          type="submit"
          disabled={isDisabled}
          onClick={handleSave}
          $kind="tertiary"
        >
          <Upload size={24} />
        </Button>
      }
      {...rest}
    />
  );
};

export default SingleInputForm;
