class Graphic extends Screen {
  constructor(element) {
    super(element);
    
    this.els = ['menu', 'sidebar', 'page', 'menuGraphic'];
    this.init();
    
    this.graphicsDir = 'graphics';
  }
  
  initMenu() {
    Manifests.graphics.forEach((item) => this.addGraphicToMenu(item));
    super.initMenu();
  }
  
  addGraphicToMenu(name) {
    let el = document.createElement('item');
    el.innerHTML = name;
    this.menu.appendChild(el);
  }
}
