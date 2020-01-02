import {BaseController} from "./BaseController.js";
import {MediaContentController} from "./MediaContentController.js";
import {UserController} from "./UserController.js";

let baseController = new BaseController();
let mediaContentController = new MediaContentController();
let userController = new UserController();

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
