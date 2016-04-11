'use strict';
var GulpConfig = (function () {
  function gulpConfig() {
    
    this.source = './src/';
    this.sourceApp = './app/';

    this.tsOutputPath = this.sourceApp + 'js';
    this.scssOutputPath = this.sourceApp + 'css';
    this.imageOutputPath = this.sourceApp + 'img';
      
    this.scss = this.source + 'sass/**/*.scss';
    this.typescript = this.source + 'typescript/**/*.ts';
    this.html = this.source + 'html/**/*.html';
    this.images = this.source + 'images/**/*';

    this.typings = './typings/';
    this.libraryTypeScriptDefinitions = './typings/**/*.ts';
  }
  return gulpConfig;
})();
module.exports = GulpConfig;