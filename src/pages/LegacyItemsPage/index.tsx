import { useState } from 'react';
import { useAppData } from 'context';
import { useNavigate } from 'react-router-dom';
import { HeadingXXLarge, ParagraphLarge } from 'baseui/typography';
import { Button } from 'baseui/button';

import { formatLegacyItems } from 'formatters';
import { Item, LegacyItem } from 'interfaces';

import './styles.css';

const LegacyItemsPage = () => {
  const navigate = useNavigate();
  const { items, setItems } = useAppData();
  const [isLoading, setIsLoading] = useState(false);

  const formatItems = async () => {
    setIsLoading(true);
    const formattedItems = await formatLegacyItems(items as (LegacyItem & Item)[]);
    
    setItems(formattedItems);
    setIsLoading(false);
    navigate('/');
  };

  return (
    <div className="legacyItemsPage">
      <HeadingXXLarge>Знайдено записи старого формату</HeadingXXLarge>
      <ParagraphLarge>Було змінено формат зберігання записів, аби уникнути помилок нам потрібно перевести всі існуючі записи до нового формату</ParagraphLarge>
      <Button isLoading={isLoading} onClick={formatItems}>Оновити</Button>
    </div>
  );
}

export default LegacyItemsPage;
