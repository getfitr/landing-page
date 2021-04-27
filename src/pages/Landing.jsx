import React from 'react';
import { Link as UiLink, Text } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import LandingLayout from '../components/layouts/LandingLayout';
import Hero from '../components/sections/Hero';

const unsplashJoshGordon = "https://unsplash.com/@joshgordon?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText";
const unsplash = "https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText";

const Landing = () => (
  <LandingLayout>
    <Hero
      title="Get fitter with the GetFitr! app"
      subtitle="Use the GetFitr! app to plan your workouts, run them, and analyze your successes."
      image="/img/josh-gordon-fzHmP6z8OQ4-unsplash.jpg"
      imageCredit={
        <>
          Photo by <UiLink href={unsplashJoshGordon}>Josh Gordon</UiLink> on <UiLink href={unsplash}>Unsplash</UiLink>
        </>
      }
      ctaText="Start and GetFitr!"
      ctaLink="/signup"
      ctaRemark="The GetFitr! service is free of charge."
    >
      In addition, GetFitr! is a community-driven development project. You can participate and contribute to it.
      <Text _hover={{ color: ["highlight.900", "highlight.900", "highlight.900", "highlight.900"] }}>
        <Link to="/project">
          Learn more about the project.
        </Link>
      </Text>
    </Hero>
  </LandingLayout>
);

export default Landing;
