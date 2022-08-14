import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import DetailedParliamentView from "./components/DetailedParliamentView";
import { Providers } from "./Providers";
import MainView from "./views/MainView";

const App = () => {
  return (
    <Providers>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<MainView />} />
            <Route path="/:partyKey" element={<DetailedParliamentView />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Providers>
  );
};

export default App;
