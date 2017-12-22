class Text extends Screen {
  constructor(element) {
    super(element);
    
    this.els = ['options', 'sidebar', 'textFields', 'printout'];
    this.init();
    
    this.keys['Enter'] = this.nextField.bind(this);
    
    this.fields = [];
    this.value.text = [];
    this.focusedElement = 0;
    
    this.graphicsDir = 'graphics';
  }
  
  enter(value={}) {
    let printoutValue = Object.assign({}, value);
    delete printoutValue.text;
    let printout = new Printout(printoutValue);
    this.printout.replaceWith(printout.element);
    
    this.initTextFields();
    
    return super.enter();
  }
  
  initTextFields() {
    let e = document.createElement('textFields');
    for (let i=0; i < 9; i++) {
      this.fields[i] = this.textField(i);
      e.appendChild(this.fields[i]);
    }

    this.textFields.replaceWith(e);
  }
  
  textField(i) {
    let value = this.value.text[i] = this.value.text[i] || '';
    
    let e = document.createElement('div');
    let input = document.createElement('input');
    e.appendChild(input);
    
    input.value = value;
    input.addEventListener('input', (evt) =>
      this.value.text[i] = evt.target.value);
    
    input.addEventListener('focus', (evt) =>
      this.focusedElement = i);
    
    return e;
  }
  
  nextField() {
    console.log('nextField', this.focusedElement);
    this.focusedElement = (this.focusedElement + 1) % this.fields.length;
    let input = this.fields[this.focusedElement].getElementsByTagName('input').item(0);
    console.log('eeeeeeee', input)
    input.focus();
  }
}