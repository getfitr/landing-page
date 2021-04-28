import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { Text } from '@chakra-ui/layout';

const MenuItem = ({ children, isLast, linkClassName, to, ...rest }) => (
  <Text
    mb={{ base: isLast ? 0 : 8, sm: 0 }}
    mr={{ base: 0, sm: isLast ? 0 : 8 }}
    display="block"
    {...rest}
  >
    <Link to={to} className={linkClassName}>{children}</Link>
  </Text>
);

MenuItem.propTypes = {
  isLast: PropTypes.bool,
  to: PropTypes.string,
  linkClassName: PropTypes.string,
};

MenuItem.defaultProps = {
  children: <div>Default menu item</div>,
  isLast: false,
  linkClassName: '',
  to: "/",
};

export default MenuItem;
