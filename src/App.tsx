import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, LightTheme } from 'baseui';
import { Routes, Route } from 'react-router-dom';

import Layout from 'components/Layout';
import { appDataContext, useProvideAppData } from 'context';

import HomePage from 'pages/HomePage';
import PDFPreviewPage from 'pages/PDFPreviewPage';
import NotFoundPage from 'pages/NotFoundPage';
import SettingsPage from 'pages/SettingsPage';

const engine = new Styletron();

const App = () => {
  const value = useProvideAppData();
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme} overrides={{ AppContainer: { style: { height: '100%' } } }}>
        <appDataContext.Provider value={value}>

          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />

              <Route path='/preview' element={<PDFPreviewPage />} />
              <Route path='/settings' element={<SettingsPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>

        </appDataContext.Provider>
      </BaseProvider>
    </StyletronProvider >
  );
};

export default App;