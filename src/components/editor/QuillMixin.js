import Quill from 'quill';

export default {
  createEditor: function($el, config, clazz) {
    let quill = new Quill($el, config);
    this.hookEditor(quill, clazz);
    return quill;
  },

  hookEditor: function(quill, clazz) {
    let unprivilegedEditor = this.makeUnprivilegedEditor(quill);
    
    this.handleTextChange = function(delta, oldDelta, source) {
      if (clazz.onEditorChangeText) {
        clazz.onEditorChangeText(
          quill.root.innerHTML, delta, source, unprivilegedEditor
        );
        clazz.onEditorChangeSelection(
          quill.getSelection(), source, unprivilegedEditor
        );
      }
    };

    this.handleSelectionChange = function(range, oldRange, source) {
      if (clazz.onEditorChangeSelection) {
        clazz.onEditorChangeSelection(
          range, source, unprivilegedEditor
        );
      }
    };

    quill.on('text-change', this.handleTextChange);
    quill.on('selection-change', this.handleSelectionChange);
  },

  unhookEditor: function(quill) {
    quill.off('selection-change');
    quill.off('editor-change');
  },

  setEditorReadOnly: function(quill, value) {
    value ? quill.disable()
      : quill.enable();
  },

  setEditorContents: function(quill, value) {
    let sel = quill.getSelection();
    quill.clipboard.dangerouslyPasteHTML(value || '');
    if (sel) this.setEditorSelection(quill, sel);
  },

  setEditorSelection: function(quill, range) {
    if (range) {
      let length = quill.getLength();
      range.index = Math.max(0, Math.min(range.index, length - 1));
      range.length = Math.max(0, Math.min(range.length, (length - 1) - range.index));
    }
    quill.setSelection(range);
  },

  makeUnprivilegedEditor: function(quill) {
    let e = quill;
    return {
      getLength: function() { return e.getLength.apply(e, arguments); },
      getText: function() { return e.getText.apply(e, arguments); },
      getContents: function() { return e.getContents.apply(e, arguments); },
      getSelection: function() { return e.getSelection.apply(e, arguments); },
      getBounds: function() { return e.getBounds.apply(e, arguments); },
    };
  }
};