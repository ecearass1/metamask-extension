import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import {
  BlockSize,
  BorderColor,
  Display,
  FlexDirection,
  FontWeight,
  JustifyContent,
  Size,
  TextColor,
  TextVariant,
  TextAlign,
} from '../../../helpers/constants/design-system';
import {
  AvatarNetwork,
  AvatarToken,
  BadgeWrapper,
  Text,
  Box,
} from '../../component-library';
import { getCurrentChainId, getNativeCurrencyImage } from '../../../selectors';
import Tooltip from '../../ui/tooltip';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { MetaMetricsContext } from '../../../contexts/metametrics';
import {
  MetaMetricsEventCategory,
  MetaMetricsEventName,
} from '../../../../shared/constants/metametrics';
import { LINEA_GOERLI_TOKEN_IMAGE_URL } from '../../../../shared/constants/network';

export const TokenListItem = ({
  className,
  onClick,
  tokenSymbol,
  tokenImage,
  primary,
  secondary,
  title,
}) => {
  const t = useI18nContext();
  const primaryTokenImage = useSelector(getNativeCurrencyImage);
  const trackEvent = useContext(MetaMetricsContext);
  const chainId = useSelector(getCurrentChainId);
  const badgeWrapperImage =
    title === 'LineaETH' ? LINEA_GOERLI_TOKEN_IMAGE_URL : primaryTokenImage;
  const badgeTokenImage =
    title === 'LineaETH' ? LINEA_GOERLI_TOKEN_IMAGE_URL : tokenImage;

  return (
    <Box
      className={classnames('multichain-token-list-item', className)}
      display={Display.Flex}
      flexDirection={FlexDirection.Column}
      gap={4}
      data-testid="multichain-token-list-item"
    >
      <Box
        className="multichain-token-list-item__container-cell"
        display={Display.Flex}
        flexDirection={FlexDirection.Row}
        padding={4}
        as="a"
        data-testid="multichain-token-list-button"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onClick();
          trackEvent({
            category: MetaMetricsEventCategory.Tokens,
            event: MetaMetricsEventName.TokenDetailsOpened,
            properties: {
              location: 'Home',
              chain_id: chainId,
              token_symbol: tokenSymbol,
            },
          });
        }}
      >
        <BadgeWrapper
          badge={
            <AvatarNetwork
              size={Size.XS}
              name={tokenSymbol}
              src={badgeWrapperImage}
              borderColor={
                badgeWrapperImage
                  ? BorderColor.borderMuted
                  : BorderColor.borderDefault
              }
            />
          }
          marginRight={3}
        >
          <AvatarToken
            name={tokenSymbol}
            src={badgeTokenImage}
            showHalo
            borderColor={
              badgeTokenImage
                ? BorderColor.transparent
                : BorderColor.borderDefault
            }
          />
        </BadgeWrapper>
        <Box
          className="multichain-token-list-item__container-cell--text-container"
          display={Display.Flex}
          flexDirection={FlexDirection.Column}
          width={BlockSize.Full}
          style={{ flexGrow: 1, overflow: 'hidden' }}
        >
          <Box
            display={Display.Flex}
            justifyContent={JustifyContent.spaceBetween}
            gap={1}
          >
            <Box width={BlockSize.OneThird}>
              <Tooltip
                position="bottom"
                interactive
                html={title}
                disabled={title?.length < 12}
                tooltipInnerClassName="multichain-token-list-item__tooltip"
              >
                <Text
                  fontWeight={FontWeight.Medium}
                  variant={TextVariant.bodyMd}
                  ellipsis
                >
                  {title === 'ETH' ? t('networkNameEthereum') : title}
                </Text>
              </Tooltip>
            </Box>
            <Text
              fontWeight={FontWeight.Medium}
              variant={TextVariant.bodyMd}
              width={BlockSize.TwoThirds}
              textAlign={TextAlign.End}
            >
              {secondary}
            </Text>
          </Box>
          <Text
            color={TextColor.textAlternative}
            data-testid="multichain-token-list-item-value"
          >
            {primary} {tokenSymbol}{' '}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

TokenListItem.propTypes = {
  /**
   * An additional className to apply to the TokenList.
   */
  className: PropTypes.string,
  /**
   * The onClick handler to be passed to the TokenListItem component
   */
  onClick: PropTypes.func,
  /**
   * tokenSymbol represents the symbol of the Token
   */
  tokenSymbol: PropTypes.string,
  /**
   * title represents the name of the token and if name is not available then Symbol
   */
  title: PropTypes.string,
  /**
   * tokenImage represnts the image of the token icon
   */
  tokenImage: PropTypes.string,
  /**
   * primary represents the balance
   */
  primary: PropTypes.string,
  /**
   * secondary represents the balance in dollars
   */
  secondary: PropTypes.string,
};
