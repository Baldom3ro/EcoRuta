import {AppRegistry} from 'react-native';
import App from '../App';

AppRegistry.registerComponent('EcoRuta', () => App);

const rootTag = document.getElementById('root');
if (rootTag) {
  AppRegistry.runApplication('EcoRuta', {
    initialProps: {},
    rootTag,
  });
}
