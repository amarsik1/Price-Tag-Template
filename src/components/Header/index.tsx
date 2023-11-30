import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "baseui/button";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem
} from "baseui/header-navigation";
import { StyledLink } from "baseui/link";
import Document from "../Document";
import {
  Checkbox,
  STYLE_TYPE,
  LABEL_PLACEMENT
} from "baseui/checkbox";
import { Item } from "../../interfaces";
import classNames from "classnames";

interface Props {
  items: Item[];
  isPreview: boolean;
  toggleIsPreview: () => void;
}

const Header = ({ items, isPreview, toggleIsPreview }: Props) => {
  return (
    <div style={{ padding: '0 10px' }}>
      <HeaderNavigation>
        <StyledNavigationList $align={ALIGN.left}>
          <StyledNavigationItem>Uber</StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.center} />

        {Boolean(items.length) && (
          <>
            <StyledNavigationList $align={ALIGN.right}>
              <StyledNavigationItem>
                Додано: {items.length}
              </StyledNavigationItem>
            </StyledNavigationList>

            <StyledNavigationList $align={ALIGN.right}>
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
            </StyledNavigationList>
          </>
        )}

        <StyledNavigationList $align={ALIGN.right}>
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
    </div>
  )
};

export default Header;