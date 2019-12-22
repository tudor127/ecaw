import {BaseController} from "./BaseController.js";
import {MediaContentController} from "./MediaContentController.js";

let baseController = new BaseController();
let mediaContentController = new MediaContentController();

document.getElementById("showMediaContent").addEventListener("click", baseController.toggleMediaContentState);
document.getElementById("categories").addEventListener("click", mediaContentController.getCategoryContent.bind(mediaContentController));
document.getElementById("loadMore").addEventListener("click", mediaContentController.loadMoreContent.bind(mediaContentController));
