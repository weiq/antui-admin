import React, { Component, PropTypes } from 'react';
import objectAssign from 'object-assign';
import classNames from 'classnames';
import defaultConfig from './default.config';
import QuillMixin from './QuillMixin';
import 'quill/dist/quill.snow.css';

class Editor extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    readOnly: PropTypes.bool,
    quillConfig: PropTypes.object,
    onChange: PropTypes.func,
    onChangeSelection: PropTypes.func,
  }

  static defaultProps = {
    prefixCls: "fest-editor",
    quillConfig: {
      theme: 'snow'
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      generation: 0,
      value: this.isControlled(props)
        ? props.value
        : props.defaultValue
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    let quill = this.quill;
    if (!quill) return;

    if (this.isControlled(nextProps)) {
      if (nextProps.value !== this.getEditorContents()) {
        QuillMixin.setEditorContents(quill, nextProps.value);
      }
    }

    if ('readOnly' in nextProps) {
      if (nextProps.readOnly !== this.props.readOnly) {
        QuillMixin.setEditorReadOnly(quill, nextProps.readOnly);
      }
    }
  }

  isControlled(props) {
    return 'value' in props;
  }

  getEditorContents() {
    return this.state.value;
  }

  getEditorSelection() {
    return this.state.selection;
  }

  getEditingArea() {
    return this.refs["editor"].querySelector(`.${this.props.prefixCls}-container`);
  }

  getEditorConfig() {
    return objectAssign({}, defaultConfig(this.quill, this.refs["editor"]), this.props.quillConfig);
  }

  componentDidMount() {
    this.quill = QuillMixin.createEditor(
      this.getEditingArea(),
      this.getEditorConfig(),
      this
    );

    if (this.quillDelta) {
      this.quill.setContents(this.quillDelta);
      this.quill.setSelection(this.quillSelection);
      this.quill.focus();
      this.quillDelta = this.quillSelection = null;
      return;
    }
    if (this.state.value) {
      QuillMixin.setEditorContents(this.quill, this.state.value);
      return;
    }
  }

  componentWillUnmount() {
    QuillMixin.unhookEditor(this.quill);
    this.quill = null;
  }

  onEditorChangeText(value, delta, source, editor) {
    if (value !== this.getEditorContents()) {
      this.setState({ value: value });
      if (this.props.onChange) {
        this.props.onChange(value, delta, source, editor);
      }
    }
  }

  onEditorChangeSelection(range, source, editor) {
    let s = this.getEditorSelection() || {};
    let r = range || {};
    if (r.length !== s.length || r.index !== s.index) {
      this.setState({ selection: range });
      if (this.props.onChangeSelection) {
        this.props.onChangeSelection(range, source, editor);
      }
    }
  }

  focus() {
    this.quill.focus();
  }

  blur() {
    QuillMixin.setEditorSelection(this.quill, null);
  }

  render() {
    const {prefixCls, className} = this.props;
    let classes = classNames(prefixCls, className);

    return (
      <div ref="editor" className={classes}>
        <div className={`${prefixCls}-container`} />
      </div>
    );
  }
}

export default Editor;