import React from 'react';
import { Flex } from '@chakra-ui/react';
import Footer from '../sections/Footer';
import Header from '../sections/Header';

const LandingLayout = (props) => (
  <Flex
    direction="column"
    align="center"
    maxW={{ cl: "1200px" }}
    m="0 auto"
    {...props}
  >
    <Header />
    {props.children}
    <Footer />
  </Flex>
);

export default LandingLayout;
