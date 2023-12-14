import { Button } from 'baseui/button';
import './styles.css';
import { DisplayLarge, DisplayMedium } from 'baseui/typography';
import { StyledLink } from 'baseui/link';

const NotFoundPage = () => {
  return (
    <div className='notFoundPage'>
      <DisplayMedium>Тут нічого немає 😔</DisplayMedium>
      <StyledLink href="/">
        Повернутись додому
      </StyledLink>
    </div>
  );
}

export default NotFoundPage;
