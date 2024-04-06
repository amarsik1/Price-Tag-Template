import { DisplayMedium } from 'baseui/typography';
import { StyledLink } from 'baseui/link';

import './styles.css';

const NotFoundPage = () => {
  return (
    <div className='notFoundPage'>
      <DisplayMedium>Тут нічого немає 😔</DisplayMedium>
      <StyledLink href="/">
        Повернутись додому
      </StyledLink>
    </div>
  );
};

export default NotFoundPage;
