import { PDFViewer } from '@react-pdf/renderer';
import Document from './components/Document';
import { Item } from './interfaces';
import { useLocalStorage } from './hooks';
import Header from './components/Header';
import Form from './components/Form';
import CardList from './components/CardList';

import './App.css';
import { useState } from 'react';

const App = () => {
  const [items, setItems] = useLocalStorage<Item[]>('items', []);
  const [isPreview, setIsPreview] = useState(false);

  const addItem = (newItem: Item) => {
    setItems((prev) => prev.concat([newItem]))
  }

  const deleteItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  const toggleIsPreview = () => setIsPreview((prev) => !prev);

  return (
    <div className='App'>
      <Header items={items} isPreview={isPreview} toggleIsPreview={toggleIsPreview} />


      {isPreview ? (
        <div className='pdf-preview'>

        <PDFViewer width="100%" height={"100%"}>
          <Document items={items} />
        </PDFViewer>
        </div>
      ) : (
        <div className="container">

          <Form addItem={addItem} />

          <CardList
            items={items}
            deleteItem={deleteItem}
          />
        </div >

      )}
    </div>
  )
};

export default App;