import { Button, KIND, SHAPE } from 'baseui/button';
import { ParagraphMedium } from 'baseui/typography';

import './styles.css';

interface Props {
  minValue: number;
  value: number;
  onChange: (newValue: number) => void;
}

const Stepper = ({
  minValue,
  value,
  onChange,
}: Props) => {
  const isDisabledDecrease = value <= minValue;

  return (
    <div className="buttonGroup">
      <Button
        type="button"
        disabled={isDisabledDecrease}
        shape={SHAPE.square}
        kind={KIND.secondary}
        onClick={() => onChange(value - 1)}
      >
        -
      </Button>
      <ParagraphMedium>{value}</ParagraphMedium>
      <Button
        type="button"
        shape={SHAPE.square}
        kind={KIND.secondary}
        onClick={() => onChange(value + 1)}
      >
        +
      </Button>
    </div>
  );
};

export default Stepper;
