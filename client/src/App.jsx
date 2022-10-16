import "./assets/styles/index.css";
import { ChakraProvider } from "@chakra-ui/react";
import Homepage from "./components/home/Homepage";
import theme from "./assets/styles/theme";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import StateContainer from "./components/state/StateContainer";
import { AlertServiceProvider } from "./services/alertservice";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AlertServiceProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/map">
              <Route path=":state" element={<StateContainer />} />
            </Route>
          </Routes>
        </AlertServiceProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
