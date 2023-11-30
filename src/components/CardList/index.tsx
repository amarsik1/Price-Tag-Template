import {
  Card,
  StyledBody,
  StyledAction
} from "baseui/card";
import { Item } from "../../interfaces";
import { Button } from "baseui/button";

import './styles.css'

interface Props {
  items: Item[];
  deleteItem: (id: number) => void;
}

const CardList = ({ items, deleteItem }: Props) => {
  
  return (
    <div className="cardContainer">
      {items.map(({ name, description, fullPrice, centPrice, id }) => (
          <Card key={id}>
            <StyledBody>
            <p>
              Назва: {name}
            </p>
            <p>
              Опис: {description}
            </p>
            <p>
              Ціна: {fullPrice}.{centPrice}
            </p>
            </StyledBody>

            <StyledAction>
              <Button
                onClick={() => deleteItem(id)}
              >
                Видалити товар
              </Button>
            </StyledAction>
          </Card>
        ))}
    </div>
  )
}

export default CardList;
