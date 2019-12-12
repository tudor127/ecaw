import {BaseController} from "./BaseController.js";

let baseController = new BaseController();

document.getElementById("showMediaContent").addEventListener("click", baseController.toggleMediaContentState);
