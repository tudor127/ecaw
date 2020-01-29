import {ProjectController} from "./ProjectController.js";

let projectJson=document.getElementById("container").dataset.json;
let projectController = new ProjectController(projectJson);


// Make canvas responsive
let container = document.getElementById("container");
projectController.canvas.setWidth(container.offsetWidth);
projectController.canvas.setHeight(container.offsetHeight);

window.addEventListener("resize", function() {
    projectController.canvas.setWidth(container.offsetWidth);
    projectController.canvas.setHeight(container.offsetHeight);
});

let buttons=document.getElementById('navButtons');
let projectName=document.getElementById('projectName').innerHTML;
buttons.innerHTML+=`<a href="`+projectController.canvas.toDataURL('png')+`" download="`+projectName+`.png"><button>Download png</button></a>`