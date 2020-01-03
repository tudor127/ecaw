export class BaseController {
    constructor() {
        this.showMediaContentState = false;
    }

    toggleMediaContentState() {
        this.showMediaContentState = !this.showMediaContentState;
        let mediaContent = document.getElementById("mediaContent");
        let mediaCategories = document.getElementById("categories");
        let mediaContentItems = document.getElementById("mediaContentItems");
        let mediaContentButton = document.getElementById("showMediaContent");
        let mediaContentArrow = document.getElementById("mediaContentArrow");
        let newArrowClass = "fas " + (this.showMediaContentState ? "fa-chevron-right" : "fa-chevron-left");

        mediaContent.style.width = this.showMediaContentState ? "var(--mediaContentWidth)" : "0px";
        mediaCategories.style.display = mediaContentItems.style.display = this.showMediaContentState ? "flex" : "none";
        mediaContentButton.style.right = this.showMediaContentState ? "calc(var(--mediaContentWidth) - var(--showMediaContentButtonSize) / 2)" : "0px";
        mediaContentArrow.setAttribute("class", newArrowClass);
    }
}