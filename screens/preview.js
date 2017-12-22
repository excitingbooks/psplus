class Preview extends Screen {
  constructor(element) {
    super(element);
    
    this.els = ['printout', 'prompt'];
    this.init();
  }
  
  enter(value) {
    let printout = new Printout(value);
    this.printout.replaceWith(printout.element);
    return super.enter();
  }
  
  print() {
    console.log('Preview.print!!!')
  }
  
  hidePrompt() {
    console.log('hidePrompt');
  }
}