class Screen {
  constructor(element) {
    this.element = element;
    
    ['menu', 'sidebar', 'figure', 'menuGraphic'].forEach((_) => this._link(_));
    this.initMenu();
  }
  
  _link(name) {
    this[name] = this.element.getElementsByTagName(name)[0];
    if (this[name]) return;
    this[name] = this.element.getElementsByClassName(name)[0];
  }
  
  initMenu() {
    let items = this.menu.getElementsByTagName('item').forEach((item) => this.initMenuItem(item));
  }
  
  initMenuItem(item) {
    item.name = item.innerText.toLowerCase();
    item.addEventListener('mouseover', () => {
      this.menuGraphic.src = `graphics/${item.name}.png`;
    });
    item.addEventListener('mouseout', () => {
      this.menuGraphic.removeAttribute('src');
    });
  }
}

/******/
NodeList.prototype.forEach = function(fn){
    var list = this;
    for(var i = 0; i < list.length; i++){
        fn.call(list[i], list[i], i, list);
    }
};

HTMLCollection.prototype.forEach = NodeList.prototype.forEach;
/******/

document.addEventListener("DOMContentLoaded", (event) => {
  let el = document.getElementsByTagName('screen')[0];
  if (!el) return;
  new Screen(el);
});
