class Preview extends Screen {
  constructor(element) {
    super(element);
    
    this.els = ['printout'];
    this.init();
  }
  
  enter(value) {
    let printout = new Printout(value);
    this.printout.replaceWith(printout.element);
    super.enter();
  }
}