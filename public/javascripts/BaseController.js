export class BaseController {
    constructor() {
        this.showMediaContentState = false;
    }

    toggleMediaContentState() {
        this.showMediaContentState = !this.showMediaContentState;
        let mediaContent = document.getElementById("mediaContent");
        let mediaContentButton = document.getElementById("showMediaContent");
        let mediaContentArrow = document.getElementById("mediaContentArrow");
        let newArrowClass = "fas " + (this.showMediaContentState ? "fa-chevron-right" : "fa-chevron-left");

        mediaContent.style.width = this.showMediaContentState ? "30%" : "0px";
        mediaContentButton.style.right = this.showMediaContentState ? "calc(30% - var(--showMediaContentButtonSize) / 2)" : "0px";
        mediaContentArrow.setAttribute("class", newArrowClass);
    }
}