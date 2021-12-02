var fy, py, my, gy = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let glitchTimeline;

function Ey(id) {
    glitchTimeline && (glitchTimeline.pause(), glitchTimeline.clear(), glitchTimeline = null);
    const elem = document.querySelector(`#${id}`);
    var rollingBackTotalNum = elem.querySelectorAll(".rolling-bg .rolling-back").length;

    gsap.set("#"+id+" .rolling-bg .rolling-back.b1", { alpha: 1 })
    activeIndex(elem, 0)
    let glitch;
    glitchTimeline =  gsap.timeline({
        // paused: true,
        repeat: rollingBackTotalNum > 1 ? -1 : 0,
        onStart: function () {
            console.log('onStart')
            activeIndex(elem, 0);
            gsap.set("#"+id+ " .rolling-bg .rolling-back.b1", { alpha: 1 })
        },
        onUpdate: function () { 
            switch (glitchTimeline.currentLabel()) {
                case "bgLoop_1":
                    activeIndex(elem, 0);
                    glitch = elem.querySelectorAll('.glitch')[0]
                    // if(!glitch.classList.contains('active')) glitch.classList.add('active')
                    break;
                case "bgLoop_2":
                    activeIndex(elem, 1);
                    glitch = elem.querySelectorAll('.glitch')[1]
                    // if(!glitch.classList.contains('active')) glitch.classList.add('active')
                    break;
                case "bgLoop_3":
                    glitch = elem.querySelectorAll('.glitch')[2]
                    // if(!glitch.classList.contains('active')) glitch.classList.add('active')
                    activeIndex(elem, 2);
                    
            }
        }
    }) 
    if( rollingBackTotalNum > 1 ){
        for(let i = 1; i <= rollingBackTotalNum; i++){
            let now = i
            let next = (i < rollingBackTotalNum) ? i + 1 : 1;
            glitchTimeline.set("#"+id + " .rolling-bg .rolling-back.b" + now, {
                zIndex: 1,
                onStart: ()=> {
                    console.log('onStart2')
                    elem.querySelectorAll('.glitch').forEach((glitch)=> glitch.classList.add('active'))
                }
            }, 2.2 * i - .3 - .3) 
            glitchTimeline.set("#"+id + " .rolling-bg .rolling-back.b" + now, { alpha: 0, duration: .3 }, 2.2 * i - .3) 

            glitchTimeline.addLabel("bgLoop_" + next, 2.2 * i - .3)

            glitchTimeline.set("#"+id+ " .rolling-bg .rolling-back.b" + next, { zIndex: 2 }, 2.2 * i - .3) 
            glitchTimeline.set("#"+id+ " .rolling-bg .rolling-back.b" + next, { alpha: 1, duration: .3 }, 2.2 * i - .3)
            glitchTimeline.set("#"+id+ " .rolling-bg .rolling-back.b" + next, { alpha: 1, duration: .3,
                onComplete: ()=> {
                    console.log('onComplete')
                    elem.querySelectorAll('.glitch').forEach((glitch)=> glitch.classList.remove('active') ) 
                }
            }, 2.2 * i - .3 + .3)
        }
    }

}

setTimeout(()=>{
    Ey("intro3");
    // glitchTimeline.play()
}, 1500)

function activeIndex(elem, num){
    elem.querySelectorAll(".indices .index").forEach((index, i)=>{
        if(i === num) index.classList.add('active')
        else        index.classList.remove('active')
    })
}

