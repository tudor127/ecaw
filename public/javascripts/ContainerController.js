export class ContainerController {
    constructor() {
        this.canvas = new fabric.Canvas('canvasContainer');
        this.selectedToolId = 'move'; //default
        this.selectedColor = document.getElementById('color').value;
        this.selectedObject = null;
        this.currentlyCreatingPolygon = null;
        this.projectName = 'Untitled';

        fabric.util.requestAnimFrame(function render() {
            this.canvas.renderAll();
            fabric.util.requestAnimFrame(render.bind(this));
        }.bind(this));

        this.canvas.on('mouse:down', this.drawListener.bind(this));
        document.getElementById(this.selectedToolId).classList.add('selectedTool');
    }

    saveProject() {
        let projectContent = new Blob([JSON.stringify(this.canvas)]);
        console.log(projectContent);
        projectContent.text().then(response => {
            console.log(response);
        });
        fetch(`/save/${encodeURIComponent(this.projectName)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream'
            },
            body: projectContent
        }).catch(reason => {

        }).then(response => response.json()).then(response => {

        })
    }

    changeTitle(event) {
        this.projectName = event.target.innerText;
    }

    /**
     * Sets the selected tool for container from toolbox
     *
     * @param {Event} event
     */
    setTool(event) {
        let selectedToolId = event.target.id;
        let possibleToolIds = ['move', 'polygon', 'square', 'circle', 'triangle'];

        if (!possibleToolIds.includes(selectedToolId)) {
            return;
        }

        this.currentlyCreatingPolygon = null;

        document.getElementById(this.selectedToolId).classList.remove('selectedTool');
        // If the same tool is selected then select 'move' since that would mean to cancel the currently selected tool
        this.selectedToolId = this.selectedToolId === selectedToolId ? 'move' : selectedToolId;
        document.getElementById(this.selectedToolId).classList.add('selectedTool');
    }

    /**
     * Sets the selected color for container
     *
     * @param {Event} event
     */
    setColor(event) {
        this.selectedColor = event.target.value;
		if (this.selectedObject !== null) {
		    this.selectedObject.setColor(this.selectedColor);
		    this.canvas.renderAll();
        }
    }

    /**
     * Draws depending on the selected object and click position
     *
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     */
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

    /**
     * Selects and objects or use selected tool from toolbox
     *
     * @param {Object} options
     */
    drawListener(options) {
        this.selectedObject = options.target;

        if (this.selectedObject === null) {
            let rect = document.getElementById('canvasContainer').getBoundingClientRect();
            let x = options.e.clientX - rect.left;
            let y = options.e.clientY - rect.top;
            this.drawShape(x, y);
        }
    }

    /**
     * Deletes selected object and resets polygon progress
     */
    deleteObject() {
        this.currentlyCreatingPolygon = null;
        this.canvas.remove(this.selectedObject);
    }

    /**
     * Creates square at given coordinates
     *
     * @param {number} x
     * @param {number} y
     */
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

    /**
     * Creates circle at given coordinates
     *
     * @param {number} x
     * @param {number} y
     */
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

    /**
     * Creates triangle at given coordinates
     *
     * @param {number} x
     * @param {number} y
     */
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

    /**
     * Creates polygon at given coordinates
     * Polygon is progressively created from the points given
     *
     * @param {number} x
     * @param {number} y
     */
    createPolygon(x, y) {
        if (this.currentlyCreatingPolygon === null) {
            this.currentlyCreatingPolygon = new fabric.Polygon([
                { x: 0, y: 0 }
            ], {
                left: x,
                top: y,
                stroke: this.selectedColor,
                fill: this.selectedColor
            });

            this.canvas.add(this.currentlyCreatingPolygon);
        } else {
            let left = this.currentlyCreatingPolygon.get('left');
            let top = this.currentlyCreatingPolygon.get('top');
            let points = this.currentlyCreatingPolygon.points;

            points.push({ x: x - left, y: y - top });

            this.canvas.remove(this.currentlyCreatingPolygon);
            this.currentlyCreatingPolygon = new fabric.Polygon(points, { left, top, stroke: this.selectedColor, fill: this.selectedColor });
            this.canvas.add(this.currentlyCreatingPolygon);
        }
    }

    /**
     * Creates media element (image/video) from media content component
     *
     * @param {Event} event
     */
    createMedia(event) {
        let element = event.target;

        if (!(element instanceof HTMLImageElement) && !(element instanceof HTMLVideoElement)) {
            return;
        }

        let centerX = this.canvas.getWidth() / 2;
        let centerY = this.canvas.getHeight() / 2;

        let media = new fabric.Image(element, {
            left: centerX,
            top: centerY,
            originX: 'center',
            originY: 'center',
            objectCaching: false
        }).scaleToWidth(element.offsetWidth);

        media.getElement().setAttribute('width', element.videoWidth);
        media.getElement().setAttribute('height', element.videoHeight);

        this.canvas.add(media);
    }
}
