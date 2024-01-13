interface Props {
  value: string;
  searchValue: string;
}

const Highlighted = ({ value = '', searchValue }: Props) => {
  const firstIndex = value.toUpperCase().indexOf(searchValue.toUpperCase());
  if (firstIndex === -1) return <span>{value}</span>;

  const lastIndex = firstIndex + searchValue.length;

  const firstPart = value.slice(0, firstIndex);
  const founded = value.slice(firstIndex, lastIndex);
  const lastPart = value.slice(lastIndex);

  return (
    <>
      <span>{firstPart}</span>
      <span className="highlighted">{founded}</span>
      <span>{lastPart}</span>
    </>
  );
};

export default Highlighted;
