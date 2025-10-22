export const env = {
  graphqlApiUrl: import.meta.env.VITE_GRAPHQL_API_URL || 'http://localhost:5189/graphql',
  
  appName: import.meta.env.VITE_APP_NAME || 'Million Property App',
  appEnv: import.meta.env.VITE_APP_ENV || 'development',
  
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
} as const;

