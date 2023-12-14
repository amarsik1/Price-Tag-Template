import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem
} from "baseui/header-navigation";
import { StyledLink } from "baseui/link";
import { Drawer } from "baseui/drawer";
import { useState } from "react";
import { ListItem, ListItemLabel } from "baseui/list";
import DownloadPDFButton from "components/DownloadPDFButton";
import { MobileHeader } from "baseui/mobile-header";
import { useAppData } from "context";
import { Menu } from 'baseui/icon';

import './styles.css';
import { useLocation } from "react-router-dom";

interface Props { }

const Header = ({ }: Props) => {
  const { items } = useAppData();
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isPreviewPage = location.pathname === '/preview';

  if (window.innerWidth <= 600) {

    return (
      <>
        <MobileHeader
          title={`Додано: ${items.length}`}
          actionButtons={[
            {
              renderIcon: Menu,
              onClick: () => setIsDrawerOpen(true),
              label: "Меню"
            }
          ]}
        />

        <Drawer
          isOpen={isDrawerOpen}
          autoFocus
          onClose={() => setIsDrawerOpen(false)}
        >
          <ul className="drawer-container">
            <ListItem>
              {isPreviewPage ? (
                <StyledLink href="/">До форми</StyledLink>
              ) : (
                <StyledLink href="/preview">Переглянути</StyledLink>
              )}
            </ListItem>

            <ListItem>
              <ListItemLabel>
                <DownloadPDFButton
                  items={items}
                  readyLabel="Завантажити файл"
                />
              </ListItemLabel>
            </ListItem>
          </ul>
        </Drawer>
      </>
    );
  }

  return (
    <header className="header">
      <HeaderNavigation>
        <StyledNavigationList $align={ALIGN.left}>
          <StyledNavigationItem>
            Додано: {items.length}
          </StyledNavigationItem>
        </StyledNavigationList>

        <StyledNavigationList $align={ALIGN.center} />

        <StyledNavigationList $align={ALIGN.right}>
          {Boolean(items.length) && (
            <>
              <StyledNavigationItem>
                {isPreviewPage ? (
                  <StyledLink href="/">До форми</StyledLink>
                ) : (
                  <StyledLink href="/preview">Переглянути</StyledLink>
                )}
              </StyledNavigationItem>
            </>
          )}

          <StyledNavigationItem>
            <DownloadPDFButton
              items={items}
              readyLabel="Завантажити файл"
            />
          </StyledNavigationItem>
        </StyledNavigationList>
      </HeaderNavigation>
    </header>
  )
};

export default Header;