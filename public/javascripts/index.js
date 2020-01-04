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

// toolbox listeners
document.getElementById("color").addEventListener("change", function(){containerController.setColor("color")});
document.getElementById("delete").addEventListener("click", containerController.deleteObject.bind(containerController));
document.getElementById("toolbox").addEventListener("click", containerController.setTool.bind(containerController));

let container = document.getElementById("container");
containerController.canvas.setWidth(container.offsetWidth);
containerController.canvas.setHeight(container.offsetHeight);

window.addEventListener("resize", function() {
    containerController.canvas.setWidth(container.offsetWidth);
    containerController.canvas.setHeight(container.offsetHeight);
});
