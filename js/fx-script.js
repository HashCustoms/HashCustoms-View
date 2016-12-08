var $document = $(document),
    $windowObject = $(window),
    $affixElement = $("#affix-element"),
    $postAffix = $("#post-affix-element");

function setAffix(width) {
    $windowObject.off(".affix");
    $affixElement.removeData("bs.affix").removeClass("affix affix-top affix-bottom");
    width > 991 ? $affixElement.affix({ offset: 488 }) : width < 768 ? $affixElement.affix({ offset: 247 }) : $affixElement.affix({ offset: 305 });
    $affixElement.on("affixed.bs.affix", function() { $postAffix.css('margin-top', '58px'); }).on("affixed-top.bs.affix", function() { $postAffix.removeAttr('style'); });
};

$document.ready(function() {
    var newData, $this, $imgOrder, $navbar = $("#navb"),
        $radioObject = $("[type='radio']"),
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
        $affixElement.length ? (width = $windowObject.outerWidth(), setAffix(width)):0;
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
    $body.on('keydown', function(evt) { evt.keyCode == 27 ? ($imgViewOverlay.removeClass("view"), setTimeout(function() { $imgViewOverlay.addClass("hide"); }, 200)):0; });
    $document.scroll(function() { $document.scrollTop() != 0 ? $navbar.addClass("partial") : $navbar.removeClass("partial"); });
});