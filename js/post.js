module.exports = (function PostClosure () {
  'use strict';

  function Post ( date, name, content ) {
    this.date = date;
    this.name = name;
    this.content = content;
  }

  return Post;

})();
