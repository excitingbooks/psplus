class Printout {
  constructor(value) {
    console.log('printout', value)
    this.value = value;
    this.element = document.createElement('printout');
    
    this.element.appendChild(this.graphic(value.graphic));
    this.element.appendChild(this.text(value.text));
  }
  
  graphic(graphic) {
    console.log('graphic', graphic)
    let e = document.createElement('img');
    e.src = `graphics/${graphic}.png`;
    return e;
  }
  
  text(text) {
    console.log('text', text)
    let e = document.createElement('div');
    return e;
  }
}