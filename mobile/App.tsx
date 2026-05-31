import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Image, useWindowDimensions } from 'react-native';
import { HomeScreen } from './src/components/index';
import { useFonts } from 'expo-font';
import Welcome_Image from './src/assets/images/welcome-screen.png';
import './global.css';

export default function App() {

    const { width, height } = useWindowDimensions();

    const [loaded] = useFonts({
        MomoSignature: require('./src/assets/fonts/MomoSignature.ttf'),
        CalSans: require('./src/assets/fonts/CalSans.ttf'),
    });

    // app-level safe loading guard
    if (!loaded) return null;

    return (
        <SafeAreaProvider>

            {/* root container */}
            <View className="flex-1 bg-[#151515] items-center justify-center">

                {/* background layer */}
                <Image
                    source={Welcome_Image}
                    style={{
                        width,
                        height,
                        position: 'absolute',
                    }}
                    resizeMode="contain"
                />

                <StatusBar style="light" backgroundColor="#151515" />

                {/* screen layer */}
                <HomeScreen />

            </View>

        </SafeAreaProvider>
    );
}