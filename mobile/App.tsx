import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from './components/index';
import './global.css';

export default function App() {
  return (
    <SafeAreaProvider>
      <View className="flex-1 items-center justify-center bg-[#151515]">
        <StatusBar style="light" backgroundColor="black" />
        <HomeScreen />
      </View>
    </SafeAreaProvider>
  );
}