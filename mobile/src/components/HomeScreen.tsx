import { View, Text } from 'react-native'
import { HomeScreenButton } from "./index";
import { getFormattedDate } from '../utils/date';
import React from 'react'

const HomeScreen = () => {

    const date = getFormattedDate();

    return (
        <View className="h-[80%]" >

            <Text className='text-white pt-[16%] text-center'
                style={{ fontFamily: 'MomoSignature', fontSize: 36 }}
            >
                Lun’ri
            </Text>

            <Text className="text-white text-center leading-6"
                style={{ fontFamily: 'CalSans', fontSize: 16 }}
            >
                {date}
            </Text>

            <Text className="text-white text-center mt-auto"
                style={{ fontFamily: 'CalSans', fontSize: 36 }}
            >
                Shared Moments
            </Text>

            <Text className="text-[#646464] text-center pl-8 pr-8"
                style={{ fontFamily: 'CalSans', fontSize: 12 }}
            >
                Cherish meaningful moments in a safe and welcoming space with the people you love.
            </Text>

            <HomeScreenButton />

        </View>
    )
}

export default HomeScreen