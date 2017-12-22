const screens = {};

class Screen {
  constructor(element) {
    this.value = {};
    this.name = this.value.name = Object.getPrototypeOf(this).constructor.name.toLowerCase();
    this.element = element;
    this.els = [];
    this.initKeys();
  }
  
  init() {
    this.graphicsDir = 'screens/graphics';

    this.els.forEach((_) => this._link(_));
    
    if (this.menu) this.initMenu();
    if (this.prompt) this.initPrompt();
        
    if (this.element.attributes['default']) {
      this.enter();
    } else {
      this.exit();
    };
  }

  _link(name) {
    this[name] = this.element.getElementsByTagName(name)[0];
    if (this[name]) return;
    this[name] = this.element.getElementsByClassName(name)[0];
  }
  
  get active() {
    return this.style.display !== 'none';
  }
  
  enter(value={}) {
    console.log('enter', this, value, this.value)
    this.reEnter(value);
    return new Promise((resolve) => this.resolve = resolve);
  }
  
  reEnter(value={}) {
    console.log('reEnter', this, value, this.value)
    this.show();
    this.value = Object.assign({}, this.value, value);
    window.keyDownHandler = this.handleKeyDown;
  }
  
  exit() {
    console.log('exit', this, this.value)
    this.hide();
    this.resolve && this.resolve(this.value);
  }
  
  show() {
    console.log('show', this.constructor.name);
    this.style.display = null;
  }
  
  hide() {
    console.log('hide', this.constructor.name);
    this.style.display = 'none';
  }
  
  get style() {
    return this.element.style;
  }
  
  initPrompt() {
    this.prompt.getElementsByTagName('target').forEach((target) => this.initPromptTarget(target));
  }
  
  initPromptTarget(target) {
    this.keys[target.attributes.key.value] = () => this[target.attributes.action.value]();
  }
  
  initMenu() {
    this.menu.getElementsByTagName('item').forEach((item) => this.initMenuItem(item));
  }
  
  initMenuItem(item) {
    item.name = item.innerText;
    item.lcName = item.innerText.toLowerCase();
    item.addEventListener('click', () => this.onMenuItemSelect(item));
    item.addEventListener('mouseover', () => this.onMenuItemEnter(item));
    item.addEventListener('mouseout', () => this.onMenuItemExit(item));
  }
  
  async onMenuItemSelect(item) {
    let screen = screens[item.name];
    if (screen) {
      console.log('onMIS')
      this.hide();
      console.log('**** WILL AWAIT ENTER', screen.constructor.name, '(i am' , this.constructor.name, ')');
      let returnValue = await screen.enter(this.value);
      console.log('**** GOT RETVAL FROM', screen.constructor.name, '(i am' , this.constructor.name, ')');
      this.reEnter(returnValue);
    } else {
      this.exit();
    }
  }
  
  onMenuItemEnter(item) {
    this.menuGraphic.src = `${this.graphicsDir}/${item.lcName}.png`;
    this.value[this.name] = item.name;
  }
  
  onMenuItemExit(item) {
    this.menuGraphic.removeAttribute('src');
  }
  
  _handleKeyDown(evt) {
    let handled = this.onKeyPress(evt.key);
    if (handled) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  }
  
  initKeys() {
    this.handleKeyDown = this._handleKeyDown.bind(this);
    this.keys = {
      'Escape': () => { this.exit(); return true; }
    }
  }
  onKeyPress(key) {
    let fn = this.keys[key];
    if (fn) return fn(key);
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  const classes = {Main, Poster, Graphic, Text, Preview, Print};
  
  document.getElementsByTagName('screen').forEach((screen) => {
    console.log('init screen', screen)
    let name = screen.attributes['name'].value;
    let className = name[0].toUpperCase() + name.slice(1);
    console.log('className', className)
    let klass = classes[className];
    console.log('klass', klass)
    screens[name] = new klass(screen);
  });
  
  window.addEventListener('keydown', (evt) => {
    console.log('window keydown', evt.key)
    if (window.keyDownHandler) window.keyDownHandler(evt);
  });
});
