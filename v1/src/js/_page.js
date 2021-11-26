

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
        this.loopingTime = 2.2;
        this.t = 0;
        this.cancelLoop();
        
        this.kill();

        gsap.set("#cover .back", { height: 0 }); 
        gsap.set("#cover .back.b1", { height: "100%" });
        gsap.set("#cover .slogan span", { alpha: 0, y: "-1vh" }); 
        gsap.set("#cover .showcase span", { alpha: 0, y: "-1vh" });
        gsap.set("#cover .title span", { alpha: 0, y: "-1vh" }); 

    }
    start(){
        this.tl = gsap.timeline({
            onUpdate: ()=>{ update(this.tl) },
            onComplete: ()=>{ complete() }
        })
        .to("#cover .showcase span", { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut }, .2)
        .to("#cover .title span", { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut }, .6)
        .to("#cover .slogan span", { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut }, 1); 

        this.reqID = requestAnimationFrame(this.loop.bind(this));
    }
    stop(){
        this.cancelLoop();
        if(this.tl) this.tl.pause()
    }
    kill(){
        gsap.killTweensOf("#cover .back");
        gsap.killTweensOf("#cover .showcase span");
        gsap.killTweensOf("#cover .slogan span");
        gsap.killTweensOf("#cover .title span");
    }

    loop(time){
        console.log("loop")
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
        }
    }

    rollingBg(){
        const loopTotalNum = document.querySelectorAll("#cover .rolling-bg .back").length;
        const nextNum = (this.loopNum + 1 > loopTotalNum) ? 1 : this.loopNum + 1;
        gsap.fromTo("#cover .rolling-bg .b" + nextNum , { height: "0%", zIndex: 2 }, { height: "100%", duration: 1, ease: Quart.easeInOut }); 
        gsap.set("#cover .rolling-bg .back:not(.b"+ nextNum +")", { height: "100%", zIndex: 1 });
        this.loopNum = nextNum;
    }

    
}

class PageIntro1  {

    reset(){
        this.stepNum = 1;
        this.kill();

        gsap.set("#intro1 .b2", { height: "0%" }), 
        gsap.set("#intro1 .photo", { alpha: 0, y: "-2vh" }), 
        gsap.set("#intro1 .photo .back", { height: "100%" }), 
        gsap.set("#intro1 .title", { alpha: 1, y: "0" }), 
        gsap.set("#intro1 .title span", { alpha: 0, y: "-1vh" }), 
        gsap.set("#intro1 .descriptions", { alpha: 0, y: 0 }), 
        gsap.set("#intro1 .descriptions1", { alpha: 1 }), 
        gsap.set("#intro1 .descriptions p", { alpha: 0, y: "-1vh" })
    }

    start(){
        switch(this.stepNum){
            case 1:
                this.tl = gsap.timeline({
                    // paused:true,
                    onUpdate: ()=>{ update(this.tl) },
                    onComplete: ()=>{ complete() }
                })
                .to("#intro1 .photo", { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut }, 0) 
                .to("#intro1 .title span", { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut }, .6)
                .to("#intro1 .descriptions1 p", { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut, stagger: .4 }, 1.2);
                break;
            
            case 2:
                this.tl = gsap.timeline({
                    // paused:true,
                    onUpdate: ()=>{ update(this.tl)},
                    onComplete: ()=>{ complete() }
                })
                .to("#intro1 .title", { y: "-1vh", alpha: 0, duration: 1.4, ease: Quart.easeOut}, 0)
                .to("#intro1 .photo .back", { height: "0%", duration: 1.4, ease: Quart.easeInOut }, .1) 
                .to("#intro1 .descriptions1", { y: "-1vh", alpha: 0, duration: 1.4, ease: Quart.easeOut }, .2) 
                .to("#intro1 .descriptions2", { alpha: 1, duration: 1, ease: Quart.easeOut }, 0) 
                .to("#intro1 .b2", { height: "100%", duration: 2, ease: Quart.easeInOut }, .6) 
                .to("#intro1 .descriptions2 p", { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut, stagger: .4 }, 1.6)
                break;
        }
    }
    stop(){
        if(this.tl) this.tl.pause()
    }
    kill(){
        gsap.killTweensOf("#intro1 .back")
        gsap.killTweensOf("#intro1 .photo")
        gsap.killTweensOf("#intro1 .title")
        gsap.killTweensOf("#intro1 .title span")
        gsap.killTweensOf("#intro1 .descriptions")
        gsap.killTweensOf("#intro1 .descriptions p")
    }
}

class PageIntro2 {
    reset(){
        this.kill();
        gsap.set("#intro2 .descriptions p", { alpha: 0, y: "-1vh" })
    }
    start(){
        this.tl = gsap.timeline({
            onUpdate: ()=>{ update(this.tl) },
            onComplete: ()=>{ complete() }
        })
        .to("#intro2 .descriptions p", { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut, stagger: .4 }, .8);
    }
    stop(){
        if(this.tl) this.tl.pause()
    }
    kill(){
        gsap.killTweensOf("#intro2 .descriptions p")
    }
}

class PageChapterCover {

    reset(id){
        this.id = `#${id}`;
        this.elem = document.querySelector(this.id);

        this.kill(id);
        if(this.elem.querySelector(".back.to-left")) gsap.set( this.elem.querySelector(".back.to-left"), { backgroundPosition: "100% 50%" });
        else if(this.elem.querySelector(".back.to-right")) gsap.set( `${this.id} .back.to-right`, { backgroundPosition: "0% 50%" }); 
        else if(this.elem.querySelector(".back.to-bottom")) gsap.set( `${this.id} .back.to-bottom`, { backgroundPosition: "50% 0%" });  
        else if(this.elem.querySelector(".back.to-top")) gsap.set( `${this.id} .back.to-top`, { backgroundPosition: "50% 100%" });  
        gsap.set( `${this.id} .title span`, { alpha: 0, y: "-1.5vh" } ); 
        gsap.set( `${this.id} .descriptions p`, { alpha: 0, y: "-1.5vh" } );
    }
    start(id){
        this.id = `#${id}`;
        this.elem = document.querySelector(this.id);

        this.tl = gsap.timeline({
            onUpdate: ()=>{ update(this.tl) },
            onComplete: ()=>{ complete() }
        })
        .to( `${this.id} .back.to-right`, { backgroundPosition: "100% 50%", duration: 3, ease: Quart.easeInOut }, 0) 
        .to( `${this.id} .back.to-left`, { backgroundPosition: "0% 50%", duration: 3, ease: Quart.easeInOut }, 0) 
        .to( `${this.id} .back.to-bottom`, { backgroundPosition: "50% 100%", duration: 3, ease: Quart.easeInOut }, 0) 
        .to( `${this.id} .back.to-top`, { backgroundPosition: "50% 0%", duration: 3, ease: Quart.easeInOut }, 0)
        .to( `${this.id} .title span`, { alpha: 1, y: 0, duration: 2, ease: Quart.easeOut }, 1) 
        .to( `${this.id} .descriptions p`, { alpha: 1, y: 0, duration: 2, ease: Quart.easeOut, stagger: .4 }, 1.4);
    }
    stop(){
        if(this.tl) this.tl.pause()
    }
    kill(id){
        this.id = `#${id}`;
        this.elem = document.querySelector(this.id);

        gsap.killTweensOf( `${this.id} .back` ); 
        gsap.killTweensOf( `${this.id} .title span` ); 
        gsap.killTweensOf( `${this.id} .descriptions p` );
    }
}

class PageProductCover {

    reset(id){
        this.id = `#${id}`;
        this.elem = document.querySelector(this.id);

        this.loopNum = 1
        this.loopingTime = 2.2;
        this.reqID = null;
        this.t = 0;

        this.kill();

        const moveType = this.elem.getAttribute('data-move-type');
        const n = (moveType === "reverse") ? "-50%" : "50%";
        gsap.set( `${this.id} .rolling-bg`, { alpha: 0, x: n });

        const i = (moveType === "reverse") ? "-100%" : "100%";
        gsap.set( `${this.id} .back` , { x: i }); 
        gsap.set( `${this.id} .back.m1` , { x: "0%" }); 
        gsap.set( `${this.id} .product-name span`, { alpha: 0, y: "-1.5vh" }); 
        
    }
    start(id){
        this.id = `#${id}`;
        this.elem = document.querySelector(this.id);

        this.tl = gsap.timeline({
            onUpdate: ()=>{ update(this.tl) },
            onComplete: ()=>{ complete() }
        })
        .to(`${this.id} .product-name span`, { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut }, 0) 
        .to(`${this.id} .rolling-bg`, { alpha: 1, x: "0%", duration: 1.2, ease: Quart.easeInOut, 
            onComplete: ()=>{
                this.reqID = requestAnimationFrame(this.loop.bind(this));
            } 
        }, .6) 
        .to(`${this.id} .rolling-bg`, { alpha: 1, duration: 2 }, 3);
    }
    stop(){
        if(this.tl) this.tl.pause()
        this.cancelLoop();
    }
    kill(){
        gsap.killTweensOf( `${this.id} .back` ); 
        gsap.killTweensOf( `${this.id} .descriptions p` ); 
        gsap.killTweensOf( `${this.id} .product-name span` );
        
        this.cancelLoop();
    }

    loop(time){
        // time *= 0.001
        console.log('loop')
        this.t++;
        this.reqID = requestAnimationFrame(this.loop.bind(this));
        if(this.t >= 60 * this.loopingTime){
            this.t = 0;
            this.rollingBg(this.id)
        }
    }

    cancelLoop(){
        if(this.reqID != null){
            cancelAnimationFrame( this.reqID );
            this.reqID = null;
        }
    }

    rollingBg(id){
        const elem = document.querySelector(id);

        const loopTotalNum = elem.querySelectorAll(".rolling-bg .back").length;
        const moveType = elem.getAttribute('data-move-type'); 

        const nextNum = this.loopNum + 1 > loopTotalNum ? 1 : this.loopNum + 1;
        const goOutTarget = (moveType === "reverse")  ? "100%" : "-100%";
        const inComeStart = (moveType === "reverse") ? "-100%" : "100%";

        gsap.fromTo(`${id} .rolling-bg .m` + this.loopNum , { x: "0%" }, { x: goOutTarget, duration: 1.2, ease: Quart.easeInOut }) // 사라질 이미지
        gsap.fromTo(`${id} .rolling-bg .m` + nextNum , { x: inComeStart }, { x: "0%", duration: 1.2, ease: Quart.easeInOut}) // 등장할 이미지
        
        this.loopNum = nextNum;
    }
    
}

class PageProductDetail {

    reset(id){
        this.id = `#${id}`
        this.elem = document.querySelector(this.id);

        this.loopNum = 1;
        this.loopingTime = 2.2;
        this.reqID = null;
        this.t = 0;

        this.kill();

        const moveType = this.elem.getAttribute('data-move-type');
        const _x = moveType === "reverse" ? "-100%" : "100%";

        gsap.set(`${this.id} .rolling-bg .back`, { x: _x }); 
        gsap.set(`${this.id} .rolling-bg .back.b1`, { x: "0%" }); 
        gsap.set(`${this.id} .descriptions p`, { alpha: 0, y: "-1.5vh" }); 
        gsap.set(`${this.id} .product-name span`, { alpha: 0, y: "-1.5vh" }); 
        gsap.set(`${this.id} .indices`, { alpha: 0, y: "-1.5vh" }); 

        this.elem.querySelectorAll(".indices .index").forEach((index, i)=>{
            if(i === 0) index.classList.add("active");
            else        index.classList.remove("active");
        })
        // this.elem.querySelector(".indices .index:first-child").classList.add("active")
    }
    start(id){
        this.id = `#${id}`
        this.elem = document.querySelector(this.id);

        this.tl = gsap.timeline({
            onUpdate: ()=>{ update(this.tl) },
            onComplete: ()=>{ complete() }
        })
        .to(`${this.id} .descriptions p`, { alpha: 1, y: "0vh", duration: 1.4, ease: Quart.easeOut }, 0)
        .to(`${this.id} .product-name span`, { alpha: 1, y: "0vh", duration: 1.4, ease: Quart.easeOut }, .4)
        .to(`${this.id} .indices`, { alpha: 1, y: "0vh", duration: 1.4, ease: Quart.easeOut }, .8) 
        .to(`${this.id} .rolling-bg`, { alpha: 1, duration: 3 }, 3);

        this.reqID = requestAnimationFrame(this.loop.bind(this));
    }
    stop(){ 
        this.cancelLoop()
        if(this.tl) this.tl.pause()

    }
    kill(){
        this.cancelLoop()

        gsap.killTweensOf(`${this.id} .back`) 
        gsap.killTweensOf(`${this.id} .descriptions p`) 
        gsap.killTweensOf(`${this.id} .product-name span`)
    }

    loop(time){
        // time *= 0.001
        this.t++;
        this.reqID = requestAnimationFrame(this.loop.bind(this));
        if(this.t >= 60 * this.loopingTime){
            this.t = 0;
            this.rollingBg(this.id)
        }
    }

    cancelLoop(){
        if(this.reqID != null){
            cancelAnimationFrame( this.reqID );
            this.reqID = null;
        }
    }
    
    rollingBg(id){
        const elem = document.querySelector(id);

        const loopTotalNum = elem.querySelectorAll(".rolling-bg .back").length;
        const moveType = elem.getAttribute('data-move-type');

        const nextNum = this.loopNum+1 > loopTotalNum ? 1 : this.loopNum+1

        const goOutTarget = moveType === 'reverse' ? "80%" : "-80%";
        const inComeStart = moveType === 'reverse' ? "-100%" : "100%";
        gsap.set(`${id} .rolling-bg .back`, { zIndex: 1 });

        gsap.fromTo(`${id} .rolling-bg .b` + this.loopNum, { x: "0%", zIndex: 2 }, { x: goOutTarget, zIndex: 2, duration: 1.2, ease: Quart.easeInOut });
        gsap.fromTo(`${id} .rolling-bg .b` + nextNum, { x: inComeStart, zIndex: 3 }, { x: "0%", zIndex: 3, duration: 1.2, ease: Quart.easeInOut });

        document.querySelectorAll(`${id} .indices .index`).forEach((item, i)=>{
            if(i === nextNum-1) item.classList.add('active')
            else              item.classList.remove('active')
        })
        this.loopNum = nextNum;
    }
}

class PageEvent {

    reset(){
        this.stepNum = 1;

        // gsap.set("#event .bg-over", { alpha: 0 }) 
        gsap.set("#event .event1", { alpha: 0, left: "50%" }) 
        gsap.set("#event .event2", { alpha: 0, left: "200%" })  
        gsap.set("#event .indices", { alpha: 0 })
        gsap.set("#event .btn", { alpha: 0 })
        this.indexActive(this.stepNum)
    }
    start(){
        switch (this.stepNum){
            case 1:
                this.tl = gsap.timeline({
                    onUpdate: ()=>{ update(this.tl) },
                    onComplete: ()=>{ complete() }
                })
                .to("#event .event1", { left: "50%", alpha: 1, duration: 1, ease: Quart.easeInOut}, 0)
                .to("#event .event2", { left: "200%", alpha: 1, duration: 1, ease: Quart.easeInOut }, 0) 
                .to("#event .indices", { alpha: 1, duration: .8 }, .4);
                break;
            case 2:
                this.tl = gsap.timeline({
                    onUpdate: ()=>{ update(this.tl) },
                    onComplete: ()=>{ complete() }
                })
                .to("#event .event1", { left: "-200%", alpha: 1, duration: 1, ease: Quart.easeInOut}, 0) 
                .to("#event .event2", { left: "50%", alpha: 1, duration: 1, ease: Quart.easeInOut }, 0) 
                .to("#event .indices", { alpha: 1, duration: .8 }, .4)
                break;
        }
        this.indexActive(this.stepNum)
        gsap.killTweensOf("#event .btn")
        gsap.fromTo("#event .btn", { alpha: 0 }, { alpha: 1, yoyo: true, duration: .5, repeatDelay: .5, repeat: -1 })
    }
    stop(){
        if(this.tl) this.tl.pause()
    }
    kill(){
        gsap.killTweensOf("#event .event") 
        gsap.killTweensOf("#event .btn")
    }

    complete(){

    }

    indexActive(n){
        document.querySelectorAll("#event .indices .index").forEach((item, i)=>{
            if(i+1 === n) item.classList.add("active")
            else        item.classList.remove("active")
        })
    }
}

const pageCover = new PageCover();
const pageIntro1 = new PageIntro1();
const pageIntro2 = new PageIntro2();

const pageChapterCover = new PageChapterCover();
const pageProductCover = new PageProductCover();
const pageProductDetail = new PageProductDetail();

const pageEvent = new PageEvent();


function page(id){
    switch (id) {
        case "cover":
            return pageCover;
        case "intro1":
            return pageIntro1;
        case "intro2":
            return pageIntro2;
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
