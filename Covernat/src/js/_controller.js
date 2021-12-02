import { page, appProgressBar_play, appProgressBar_reset } from "./_page.js";
import { getPreviousSiblings, getNextSiblings, getElementIndex } from "./_utils.js";

const activeElem =()=> document.querySelector('#app .page[data-status="active"]')
let isPageChanging = false;


function goToNext_Fn(){
    if(activeElem().id === "intro1" && page("intro1").stepNum === 1){
        page("intro1").stepNum = 2;
        page("intro1").start() 
    }
    else if(activeElem().id === "event" && page("event").stepNum === 1){
        page("event").stepNum = 2;
        page("event").start() 
    }
    else {
        if(activeElem().nextElementSibling){
            goToPage("next")
        }
    }
    console.log('goToNext_Fn')
    document.querySelector("#btnLayerNext").classList.remove("blink");
}

function goToPrev_Fn(){
    if(activeElem().id === "event" && page("event").stepNum === 2){
        page("event").stepNum = 1;
        page("event").start() 
    }
    else {
        if(activeElem().previousElementSibling){
            goToPage("prev")
        }
    }
    document.querySelector("#btnLayerNext").classList.remove("blink");
}

function goToPage(dir, nextPage){
    isPageChanging = true;
    console.log('isPageChanging:' + isPageChanging)
    const pageTime = 1;
    const pageEasing = 'Quart.easeInOut';
    const nowElem = document.querySelector('#app .page[data-status="active"]');
    let nextElem
    if(nextPage){
        nextElem = nextPage
    } else {
        nextElem = (dir === "next") ? nowElem.nextElementSibling : nowElem.previousElementSibling;
    }
    const pageT_dir = nextElem.getAttribute("data-move-dir");

    page(nowElem.id).stop()
    page(nextElem.id).reset(nextElem.id)
    
    pageStatusActive_Fn( nextElem )
    gsap.globalTimeline.clear();

    setTimeout(() => {
        gsap.set(nowElem, { zIndex: 4 }); 
        gsap.set(nextElem, { zIndex: 5 });

        switch( pageT_dir ){
            case "horizontal":
                pageT_Horizontal(nowElem, nextElem, dir, pageTime, pageEasing)
                break;
            case "curtain":
                pageT_Curtain(nowElem, nextElem, dir, pageTime, pageEasing)
                break;
            case "fade":
                pageT_Fade(nowElem, nextElem, dir, pageTime, pageEasing)
                break;
            default:
                pageT_Vertical(nowElem, nextElem, dir, pageTime, pageEasing)
        }

        appProgressBar_reset();
    }, 60);
}

/*
===== 페이지 트랜지션 상하 (기본) - data-move-dir="" ========================================
data-move-dir="" 
data-move-tytpe= "" | "linear" | "collapse"  
*/
function pageT_Vertical(nowElem, nextElem, dir, pageTime, pageEasing){
    const pageMoveType = (dir === "next") ? nextElem.getAttribute("data-move-type") : nowElem.getAttribute("data-move-type");

    const tl = gsap.timeline({ onComplete: ()=>{ 
        page(nextElem.id).start(nextElem.id); 
        isPageChanging = false; 
        console.log('isPageChanging:' + isPageChanging)
    }});
    if(dir === "next"){
        tl.fromTo(nowElem, { x: 0, y: 0 }, { x: 0, y: "-100%" , duration: pageTime, ease: pageEasing}, 0); 
        tl.fromTo(nextElem, { x: 0, y: "100%" }, { x: 0, y: 0 , duration: pageTime , ease: pageEasing}, 0);
        if( pageMoveType === "linear" ){
            tl.set(nowElem.querySelector(".page-inner"), { x: 0, y: 0 }, 0); 
            tl.set(nextElem.querySelector(".page-inner"), { x: 0, y: 0 }, 0);
        } 
        else if( pageMoveType === "collapse" ){
            tl.fromTo(nowElem.querySelector(".page-inner"), { x: 0, y: 0 }, { x: 0, y: "100%", duration: pageTime, ease: pageEasing }, 0); 
            tl.fromTo(nextElem.querySelector(".page-inner"), { x: 0, y: "-100%" }, { x: 0, y: 0, duration: pageTime, ease: pageEasing }, 0);
        }
        else {
            tl.fromTo(nowElem.querySelector(".page-inner"), { x: 0, y: 0 }, { x: 0, y: "75%", duration: pageTime, ease: pageEasing }, 0); 
            tl.fromTo(nextElem.querySelector(".page-inner"), { x: 0, y: "-75%" }, { x: 0, y: 0, duration: pageTime, ease: pageEasing }, 0);
        }
    }
    else {
        tl.fromTo(nextElem, { x: 0, y: "-100%" }, { x: 0, y: 0, duration: pageTime, ease: pageEasing }, 0) 
        tl.fromTo(nowElem, { x: 0, y: 0 }, { x: 0, y: "100%", duration: pageTime, ease: pageEasing }, 0)
        if( pageMoveType === "linear" ){
            tl.set(nowElem.querySelector(".page-inner"), { x: 0, y: 0 }, 0); 
            tl.set(nextElem.querySelector(".page-inner"), { x: 0, y: 0 }, 0);
        } 
        else if( pageMoveType === "collapse" ){
            tl.fromTo(nextElem.querySelector(".page-inner"), { x: 0, y: "100%" }, { x: 0, y: 0, duration: pageTime, ease: pageEasing }, 0); 
            tl.fromTo(nowElem.querySelector(".page-inner"), { x: 0, y: 0 }, { x: 0, y: "-100%", duration: pageTime, ease: pageEasing }, 0);
        }
        else {
            tl.fromTo(nextElem.querySelector(".page-inner"), { x: 0, y: "75%" }, { x: 0, y: 0, duration: pageTime, ease: pageEasing }, 0); 
            tl.fromTo(nowElem.querySelector(".page-inner"), { x: 0, y: 0 }, { x: 0, y: "-75%", duration: pageTime, ease: pageEasing }, 0);
        }
    }
}

/*
===== 페이지 트랜지션 좌우 - data-move-dir="horizontal"  ========================================
data-move-dir="horizontal" | "reverse-horizontal" 
data-move-tytpe= "" | "linear" | "collapse"  
*/
function pageT_Horizontal(nowElem, nextElem, dir, pageTime, pageEasing){
    const pageMoveType = (dir === "next") ? nextElem.getAttribute("data-move-type") : nowElem.getAttribute("data-move-type");

    const tl = gsap.timeline({ onComplete: ()=>{ 
        page(nextElem.id).start(nextElem.id); 
        isPageChanging = false; 
        console.log('isPageChanging:' + isPageChanging)
    }});
    if(dir === "next"){
        const nowTarget = (pageMoveType.indexOf("reverse") != -1) ? "100%" : "-100%";
        const nextStart = (pageMoveType.indexOf("reverse") != -1) ? "-100%" : "100%";
        tl.fromTo(nowElem, { y: 0, x: 0 }, {  y: 0,  x: nowTarget,  duration: pageTime, ease: pageEasing }, 0) 
        tl.fromTo(nextElem, { y: 0, x: nextStart }, { y: 0, x: 0, duration: pageTime, ease: pageEasing }, 0)
        
        if(pageMoveType.indexOf("linear") != -1){
            tl.set(nowElem.querySelector(".page-inner"), { x: 0, y: 0 }, 0); 
            tl.set(nextElem.querySelector(".page-inner"), { x: 0, y: 0 }, 0);
        }
        else if(pageMoveType.indexOf("collapse") != -1){
            tl.fromTo(nowElem.querySelector(".page-inner"), { x: 0, y: 0 }, { x: "100%", y: 0, duration: pageTime, ease: pageEasing }, 0); 
            tl.fromTo(nextElem.querySelector(".page-inner"), { x: "-100%", y: 0 }, { x: 0, y: 0, duration: pageTime, ease: pageEasing }, 0);
        }
        else {
            tl.fromTo(nowElem.querySelector(".page-inner"), { x: 0, y: 0 }, { x: "60%", y: 0, duration: pageTime, ease: pageEasing }, 0); 
            tl.fromTo(nextElem.querySelector(".page-inner"), { x:"-60%", y: 0 }, { x: 0, y: 0, duration: pageTime, ease: pageEasing }, 0);
        }
    }
    else {
        console.log(dir)
        const nowTarget = (pageMoveType.indexOf("reverse") != -1) ? "-100%" : "100%";
        const nextStart = (pageMoveType.indexOf("reverse") != -1) ? "100%" : "-100%";
        tl.fromTo(nowElem, { y: 0, x: 0 }, { y: 0, x: nowTarget, duration: pageTime, ease: pageEasing }, 0)
        tl.fromTo(nextElem, { y: 0,x: nextStart }, {y: 0, x: 0, duration: pageTime, ease: pageEasing }, 0) 
        
        if(pageMoveType.indexOf("linear") != -1){
            tl.set(nowElem.querySelector(".page-inner"), { x: 0, y: 0 }, 0); 
            tl.set(nextElem.querySelector(".page-inner"), { x: 0, y: 0 }, 0);
        }
        else if(pageMoveType.indexOf("collapse") != -1){
            tl.fromTo(nowElem.querySelector(".page-inner"), { x: 0, y: 0 }, { x: "-100%", y: 0, duration: pageTime, ease: pageEasing }, 0); 
            tl.fromTo(nextElem.querySelector(".page-inner"), { x: "100%", y: 0 }, { x: 0, y: 0, duration: pageTime, ease: pageEasing }, 0);
        }
        else {
            tl.fromTo(nowElem.querySelector(".page-inner"), { y: 0, x: 0 }, { y: 0, x: "-60%", duration: pageTime, ease: pageEasing }, 0)
            tl.fromTo(nextElem.querySelector(".page-inner"), { y: 0, x: "60%" }, { x: 0, y: 0, duration: pageTime, ease: pageEasing }, 0)
        }
    }

}

/*
====== 페이지 트랜지션 - data-move-dir="curtain"  ===============================================
*/
function pageT_Curtain(nowElem, nextElem, dir, pageTime, pageEasing){
    const tl = gsap.timeline({ onComplete: ()=>{ 
        page(nextElem.id).start(nextElem.id); 
        isPageChanging = false; 
        console.log('isPageChanging:' + isPageChanging)
    }});
    if(dir === "next"){
        tl.fromTo(nowElem.querySelector(".page-inner"), { y: 0, x: 0 }, { y: "100%", x: "0%", duration: pageTime, ease: pageEasing}, 0) 
        tl.fromTo(nowElem.querySelector(".curtain > *"), { scaleX: 0 }, { scaleX: 1, duration: pageTime, ease: pageEasing }, .75 * pageTime) 
        tl.fromTo(nextElem, { y: 0, x: 0, alpha: 0 }, { y: 0, x: 0, duration: pageTime, ease: Quart.easeOut }, .75 * pageTime) 
        tl.fromTo(nowElem, { y: 0, x: 0, alpha: 1 }, { y: 0, x: 0, alpha: 1, duration: pageTime, ease: Quart.easeOut }, .75 * pageTime) 
        tl.fromTo(nextElem.querySelector(".page-inner"), { y: 0, x: 0 }, { y: 0, x: 0, duration: pageTime, ease: Quart.easeOut }, .75 * pageTime) 
        tl.set(nextElem, { alpha: 1 })
    }   
    else{
        tl.fromTo(nowElem.querySelector(".curtain > *"), { scaleX: 1 }, { scaleX: 0, duration: pageTime, ease: pageEasing }, 0), 
        tl.fromTo(nowElem, { y: 0, x: 0, alpha: 0 }, { y: 0, x: 0, duration: pageTime, ease: Quart.easeOut }, 0), 
        tl.fromTo(nextElem, { y: 0, x: 0, alpha: 1 }, { y: 0, x: 0, alpha: 1, duration: pageTime, ease: Quart.easeOut }, 0), 
        tl.fromTo(nextElem.querySelector(".page-inner"), { y: 0, x: 0 }, { y: 0, x: 0, duration: pageTime, ease: Quart.easeOut }, 0), 
        tl.fromTo(nowElem.querySelector(".page-inner"), { y: 0, x: 0 }, { y: 0, x: "0%", duration: pageTime, ease: Quart.easeOut }, 0), 
        tl.set(nowElem, {  alpha: 1 })
    }
}

/*
======= 페이지 트랜지션 - data-move-dir="fade" =====================================================
*/
function pageT_Fade(nowElem, nextElem, dir, pageTime, pageEasing){
    const tl = gsap.timeline({ onComplete: ()=>{ 
        page(nextElem.id).start(nextElem.id); 
        isPageChanging = false; 
        console.log('isPageChanging:' + isPageChanging)
    }});
    if(dir === "next"){
        tl.fromTo(nowElem, { y: 0, x: 0 }, { y: 0, x: 0, duration: .5 * pageTime, ease: Quart.easeOut }, 0) 
        tl.fromTo(nextElem, { y: 0, x: 0, alpha: 0 }, { y: 0, x: 0, alpha: 1, duration: .5 * pageTime, ease: Quart.easeOut }, 0) 
        tl.fromTo(nowElem.querySelector(".page-inner"), { y: 0, x: 0 }, { y: 0, x: 0, duration: .5 * pageTime, ease: Quart.easeOut }, 0) 
        tl.fromTo(nextElem.querySelector(".page-inner"), { y: 0, x: "0%" }, { y: 0, x: 0, duration: .5 * pageTime,  ease: Quart.easeOut }, 0)
    }
    else {
        tl.fromTo(nowElem, { y: 0, x: 0 }, { y: 0, x: 0, duration: .5 * pageTime, ease: Quart.easeOut }, 0) 
        tl.fromTo(nextElem, { y: 0, x: 0, alpha: 0 }, { y: 0, x: 0, alpha: 1, duration: .5 * pageTime, ease: Quart.easeOut }, 0) 
        tl.fromTo(nextElem.querySelector(".page-inner"), { y: 0, x: 0 }, { y: 0, x: 0, duration: .5 * pageTime, ease: Quart.easeOut }, 0) 
        tl.fromTo(nowElem.querySelector(".page-inner"), { y: 0, x: 0 }, { y: 0, x: "0%", duration: .5 * pageTime, ease: Quart.easeOut }, 0)
    }
}

/*
===== data-status 변경 &  inputImageData_Fn 
활성화 될 page 의 data-status="active" 로 변경.
활성화 된 page 의 바로 이전, 다음 페이지 data-status="sibling" 으로 변경.
sibling 이전, 다음 page들을 data-status="next" | "prev" 로 변경.
inputImageData_Fn => 활성화 된 page 와 이전, 다음 페이지 이미지 대입.
*/
let reqId_pageTrans = null;
function pageStatusActive_Fn( elem ) { 
    inputImageData_Fn( elem )
    elem.setAttribute("data-status", "active")
    
    if(elem.previousElementSibling) elem.previousElementSibling.setAttribute("data-status", "sibling")
    if(elem.nextElementSibling) elem.nextElementSibling.setAttribute("data-status", "sibling")
    /* 페이지가 전환된 후  silbling 이외의 것들 체크 하기 */
    function pageSibling(){
        console.log(`isPageChanging: ${isPageChanging}`);
        if(!isPageChanging){
            getPreviousSiblings(elem).forEach(( item, i ) => { if(i > 0) item.setAttribute("data-status", "prev") })
            getNextSiblings(elem).forEach(( item,i ) => { if(i > 0) item.setAttribute("data-status", "next") })
            cancelAnimationFrame( reqId_pageTrans );
            return;
        }
        reqId_pageTrans = requestAnimationFrame( pageSibling );
    }
    pageSibling();
    /* -------------------------------------------------- */
}

/*
======  ata-stutus:acvive 와 앞 뒤 페이지 이미지 대입
*/
function inputImageData_Fn( elem ) { 
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


export {
    appProgressBar_play, appProgressBar_reset,
    activeElem,
    goToNext_Fn, goToPrev_Fn, goToPage,
    pageStatusActive_Fn,
    inputImageData_Fn,
    isPageChanging
}