const { React } = require('powercord/webpack');
const cs = require('../stuf');
const { getModule } = require('powercord/webpack');
const { SwitchItem } = require('powercord/components/settings');
const { Spinner } = require('powercord/components');
module.exports = class Settings extends React.Component {
  constructor (props) {
    super(props);
    /*
     * this.state = {
     *   isEditorReady: false
     * };
     * this.valueGetter = React.createRef();
     * this.editor = React.createRef();
     * this.handleEditorDidMount = this.handleEditorDidMount.bind(this);
     * this._handleMonacoUpdate = global._.debounce(this._handleMonacoUpdate.bind(this), 1000);
     */
    this.state = {
      loading: true
    };
  }

  /*
   * onClose () {
   *   getModule([ 'popLayer' ], false).popLayer();
   * }
   */

  /*
   * handleEditorDidMount (_valueGetter, _editor) {
   *   this.state.isEditorReady = true;
   *   this.valueGetter.current = _valueGetter;
   *   this.editor = _editor;
   *   this.editor.onDidChangeModelContent(ev => {
   *     this._handleMonacoUpdate(ev, this.valueGetter.current());
   *   });
   * }
   */

  /*
   * _handleMonacoUpdate (ev, value) {
   *   powercord.pluginManager.get('pc-moduleManager')._saveQuickCSS(value);
   * }
   */

  async componentWillMount () {
    cs.start();
    setTimeout(() => {
      this.setState({ loading: false });
      cs.open(powercord.pluginManager.get('pc-moduleManager')._quickCSSFile);
    }, 1000);
    if (this.props.getSetting('collapseSidebar', false)) {
      document.querySelector('.standardSidebarView-3F1I7i').classList.add('monaco');
    }
  }

  async componentWillUnmount () {
    cs.stop();
    document.querySelector('.standardSidebarView-3F1I7i').classList.remove('monaco');
  }

  render () {
    const { getSetting, toggleSetting } = this.props;
    return (
      <>
        <div className="quickcss-monaco-container">
          {/* <Editor
            height="90vh"
            width="100%"
            className="quickcss-monaco"
            language="css"
            value={powercord.pluginManager.get('pc-moduleManager')._quickCSS}
            editorDidMount={this.handleEditorDidMount}
            theme="vs-dark"
            loading={<Spinner/>}
          /> */}
          {this.state.loading
            ? <Spinner/>
            : <iframe src='http://localhost:3512'
              style = {{
                height: '90vh',
                width: '100%'
              }}
            />
          }
          <SwitchItem style = {{ paddingTop: '50px' }}note='Wether to collapse the settings sidebar. Useful for small screens.'
            value={getSetting('collapseSidebar', false)}
            onChange={() => toggleSetting('collapseSidebar')}
          >Collapse Sidebar</SwitchItem>
        </div>
      </>
    );
  }
};

