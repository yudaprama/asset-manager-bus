import { Navigation } from 'react-native-navigation';

import Main from './Main';
import SideMenu from './SideMenu';
import AssetEdit from './AssetEdit';
import DetailAssets from './DetailAssets';
import DetailGroups from './DetailGroups';
import DetailDefinition from './DetailDefinition';
import Definition from './Definition';
import InApp from './InApp';
import Buy from './Buy';
import BrowseIcon from './BrowseIcon';

export function registerScreens() {
  Navigation.registerComponent('example.DetailAssets', ()=> DetailAssets);
  Navigation.registerComponent('example.Main', ()=> Main);
  Navigation.registerComponent('example.SideMenu', ()=> SideMenu);
  Navigation.registerComponent('example.DetailGroups', ()=> DetailGroups);
  Navigation.registerComponent('example.DetailDefinition', ()=> DetailDefinition);
  Navigation.registerComponent('example.AssetEdit', ()=> AssetEdit);
  Navigation.registerComponent('example.Definition', ()=> Definition);
  Navigation.registerComponent('example.InApp', ()=> InApp);
  Navigation.registerComponent('example.Buy', ()=> Buy);
  Navigation.registerComponent('example.BrowseIcon', ()=> BrowseIcon);
}
