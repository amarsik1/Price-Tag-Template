import { useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Navigation } from 'baseui/side-navigation';
import { Modal, ModalBody, ROLE, SIZE } from 'baseui/modal';
import { Button } from 'baseui/button';

import { useAppData } from 'context';
import { Item } from 'interfaces';
import DownloadPDFButton from 'components/DownloadPDFButton';
import Form from 'components/Form';
import FillSettingsInputsModal from 'components/Modals/FillSettingsInputs';

import './styles.css';

const Layout = () => {
  const { items, setItems } = useAppData();
  const navigate = useNavigate();
  const [formVisible, setFormVisible] = useState(false);

  const addItem = (newItem: Item) => {
    setItems((prev) => prev.concat([newItem]));
    setFormVisible(false);
  };
  const isPreviewPage = location.pathname === '/preview';

  const navigationItems = useMemo(() => {
    return [
      {
        title: `Товари (${items.length})`,
        itemId: '/',
      },
      {
        title: 'Попередній перегляд (PDF)',
        itemId: '/preview',
        disabled: Boolean(!items.length),
      },
      {
        title: 'Налаштування',
        itemId: '/settings',
      },
    ];
  }, [isPreviewPage, items.length]);

  return (
    <div className="layout">
      <div className="layout_sidebar">
        <div className="layout_navigation">
          <Navigation
            activeItemId={location.pathname}
            items={navigationItems}
            onChange={({ event, item }) => {
              event.preventDefault();
              if (item.itemId) navigate(item.itemId);
            }}
          />
        </div>

        <div className="layout_button">
          <DownloadPDFButton items={items} readyLabel="Завантажити файл" />
        </div>

        <div className="layout_button">
          <Button onClick={() => setFormVisible(true)}>Додати товар</Button>
        </div>
      </div>

      <div className="layout_content">
        <Outlet />
      </div>

      <Modal
        onClose={() => setFormVisible(false)}
        closeable
        isOpen={formVisible}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
      >
        <ModalBody>
          <Form addItem={addItem} />
        </ModalBody>
      </Modal>

      <FillSettingsInputsModal />
    </div>
  );
};

export default Layout;
