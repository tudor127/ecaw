import {BaseController} from "./BaseController.js";
import {MediaContentController} from "./MediaContentController.js";
import {UserController} from "./UserController.js";
import {ContainerController} from "./ContainerController.js";

let baseController = new BaseController();
let mediaContentController = new MediaContentController();
let userController = new UserController();
let containerController = new ContainerController();
document.getElementById("showMediaContent").addEventListener("click", baseController.toggleMediaContentState);
document.getElementById("categories").addEventListener("click", mediaContentController.getCategoryContent.bind(mediaContentController));
document.getElementById("loadMore").addEventListener("click", mediaContentController.loadMoreContent.bind(mediaContentController));
document.getElementById("logIn").addEventListener("click", userController.showLoginForm);
document.getElementById("loginClose").addEventListener("click", userController.hideLoginForm);
document.getElementById("loginSubmit").addEventListener("click", userController.login);
document.getElementById("logOut").addEventListener("click", userController.logout);
document.getElementById("signUp").addEventListener("click", userController.showRegisterForm);
document.getElementById("registerClose").addEventListener("click", userController.hideRegisterForm);
document.getElementById("register_form").addEventListener("submit", userController.register);
document.getElementById("save").addEventListener("click", containerController.saveProject.bind(containerController));
document.getElementById("projectName").addEventListener("input", containerController.changeTitle.bind(containerController))
document.getElementById("projectsPanelButton").addEventListener("click", userController.showProjectsPanel);
document.getElementById("projectsClose").addEventListener("click", userController.hideProjectsPanel);

// toolbox listeners
document.getElementById("color").addEventListener("change", containerController.setColor.bind(containerController));
document.getElementById("delete").addEventListener("click", containerController.deleteObject.bind(containerController));
document.getElementById("toolbox").addEventListener("click", containerController.setTool.bind(containerController));

// Media content
document.getElementById("mediaContentItems").addEventListener("click", containerController.createMedia.bind(containerController));

// Make canvas responsive
let container = document.getElementById("container");
containerController.canvas.setWidth(container.offsetWidth);
containerController.canvas.setHeight(container.offsetHeight);

window.addEventListener("resize", function() {
    containerController.canvas.setWidth(container.offsetWidth);
    containerController.canvas.setHeight(container.offsetHeight);
});

// Shortcuts
document.onkeydown = (event) => {
    let reservedKeys = ["KeyQ", "KeyD", "KeyF", "KeyX", "KeyS"];

    if (!event.ctrlKey || !reservedKeys.includes(event.code)) {
        return;
    }

    event.preventDefault();

    switch (event.code) {
        case "KeyQ":
            document.getElementById("move").click();
            break;
        case "KeyD":
            document.getElementById("delete").click();
            break;
        case "KeyF":
            document.getElementById("pen").click();
            break;
        case "KeyX":
            document.getElementById("color").click();
            break;
        case "KeyS":
            containerController.saveProject();
            break;
        default:
    }
};

export let container_controller=containerController;
