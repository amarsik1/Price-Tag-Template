import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem
} from "baseui/header-navigation";
import {
  Checkbox,
  STYLE_TYPE,
  LABEL_PLACEMENT
} from "baseui/checkbox";

import { MobileHeader } from "baseui/mobile-header";
import { Menu } from 'baseui/icon';

import { Item } from "../../interfaces";

import './styles.css';
import { Drawer } from "baseui/drawer";
import { useState } from "react";
import { ListItem, ListItemLabel } from "baseui/list";
import DownloadPDFButton from "../DownloadPDFButton";

interface Props {
  items: Item[];
  isPreview: boolean;
  toggleIsPreview: () => void;
}

const Header = ({ items, isPreview, toggleIsPreview }: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
            <ListItem
              endEnhancer={() => (
                <Checkbox
                  checked={isPreview}
                  checkmarkType={STYLE_TYPE.toggle_round}
                  onChange={toggleIsPreview}
                />
              )}
            >
              <ListItemLabel>
                Переглянути
              </ListItemLabel>
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

              </StyledNavigationItem>

              <StyledNavigationItem>
                <Checkbox
                  checked={isPreview}
                  checkmarkType={STYLE_TYPE.toggle_round}
                  onChange={toggleIsPreview}
                  labelPlacement={LABEL_PLACEMENT.right}
                >
                  Переглянути
                </Checkbox>
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