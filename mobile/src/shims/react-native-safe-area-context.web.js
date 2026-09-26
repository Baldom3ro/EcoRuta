import React from 'react';
import {View} from 'react-native';

export const SafeAreaInsetsContext = React.createContext({top: 0, right: 0, bottom: 0, left: 0});
export const SafeAreaProvider = ({children}) => children;
export const SafeAreaView = View;
export const SafeAreaConsumer = ({children}) => children({top: 0, right: 0, bottom: 0, left: 0});
export const useSafeAreaInsets = () => ({top: 0, right: 0, bottom: 0, left: 0});
export const useSafeAreaFrame = () => ({x: 0, y: 0, width: 375, height: 812});
export const initialWindowMetrics = {
  insets: {top: 0, right: 0, bottom: 0, left: 0},
  frame: {x: 0, y: 0, width: 375, height: 812},
};
export default {
  SafeAreaInsetsContext,
  SafeAreaProvider,
  SafeAreaView,
  SafeAreaConsumer,
  useSafeAreaInsets,
  useSafeAreaFrame,
  initialWindowMetrics,
};
