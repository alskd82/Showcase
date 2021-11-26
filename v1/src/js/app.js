import { CSSsetProperty_Fn } from "./_utils.js";
import { page } from "./_page.js";

import {
    goToNext_Fn, goToPrev_Fn, goToPage,
    pageStatusActive_Fn,
    inputImageData_Fn,
    isPageChanging
} from "./_controller.js"

function showEvent (){
    document.querySelector(".event-block").classList.add("is-active")
}

function changeDeivceRotate(){
    const t = window.orientation;
    if(t === 90 || t === -90){
        document.querySelector(".only-portrait").classList.add("active");
        if(document.querySelector('.btn-visual-autoplay').classList.contains('is-active')){
            console.log('autoplaying stop!')
            document.querySelector('.btn-visual-autoplay').classList.remove('is-active')
            document.querySelector('#app').setAttribute('data-status', '');
            document.querySelector('#btnLayerNext').classList.remove('disabled');
            document.querySelector('#btnLayerPrev').classList.remove('disabled');
        }
    } else {
        document.querySelector(".only-portrait").classList.remove("active")
    }
}

function resize_Fn(){
    console.log("resize_Fn");
    CSSsetProperty_Fn();
};


const logoAnimationTime = "#debug" == window.location.hash ? .1 : 5;
const gestureGuideOpenDelay = "#debug" == window.location.hash ? 0.01 : 0.4;
const gestureGuideCloseDelay = "#debug" == window.location.hash ? 0.02 : 3;

const sound = new Howl({
    src: [ document.querySelector('#bgm').src ],
    // autoplay: true,
    loop: true,
    volume: 1,
    onplay: ()=>{        
        document.querySelector('.btn-audio').classList.add('is-active');
        console.log('Sound Play!');
    }
})
const soundId = sound.play()
const soundFadeOut =()=> sound.fade(1, 0, 1000, soundId)
const soundFadeIn =()=> sound.fade(0, 1, 1000, soundId)
// soundFadeOut();



let wheelEnabled = true; // 휠 기능 
let AutoplayStopMoment = false;
function autoplay_pause(){
    if(AutoplayStopMoment) {
        page( document.querySelector(".page[data-status='active'").id ).stop()
    } else{
        /* 자동플레이를 다시 실행시키기 */
        page( document.querySelector(".page[data-status='active'").id ).start()
    }
}

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

function appLoadComplete_Fn() { // 로고애니메이션 완료 - 커버 보이기
    document.querySelector("#app").classList.add("loading-ended") 
    window.dispatchEvent(new CustomEvent("SHOWCASE_LOADING_COMPLETE"));
    gsap.to("#appLoading", { autoAlpha: 0, duration: .5 })
}

function firstPageShow_Fn() { // cover show //
    const _id = 'cover'; //cover
    const $firstPage = document.querySelector(`#app .page#${_id}`);
    gsap.set($firstPage, { y: 0 })
    // $firstPage.setAttribute("data-status", "active")

    page(_id).reset(_id);
    pageStatusActive_Fn( $firstPage );
    page(_id).start(_id);
    window.dispatchEvent(new CustomEvent("SHOWCASE_RESIZE"));
}

function pageJump_Fn(e){ // .showcase-info #showCaseInfo 페이지 점프 //
    const elem = document.querySelector(`.page${e.detail}`);
    if( elem.id === document.querySelector(".page[data-status='active']").id ) return;
    goToPage("next", elem)
    document.querySelector("#btnLayerNext").classList.remove("blink");
};

function showcaseInfo(){
    if(document.querySelector("#showCaseInfo").classList.contains("is-active")){
        document.querySelector("#showCaseInfo").classList.remove("is-active");
        if(AutoplayStopMoment){
            AutoplayStopMoment = false;
            autoplay_pause()
        }
    } else {
        document.querySelector("#showCaseInfo").classList.add("is-active");
        if(document.querySelector("#app").dataset.status === "autoplaying"){
            AutoplayStopMoment = true;
            autoplay_pause()
        }
    }
}



window.addEventListener('load', ()=>{ document.querySelector("#app").classList.add("loaded"); })
window.addEventListener('DOMContentLoaded', ()=>{  
    CSSsetProperty_Fn();
    changeDeivceRotate();
    window.addEventListener('resize', ()=> resize_Fn() );
    
    gsap.set('#app .page', {y: '100%'});
    document.querySelectorAll('.page').forEach((elem)=>{ elem.setAttribute('data-status',"next") });
    gestureGuide_Fn();

    window.addEventListener("SHOWCASE_RESIZE", resize_Fn );
    window.addEventListener("SHOWCASE_ROTATION", changeDeivceRotate)
    window.addEventListener("SHOWCASE_LOADING_COMPLETE", firstPageShow_Fn);

    window.addEventListener("SHOWCASE_GO_PREV", goToPrev_Fn)
    window.addEventListener("SHOWCASE_GO_NEXT", goToNext_Fn)
    window.addEventListener("SHOWCASE_GO_PAGE", pageJump_Fn)
    // window.addEventListener("SHOW_MSG_NEXT", __)

    /* 좌우 이동 버튼 */
    document.querySelector("#btnLayerNext").addEventListener("click", e => {
        if(isPageChanging || document.querySelector("#app").getAttribute("data-status") === "autoplaying") return;
        window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT"))
    }) 
    document.querySelector("#btnLayerPrev").addEventListener("click", e => {
        if(isPageChanging || document.querySelector("#app").getAttribute("data-status") === "autoplaying") return;
        window.dispatchEvent(new CustomEvent("SHOWCASE_GO_PREV"))
    })

    /* 마우스 휠 */
    document.querySelector("#app").addEventListener("mousewheel", e => {
        if(isPageChanging || document.querySelector("#app").getAttribute("data-status") === "autoplaying" || !wheelEnabled) return;
        wheelEnabled = false;
        setTimeout(()=> wheelEnabled = true , 1000)
        e.preventDefault();
        if(e.deltaY > 0)        window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT"))
        else if (e.deltaY < 0)  window.dispatchEvent(new CustomEvent("SHOWCASE_GO_PREV"))
    })
    /* 스와이프 
        https://github.com/john-doherty/swiped-events
    */
    document.querySelector("#app").addEventListener("swiped", function(e){
        if(isPageChanging || document.querySelector("#app").getAttribute("data-status") === "autoplaying") return;
        const t = e.detail.dir;
        console.log('swipe:'+t)
        if( t === "left" || t === "up") window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT"))
        else window.dispatchEvent(new CustomEvent("SHOWCASE_GO_PREV"))
    })

    /* 회전 */
    window.addEventListener('orientationchange', e => window.dispatchEvent(new CustomEvent("SHOWCASE_ROTATION")) );

    /* 키보드 */
    window.addEventListener('keydown', e =>{
        if(isPageChanging) return;
        if(e.keyCode === 38 || e.keyCode === 39)      window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT"))
        else if(e.keyCode === 37 || e.keyCode === 40) window.dispatchEvent(new CustomEvent("SHOWCASE_GO_PREV"))
    })

    /* 오디오 */
    document.querySelector(".btn-audio").addEventListener('click', e =>{
        if(e.currentTarget.classList.contains('is-active')){
            e.currentTarget.classList.remove('is-active');
            soundFadeOut();
        } else {
            e.currentTarget.classList.add('is-active');
            soundFadeIn();
        }
    })
    /* 자동재생 */
    document.querySelector('.btn-visual-autoplay').addEventListener('click', e =>{
        if(e.currentTarget.classList.contains('is-active')){
            console.log('autoplaying stop!')
            e.currentTarget.classList.remove('is-active')
            document.querySelector('#app').setAttribute('data-status', '');
            document.querySelector('#btnLayerNext').classList.remove('disabled');
            document.querySelector('#btnLayerPrev').classList.remove('disabled');
            
        } else {
            console.log('autoplaying!')
            e.currentTarget.classList.add('is-active')
            document.querySelector('#app').setAttribute('data-status', 'autoplaying');
            document.querySelector('#btnLayerNext').classList.add('disabled');
            document.querySelector('#btnLayerPrev').classList.add('disabled');
            window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT"));
        }
    })
    /* 페이지 바로 가기  */
    document.querySelector("#showCaseInfo").addEventListener('click', e =>{
        e.preventDefault();
        const link = e.target.getAttribute("href");
        if(!link) return;
        showcaseInfo();
        if(link === "__#event"){
            document.querySelector("#eventLayer").classList.add("is-active"); // 이벤트 레이어 보이게 설정 
        } else {
            window.dispatchEvent(new CustomEvent("SHOWCASE_GO_PAGE",{ detail: link }))
        }
    })
    document.querySelector("#btnCategoryShow").addEventListener('click', e => showcaseInfo() )       // 페이지 바로가기 열기
    document.querySelector("#showCaseInfo > button").addEventListener('click', e => showcaseInfo() ) // 페이지 바로가기 닫기 
    
})


// function rr(e) {
//     "active" == e.attr("data-status") && (clearTimeout(nr), nr = null, ir.removeClass("blink"), nr = setTimeout((function() {
//         ir.addClass("blink")
//     }), 10))
// }

// function er() {
//     Ki = true, 
//     $("#btnLayerNext").removeClass("blink")
// }

// // Ki = autoplaying

// // ir.on("animationend", (function() { ir.removeClass("blink") })) // ir = $("#btnLayerNext");
// // qi.set("#app .app-progress-bar", { scaleX: 0 }) 
// // window.addEventListener("SHOWCASE_GO_NEXT", (function() { 
// //     "active" == $(".page#intro1").attr("data-status") && cy < 2 && (l_(!0), er(), cy++, py()) })); py() => 인트로1 움직임 함수 

// 현재 페이지가 intro1
// 스텝이 2보다 작고 => cy 는 +1,  function l_(e) { s_ = e }

// // function l_(e) { s_ = e }

// window.addEventListener("SHOWCASE_GO_NEXT", (function() {
//     "active" == $("#app #event").attr("data-status") && Ky < 2 && (l_(!0), er(), Ky++, t_()) // 
// })) 
// window.addEventListener("SHOWCASE_GO_PREV", (function() {
//     "active" == $("#app #event").attr("data-status") && Ky > 1 && (l_(!0), er(), Ky--, t_()) // t_ => 이벤트 움직임 함수
// }))