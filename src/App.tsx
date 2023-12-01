import React, { useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import Document from './components/Document';
import { Item } from './interfaces';
import { useLocalStorage } from './hooks';
import Header from './components/Header';
import Form from './components/Form';
import ItemsTable from './components/ItemsTable';

import './App.css';

const App = () => {
  const [items, setItems] = useLocalStorage<Item[]>('items', []);
  const [isPreview, setIsPreview] = useState(false);

  const addItem = (newItem: Item) => {
    setItems((prev) => prev.concat([newItem]))
  }

  const deleteItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  const updateItem = (id: number, newData: Item) => {
    setItems((prev) => prev.map((item) => item.id === id ? newData : item));
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
        <div className="content">
          <div className="container">
            <Form addItem={addItem} />

            <ItemsTable
              items={items}
              deleteItem={deleteItem}
              updateItem={updateItem}
            />
          </div>
        </div>
      )}
    </div>
  )
};

export default App;