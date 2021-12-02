

const appProgressBar_play=(_x)=> gsap.set("#app .app-progress-bar", { scaleX: _x });
const appProgressBar_reset=()=> gsap.set("#app .app-progress-bar", { scaleX: 0 })
const update=(tl)=> appProgressBar_play( tl.totalTime() / tl.totalDuration())

let sr = null;
function complete(){
    /* 자동재생 이면 4초 후 페이지 자동 전환 */
    clearTimeout(sr);
    sr = null;
    if( document.querySelector("#app").getAttribute("data-status") === "autoplaying" ){
        const time = document.querySelector('.page[data-status="active"]').dataset.duration > 0 ? document.querySelector('.page[data-status="active"]').dataset.duration : 4e3;
        sr = setTimeout(()=>{
            window.dispatchEvent(new CustomEvent("SHOWCASE_GO_NEXT"))
        }, time)
    }
    /* -------------------------------------- */
    document.querySelector("#btnLayerNext").classList.add("blink");
}

class PageCover {

    reset(){
        this.loopNum = 1;
        this.loopingTime = 2.4;
        this.t = 0;
        this.cancelLoop();

        this.kill();

        gsap.set("#cover .back", { alpha: 0 })
        gsap.set("#cover .fog1", { backgroundPosition: "0% 0%" })
        gsap.set("#cover .fog2", { backgroundPosition: "100% 0%" })
        gsap.set("#cover .showcase span", { y: "20%", alpha: 0 })
        gsap.set("#cover .slogan p", { y: "20%", alpha: 0 })
        gsap.set("#cover .logo img", { alpha: 0 })
    }

    start(){
        this.tl = gsap.timeline({
            onUpdate: ()=>{ update(this.tl) },
            onComplete: ()=>{ complete() }
        })
        .to("#cover .back", { alpha: 1, duration: 2, stagger: .2 }, 0)
        .to("#cover .showcase span", { alpha: 1, y: "0%", duration: 1.4, ease: Quart.easeOut }, .2)
        .to("#cover .logo1 img", { alpha: 1, y: "0%", duration: 1.4, ease: Quart.easeOut }, .4)
        .to("#cover .slogan p", { alpha: 1, y: "0%", duration: 1.4, stagger: .2, ease: Quart.easeOut }, .6)
        .to("#cover .logo1 img", { alpha: 0, y: "0%", duration: 1.4, ease: Quart.easeOut }, 2)
        .fromTo("#cover .logo2 .top", { alpha: 0, x: "20%" }, { alpha: 1, x: "0%", duration: 1, ease: Quart.easeInOut }, 2.4)
        .fromTo("#cover .logo2 .bottom", { alpha: 0, y: "-5%" }, { alpha: 1, y: "0%", duration: 1, ease: Quart.easeInOut, onComplete:this.loop.bind(this)}, 2.8)
        gsap.to("#cover .fog1", { backgroundPosition: "100% 0%", ease: Quad.easeInOut, duration: 20, yoyo: true, repeat: false })
        gsap.to("#cover .fog2", { backgroundPosition: "0% 0%", ease: Quad.easeInOut, duration: 20, yoyo: true, repeat: false })
        
        this.ur = 0
    }
    stop(){
        this.cancelLoop();
        if(this.tl) this.tl.pause()
    }

    kill(){
        gsap.killTweensOf("#cover .back")
        gsap.killTweensOf("#cover .showcase span")
        gsap.killTweensOf("#cover .slogan p")
        gsap.killTweensOf("#cover .logo img")
    }

    loop(time){
        // console.log("loop")
        this.t++
        // time *= 0.001
        this.reqID = requestAnimationFrame(this.loop.bind(this));
        if(this.t >= 60 * this.loopingTime){
            this.t = 0;
            this.rollingBg()
        }
    }

    cancelLoop(){
        if(this.reqID != null || this.reqID === undefined){
            cancelAnimationFrame( this.reqID );
            this.reqID = null
            console.log("loop finish")
        }
    }

    rollingBg(){
        console.log('rollingBg')
        if( this.ur % 2 === 0){
            gsap.to("#cover .logo1 img", { alpha: 1, duration: .5 })
            gsap.to("#cover .logo2 img", { alpha: 0, duration: .5 })
        } else {
            gsap.to("#cover .logo2 img", { alpha: 1, duration: .5 })
            gsap.to("#cover .logo1 img", { alpha: 0, duration: .5 })
        }
        this.ur++;
    }
}

class PageIntro {
    reset(id){
        this.id = `#${id}`
        this.elem = document.querySelector(this.id);
        
        this.kill();

        gsap.set(this.id + " .static .back", { scale: 1 })
        gsap.set(this.id + " .descriptions p", { alpha: 0, y: "20%" })
        gsap.set(this.id + " .img img", { alpha: 0, scale: .5 })
        gsap.set(this.id + " .rolling-bg .rolling-back", { alpha: 0 })
        gsap.set(this.id + " .rolling-bg .rolling-back.b1", { alpha: 1 })

        if(this.Vv){
            this.Vv.pause()
            this.Vv.clear()
            this.Vv = null
        }

        this.activeIndex(0)
        // this.elem.querySelectorAll(".glitch").forEach((glitch, i)=>{
        //     glitch.classList.remove('active')
        // })

    }
    start(id){
        this.id = `#${id}`
        this.elem = document.querySelector(this.id);

        this.tl = gsap.timeline({
            onUpdate: ()=>{ update(this.tl) },
            onComplete: ()=>{ complete() }
        })
        .to(this.id + " .descriptions p", { y: "0%", alpha: 1, duration: 1.4, ease: Quart.easeOut, stagger: .2 }, .2)
        .to(this.id + " .img img", { alpha: 1, duration: 1 }, 0)
        gsap.to(this.id + " .static .back", { scale: 1.3, duration: 20, ease: Quad.easeNone })
        gsap.to(this.id + " .img img", { scale: 1, duration: 2, ease: Quart.easeOut })
        // ------- [rolling-bg 가 있는 경우] ------------------------- //
        // if(this.elem.querySelector('.rolling-bg .back')){
            
        //     const rollingBackTotalNum = this.elem.querySelectorAll(".rolling-bg .rolling-back").length;
        //     gsap.set( this.id + " .rolling-bg .rolling-back.b1", { alpha: 1} )
        //     this.activeIndex(0)

        //     this.Vv = gsap.timeline({
        //         repeat: rollingBackTotalNum > 1 ? -1 : 0,
        //         onStart:()=>{
        //             this.activeIndex(0)
        //             gsap.set(this.id + " .rolling-bg .rolling-back.b1", { alpha: 1 })
        //         },
        //         onUpdate:()=>{
        //             switch(this.Vv.currentLabel()){
        //                 case "bgLoop_1":
        //                     this.activeIndex(0)
        //                     break;
        //                 case "bgLoop_2":
        //                     this.activeIndex(1)
        //                     break;
        //                 case "bgLoop_3":
        //                     this.activeIndex(2)
        //                     break;
        //             }
        //         }
        //     })

        //     for(let i = 1; i <= rollingBackTotalNum; i++){
        //         let now = i
        //         let next = (i < rollingBackTotalNum) ? i + 1 : 1;
        //         this.Vv.set(this.id + " .rolling-bg .rolling-back.b" + now, {
        //             zIndex: 1,
        //             onStart: ()=> {
        //                 console.log('onStart')
        //                 this.elem.querySelectorAll('.glitch').forEach((glitch)=> glitch.classList.add('active'))
        //             }
        //         }, 2.2 * i - .3 - .3) 
        //         this.Vv.set(this.id + " .rolling-bg .rolling-back.b" + now, { alpha: 0, duration: .3 }, 2.2 * i - .3) 

        //         this.Vv.addLabel("bgLoop_" + next, 2.2 * i - .3)

        //         this.Vv.set(this.id + " .rolling-bg .rolling-back.b" + next, { zIndex: 2 }, 2.2 * i - .3) 
        //         this.Vv.set(this.id + " .rolling-bg .rolling-back.b" + next, { alpha: 1, duration: .3 }, 2.2 * i - .3)
        //         this.Vv.set(this.id + " .rolling-bg .rolling-back.b" + next, { alpha: 1, duration: .3,
        //             onComplete: ()=> {
        //                 this.elem.querySelectorAll('.glitch').forEach((glitch)=> glitch.classList.add('active') ) 
        //             }
        //         }, 2.2 * i - .3 + .3)
        //     }
        // }
    }
    stop(){
        if(this.tl) this.tl.pause()
        if(this.Vv) this.Vv.pause()

    }
    kill(){
        gsap.killTweensOf(`${this.id} .back`)
        gsap.killTweensOf(`${this.id} .img img`)
        gsap.killTweensOf(`${this.id} .descriptions p`)
    }

    activeIndex(num){
        this.elem.querySelectorAll(".indices .index").forEach((index, i)=>{
            if(i === num) index.classList.add('active')
            else        index.classList.remove('active')
        })
    }
}

document.querySelectorAll("#intro4 .digit").forEach((digit, i)=>{
    let n = digit.innerHTML.toString();
    digit.setAttribute("data-val", n)
})
const _ALPHABET_ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
class PageIntroLast{
    reset(){
        this.kill();

        gsap.set("#intro4 .delorean img" , { alpha: 0, scale: 0 })
        gsap.set("#intro4 .overlay", { alpha: 0 })
        document.querySelectorAll("#intro4 .time").forEach((elem , i)=>{
            elem.querySelectorAll('.digit').forEach((digit, j)=>{
                digit.tick = 0
                this.digitUpdate(digit)
            })
        })
    }
    start(){
        this.tl = gsap.timeline({
            onUpdate: ()=>{ update(this.tl) },
            onComplete: ()=>{ complete() }
        })

        document.querySelectorAll("#intro4 .time").forEach((elem, i)=>{
            elem.querySelectorAll('.digit').forEach((digit, j)=>{
                digit.tick = 0
                this.tl.to(digit,{
                    alpha: 1,
                    duration: 1.6 + .8 * i,
                    onUpdate: this.digitUpdate,
                    onUpdateParams: [digit],
                    onComplete: this.digitComplete,
                    onCompleteParams: [digit]
                }, 0)
            })
        })
        this.tl.to("#intro4 .times", { alpha: 1, duration: .3 })
    }

    digitUpdate(elem){
        if (elem.tick % 2 == 0) {
            const val = elem.getAttribute("data-val");
            const type = elem.getAttribute("data-type");
            let randomSort = ""
            for(let i=0; i < val.length; i++ ){
                if(type === "num"){
                    randomSort += Math.floor(10 * Math.random()) + ""
                } else {
                    randomSort += _ALPHABET_.charAt(Math.floor(_ALPHABET_.length * Math.random())) + "";
                }
            }
            elem.innerHTML = randomSort
        }
        elem.tick++
    }

    digitComplete(elem){
        elem.innerHTML = elem.getAttribute("data-val")
    }

    stop(){
        if(this.tl) this.tl.pause()
    }
    kill(){
        gsap.killTweensOf( "#intro4 .delorean img" )
        gsap.killTweensOf( "#intro4 .overlay" )
    }

}



// class PageChapterCover {

//     reset(id){
//         this.id = `#${id}`;
//         this.elem = document.querySelector(this.id);

//         this.kill(id);
//         if(this.elem.querySelector(".back.to-left")) gsap.set( this.elem.querySelector(".back.to-left"), { backgroundPosition: "100% 50%" });
//         else if(this.elem.querySelector(".back.to-right")) gsap.set( `${this.id} .back.to-right`, { backgroundPosition: "0% 50%" }); 
//         else if(this.elem.querySelector(".back.to-bottom")) gsap.set( `${this.id} .back.to-bottom`, { backgroundPosition: "50% 0%" });  
//         else if(this.elem.querySelector(".back.to-top")) gsap.set( `${this.id} .back.to-top`, { backgroundPosition: "50% 100%" });  
//         gsap.set( `${this.id} .title span`, { alpha: 0, y: "-1.5vh" } ); 
//         gsap.set( `${this.id} .descriptions p`, { alpha: 0, y: "-1.5vh" } );
//     }
//     start(id){
//         this.id = `#${id}`;
//         this.elem = document.querySelector(this.id);

//         this.tl = gsap.timeline({
//             onUpdate: ()=>{ update(this.tl) },
//             onComplete: ()=>{ complete() }
//         })
//         .to( `${this.id} .back.to-right`, { backgroundPosition: "100% 50%", duration: 3, ease: Quart.easeInOut }, 0) 
//         .to( `${this.id} .back.to-left`, { backgroundPosition: "0% 50%", duration: 3, ease: Quart.easeInOut }, 0) 
//         .to( `${this.id} .back.to-bottom`, { backgroundPosition: "50% 100%", duration: 3, ease: Quart.easeInOut }, 0) 
//         .to( `${this.id} .back.to-top`, { backgroundPosition: "50% 0%", duration: 3, ease: Quart.easeInOut }, 0)
//         .to( `${this.id} .title span`, { alpha: 1, y: 0, duration: 2, ease: Quart.easeOut }, 1) 
//         .to( `${this.id} .descriptions p`, { alpha: 1, y: 0, duration: 2, ease: Quart.easeOut, stagger: .4 }, 1.4);
//     }
//     stop(){
//         if(this.tl) this.tl.pause()
//     }
//     kill(id){
//         this.id = `#${id}`;
//         this.elem = document.querySelector(this.id);

//         gsap.killTweensOf( `${this.id} .back` ); 
//         gsap.killTweensOf( `${this.id} .title span` ); 
//         gsap.killTweensOf( `${this.id} .descriptions p` );
//     }
// }

// class PageProductCover {

//     reset(id){
//         this.id = `#${id}`;
//         this.elem = document.querySelector(this.id);

//         this.loopNum = 1
//         this.loopingTime = 2.2;
//         this.reqID = null;
//         this.t = 0;

//         this.kill();

//         const moveType = this.elem.getAttribute('data-move-type');
//         const n = (moveType === "reverse") ? "-50%" : "50%";
//         gsap.set( `${this.id} .rolling-bg`, { alpha: 0, x: n });

//         const i = (moveType === "reverse") ? "-100%" : "100%";
//         gsap.set( `${this.id} .back` , { x: i }); 
//         gsap.set( `${this.id} .back.m1` , { x: "0%" }); 
//         gsap.set( `${this.id} .product-name span`, { alpha: 0, y: "-1.5vh" }); 
        
//     }
//     start(id){
//         this.id = `#${id}`;
//         this.elem = document.querySelector(this.id);

//         this.tl = gsap.timeline({
//             onUpdate: ()=>{ update(this.tl) },
//             onComplete: ()=>{ complete() }
//         })
//         .to(`${this.id} .product-name span`, { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut }, 0) 
//         .to(`${this.id} .rolling-bg`, { alpha: 1, x: "0%", duration: 1.2, ease: Quart.easeInOut, 
//             onComplete: ()=>{
//                 this.reqID = requestAnimationFrame(this.loop.bind(this));
//             } 
//         }, .6) 
//         .to(`${this.id} .rolling-bg`, { alpha: 1, duration: 2 }, 3);
//     }
//     stop(){
//         if(this.tl) this.tl.pause()
//         this.cancelLoop();
//     }
//     kill(){
//         gsap.killTweensOf( `${this.id} .back` ); 
//         gsap.killTweensOf( `${this.id} .descriptions p` ); 
//         gsap.killTweensOf( `${this.id} .product-name span` );
        
//         this.cancelLoop();
//     }

//     loop(time){
//         // time *= 0.001
//         console.log('loop')
//         this.t++;
//         this.reqID = requestAnimationFrame(this.loop.bind(this));
//         if(this.t >= 60 * this.loopingTime){
//             this.t = 0;
//             this.rollingBg(this.id)
//         }
//     }

//     cancelLoop(){
//         if(this.reqID != null){
//             cancelAnimationFrame( this.reqID );
//             this.reqID = null;
//         }
//     }

//     rollingBg(id){
//         const elem = document.querySelector(id);

//         const loopTotalNum = elem.querySelectorAll(".rolling-bg .back").length;
//         const moveType = elem.getAttribute('data-move-type'); 

//         const nextNum = this.loopNum + 1 > loopTotalNum ? 1 : this.loopNum + 1;
//         const goOutTarget = (moveType === "reverse")  ? "100%" : "-100%";
//         const inComeStart = (moveType === "reverse") ? "-100%" : "100%";

//         gsap.fromTo(`${id} .rolling-bg .m` + this.loopNum , { x: "0%" }, { x: goOutTarget, duration: 1.2, ease: Quart.easeInOut }) // 사라질 이미지
//         gsap.fromTo(`${id} .rolling-bg .m` + nextNum , { x: inComeStart }, { x: "0%", duration: 1.2, ease: Quart.easeInOut}) // 등장할 이미지
        
//         this.loopNum = nextNum;
//     }
    
// }

// class PageProductDetail {

//     reset(id){
//         this.id = `#${id}`
//         this.elem = document.querySelector(this.id);

//         this.loopNum = 1;
//         this.loopingTime = 2.2;
//         this.reqID = null;
//         this.t = 0;

//         this.kill();

//         const moveType = this.elem.getAttribute('data-move-type');
//         const _x = moveType === "reverse" ? "-100%" : "100%";

//         gsap.set(`${this.id} .rolling-bg .back`, { x: _x }); 
//         gsap.set(`${this.id} .rolling-bg .back.b1`, { x: "0%" }); 
//         gsap.set(`${this.id} .descriptions p`, { alpha: 0, y: "-1.5vh" }); 
//         gsap.set(`${this.id} .product-name span`, { alpha: 0, y: "-1.5vh" }); 
//         gsap.set(`${this.id} .indices`, { alpha: 0, y: "-1.5vh" }); 

//         this.elem.querySelectorAll(".indices .index").forEach((index, i)=>{
//             if(i === 0) index.classList.add("active");
//             else        index.classList.remove("active");
//         })
//         // this.elem.querySelector(".indices .index:first-child").classList.add("active")
//     }
//     start(id){
//         this.id = `#${id}`
//         this.elem = document.querySelector(this.id);

//         this.tl = gsap.timeline({
//             onUpdate: ()=>{ update(this.tl) },
//             onComplete: ()=>{ complete() }
//         })
//         .to(`${this.id} .descriptions p`, { alpha: 1, y: "0vh", duration: 1.4, ease: Quart.easeOut }, 0)
//         .to(`${this.id} .product-name span`, { alpha: 1, y: "0vh", duration: 1.4, ease: Quart.easeOut }, .4)
//         .to(`${this.id} .indices`, { alpha: 1, y: "0vh", duration: 1.4, ease: Quart.easeOut }, .8) 
//         .to(`${this.id} .rolling-bg`, { alpha: 1, duration: 3 }, 3);

//         this.reqID = requestAnimationFrame(this.loop.bind(this));
//     }
//     stop(){ 
//         this.cancelLoop()
//         if(this.tl) this.tl.pause()

//     }
//     kill(){
//         this.cancelLoop()

//         gsap.killTweensOf(`${this.id} .back`) 
//         gsap.killTweensOf(`${this.id} .descriptions p`) 
//         gsap.killTweensOf(`${this.id} .product-name span`)
//     }

//     loop(time){
//         // time *= 0.001
//         this.t++;
//         this.reqID = requestAnimationFrame(this.loop.bind(this));
//         if(this.t >= 60 * this.loopingTime){
//             this.t = 0;
//             this.rollingBg(this.id)
//         }
//     }

//     cancelLoop(){
//         if(this.reqID != null){
//             cancelAnimationFrame( this.reqID );
//             this.reqID = null;
//         }
//     }
    
//     rollingBg(id){
//         const elem = document.querySelector(id);

//         const loopTotalNum = elem.querySelectorAll(".rolling-bg .back").length;
//         const moveType = elem.getAttribute('data-move-type');

//         const nextNum = this.loopNum+1 > loopTotalNum ? 1 : this.loopNum+1

//         const goOutTarget = moveType === 'reverse' ? "80%" : "-80%";
//         const inComeStart = moveType === 'reverse' ? "-100%" : "100%";
//         gsap.set(`${id} .rolling-bg .back`, { zIndex: 1 });

//         gsap.fromTo(`${id} .rolling-bg .b` + this.loopNum, { x: "0%", zIndex: 2 }, { x: goOutTarget, zIndex: 2, duration: 1.2, ease: Quart.easeInOut });
//         gsap.fromTo(`${id} .rolling-bg .b` + nextNum, { x: inComeStart, zIndex: 3 }, { x: "0%", zIndex: 3, duration: 1.2, ease: Quart.easeInOut });

//         document.querySelectorAll(`${id} .indices .index`).forEach((item, i)=>{
//             if(i === nextNum-1) item.classList.add('active')
//             else              item.classList.remove('active')
//         })
//         this.loopNum = nextNum;
//     }
// }

// class PageEvent {

//     reset(){
//         this.stepNum = 1;

//         // gsap.set("#event .bg-over", { alpha: 0 }) 
//         gsap.set("#event .event1", { alpha: 0, left: "50%" }) 
//         gsap.set("#event .event2", { alpha: 0, left: "200%" })  
//         gsap.set("#event .indices", { alpha: 0 })
//         gsap.set("#event .btn", { alpha: 0 })
//         this.indexActive(this.stepNum)
//     }
//     start(){
//         switch (this.stepNum){
//             case 1:
//                 this.tl = gsap.timeline({
//                     onUpdate: ()=>{ update(this.tl) },
//                     onComplete: ()=>{ complete() }
//                 })
//                 .to("#event .event1", { left: "50%", alpha: 1, duration: 1, ease: Quart.easeInOut}, 0)
//                 .to("#event .event2", { left: "200%", alpha: 1, duration: 1, ease: Quart.easeInOut }, 0) 
//                 .to("#event .indices", { alpha: 1, duration: .8 }, .4);
//                 break;
//             case 2:
//                 this.tl = gsap.timeline({
//                     onUpdate: ()=>{ update(this.tl) },
//                     onComplete: ()=>{ complete() }
//                 })
//                 .to("#event .event1", { left: "-200%", alpha: 1, duration: 1, ease: Quart.easeInOut}, 0) 
//                 .to("#event .event2", { left: "50%", alpha: 1, duration: 1, ease: Quart.easeInOut }, 0) 
//                 .to("#event .indices", { alpha: 1, duration: .8 }, .4)
//                 break;
//         }
//         this.indexActive(this.stepNum)
//         gsap.killTweensOf("#event .btn")
//         gsap.fromTo("#event .btn", { alpha: 0 }, { alpha: 1, yoyo: true, duration: .5, repeatDelay: .5, repeat: -1 })
//     }
//     stop(){
//         if(this.tl) this.tl.pause()
//     }
//     kill(){
//         gsap.killTweensOf("#event .event") 
//         gsap.killTweensOf("#event .btn")
//     }

//     complete(){

//     }

//     indexActive(n){
//         document.querySelectorAll("#event .indices .index").forEach((item, i)=>{
//             if(i+1 === n) item.classList.add("active")
//             else        item.classList.remove("active")
//         })
//     }
// }

const pageCover = new PageCover();
const pageIntro = new PageIntro();
const pageIntroLast = new PageIntroLast();


// const pageChapterCover = new PageChapterCover();
// const pageProductCover = new PageProductCover();
// const pageProductDetail = new PageProductDetail();

// const pageEvent = new PageEvent();


function page(id){
    switch (id) {
        case "cover":
            return pageCover;
        case "intro1":
        case "intro2":
        case "intro3":
            return pageIntro;
        case "intro4":
            return pageIntroLast;
        case "chapter1Cover":
        case "chapter2Cover":
            return pageChapterCover;

        case "chapter1_1":
        case "chapter1_2":
        case "chapter2_1":
            return pageProductCover;
        case "chapter1_1_detail":
        case "chapter1_2_detail":
        case "chapter2_1_detail":
            return pageProductDetail;
        
        case "event":
            return pageEvent;
    }
}




export {
    page, appProgressBar_play, appProgressBar_reset
}
