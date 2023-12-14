import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PriceInput from './index';

describe('PriceInput component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<PriceInput id="price" value="" onChange={() => {}} />);
    const inputElement = getByTestId('price');
    expect(inputElement).toBeInTheDocument();
  });

  it('updates value on input change', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(<PriceInput id="price" value="" onChange={onChangeMock} />);
    const inputElement = getByTestId('price');

    fireEvent.change(inputElement, { target: { value: '123.45' } });

    expect(onChangeMock).toHaveBeenCalledWith('123.45');
  });

  it('adds ".00" on blur if no cents provided', () => {
    let inputValue = '';

    const onChangeMock = jest.fn((e) => inputValue = e);

    const { getByTestId, rerender } = render(<PriceInput id="price" value={inputValue} onChange={onChangeMock} />);
    const inputElement = getByTestId('price');

    fireEvent.input(inputElement, { target: { value: '123' } });
    expect(onChangeMock).toHaveBeenCalledWith('123');

    rerender(<PriceInput id="price" value={inputValue} onChange={onChangeMock} />);

    fireEvent.blur(inputElement);
    expect(onChangeMock).toHaveBeenCalledWith('123.00');
  });

  it('does not add ".00" on blur if cents are already provided', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(<PriceInput id="price" value="123.45" onChange={onChangeMock} />);
    const inputElement = getByTestId('price');

    fireEvent.blur(inputElement);

    expect(onChangeMock).toHaveBeenCalledTimes(0);
  });

  it('handles single digit after dot correctly on blur', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(<PriceInput id="price" value="132.3" onChange={onChangeMock} />);
    const inputElement = getByTestId('price');

    fireEvent.blur(inputElement);

    expect(onChangeMock).toHaveBeenCalledWith('132.30');
  });
});
