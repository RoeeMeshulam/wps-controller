import React from 'react';

import ToolsScreen from './components/ToolsScreen';

import {
  setQueryHistory,
  getQueryHistory
} from "./common/utils/queryHistoryStorage";

class WpsController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ToolsScreen
        addLayer={this.props.addLayer}
        setQueryHistory={setQueryHistory}
        getQueryHistory={getQueryHistory}
        zoomToLayer={this.props.zoomToLayer}
        getLayers={this.props.getLayers}
        complexAsReference/>
    );
  }
}
export default WpsController;