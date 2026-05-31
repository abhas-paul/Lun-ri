import { View, Text, Pressable } from 'react-native'
import React from 'react'

const HomeScreenButton = () => {

    const handlePress = () => {
        console.log("Get Started pressed")
    }

    return (
        <View className="items-center pt-16">

            <Pressable
                onPress={handlePress}
                className="h-[64px] w-[78%] bg-white rounded-full items-center justify-center active:opacity-70"
            >

                <Text
                    className="text-black text-center"
                    style={{ fontFamily: 'CalSans', fontSize: 18 }}
                >
                    Get Started
                </Text>

            </Pressable>

        </View>
    )
}

export default HomeScreenButton