
const { Plugin } = require('powercord/entities');
const Settings = require('./components/SettingsLoader');

module.exports = class Monaco extends Plugin {
  async startPlugin () {
    console.log('starting');

    this.loadStylesheet('style.scss');
    powercord.api.settings.registerSettings('quickcss-monaco', {
      category: this.entityID,
      label: 'QuickCSS',
      render: Settings
    });
  }

  pluginWillUnload () {
    powercord.api.settings.unregisterSettings('quickcss-monaco');
  }
};
