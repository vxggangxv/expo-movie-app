// import config from './config.json';
import Constants from 'expo-constants';

const ENV = {
  dev: {
    apiUrl: '127.0.0.1',
    OPENWEATHER_API_KEY: '891888a8e479bc269049ea506bf66897',
  },
  staging: {
    apiUrl: '[your.staging.api.here]',
    OPENWEATHER_API_KEY: '891888a8e479bc269049ea506bf66897',
  },
  prod: {
    apiUrl: '[your.production.api.here]',
    OPENWEATHER_API_KEY: '891888a8e479bc269049ea506bf66897',
    // Add other keys you want here
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  } else if (env === 'staging') {
    return ENV.staging;
  } else if (env === 'prod') {
    return ENV.prod;
  }
};

export default getEnvVars;
