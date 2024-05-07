import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalBody, ModalButton, ModalFooter } from 'baseui/modal';

import { useAppData } from 'context';

const FillSettingsInputsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { storeName, storeUrl, discountLabel } = useAppData();
  const navigate = useNavigate();

  useEffect(() => {
    if (storeName && storeUrl && discountLabel) return;

    setIsOpen(true);
  }, []);

  const closeModal = () => setIsOpen(false);

  const handleGoToSettings = () => {
    navigate('/settings');
    closeModal();
  };

  return (
    <Modal
      onClose={closeModal}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
    >
      <ModalBody>
        У Вас є незаповнені деякі поля, тому деякі записи можуть бути
        відображені не так, як Ви очікуєте. Ми рекомендуємо додати відсутні дані
        прямо зараз
      </ModalBody>
      <ModalFooter>
        <ModalButton $kind="tertiary" onClick={closeModal}>Пізніше</ModalButton>
        <ModalButton onClick={handleGoToSettings}>Додати</ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default FillSettingsInputsModal;
