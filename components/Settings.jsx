const { React } = require('powercord/webpack');
const Editor = require('../node_modules/@monaco-editor/react').default;
const { getModuleByDisplayName, getModule } = require('powercord/webpack');
const Close = getModuleByDisplayName('CloseIconWithKeybind', false);
module.exports = class Settings extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isEditorReady: false
    };
    this.valueGetter = React.createRef();
    this.editor = React.createRef();
    this.handleEditorDidMount = this.handleEditorDidMount.bind(this);
    this._handleMonacoUpdate = global._.debounce(this._handleMonacoUpdate.bind(this), 1000);
  }

  onClose () {
    getModule([ 'popLayer' ], false).popLayer();
  }

  handleEditorDidMount (_valueGetter, _editor) {
    this.state.isEditorReady = true;
    this.valueGetter.current = _valueGetter;
    this.editor = _editor;
    this.editor.onDidChangeModelContent(ev => {
      this._handleMonacoUpdate(ev, this.valueGetter.current());
    });
  }

  _handleMonacoUpdate (ev, value) {
    powercord.pluginManager.get('pc-moduleManager')._saveQuickCSS(value);
  }

  render () {
    return (
      <>
        <div className="quickcss-monaco-container">
          <Editor
            height="100vh"
            width="100%"
            className="quickcss-monaco"
            language="css"
            value={powercord.pluginManager.get('pc-moduleManager')._quickCSS}
            editorDidMount={this.handleEditorDidMount}
            theme="vs-dark"
          />
        </div>
        <div className='quickcss-monaco-close'>
          <Close
            closeAction={this.onClose}
          />
        </div>
      </>
    );
  }
};

