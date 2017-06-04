class Poster extends Screen {
  constructor(element) {
    super(element);
    
    this.els = ['menu', 'sidebar', 'page', 'menuGraphic'];
    this.init();
  }
}
