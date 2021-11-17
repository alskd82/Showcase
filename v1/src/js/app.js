import {
    getPreviousSiblings, getNextSiblings
} from "./_utils.js"

function CSSsetProperty(){
    const $target = document.querySelector(".visual-block");
    const t = $target.getBoundingClientRect().height //gsap.getProperty(".visual-block", "height")
    const n = .01 * (window.innerWidth, t);
    document.documentElement.style.setProperty("--vh", "".concat(n, "px"));
    document.documentElement.style.setProperty("--fullwidth", `${window.innerWidth*0.01}px`);
    document.documentElement.style.setProperty("--fullvh", `${window.innerHeight*0.01}px`);
}

window.addEventListener('load', ()=>{
    document.querySelector("#app").classList.add("loaded")
    window.dispatchEvent(new CustomEvent("SHOWCASE_LOADING_COMPLETE"))
})


window.addEventListener('DOMContentLoaded', ()=>{
    CSSsetProperty();
    document.addEventListener('resize', ()=>{
        setTimeout(()=>{ CSSsetProperty() }, 100)
    });
    gsap.set('#app .page', {y: '100%'});
    document.querySelectorAll('.page').forEach((elem)=>{ elem.setAttribute('data-status',"next") });

    window.addEventListener("SHOWCASE_LOADING_COMPLETE", coverPageShow_Func) // window.addEventListener("SHOWCASE_LOADING_COMPLETE", c_)
    // window.addEventListener("SHOWCASE_GO_PREV", f_)
    // window.addEventListener("SHOWCASE_GO_NEXT", p_)
    // window.addEventListener("SHOWCASE_GO_PAGE", v_)
    // window.addEventListener("SHOW_MSG_NEXT", __)
    /*  
        마우스 휠 이벤트 등록
        Zi.addEventListener("mousewheel", (function(e) {
                if (Ki || "autoplaying" == $("#app").attr("data-status") || Ji) return !1;
                e.preventDefault();
                var t = e.deltaY,
                    n = e.deltaX;
                return Math.abs(n) > 4 && n > 0 || Math.abs(t) > 4 && t > 0 ? (Ji = !0, setTimeout((function() {
                    Ji = !1
                }), 500), window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT"))) : (Math.abs(n) > 4 && n < 0 || Math.abs(t) > 4 && t < 0) && (Ji = !0, setTimeout((function() {
                    Ji = !1
                }), 500), window.dispatchEvent(new CustomEvent("SHOWCASE_GO_PREV"))), !1
            }))
    */
    /*
        스와이프 이벤트 등록 
        Zi.addEventListener("swipe", (function(e) {
                if (Ki || "autoplaying" == $("#app").attr("data-status")) return !1;
                var t = e.detail.directions;
                t.left || t.top ? window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT")) : (t.right || t.bottom) && window.dispatchEvent(new CustomEvent("SHOWCASE_GO_PREV"))
            }))
    
    */
    /*
        앞 뒤 이동 버튼 등록
        document.getElementById("btnLayerNext").addEventListener("click", (function(e) {
                if (Ki || "autoplaying" == $("#app").attr("data-status")) return !1;
                window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT"))
            })), document.getElementById("btnLayerPrev").addEventListener("click", (function(e) {
                if (Ki || "autoplaying" == $("#app").attr("data-status")) return !1;
                window.dispatchEvent(new CustomEvent("SHOWCASE_GO_PREV"))
            }))
   */
    /*
        회전 체인지 등록
        $(window).on("orientationchange", (function() {
                requestAnimationFrame(e);
                var t = window.orientation;
                90 == t || -90 == t ? requestAnimationFrame((function() {
                    $(".only-portrait").addClass("active")
                })) : requestAnimationFrame((function() {
                    $(".only-portrait").removeClass("active")
                }))
            })),
    */
    /* 
        키보드 제어 등록
        $(window).on("keydown", (function(e) {
                if (Ki) return !1;
                37 != e.keyCode && 38 != e.keyCode || (Ki = !0, window.dispatchEvent(new CustomEvent("SHOWCASE_GO_PREV"))), 39 != e.keyCode && 40 != e.keyCode || (Ki = !0, window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT")))
            }))
    */
    /*
        오디오 이벤트 
        $(".btn-audio").on("click", (function(e) {
            $(this).hasClass("is-active") ? (Yv.mute(!1), !1) : (Yv.mute(!0), !0)
        }))
   */
    /*
        자동 재생 이벤트 
        $(".btn-visual-autoplay").on("click", (function(e) {
            $(this).hasClass("is-active") ? (lr = !0, $("#app").attr("data-status", "autoplaying"), $("#btnLayerNext, #btnLayerPrev").addClass("disabled"), window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT"))) : (lr = !1, $("#app").attr("data-status", ""), $("#btnLayerNext, #btnLayerPrev").removeClass("disabled"), sr && (clearTimeout(sr), sr = null))
        }))
   */
})




var w_ = "#debug" == window.location.hash ? .1 : 5,
T_ = "#debug" == window.location.hash ? 10 : 400,
k_ = "#debug" == window.location.hash ? 10 : 2500;

// var a_ = $(".app .pages"),
// s_ = !0,
// u_ = 1;


function S_() { // appLoadComplete_Func() {
    /*
        로딩 애니메이션 완료 - coverPageShow_Func 실행 
    */
    document.querySelector("#app").classList.add("loading-ended") 
    window.dispatchEvent(new CustomEvent("SHOWCASE_LOADING_COMPLETE"))
    gsap.to("#appLoading", { autoAlpha: 0, duration: .5 })
}
//appLoadComplete_Func() 

function coverPageShow_Func() {
    /*
        cover & nextSibling 이미지 대입
    */
    console.log( "cover play" )
    const $cover = document.querySelector("#app .page#cover");
    gsap.set($cover, { y: 0 })
    $cover.setAttribute("data-status", "active")
    inputImageData_Func($cover)
}

function pageStatusActive_Func( elem ) {
    /*
        data-status = "active"
        data-status = "sibling"
        data-status = "prev" || "next"
        현재, 앞, 뒤 이미지 대입 // inputImageData_Func()
    */
    inputImageData( elem )
    
    elem.setAttribute("data-status", "active")
    elem.previousElementSibling.setAttribute("data-status", "sibling")
    elem.nextElementSibling.setAttribute("data-status", "sibling")

    getPreviousSiblings(elem).forEach(( item ) => item.setAttribute("data-status", "prev"))
    getNextSiblings(elem).forEach(( item ) => item.setAttribute("data-status", "next"))
}

function inputImageData_Func( elem ) {
    /* 
        data-stutus:acvive 와 앞 뒤 페이지 이미지 대입
    */
    elem.querySelectorAll(".back").forEach((item)=>{
        
        const src = item.getAttribute("data-bg")
        console.log(src)
        if( src && "" != src) item.style.backgroundImage = `url(${src})`
    })
    // elem.querySelectorAll("img").forEach((item)=>{
    //     const src = item.dataset.dataSrc;
    //     if( src && "" != src) item.setAttribute("src", src)
    // })
    // if( elem.nextElementSibling ){
    //     elem.nextElementSibling.querySelectorAll(".back").forEach((item)=>{
    //         const src = item.dataset.dataBg;
    //         if( src && "" != src) item.style.backgroundImage = `url(${src})`
    //     })
    //     elem.nextElementSibling.querySelectorAll("img").forEach((item)=>{
    //         const src = item.dataset.dataSrc;
    //         if( src && "" != src) item.setAttribute("src", src)
    //     })
    // }
    // if( elem.previousElementSibling ){
    //     elem.previousElementSibling.querySelectorAll(".back").forEach((item)=>{
    //         const src = item.dataset.dataBg;
    //         if( src && "" != src) item.style.backgroundImage = `url(${src})`
    //     })
    //     elem.previousElementSibling.querySelectorAll("img").forEach((item)=>{
    //         const src = item.dataset.dataSrc;
    //         if( src && "" != src) item.setAttribute("src", src)
    //     })
    // }

}
/*
function d_(e) {
    switch (e.attr("id")) {
        case "cover":
            return i;
        case "intro1":
            return o;
        case "intro2":
            return a;
        case "chapter1Cover":
        case "chapter2Cover":
            return s;
        case "chapter1_1":
        case "chapter1_2":
        case "chapter1_3":
        case "chapter1_4":
        case "chapter1_5":
            return u;
        case "chapter1_1_detail":
        case "chapter1_2_detail":
        case "chapter1_3_detail":
        case "chapter1_4_detail":
        case "chapter1_5_detail":
            return l;
        case "chapter2_1":
        case "chapter2_2":
        case "chapter2_3":
        case "chapter2_4":
        case "chapter2_5":
        case "chapter2_6":
        case "chapter2_7":
        case "chapter2_8":
            return u;
        case "chapter2_1_detail":
        case "chapter2_2_detail":
        case "chapter2_3_detail":
        case "chapter2_4_detail":
        case "chapter2_5_detail":
        case "chapter2_6_detail":
        case "chapter2_7_detail":
        case "chapter2_8_detail":
            return l;
        case "filmIntro":
        case "filmMaking":
            return r;
        case "event":
            return d;
        case "ending":
            return c
    }
}
*/







// function f_() {
//     if (!s_) {
//         var e = $('#app .page[data-status="active"]');
//         if (d_(e).first()) {
//             var t = e.prev();
//             t[0] && m_(t, "prev")
//         }
//     }
// }

// function p_() {
//     if (!s_) {
//         var e = $('#app .page[data-status="active"]');
//         if (d_(e).final()) {
//             var t = e.next();
//             t[0] && m_(t, "next")
//         }
//     }
// }

/* 제스쳐 가이드  */
function x_() {
    setTimeout((function() {
        $("#appLoading .coach-guide").addClass("active"), setTimeout((function() {
            $(window).trigger("resize"), qi.to("#appLoading .guide", {
                autoAlpha: 0,
                duration: .5
            }), qi.to("#appLoading .loading-area", {
                autoAlpha: 1,
                duration: .5,
                onComplete: A_
            })
        }), k_), $(window).trigger("resize")
    }), T_), qi.set("#appLoading .logo", {
        alpha: 1
    })
}

/* 로딩 애니메이션 */

function A_() {
    qi.to("#appLoading .logo", {
        alpha: 1,
        duration: w_,
        onComplete: S_
    });
    var e = qi.timeline({ repeat: -1 });
    e.to("#appLoading .logo svg", {
        rotateX: -360,
        duration: 1.5,
        ease: xn.easeInOut
    }, 0), e.to("#appLoading .logo svg", {
        rotateY: -360,
        duration: 1.5,
        ease: xn.easeInOut
    }, .9)
}