import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigation from './src/navigation/RootNavigation';
import 'babel-plugin-tailwind-rn/dist/useTailwind';
import { Provider } from 'react-redux';
import store from './src/store';
import { Text } from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigation />
          <Text> gdgsdgsdgsd</Text>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
