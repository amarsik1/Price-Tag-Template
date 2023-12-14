import { useMemo, useState } from "react";
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import { Button, SIZE, KIND as ButtonKind } from "baseui/button";
import { Modal, ROLE, ModalHeader, ModalFooter, ModalButton, ModalBody } from "baseui/modal";
import { ButtonGroup } from "baseui/button-group";
import Form from "components/Form";
import { Input } from "baseui/input";
import { Search } from "baseui/icon";
import Highlighted from "components/Highlighted/Highlighted";
import { Checkbox } from "baseui/checkbox";

import { Item, UseTableItemGeneric } from "interfaces";
import { useSearch, useTable } from "hooks";
import DownloadPDFButton from "components/DownloadPDFButton";

import './styles.css';

interface Props {
  items: Item[];
  deleteItem: (id: number) => void;
  updateItem: (id: number, newData: Item) => void;
}

const CardList = ({ items, deleteItem, updateItem }: Props) => {
  const [idsToDelete, setIdsToDelete] = useState<null | number[]>(null);
  const [idToEdit, setIdToEdit] = useState<null | number>(null);

  const {
    data,
    hasAll,
    hasSome,
    toggleAll,
    toggle,
  } = useTable<Item>({ initialData: items });

  const {
    searchValue,
    setSearchValue,
    data: filteredData,
  } = useSearch({ items: data });

  const handleDeleteItem = () => {
    idsToDelete?.forEach(deleteItem);
    setIdsToDelete(null);
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

  const setSelectedItemsToDelete = () => {
    const ids = data
      .filter(({ selected }) => selected)
      .map(({ id }) => id);

    setIdsToDelete(ids);
  }

  const selectedItems = useMemo(() => (
    data.filter(({ selected }) => selected)
  ), [data]);

  return (
    <div className="cardContainer">
      <ButtonGroup
        disabled={!hasSome}
        overrides={{ Root: { props: { className: "Table-buttonsAction" } } }}
      >
        <Button
          onClick={setSelectedItemsToDelete}
        >
          Видалити виділені
        </Button>

        <DownloadPDFButton
          items={selectedItems}
          toReadyLabel="Підготувати виділені"
          readyLabel="Завантажити виділені"
        />

      </ButtonGroup>

      <TableBuilder data={filteredData}>
        <TableBuilderColumn<UseTableItemGeneric<Item>>
          header={
            <Checkbox
              checked={hasAll}
              isIndeterminate={!hasAll && hasSome}
              onChange={toggleAll}
              disabled={!data.length}
            >
              ({selectedItems.length})
            </Checkbox>
          }
        >
          {(row) => (
            <Checkbox
              id={row.id.toString()}
              checked={Boolean(row.selected)}
              onChange={toggle}
            />
          )}

        </TableBuilderColumn>
        <TableBuilderColumn<Item> header="Назва товару">
          {(row) => (
            <Highlighted searchValue={searchValue} value={row.name} />
          )}
        </TableBuilderColumn>

        <TableBuilderColumn<Item> header="Опис товару">
          {(row) => (
            <Highlighted searchValue={searchValue} value={row.description} />
          )}
        </TableBuilderColumn>

        <TableBuilderColumn<Item> header="Країна-виробник">
          {(row) => (
            <Highlighted searchValue={searchValue} value={row.country} />
          )}
        </TableBuilderColumn>

        <TableBuilderColumn<Item> header="Ціна">
          {(row) => (
            <Highlighted searchValue={searchValue} value={row.price} />
          )}
        </TableBuilderColumn>

        <TableBuilderColumn<Item> header="Стара ціна">
          {(row) => (
            <Highlighted searchValue={searchValue} value={row.oldPrice} />
          )}
        </TableBuilderColumn>

        <TableBuilderColumn<Item> header="Копій">
          {(row) => row.numberCopies || 1}
        </TableBuilderColumn>

        <TableBuilderColumn<Item>
          header={(
            <Input
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              placeholder="Пошук"
              clearOnEscape
              startEnhancer={<Search size="18px" />}
            />
          )}
        >
          {(row) => (
            <ButtonGroup>
              <Button onClick={() => setIdToEdit(row.id)}>Змінити</Button>

              <Button onClick={() => setIdsToDelete([row.id])}>Видалити</Button>
            </ButtonGroup>
          )}
        </TableBuilderColumn>
      </TableBuilder>

      <Modal
        onClose={() => setIdsToDelete(null)}
        closeable
        isOpen={Boolean(idsToDelete)}
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
          <ModalButton onClick={() => setIdsToDelete(null)}>Відмінити</ModalButton>
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
