import { useMemo, useState } from "react";
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import { Button, SIZE, KIND as ButtonKind } from "baseui/button";
import { Modal, ROLE, ModalHeader, ModalFooter, ModalButton, ModalBody } from "baseui/modal";
import { ButtonGroup } from "baseui/button-group";

import { Item } from "../../interfaces";
import Form from "../Form";

import './styles.css'

interface Props {
  items: Item[];
  deleteItem: (id: number) => void;
  updateItem: (id: number, newData: Item) => void;
}

const CardList = ({ items, deleteItem, updateItem }: Props) => {
  const [idToDelete, setIdToDelete] = useState<null | number>(null);
  const [idToEdit, setIdToEdit] = useState<null | number>(null);

  const handleDeleteItem = () => {
    deleteItem(idToDelete as number)
    setIdToDelete(null);
  };

  const handleUpdateItem = (newData: Item) => {
    if (!idToEdit) return;

    updateItem(idToEdit, newData);
    setIdToEdit(null);
  };

  const itemToEdit = useMemo(() => {
    if (idToEdit) {
      return items.find(({ id }) => id === idToEdit) as Item;
    }

    return null;
  }, [idToEdit, items]);

  return (
    <div className="cardContainer">
      <TableBuilder data={items}>
        <TableBuilderColumn<Item> header="Назва товару">
          {(row) => row.name}
        </TableBuilderColumn>

        <TableBuilderColumn<Item> header="Опис товару">
          {(row) => row.description}
        </TableBuilderColumn>

        <TableBuilderColumn<Item> header="Країна-виробник">
          {(row) => row.country}
        </TableBuilderColumn>

        <TableBuilderColumn<Item> header="Ціна">
          {(row) => `${row.fullPrice}.${row.centPrice}`}
        </TableBuilderColumn>

        <TableBuilderColumn<Item> header="Стара ціна">
          {(row) => row.oldFullPrice && `${row.oldFullPrice}.${row.oldCentPrice}`}
        </TableBuilderColumn>

        <TableBuilderColumn<Item> header="">
          {(row) => (
            <ButtonGroup>
              <Button
                onClick={() => setIdToEdit(row.id)}
              >
                Змінити
              </Button>
              <Button
                onClick={() => setIdToDelete(row.id)}
              >
                Видалити
              </Button>
            </ButtonGroup>
          )}
        </TableBuilderColumn>
      </TableBuilder>

      <Modal
        onClose={() => setIdToDelete(null)}
        closeable
        isOpen={Boolean(idToDelete)}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
      >
        <ModalHeader>Ви впевнені що хочете видалити?</ModalHeader>
        <ModalFooter>
          <ModalButton kind={ButtonKind.tertiary} onClick={handleDeleteItem}>
            <span style={{ color: 'red' }}>Видалити</span>
          </ModalButton>
          <ModalButton onClick={() => setIdToDelete(null)}>Відмінити</ModalButton>
        </ModalFooter>
      </Modal>

      <Modal
        onClose={() => setIdToEdit(null)}
        closeable
        isOpen={Boolean(itemToEdit)}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
      >
        <ModalHeader></ModalHeader>
        <ModalBody>
          {itemToEdit && (
            <Form values={itemToEdit} addItem={handleUpdateItem}></Form>
          )}
        </ModalBody>
        <ModalFooter>
          <ModalButton kind={ButtonKind.tertiary} onClick={() => setIdToEdit(null)}>
            Відмінити
          </ModalButton>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CardList;
