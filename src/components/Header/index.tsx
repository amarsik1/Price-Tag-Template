import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem
} from "baseui/header-navigation";
import classNames from "classnames";
import {
  Checkbox,
  STYLE_TYPE,
  LABEL_PLACEMENT
} from "baseui/checkbox";

import { MobileHeader } from "baseui/mobile-header";
import { Menu } from 'baseui/icon';

import Document from "../Document";
import { Item } from "../../interfaces";

import './styles.css';
import { Drawer } from "baseui/drawer";
import { useState } from "react";
import { ListItem, ListItemLabel } from "baseui/list";

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
                <PDFDownloadLink
                  className={classNames("downloadBtn", { disabled: !items.length })}
                  document={<Document items={items} />}>
                  {({ loading }) =>
                    loading ? "Файл завантажується" : "Завантажити файл"
                  }
                </PDFDownloadLink>
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
            <PDFDownloadLink
              className={classNames("downloadBtn", { disabled: !items.length })}
              document={<Document items={items} />}>
              {({ loading }) =>
                loading ? "Файл завантажується" : "Завантажити файл"
              }
            </PDFDownloadLink>
          </StyledNavigationItem>
        </StyledNavigationList>
      </HeaderNavigation>
    </header>
  )
};

export default Header;