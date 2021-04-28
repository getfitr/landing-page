import React, { useState } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import Logo from '../ui/Logo';
import MenuItem from '../ui/MenuItem';
import { CloseIcon, MenuIcon } from '../ui/Icons';

const hoverMenuItem = {
  color: ["highlight.300", "highlight.300", "primary.300", "primary.300"],
};

const Header = (props) => {
  const [show, setShow] = useState(false);
  const toggleMenu = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["primary.300", "primary.300", "transparent", "transparent"]}
      color={["secondary.200", "secondary.200", "primary.700", "primary.700"]}
      {...props}
    >
      <Flex align="center">
        <Logo
          w="100%"
          color={["highlight.200", "highlight.200", "highlight.800", "highlight.800"]}
        />
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={toggleMenu} className="menu-toggler">
        {show ? <CloseIcon /> : <MenuIcon />}
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
        className="menu-wrapper"
      >
        <Flex
          align={["center", "center", "center", "center"]}
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItem to="/" _hover={hoverMenuItem} linkClassName="home">
            GetFitr! App
          </MenuItem>
          <MenuItem to="/project" _hover={hoverMenuItem} linkClassName="project">
            GetFitr! Project
          </MenuItem>
          <MenuItem to="/signup" isLast linkClassName="signup">
            <Button
              className="signup-button"
              size="sm"
              rounded="md"
              color={["primary.700", "primary.700", "secondary.200", "secondary.200"]}
              bg={["secondary.100", "secondary.100", "primary.700", "primary.700"]}
              _hover={{
                color: ["secondary.200", "secondary.200", "primary.600", "primary.600"],
                bg: ["primary.600", "primary.600", "secondary.300", "secondary.300"],
              }}
            >
              Sign Up for GetFitr!
            </Button>
          </MenuItem>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Header;
