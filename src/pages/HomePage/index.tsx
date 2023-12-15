import { Item } from 'interfaces';
import Form from 'components/Form';
import ItemsTable from 'components/ItemsTable';
import { useAppData } from 'context';

import './styles.css';

const HomePage = () => {
  const { items, setItems } = useAppData();

  const addItem = (newItem: Item) => {
    setItems((prev) => prev.concat([newItem]))
  }

  const deleteItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  const updateItem = (id: number, newData: Item) => {
    setItems((prev) => prev.map((item) => item.id === id ? newData : item));
  }

  return (
    <div className='HomePage content'>
      <div className="container">
        <Form addItem={addItem} />

        <ItemsTable
          items={items}
          deleteItem={deleteItem}
          updateItem={updateItem}
        />
      </div>
    </div>
  )
};

export default HomePage;