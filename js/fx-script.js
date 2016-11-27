$(document).ready(function() {
    var newData, $this, $imgOrder, $radioObject = $("[type='radio']"),
        $bookBtn = $(".book-now"),
        $galleryImgObject = $(".gallery-img"),
        $carousel = $("#gallery-carousel"),
        $imgViewOverlay = $(".full-view-overlay"),
        $closePreview = $(".full-view-close"),
        $parllaxObject = $(".parallax-window"),
        $body = $carousel.parents("body");
    $radioObject.prop('disabled', true);
    $parllaxObject.parallax({ speed: 0.3 });
    $carousel.carousel('pause');
    $bookBtn.on('click', function() {
        $.ajax({
            type: "GET",
            url: "dataList.json",
            dataType: 'json',
            success: function(data) {
                var id;
                newData = data.available;
                $(newData).each(function(i, value) {
                    id = "#num" + value;
                    $(id).prop('disabled', false);
                });
            }
        });
    });
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
    $body.on('keydown', function(evt) {
        if (evt.keyCode == 27) {
            $imgViewOverlay.removeClass("view");
            setTimeout(function() { $imgViewOverlay.addClass("hide"); }, 200);
        }
    });
});