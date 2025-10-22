import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react';
import { ConfigProvider } from 'antd';
import { ErrorBoundary } from './ErrorBoundary';
import { Home, PropertyDetail } from './pages';
import { apolloClient } from '~/shared/apollo/client';
import { antdTheme } from '~/shared/config/theme';
import './styles/globals.scss';

export default function App() {
  return (
    <ErrorBoundary>
      <ApolloProvider client={apolloClient}>
        <ConfigProvider theme={antdTheme}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
            </Routes>
          </Router>
        </ConfigProvider>
      </ApolloProvider>
    </ErrorBoundary>
  );
}
