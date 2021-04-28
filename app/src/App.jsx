import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import getfitrTheme from "./utils/getfitr-theme";

const App = () => (
  <ChakraProvider theme={getfitrTheme}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/"><Landing /></Route>
      </Switch>
    </BrowserRouter>
  </ChakraProvider>
);

export default App;
