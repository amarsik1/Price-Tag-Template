import React from 'react';
import { render } from '@testing-library/react';
import Highlighted from './Highlighted';

describe('Highlighted component', () => {
  it('renders without crashing', () => {
    render(<Highlighted value="Example Value" searchValue="Value" />);
  });

  it('renders the original value if searchValue is not found', () => {
    const { getByText } = render(<Highlighted value="Example Value" searchValue="NotFound" />);
    expect(getByText('Example Value')).toBeInTheDocument();
  });

  it('highlights the matching part of the value', () => {
    const { container } = render(<Highlighted value="Example Value" searchValue="Val" />);
    const highlightedElement = container.querySelector('.highlighted');
    expect(highlightedElement).toBeInTheDocument();
    expect(highlightedElement).toHaveTextContent('Val');
  });

  it('is case-insensitive when highlighting', () => {
    const { container } = render(<Highlighted value="Example Value" searchValue="val" />);
    const highlightedElement = container.querySelector('.highlighted');
    expect(highlightedElement).toBeInTheDocument();
    expect(highlightedElement).toHaveTextContent('Val');
  });

  it('handles multiple occurrences of searchValue', () => {
    const { container } = render(<Highlighted value="Value Value Value" searchValue="Value" />);
    const highlightedElements = container.querySelectorAll('.highlighted');
    expect(highlightedElements.length).toBe(1);
    const highlightedText = highlightedElements[0].textContent;
    expect(highlightedText).toBe('Value');
  });
});
