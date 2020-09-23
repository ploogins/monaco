const { React, getModule } = require('powercord/webpack');
const { pushLayer, popLayer } = getModule([ 'pushLayer' ], false);
const SettingsLayer = require('./Settings');
module.exports = class Settings extends React.Component {
  render () {
    popLayer();
    setTimeout(() => {
      pushLayer(SettingsLayer);
    }, 100);
    return (
      <>
      </>
    );
  }
};

