import "./assets/styles/index.css";
import { ChakraProvider } from "@chakra-ui/react";
import Homepage from "./components/home/Homepage";
import theme from "./assets/styles/theme";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Map from "./components/maps/Map";
import StateSidebar from "./components/state/StateSidebar";
import StateContainer from "./components/state/StateContainer";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/map">
            <Route path=":state" element={<StateContainer />} />
          </Route>
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
