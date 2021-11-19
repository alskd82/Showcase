class PageCover {
    constructor(){
        this.isFirst;
        this.isFinal;
        this.rollingBgNum = 1;
        this.intervalId = null;

        this.reset()    
    }
    reset(){
        this.kill();
        this.rollingBgNum = 1;

        gsap.set("#cover .back", { height: 0 }); 
        gsap.set("#cover .back.b1", { height: "100%" });
        gsap.set("#cover .slogan span", { alpha: 0, y: "-1vh" }); 
        gsap.set("#cover .showcase span", { alpha: 0, y: "-1vh" });
        gsap.set("#cover .title span", { alpha: 0, y: "-1vh" }); 
        this.isFirst = true;
        this.isFinal = false;
    }
    start(){
        this.tl = gsap.timeline({
            onUpdate: ()=>{ console.log('onUpdate') },
            onComplete: ()=>{ console.log('onComplete') }
        })
        tl.to("#cover .showcase span", { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut }, .2); 
        tl.to("#cover .title span", { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut }, .6); 
        tl.to("#cover .slogan span", { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut }, 1); 

        this.intervalId = setInterval(()=>{
            this.rollingBg()
        }, 2200);

    }
    stop(){
        if(this.intervalId != null) clearInterval(this.intervalId); this.intervalId = null;
        this.tl.pause()
    }
    kill(){
        if(this.intervalId != null) clearInterval(this.intervalId); this.intervalId = null;

        gsap.killTweensOf("#cover .back");
        gsap.killTweensOf("#cover .showcase span");
        gsap.killTweensOf("#cover .slogan span");
        gsap.killTweensOf("#cover .title span");
    }

    rollingBg(){
        this.rollingBgNum = this.rollingBgNum + 1 ;
        if(this.rollingBgNum > document.querySelectorAll("#cover .rolling-bg .back").length){
            this.rollingBgNum = 1;
        }
        gsap.fromTo("#cover .rolling-bg .b"+this.rollingBgNum , { height: "0%", zIndex: 2 }, { height: "100%", duration: 1, ease: Quart.easeInOut }), 
        gsap.set("#cover .rolling-bg .back:not(.b"+this.rollingBgNum +")", { height: "100%", zIndex: 1 })
    }
}

class PageIntro1  {
    constructor(){
        this.stepNum = 1;
        
        // this.animationSetting();
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

    animationSetting(){
        // this.tl_1 = gsap.timeline({
        //     // paused:true,
        //     onUpdate: ()=>{ console.log('onUpdate') /*console.log( this.tl_1.time() / this.tl_1.totalDuration() )*/ },
        //     onComplete: ()=>{ console.log('onComplete') }
        // }).to("#intro1 .photo", { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut }, 0) 
        // .to("#intro1 .title span", { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut }, .6)
        // .to("#intro1 .descriptions1 p", { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut, stagger: .4 }, 1.2);

        // this.tl_2 = gsap.timeline({
        //     paused:true,
        //     onUpdate: ()=>{ console.log('onUpdate') },
        //     onComplete: ()=>{ console.log('onComplete') }
        // }).to("#intro1 .photo .back", { height: "0%", duration: 1.4, ease: Quart.easeInOut }, .1) 
        //     .to("#intro1 .descriptions1", { y: "-1vh", alpha: 0, duration: 1.4, ease: Quart.easeOut }, .2) 
        //     .to("#intro1 .descriptions2", { alpha: 1, duration: 1, ease: Quart.easeOut }, 0) 
        //     .to("#intro1 .b2", { height: "100%", duration: 2, ease: Quart.easeInOut }, .6) 
        //     .to("#intro1 .descriptions2 p", { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut, stagger: .4 }, 1.6)
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
    constructor(opts){
        this.opts = {...opts};

        this.reset()
    }
    reset(){
        this.kill();

        gsap.set( `#${this.opts.id} .back.to-left`, { backgroundPosition: "100% 50%" }); 
        gsap.set( `#${this.opts.id} .back.to-right`, { backgroundPosition: "0% 50%" }); 
        gsap.set( `#${this.opts.id} .back.to-bottom`, { backgroundPosition: "50% 0%" }); 
        gsap.set( `#${this.opts.id} .back.to-top`, { backgroundPosition: "50% 100%" }); 
        gsap.set( `#${this.opts.id} .title span`, { alpha: 0, y: "-1.5vh" } ); 
        gsap.set( `#${this.opts.id} .descriptions p`, { alpha: 0, y: "-1.5vh" } );
    }
    start(){
        this.tl = gsap.timeline({
            onComplete: ()=>{},
            oonComplete:()=>{ }
        })
        .to( `#${this.opts.id} .back.to-right`, { backgroundPosition: "100% 50%", duration: 3, ease: Quart.easeInOut }, 0) 
        .to( `#${this.opts.id} .back.to-left`, { backgroundPosition: "0% 50%", duration: 3, ease: Quart.easeInOut }, 0) 
        .to( `#${this.opts.id} .back.to-bottom`, { backgroundPosition: "50% 100%", duration: 3, ease: Quart.easeInOut }, 0) 
        .to( `#${this.opts.id} .back.to-top`, { backgroundPosition: "50% 0%", duration: 3, ease: Quart.easeInOut }, 0)
        .to( `#${this.opts.id} .title span`, { alpha: 1, y: 0, duration: 2, ease: Quart.easeOut }, 1) 
        .to( `#${this.opts.id} .descriptions p`, { alpha: 1, y: 0, duration: 2, ease: Quart.easeOut, stagger: .4 }, 1.4);
    }
    stop(){
        this.tl.pause();
    }
    kill(){
        gsap.killTweensOf( `#${this.opts.id} .back` ); 
        gsap.killTweensOf( `#${this.opts.id} .title span`  ); 
        gsap.killTweensOf( `#${this.opts.id} .descriptions p` );
    }
}

class PageProductCover {
    constructor(opt){
        this.opt = {...opt}
        this.id = `#${this.opt.id}`;
        this.elem = document.querySelector(this.id);

        this.intervalId = null
        this.rollingBgNum = 1

        this.reset()
    }
    reset(){
        this.rollingBgNum = 1
        this.kill();

        const moveType = this.elem.getAttribute('data-move-type');
        const n = (moveType === "reverse") ? "-50%" : "50%";
        gsap.set( `${this.id} .rolling-bg`, { alpha: 0, x: n, y:"-50%" }); // gsap.set( `${this.id} .rolling-bg`, { alpha: 0, x: n });

        const i = (moveType === "reverse") ? "-100%" : "100%";
        gsap.set( `${this.id} .back` , { x: i }); 
        gsap.set( `${this.id} .back.m1` , { x: "0%" }); 
        gsap.set( `${this.id} .product-name span`, { alpha: 0, y: "-1.5vh" }); 
        
    }
    start(){
        this.tl = gsap.timeline({
            onUpdate: ()=>{},
            onComplete: ()=>{},
        })

        .to(`${this.id} .product-name span`, { alpha: 1, y: "0vh", duration: 2, ease: Quart.easeOut }, 0) 
        .to(`${this.id} .rolling-bg`, { alpha: 1, x: "-50%", y: "-50%", duration: 1.2, ease: Quart.easeInOut, onComplete: ()=>{
            this.intervalId = setInterval(()=>{
                this.rollingBg()
            }, 2200)
        } }, .6) 
        // t.to(`${this.id} .rolling-bg`, { alpha: 1, x: "0%", duration: 1.2, ease: Quart.easeInOut, onComplete: Ry }, .6), 
        .to(`${this.id} .rolling-bg`, { alpha: 1, duration: 2 }, 3);


    }
    stop(){
        if(this.intervalId != null) clearInterval(this.intervalId); this.intervalId = null;

        this.tl.pause()
    }
    kill(){
        if(this.intervalId != null) clearInterval(this.intervalId); this.intervalId = null;

        gsap.killTweensOf( `${this.id} .back` ); 
        gsap.killTweensOf( `${this.id} .descriptions p` ), 
        gsap.killTweensOf( `${this.id} .product-name span` )
        
    }

    rollingBg(){
        const rollingBgTotalNum = this.elem.querySelectorAll(".rolling-bg .back").length;
        const moveType = this.elem.getAttribute('data-move-type'); 
        
        const outNum = this.rollingBgNum;
        const inNum = (this.rollingBgNum === 1) ? 2 : 1;

        const goOutTarget = (moveType === "reverse")  ? "100%" : "-100%";
        const inComeStart = (moveType === "reverse") ? "-100%" : "100%";

        gsap.fromTo(`${this.id} .rolling-bg .m` + outNum , { x: "0%" }, { x: goOutTarget, duration: 1.2, ease: Quart.easeInOut }) // 사라질 이미지
        gsap.fromTo(`${this.id} .rolling-bg .m` + inNum , { x: inComeStart }, { x: "0%", duration: 1.2, ease: Quart.easeInOut}) // 등장할 이미지

        this.rollingBgNum++;
        if(this.rollingBgNum > rollingBgTotalNum ) this.rollingBgNum = 1
    }
    
}

class PageProductDetail {
    constructor(opt){
        this.opt = {...opt}
        this.id = `#${this.opt.id}`
        this.elem = document.querySelector(this.id);

        this.rollingBgNum = 1
        this.intervalId = null;
        this.reset()
    }
    reset(){
        this.rollingBgNum = 1
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
    start(){
        this.tl = gsap.timeline({
            onUpdate:()=>{},
            onComplete:()=>{}
        })
        .to(`${this.id} .descriptions p`, { alpha: 1, y: "0vh", duration: 1.4, ease: Quart.easeOut }, 0)
        .to(`${this.id} .product-name span`, { alpha: 1, y: "0vh", duration: 1.4, ease: Quart.easeOut }, .4)
        .to(`${this.id} .indices`, { alpha: 1, y: "0vh", duration: 1.4, ease: Quart.easeOut }, .8) 
        .to(`${this.id} .rolling-bg`, { alpha: 1, duration: 3 }, 3);

        this.intervalId = setInterval(()=>{
            this.rollingBg()
        }, 2200)
    }
    stop(){ 
        if(this.intervalId != null) clearInterval(this.intervalId); this.intervalId = null;
        this.tl.pause()

    }
    kill(){
        if(this.intervalId != null) clearInterval(this.intervalId); this.intervalId = null;

        gsap.killTweensOf(`${this.id} .back`) 
        gsap.killTweensOf(`${this.id} .descriptions p`) 
        gsap.killTweensOf(`${this.id} .product-name span`)

    }
    rollingBg(){
        const rollingBgTotalNum = this.elem.querySelectorAll(".rolling-bg .back").length;
        const moveType = this.elem.getAttribute('data-move-type');

        let goOutNum = this.rollingBgNum;
        let inComeNum = goOutNum + 1;
        if(inComeNum > rollingBgTotalNum) inComeNum = 1;
        

        const goOutTarget = moveType === 'reverse' ? "80%" : "-80%";
        const inComeStart = moveType === 'reverse' ? "-100%" : "100%";
        gsap.set(`${this.id} .rolling-bg .back`, { zIndex: 1 });

        gsap.fromTo(`${this.id} .rolling-bg .b` + goOutNum, { x: "0%", zIndex: 2 }, { x: goOutTarget, zIndex: 2, duration: 1.2, ease: Quart.easeInOut })
        gsap.fromTo(`${this.id} .rolling-bg .b` + inComeNum, { x: inComeStart, zIndex: 3 }, { x: "0%", zIndex: 3, duration: 1.2, ease: Quart.easeInOut })

        this.rollingBgNum++;
        if(this.rollingBgNum > rollingBgTotalNum ) this.rollingBgNum = 1;
    }
}

const pageCover = new PageCover();
const pageIntro1 = new PageIntro1();
const pageIntro2 = new PageIntro2();
const pageChapter1Cover = new PageChapterCover({ id: "chapter1Cover"});
const chapter1_1 = new PageProductCover({ id: "chapter1_1"});
const chapter1_1_detail = new PageProductDetail({ id: "chapter1_1_detail"});


function page(id){
    switch (id) {
        case "cover":
            return pageCover;
        case "intro1":
            return pageIntro1;
        case "intro2":
            return pageIntro2;
        case "chapter1Cover":
            return pageChapter1Cover;
        case "chapter1_1":
            return chapter1_1;
        case "chapter1_1_detail":
            return chapter1_1_detail;
    }
}




export {
    page
}
