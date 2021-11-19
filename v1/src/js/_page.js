class PageCover {
    constructor(){
        this.loopNum = 1;
        this.loopingTime = 2.2;
        this.reqID = null;
        this.t = 0;

        this.reset()    
    }
    reset(){
        this.kill();
        this.loopNum = 1;

        gsap.set("#cover .back", { height: 0 }); 
        gsap.set("#cover .back.b1", { height: "100%" });
        gsap.set("#cover .slogan span", { alpha: 0, y: "-1vh" }); 
        gsap.set("#cover .showcase span", { alpha: 0, y: "-1vh" });
        gsap.set("#cover .title span", { alpha: 0, y: "-1vh" }); 
    }
    start(){
        this.tl = gsap.timeline({
            onUpdate: ()=>{ },
            onComplete: ()=>{ }
        })
        .to("#cover .showcase span", { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut }, .2)
        .to("#cover .title span", { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut }, .6)
        .to("#cover .slogan span", { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut }, 1); 

        this.reqID = requestAnimationFrame(this.loop.bind(this));
    }
    stop(){
        this.cancelLoop();
        this.tl.pause()
    }
    kill(){
        this.cancelLoop()

        gsap.killTweensOf("#cover .back");
        gsap.killTweensOf("#cover .showcase span");
        gsap.killTweensOf("#cover .slogan span");
        gsap.killTweensOf("#cover .title span");
    }

    loop(time){
        this.t++
        // time *= 0.001
        this.reqID = requestAnimationFrame(this.loop.bind(this));
        if(this.t >= 60 * this.loopingTime){
            this.t = 0;
            this.rollingBg()
        }
    }

    rollingBg(){
        const loopTotalNum = document.querySelectorAll("#cover .rolling-bg .back").length;
        const nextNum = (this.loopNum + 1 > loopTotalNum) ? 1 : this.loopNum + 1;
        gsap.fromTo("#cover .rolling-bg .b" + nextNum , { height: "0%", zIndex: 2 }, { height: "100%", duration: 1, ease: Quart.easeInOut }); 
        gsap.set("#cover .rolling-bg .back:not(.b"+ nextNum +")", { height: "100%", zIndex: 1 });
        this.loopNum = nextNum;
    }

    cancelLoop(){
        if(this.reqID != null){
            cancelAnimationFrame( this.reqID );
            this.reqID = null
        }
    }
}

class PageIntro1  {
    constructor(){
        this.stepNum = 1;
        
        this.reset();
    }
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
                this.tl_1 = gsap.timeline({
                    // paused:true,
                    onUpdate: ()=>{ console.log('onUpdate') /*console.log( this.tl_1.time() / this.tl_1.totalDuration() )*/ },
                    onComplete: ()=>{ console.log('onComplete') }
                })
                .to("#intro1 .photo", { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut }, 0) 
                .to("#intro1 .title span", { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut }, .6)
                .to("#intro1 .descriptions1 p", { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut, stagger: .4 }, 1.2);
                break;
            
            case 2:
                if(this.tl_1) this.tl_1.pause();
                this.tl_2 = gsap.timeline({
                    // paused:true,
                    onUpdate: ()=>{ console.log('onUpdate') },
                    onComplete: ()=>{ console.log('onComplete') }
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
        if(this.tl_1) this.tl_1.pause()
        if(this.tl_2) this.tl_2.pause()
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
    constructor(){

        this.reset();
    }
    reset(){
        this.kill();
        gsap.set("#intro2 .descriptions p", { alpha: 0, y: "-1vh" })
    }
    start(){
        this.tl = gsap.timeline({
            onUpdate: ()=>{ },
            onComplete:()=>{ }
        })
        .to("#intro2 .descriptions p", { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut, stagger: .4 }, .8);
    }
    stop(){
        this.tl.pause()
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
        if(this.elem.querySelector(".back.to-left")) gsap.set( `${this.id} .back.to-left`, { backgroundPosition: "100% 50%" });
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
            onUpdate: ()=>{},
            onComplete:()=>{}
        })
        .to( `${this.id} .back.to-right`, { backgroundPosition: "100% 50%", duration: 3, ease: Quart.easeInOut }, 0) 
        .to( `${this.id} .back.to-left`, { backgroundPosition: "0% 50%", duration: 3, ease: Quart.easeInOut }, 0) 
        .to( `${this.id} .back.to-bottom`, { backgroundPosition: "50% 100%", duration: 3, ease: Quart.easeInOut }, 0) 
        .to( `${this.id} .back.to-top`, { backgroundPosition: "50% 0%", duration: 3, ease: Quart.easeInOut }, 0)
        .to( `${this.id} .title span`, { alpha: 1, y: 0, duration: 2, ease: Quart.easeOut }, 1) 
        .to( `${this.id} .descriptions p`, { alpha: 1, y: 0, duration: 2, ease: Quart.easeOut, stagger: .4 }, 1.4);
    }
    stop(id){
        this.id = `#${id}`;
        this.elem = document.querySelector(this.id);

        this.tl.pause();
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
            onUpdate: ()=>{},
            onComplete: ()=>{},
        })
        .to(`${this.id} .product-name span`, { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut }, 0) 
        .to(`${this.id} .rolling-bg`, { alpha: 1, x: "0%", duration: 1.2, ease: Quart.easeInOut, 
            onComplete: ()=>{
                this.reqID = requestAnimationFrame(this.loop.bind(this));
            } 
        }, .6) 
        .to(`${this.id} .rolling-bg`, { alpha: 1, duration: 2 }, 3);
    }
    stop(id){
        this.id = `#${id}`;
        this.elem = document.querySelector(this.id);
        this.tl.pause();

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
            onUpdate:()=>{},
            onComplete:()=>{}
        })
        .to(`${this.id} .descriptions p`, { alpha: 1, y: "0vh", duration: 1.4, ease: Quart.easeOut }, 0)
        .to(`${this.id} .product-name span`, { alpha: 1, y: "0vh", duration: 1.4, ease: Quart.easeOut }, .4)
        .to(`${this.id} .indices`, { alpha: 1, y: "0vh", duration: 1.4, ease: Quart.easeOut }, .8) 
        .to(`${this.id} .rolling-bg`, { alpha: 1, duration: 3 }, 3);

        this.reqID = requestAnimationFrame(this.loop.bind(this));
    }
    stop(){ 
        this.cancelLoop()
        this.tl.pause()

    }
    kill(){
        this.cancelLoop()

        gsap.killTweensOf(`${this.id} .back`) 
        gsap.killTweensOf(`${this.id} .descriptions p`) 
        gsap.killTweensOf(`${this.id} .product-name span`)
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

        const nextNum = this.loopNum+1 > loopTotalNum ? 1 : this.loopNum+1

        const goOutTarget = moveType === 'reverse' ? "80%" : "-80%";
        const inComeStart = moveType === 'reverse' ? "-100%" : "100%";
        gsap.set(`${id} .rolling-bg .back`, { zIndex: 1 });

        gsap.fromTo(`${id} .rolling-bg .b` + this.loopNum, { x: "0%", zIndex: 2 }, { x: goOutTarget, zIndex: 2, duration: 1.2, ease: Quart.easeInOut })
        gsap.fromTo(`${id} .rolling-bg .b` + nextNum, { x: inComeStart, zIndex: 3 }, { x: "0%", zIndex: 3, duration: 1.2, ease: Quart.easeInOut })

        this.loopNum = nextNum;
    }
}

const pageCover = new PageCover();
const pageIntro1 = new PageIntro1();
const pageIntro2 = new PageIntro2();

const pageChapterCover = new PageChapterCover();
const pageProductCover = new PageProductCover();
const pageProductDetail = new PageProductDetail();

// const pageChapter1Cover = new PageChapterCover({ id: "chapter1Cover"});
// const chapter1_1 = new PageProductCover({ id: "chapter1_1"});
// const chapter1_1_detail = new PageProductDetail({ id: "chapter1_1_detail"});


function page(id){
    switch (id) {
        case "cover":
            return pageCover;
        case "intro1":
            return pageIntro1;
        case "intro2":
            return pageIntro2;
        case "chapter1Cover":
            return pageChapterCover;

        case "chapter1_1":
        case "chapter1_2":
        // case "chapter1_3":
        // case "chapter1_4":
        // case "chapter1_5":
            return pageProductCover;
        case "chapter1_1_detail":
        case "chapter1_2_detail":
        // case "chapter1_3_detail":
        // case "chapter1_4_detail":
        // case "chapter1_5_detail":
            return pageProductDetail;

    }
}



export {
    page
}
