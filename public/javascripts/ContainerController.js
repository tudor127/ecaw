export class ContainerController {
    constructor() {
        this.canvas = new fabric.Canvas('canvasContainer');
        this.selectedToolId = 'move'; //default
        this.selectedColor = document.getElementById('color').value;
        this.selectedObject = null;
        this.currentlyCreatingPolygon = null;

        this.canvas.on('mouse:down', this.drawListener.bind(this));
    }

    setTool(event) {
        let selectedToolId = event.target.id;
        let possibleToolIds = ['move', 'polygon', 'square', 'circle', 'triangle'];

        if (!possibleToolIds.includes(selectedToolId)) {
            return;
        }

        document.getElementById(this.selectedToolId).classList.remove('selectedTool');

        if (this.selectedToolId === selectedToolId) {
            this.selectedToolId = 'move';
        } else {
            this.selectedToolId = selectedToolId;
            document.getElementById(this.selectedToolId).classList.add('selectedTool');
        }
    }

    setColor(id) {
		this.selectedColor = document.getElementById(id).value;
		if (this.selectedObject !== null) {
		    this.selectedObject.setColor(this.selectedColor);
		    this.canvas.renderAll();
        }
    }

    drawShape(x, y) {
        switch (this.selectedToolId) {
            case 'square':
                this.createSquare(x, y);
                break;
            case 'circle':
                this.createCircle(x, y);
                break;
            case 'triangle':
                this.createTriangle(x, y);
                break;
            case 'delete':
                this.deleteObject();
                break;
            case 'polygon':
                this.createPolygon(x, y);
                break;
        }
    }

    drawListener(options) {
        this.selectedObject = options.target;

        if (this.selectedObject === null) {
            let rect = document.getElementById('canvasContainer').getBoundingClientRect();
            let x = options.e.clientX - rect.left;
            let y = options.e.clientY - rect.top;
            this.drawShape(x, y);
        }
    }

    deleteObject() {
        this.canvas.remove(this.selectedObject);
    }

    createSquare(x, y) {
        // create a rectangle object
        let rect = new fabric.Rect({
            left: x,
            top: y,
            fill: this.selectedColor,
            width: 50,
            height: 50
        });
        // 'add' rectangle onto canvas
        this.canvas.add(rect);

        document.getElementById(this.selectedToolId).classList.remove('selectedTool');
		this.selectedToolId = 'move';
    }


    createCircle(x, y) {
        let circle = new fabric.Circle({
            left: x,
            top: y,
            fill: this.selectedColor,
            radius: 50
        });
        this.canvas.add(circle);

        document.getElementById(this.selectedToolId).classList.remove('selectedTool');
		this.selectedToolId = 'move';
    }

    createTriangle(x, y) {
        let triangle = new fabric.Triangle({
            left: x,
            top: y,
            fill: this.selectedColor,
            width: 50,
            height: 50
        });
        this.canvas.add(triangle);

        document.getElementById(this.selectedToolId).classList.remove('selectedTool');
		this.selectedToolId = 'move';
    }

    createPolygon(x, y) {
        if (this.currentlyCreatingPolygon === null) {
            this.currentlyCreatingPolygon = new fabric.Polygon([
                { x: 0, y: 0 }
                /*{ x: 64, y: 89 },
                { x: 83, y: 134 },
                { x: 92, y: 120 }*/
            ], {
                left: x,
                top: y,
                stroke: "red"
            });

            this.canvas.add(this.currentlyCreatingPolygon);
        } else {
            let left = this.currentlyCreatingPolygon.get('left');
            let top = this.currentlyCreatingPolygon.get('top');
            let points = this.currentlyCreatingPolygon.points;

            points.push({ x: x - left, y: y - top });

            this.canvas.remove(this.currentlyCreatingPolygon);
            this.currentlyCreatingPolygon = new fabric.Polygon(points, { left, top, stroke: "red" });
            this.canvas.add(this.currentlyCreatingPolygon);
        }
    }
}
