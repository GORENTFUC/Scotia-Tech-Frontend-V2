const config = {
    apiUrl: process.env.REACT_APP_API_URL,
    environment: process.env.REACT_APP_ENV,
    featureFlag: process.env.REACT_APP_FEATURE_FLAG === 'true'
  };
  
  export default config;