function showEvent (){
    $(".event-block").addClass("is-active");
}
(function($){
    var commonUI = {
        btnLayerOpen : function(e){
            var openLayer = $(event.currentTarget).data("layer");
            $("#"+openLayer).addClass("is-active");
            setTimeout(function() {
                $(window).trigger("lazyloadupdate");
            },100);
        },
        btnLayerClose : function(e){
            var closeLayer = $(event.currentTarget).data("layer");
            $("#"+closeLayer).removeClass("is-active");
        }
    };
    $("#btnHistoryBack").on("click",function(e){

        if(AppInterface.isIOS() || AppInterface.isAndroid()) {
            try {AppInterface.historyBack(); return false;} catch (e) {};
        } else {
            e.preventDefault();
            window.history.back();
        }
    });
    $(".btn-visual-autoplay").on("click", function(){
        $(this).toggleClass("is-active");

    });
    $(".btn-audio").on("click", function(){
        $(this).toggleClass("is-active");
    });
    $(".btn-share").on("click", function(){
        if(AppInterface.isIOS() || AppInterface.isAndroid()) {
            try {AppInterface.showShare();} catch (e) {};
        } else {
            $("#snsShare").toggleClass("is-active");
        }
    });
    $("#btnReplyShow").on("click", function(){
        commonUI.btnLayerOpen();
    });
    $(document).on("click" , function(e) {
        var $shareContainer = $("#snsShare");
        if ($shareContainer.has(e.target).length === 0) {
            if(e.target.className != "ic-48-bold-stencil-share ic-black"){
                $shareContainer.removeClass("is-active");
            }
        }
    })
    $("#btnCategoryShow").on("click", function(){
        $(".visual-block").css({"z-index": "7" , "transform" : "translate3d(0,0,0)"});
        commonUI.btnLayerOpen();
    });
    $("#btnProductView").on("click" , function(){
        commonUI.btnLayerOpen();
        $("#btnShare").addClass("black-ico");
    });
    $(".btn-reply-view").on("click" , function(){
        $(".event-block").toggleClass("reply-up");
    });

    $(".btn-layer-close").on("click" ,function(){
        commonUI.btnLayerClose();
        if($(this).parents("#productList").length > 0){
            $(".btn-share").removeClass("black-ico");
        }
        if($(this).parents("#eventLayer").length > 0){
            $(".block-visual").scrollTop(0);
            $(this).attr("style","");
            $(".btn-share").attr("style","");
            setTimeout(function(){
                $(".btn-share").find("i").attr("style","");
            },80)

        }
        if($(this).data("layer") === "showCaseInfo"){
            $(".visual-block").attr("style" , "");
        }
    });
    $(".tab-wrap").on("click" , "button" , function(){
        var thisEventShowPannel = $(this).data("tab");
        $(this).addClass("is-active").siblings().removeClass("is-active");
        $(".tab-pannel[data-tabpannel='"+thisEventShowPannel+"']").addClass("is-active").siblings(".tab-pannel").removeClass("is-active");
    })
    var eleWrap = document.getElementById("wrap");
    var elReplyWrite = document.getElementById("replyWrite");
    window.addEventListener ( 'native.keyboardshow', function (e) {
        setTimeout (function () {
            document.activeElement.scrollIntoViewIfNeeded ();
        }, 100);
    });
    elReplyWrite.addEventListener("touchstart" , function(){
        $(".event-block").addClass("reply-up");
        $(".block-reply").addClass("write-focus");
        setTimeout(function(){
            elReplyWrite.focus();
        },80)

    });

    eleWrap.addEventListener("touchstart" , function(event){
        if(event.target.id != "replyWrite" && event.target.id !="btnSubmit"){
            $("#replyWrite").blur();
        }
    });


    $("#replyWrite").on(" blur change keyup", function(e){
        if(e.type === "blur"){
            setTimeout(function(){
                $("body").scrollTop(0);
            },10);
            $(".block-reply").removeClass("write-focus");
        }else{
            if($(this).val() === ""){
                $("#btnSubmit").attr("disabled","disabled");
            }else{
                $("#btnSubmit").attr("disabled",false);
            }
        }

    });


    var stickyOffsetTop = 30;
    var winTop = 0;
    $(".block-visual").on("scroll" , function(){
        winTop =  $(".block-visual").scrollTop();
        // 스킨 적용
        if(winTop >= stickyOffsetTop){
            $(".change-bg").addClass("bg-on").find(".ic-white").removeClass("ic-white");
            $("#btnShare").addClass("i-white");
        }else{
            $(".change-bg").removeClass("bg-on").find(".ic-30-line-arrow-left").addClass("ic-white");
            $("#btnShare").removeClass("i-white");

        }
    });

})(jQuery);

