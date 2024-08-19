// import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
// import { colors } from "./tokens";

// export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
//     headerLargeTitle: true,
//     headerLargeStyle: {
//         backgroundColor: colors.background
//     },
//     headerLargeTitleStyle: {
//         color: colors.text
//     },
//     headerTintColor: colors.text,
//     headerTransparent: true,
//     headerBlurEffect: 'prominent',
//     headerShadowVisible: false,
// }

import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { colors } from './tokens'

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
	headerLargeTitle: true,
	
	headerStyle: {
		backgroundColor: colors.background,
	},
	
	headerLargeTitleStyle: {
		color: colors.background,
		
	},
	headerTintColor: colors.primary,
	headerBackVisible: false,

	headerTransparent: false,
	headerBlurEffect: 'prominent',
	headerShadowVisible: true,


}
