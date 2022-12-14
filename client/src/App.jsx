import "./assets/styles/index.css";
import { ChakraProvider } from "@chakra-ui/react";
import Homepage from "./components/home/Homepage";
import theme from "./assets/styles/theme";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import StateContainer from "./components/state/StateContainer";
import StateOverview from "./components/state/StateOverview";
import UniqueDistrictPlan from "./components/state/UniqueDistrictPlan";
import GraphicalSummary from "./components/state/GraphicalSummary";
import { AlertServiceProvider } from "./services/alertservice";
import { MapContextProvider } from "./services/mapContext";
import BoxWhiskerPage from "./components/state/BoxWhiskerPage";
import LineChart from "./components/data display/LineChart";
import ElectionResults from "./components/state/ElectionResults";
import EvenAndUnevenComparison from "./components/state/EvenAndUnevenComparison";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AlertServiceProvider>
          <MapContextProvider>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/map/:state" element={<StateContainer />}>
                <Route index path="overview" element={<StateOverview />} />
                <Route path="unique" element={<UniqueDistrictPlan />}>
                  <Route path=":district" element={<UniqueDistrictPlan />} />
                </Route>
                <Route path="election-results" element={<ElectionResults />} />
                <Route
                  path="graphical-summary"
                  element={<GraphicalSummary />}
                />
                <Route path="box-whisker" element={<BoxWhiskerPage />} />
                <Route path="opp-rep" element={<LineChart />} />
                <Route
                  path="even-uneven"
                  element={<EvenAndUnevenComparison />}
                />
              </Route>
            </Routes>
          </MapContextProvider>
        </AlertServiceProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
