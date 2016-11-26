$(document).ready(function() {
    var $this, $imgOrder, $galleryImgObject = $(".gallery-img"),
        $carousel = $("#gallery-carousel"),
        $imgViewOverlay = $(".full-view-overlay"),
        $closePreview = $(".full-view-close"),
        $parllaxObject = $(".parallax-window");
    $parllaxObject.parallax({ speed: 0.3 })
    $carousel.carousel('pause');
    $galleryImgObject.on('click', function() {
        $this = $(this);
        $imgOrder = $this.data("order");
        $carousel.carousel($imgOrder);
        $imgViewOverlay.removeClass("hide");
        setTimeout(function() { $imgViewOverlay.addClass("view"); }, 400);
        $carousel.carousel('pause');
    });
    $closePreview.on('click', function() {
        $imgViewOverlay.removeClass("view");
        setTimeout(function() { $imgViewOverlay.addClass("hide"); }, 200);
    });
});