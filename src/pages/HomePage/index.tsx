import { Item } from 'interfaces';
import ItemsTable from 'components/ItemsTable';
import { useAppData } from 'context';

import './styles.css';

const HomePage = () => {
  const { items, setItems } = useAppData();

  const deleteItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id: number, newData: Item) => {
    setItems((prev) => prev.map((item) => (item.id === id ? newData : item)));
  };

  return (
    <div className="HomePage content">
      <ItemsTable
        items={items}
        deleteItem={deleteItem}
        updateItem={updateItem}
      />
    </div>
  );
};

export default HomePage;
