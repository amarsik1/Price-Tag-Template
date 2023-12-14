import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';

import HomePage from 'pages/HomePage';
import { appDataContext, useProvideAppData } from 'context';
import { Routes, Route } from 'react-router-dom';
import PDFPreviewPage from 'pages/PDFPreviewPage';
import LegacyItemsPage from 'pages/LegacyItemsPage';
import Layout from 'components/Layout';
import NotFoundPage from 'pages/NotFoundPage';

const engine = new Styletron();

const App = () => {
  const value = useProvideAppData();
  return (
    <StyletronProvider value={engine}>
      <appDataContext.Provider value={value}>

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />

            <Route path='/preview' element={<PDFPreviewPage />} />

          </Route>

          <Route path="/legacy-items" element={<LegacyItemsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

      </appDataContext.Provider>
    </StyletronProvider>
  );
};

export default App;