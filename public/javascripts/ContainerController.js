export class ContainerController {
    constructor() {
    	this.canvas=new fabric.Canvas('canvasContainer');
    	this.selectedToolId='move';//default
    	this.selectedColor='#000';
    }

    setTool(selectedToolId) {
    	this.selectedToolId=selectedToolId;
    }

    setColor(id){
    	var color=document.getElementById(id).value;
    	this.selectedColor=color;
    }

    createSquare(x,y) {
   		// create a rectangle object
    	let rect = new fabric.Rect({
    		left: x,
  			top: y,
  			fill: this.selectedColor,
  			width: 20,
  			height: 20
		});
    	// "add" rectangle onto canvas
		this.canvas.add(rect);
    }


    createCircle(x,y) {
   		// create a rectangle object
    	let circle = new fabric.Circle({
    		left: x,
  			top: y,
  			fill: this.selectedColor,
  			radius:20
		});
    	// "add" rectangle onto canvas
		this.canvas.add(circle);
    }

    createTriangle(x,y) {
   		// create a rectangle object
    	let triangle = new fabric.Triangle({
    		left: x,
  			top: y,
  			fill: this.selectedColor,
  			width:20,
  			height:20
		});
    	// "add" rectangle onto canvas
		this.canvas.add(triangle);
    }

    drawShape(x,y){

    	switch(this.selectedToolId) {
  			case 'square':
  			this.createSquare(x,y);
		    break;
  			case 'circle':
			this.createCircle(x,y);
			break  			
			case 'triangle':
			this.createTriangle(x,y);
		    break;
		} 
    }

    drawListener(event){
    	let rect = document.getElementById('canvasContainer').getBoundingClientRect(); 
        let x = event.clientX - rect.left; 
        let y = event.clientY - rect.top; 
  		this.drawShape(x, y);
  		console.log('('+x+' '+y+') -' + this.selectedToolId);
    }

}
