import { useState } from "react";
import {
  TableBuilder,
  TableBuilderColumn,
} from 'baseui/table-semantic';
import { Button, SIZE, KIND as ButtonKind } from "baseui/button";
import { Modal, ROLE, ModalHeader, ModalFooter, ModalButton } from "baseui/modal";

import { Item } from "../../interfaces";
import './styles.css'

interface Props {
  items: Item[];
  deleteItem: (id: number) => void;
}

const CardList = ({ items, deleteItem }: Props) => {
  const [idToDelete, setIdToDelete] = useState<null | number>(null);

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
          {(row) => row.description}
        </TableBuilderColumn>

        <TableBuilderColumn<Item> header="Ціна">
          {(row) => `${row.fullPrice}.${row.centPrice}`}
        </TableBuilderColumn>

        <TableBuilderColumn<Item> header="Стара ціна">
          {(row) => row.oldFullPrice && `${row.oldFullPrice}.${row.oldCentPrice}`}
        </TableBuilderColumn>

        <TableBuilderColumn<Item> header="">
          {(row) => (
            <>
              <Button
                onClick={() => setIdToDelete(row.id)}
              >
                Видалити
              </Button>
            </>
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
          <ModalButton kind={ButtonKind.tertiary} onClick={() => deleteItem(idToDelete as number)}>
            <span style={{ color: 'red' }}>Видалити</span>
          </ModalButton>
          <ModalButton onClick={() => setIdToDelete(null)}>Відмінити</ModalButton>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CardList;
