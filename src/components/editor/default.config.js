import Delta from 'quill-delta';

export default (quill, container) => ({
  modules: {
    toolbar: {
      container: [
        [{'size': ['small', false, 'large', 'huge']}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
        {'indent': '-1'}, {'indent': '+1'}, { 'align': [] }],
        ['link', 'image', 'video']
      ],
      handlers: {
        video: function() {
          this.quill.theme.tooltip.edit('video');
        },
        image: function() {
          let fileInput = container.querySelector('input.ql-image[type=file]');
          if (fileInput == null) {
            fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            // fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon, image/svg+xml');
            fileInput.classList.add('ql-image');
            fileInput.addEventListener('change', () => {
              if (fileInput.files != null && fileInput.files[0] != null) {
                let reader = new FileReader();
                reader.onload = (e) => {
                  let range = this.quill.getSelection(true);
                  this.quill.updateContents(new Delta()
                    .retain(range.index)
                    .delete(range.length)
                    .insert({ image: e.target.result })
                  , 'user');
                  fileInput.value = "";
                };
                reader.readAsDataURL(fileInput.files[0]);
              }
            });
            container.appendChild(fileInput);
          }
          fileInput.click();
        }
      }
    }
  },
  formats: [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'align',
    'link', 'image', 'video'
  ]
});