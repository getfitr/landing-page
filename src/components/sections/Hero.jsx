import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { Button } from '@chakra-ui/button';

const Hero = ({
  title,
  subtitle,
  image,
  ctaLink, 
  ctaText,
  ctaRemark,
  children,
  imageCredit,
  ...rest
}) => (
  <Flex
    align="center"
    justify={{ base: "center", md: "space-around", xl: "space-between" }}
    direction= {{ base: "column-reverse", md: "row" }}
    wrap="nowrap"
    minH="70vh"
    px={8}
    mb={16}
    {...rest}
  >    
    <Stack
      spacing={4}
      w={{ base: "80%", md: "40%" }}
      align={["center", "center", "flex-start", "flex-start"]}
    >
      <Heading
        as="h1"
        size="xl"
        fontWeight="bold"
        color="highlight.800"
        textAlign={["center", "center", "left", "left"]}
      >
        {title}
      </Heading>
      <Heading
        as="h2"
        size="md"
        color="primary.700"
        opacity="0.8"
        fontWeight="normal"
        lineHeight={1.5}
        textAlign={["center", "center", "left", "left"]}
      >
        {subtitle}
      </Heading>
      <Box color="primary.700" lineHeight={1.5} opacity="0.8">{children}</Box>
      <Link to={ctaLink}>
        <Button
          size="md"
          borderRadius="8px"
          rounded="md"
          color="secondary.200"
          bg="primary.700"
          _hover={{ color: "primary.600", bg: "secondary.300" }}
          py="4"
          px="4"
          lineHeight="1"
        >
          {ctaText}
        </Button>
      </Link>
      <Text
        fontSize="xs"
        mt={2}
        textAlign="center"
        color="primary.800"
        opacity="0.6"
      >
        {ctaRemark}
      </Text>
    </Stack>
    <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }} >
      <Image src={image} size="100%" rounded="1rem" shadow="2xl" />
      <Text fontSize="xs" mt="-2.2em" ml="1em" color="whiteAlpha.700">{imageCredit}</Text>
    </Box>
  </Flex>
);

Hero.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  image: PropTypes.string,
  ctaText: PropTypes.string,
  ctaLink: PropTypes.string,
  ctaRemark: PropTypes.string,
  imageCredit: PropTypes.node,
}

Hero.defaultProps = {
  title: "React landing page with Chakra UI",
  subtitle: "This is the subheader section where you describe the basic benefits of your product",
  image: "https://source.unsplash.com/collection/404339/800x600",
  ctaText: "Create your account now",
  ctaLink: "/signup",
  ctaRemark: "No credit card required.",
  imageCredit: <></>,
}

export default Hero;
