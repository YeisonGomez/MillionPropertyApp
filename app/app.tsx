import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react';
import { ConfigProvider } from 'antd';
import { ErrorBoundary } from './ErrorBoundary';
import { Home, PropertyDetail } from './pages';
import { apolloClient } from '~/shared/apollo/client';
import { antdTheme } from '~/shared/config/theme';
import { env } from '~/shared/config/env';
import './styles/globals.scss';

export default function App() {
  useEffect(() => {
    // Add structured data (JSON-LD) for the organization
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: 'Million Property',
      description: 'Plataforma de búsqueda de propiedades inmobiliarias',
      url: env.appUrl,
      logo: `${env.appUrl}/logo.png`,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'CO',
      },
      sameAs: [
        'https://facebook.com/millionproperty',
        'https://twitter.com/millionproperty',
        'https://instagram.com/millionproperty',
      ],
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

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
