import "./assets/styles/index.css";
import { ChakraProvider } from "@chakra-ui/react";
import Homepage from "./components/nav/Homepage";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Map from "./components/maps/Map";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/map">
            <Route path=":state" element={<Map />} />
          </Route>
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
