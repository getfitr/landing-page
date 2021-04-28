import React from 'react';
import { Box, Divider, Flex, Link } from "@chakra-ui/layout";
import MenuItem from "../ui/MenuItem";

const hoverMenuItem = {
  color: ["gray.400", "gray.400", "gray.400", "gray.400"],
};

const Footer = (props) => (
  <Flex
    align="center"
    w="100%"
    wrap="wrap"
    mb={8}
    p={8}
    {...props}
  >
    <Divider />
    <Flex
      align="center"
      w="100%"
      justify={["center", "center", "space-between", "space-between"]}
      direction={["column", "column", "row", "row"]}
      wrap="nowrap"
      mt={2}
      color="gray.300"
      fontSize="0.9em"
    >
      <Box className="copyright">
        &copy; 2021 Carsten Koch – Chakra UI template from
        <Link href="https://raptis.wtf/blog/build-a-landing-page-with-chakra-ui-part-1/" target="_blank"> Jim Raptis</Link>.
      </Box>
      <Box flexBasis={{ base: "100%", md: "auto" }} className="menu-wrapper">
        <Flex
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItem to="/about" _hover={hoverMenuItem} linkClassName="about">About Us</MenuItem>
          <MenuItem to="/privacy" _hover={hoverMenuItem} linkClassName="privacy">Privacy</MenuItem>
          <MenuItem to="/impress" _hover={hoverMenuItem} isLast linkClassName="impress">Impress</MenuItem>
        </Flex>
      </Box>
    </Flex>
  </Flex>
);

export default Footer;
