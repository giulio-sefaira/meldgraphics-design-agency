module app.meldgraphics {
  
  interface meldgraphicsModel {
    showNav: boolean;
    scrollTopValue: number;
    scrollDurationValue: number;
    scrollOffset: number;
    activeSectionClass: string;
    toggleNav(): void;
    scrollTop(duration: string): void;
    scrollToSection(elementSelector: string): void
  }
  
  interface meldgraphicsDocument extends ng.IDocument {
    
  }

  export class meldgraphicsCtrl implements meldgraphicsModel {

      static $inject = ['$document'];
      constructor(
        private $document: ng.IDocumentService,
        public showNav: boolean = false,
        public scrollTopValue: number = 0,
        public scrollDurationValue: number = 2000,
        public scrollOffset: number = 70,
        public activeSectionClass: string = '.about-us') {
      }

      toggleNav(): void {
          this.showNav = !this.showNav;
      }
      
      scrollTop(duration: string = this.scrollDurationValue): void {
        this.$document.scrollTop(this.scrollTopValue, duration);
      }
      
      scrollToSection(elementSelector: string): void {
        var scrollOffset = this.$document[0].querySelector('.nav').offsetHeight - 10;
        var targetElement = this.$document[0].querySelector(elementSelector);
        this.$document.scrollToElement(targetElement, scrollOffset, this.scrollDurationValue / 2);
        this.activeSectionClass = elementSelector;
      }
  }

  angular
      .module('meldgraphics')
      .controller('meldgraphicsCtrl',
                   meldgraphicsCtrl);
}