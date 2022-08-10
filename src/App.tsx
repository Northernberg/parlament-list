import axios from "axios";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import { Providers } from "./providers/Providers";
import MainView from "./views/MainView";

axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

const App = () => {
  return (
    <Providers>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<MainView />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Providers>
  );
};

export default App;
