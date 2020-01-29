export class ProjectController {
    constructor(json_project) {
        this.canvas = new fabric.Canvas('canvasContainer');
        fabric.util.requestAnimFrame(function render() {
            this.canvas.renderAll();
            fabric.util.requestAnimFrame(render.bind(this));
        }.bind(this));
        this.canvas.loadFromJSON(json_project, this.canvas.renderAll.bind(this.canvas));

    }
}
