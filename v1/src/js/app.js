import {
    getPreviousSiblings, getNextSiblings
} from "./_utils.js"

import { page } from "./_page.js"

import {
    goToNext_Fn,
} from "./_controller.js"


function appProgressBar_play(_xscale) { gsap.set("#app .app-progress-bar", { scaleX: _xscale }) }
function appProgressBar_reset() { gsap.set("#app .app-progress-bar", { scaleX: 0 }) }

function CSSsetProperty_Fn(){
    const $target = document.querySelector(".visual-block");
    const t = $target.getBoundingClientRect().height //gsap.getProperty(".visual-block", "height")
    const n = .01 * (window.innerWidth, t);
    document.documentElement.style.setProperty("--vh", "".concat(n, "px"));
    document.documentElement.style.setProperty("--fullwidth", `${window.innerWidth*0.01}px`);
    document.documentElement.style.setProperty("--fullvh", `${window.innerHeight*0.01}px`);
}
function resize_Fn(){
    console.log("resize_Fn")
    setTimeout(()=>{ CSSsetProperty_Fn() }, 100)
};

window.addEventListener('load', ()=>{
    document.querySelector("#app").classList.add("loaded");

    document.querySelector("#btnLayerNext").addEventListener("click", (function(e) {
        // if (Ki || "autoplaying" == $("#app").attr("data-status")) return !1;
        window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT"))
    })) 
    // document.querySelector("#btnLayerPrev").addEventListener("click", (function(e) {
    //     // if (Ki || "autoplaying" == $("#app").attr("data-status")) return !1;
    //     // window.dispatchEvent(new CustomEvent("SHOWCASE_GO_PREV"))
    // }))
    
})

window.addEventListener('DOMContentLoaded', ()=>{    
    resize_Fn();
    window.addEventListener('resize', ()=> resize_Fn() );
    
    gsap.set('#app .page', {y: '100%'});
    document.querySelectorAll('.page').forEach((elem)=>{ elem.setAttribute('data-status',"next") });
    gestureGuide_Fn();

    window.addEventListener("SHOWCASE_RESIZE", resize_Fn );
    window.addEventListener("SHOWCASE_LOADING_COMPLETE", firstPageShow_Fn);

    // window.addEventListener("SHOWCASE_GO_PREV", f_)
    window.addEventListener("SHOWCASE_GO_NEXT", goToNext_Fn)
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




const logoAnimationTime = "#debug" == window.location.hash ? .1 : 5;
const gestureGuideOpenDelay = "#debug" == window.location.hash ? 0.01 : 0.4;
const gestureGuideCloseDelay = "#debug" == window.location.hash ? 0.02 : 3;



function gestureGuide_Fn() { // 첫 실행 - 제스쳐 가이드 
    gsap.set("#appLoading .logo", { alpha: 1 }); // 브랜드 로고 보이게 설정 //
    function guidePlay(){
        window.dispatchEvent(new CustomEvent("SHOWCASE_RESIZE"))
        document.querySelectorAll("#appLoading .coach-guide").forEach((elem)=>{
            elem.classList.add("active"); 
        })
    }
    function guideHide(){
        window.dispatchEvent(new CustomEvent("SHOWCASE_RESIZE"))
        gsap.to("#appLoading .guide", { autoAlpha: 0, duration: .5 })
        gsap.to("#appLoading .loading-area", { autoAlpha: 1, duration: .5, onComplete: logoAnimation_Fn })
    }
    gsap.delayedCall( gestureGuideOpenDelay, guidePlay);
    gsap.delayedCall( gestureGuideCloseDelay, guideHide);
}

function logoAnimation_Fn(){ // 로고 애니메이션  A_()
    gsap.to("#appLoading .logo", { alpha: 1, duration: logoAnimationTime, onComplete: appLoadComplete_Fn });
    const tl = gsap.timeline({ repeat: -1 });
    tl.to("#appLoading .logo svg", { rotateX: -360, duration: 1.5, ease: 'Quart.easeInOut'}, 0)
    tl.to("#appLoading .logo svg", { rotateY: -360, duration: 1.5, ease: 'Quart.easeInOut'}, .9)
}

function appLoadComplete_Fn() { // 로고애니메이션 완료 - 커버 보이기  S_(){
    document.querySelector("#app").classList.add("loading-ended") 
    window.dispatchEvent(new CustomEvent("SHOWCASE_LOADING_COMPLETE"));
    gsap.to("#appLoading", { autoAlpha: 0, duration: .5 })
}

function firstPageShow_Fn() { // cover show //
    const _id = 'chapter1_1_detail'
    const $firstPage = document.querySelector(`#app .page#${_id}`);
    gsap.set($firstPage, { y: 0 })
    $firstPage.setAttribute("data-status", "active")

    page(_id).reset();
    pageStatusActive_Fn( $firstPage );
    page(_id).start();
    window.dispatchEvent(new CustomEvent("SHOWCASE_RESIZE"));
}

function pageStatusActive_Fn( elem ) { /* data-status 변경 &  inputImageData_Fn */
    inputImageData_Fn( elem )
    
    elem.setAttribute("data-status", "active")
    if(elem.previousElementSibling) elem.previousElementSibling.setAttribute("data-status", "sibling")
    if(elem.nextElementSibling) elem.nextElementSibling.setAttribute("data-status", "sibling")

    getPreviousSiblings(elem).forEach(( item,i ) => { if(i>0) item.setAttribute("data-status", "prev") })
    getNextSiblings(elem).forEach(( item,i ) => { if(i>0) item.setAttribute("data-status", "next") })
}

function inputImageData_Fn( elem ) { /* data-stutus:acvive 와 앞 뒤 페이지 이미지 대입 */
    elem.querySelectorAll(".back").forEach((item)=>{
        const src = item.getAttribute("data-bg");
        if( src && "" != src) item.style.backgroundImage = `url(${src})`
    })
    elem.querySelectorAll("img").forEach((item)=>{
        const src = item.getAttribute("data-src");
        if( src && "" != src) item.setAttribute("src", src)
    })
    if( elem.nextElementSibling ){
        elem.nextElementSibling.querySelectorAll(".back").forEach((item)=>{
            const src = item.getAttribute("data-bg");
            if( src && "" != src) item.style.backgroundImage = `url(${src})`
        })
        elem.nextElementSibling.querySelectorAll("img").forEach((item)=>{
            const src = item.getAttribute("data-src");
            if( src && "" != src) item.setAttribute("src", src)
        })
    }
    if( elem.previousElementSibling ){
        elem.previousElementSibling.querySelectorAll(".back").forEach((item)=>{
            const src = item.getAttribute("data-bg");
            if( src && "" != src) item.style.backgroundImage = `url(${src})`
        })
        elem.previousElementSibling.querySelectorAll("img").forEach((item)=>{
            const src = item.getAttribute("data-src");
            if( src && "" != src) item.setAttribute("src", src)
        })
    }
}


