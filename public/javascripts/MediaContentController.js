export class MediaContentController {
    constructor() {
        this.currentPage = 0;
        this.selectedCategory = "";
    }

    /**
     * Handler for category click
     *
     * @param {Event} event
     */
    getCategoryContent(event) {
        event.preventDefault();
        let category = event.target.innerText;
        this._getCategoryContent(category);
    }

    /**
     * Gets the content urls from back-end.
     * Appends content to media content section.
     *
     * @param {string} category
     * @private
     */
    _getCategoryContent(category) {
        let categoryNames = Array.from(document.getElementsByClassName("category"), category => category.innerText);
        let content = document.getElementById("mediaContentItems");
        let loadMore = document.getElementById("loadMore");

        if (!categoryNames.includes(category)) {
            return;
        }

        if (category === this.selectedCategory) {
            this.currentPage++;
        } else {
            this.currentPage = 1;
            while (content.firstChild) {
                content.removeChild(content.firstChild);
            }
        }

        loadMore.innerText = "Loading...";

        this.selectedCategory = category;
        let link = `/category/${encodeURIComponent(category)}?page=${this.currentPage}`;

        fetch(link).catch(reason => {
            console.error(reason);

            let errorMessage = document.createElement("div");
            errorMessage.innerText = "An error occurred. No data for this category.";
            errorMessage.className = "error";
            content.appendChild(errorMessage);

            this.selectedCategory = "";
            loadMore.innerText = "";
        }).then(response => response.json()).then(response => {
            if (response.length === 0) {
                let noDataMessage = document.createElement("div");
                noDataMessage.innerText = "No data for this category.";
                noDataMessage.className = "message";
                content.appendChild(noDataMessage);
            }

            response.forEach(item => {
                let knownVideoExtensions = ["mp4", "ogg", "webm"],
                    video = document.createElement("video"),
                    image = document.createElement("img"),
                    extension = item.url.split(".");
                extension = extension[extension.length - 1];

                if (knownVideoExtensions.includes(extension)) {
                    video.className = "contentItem";
                    video.setAttribute("muted", "");
                    video.setAttribute("autoplay", "");
                    video.setAttribute("controls", "");
                    video.setAttribute("src", item.url);
                    content.appendChild(video);
                } else {
                    image.className = "contentItem";
                    image.setAttribute("src", item.url);
                    image.setAttribute("alt", "Media Content Image");
                    content.appendChild(image);
                }
            });

            loadMore.innerText = "Load More";
        });
    }

    /**
     * Loads more content of the previous selected category.
     * Simulates another click on same category.
     *
     * @param {Event} event
     */
    loadMoreContent(event) {
        event.preventDefault();
        if (event.target.innerText === "Load More") {
            this._getCategoryContent(this.selectedCategory);
        }
    }
}