import { page } from "./_page.js"

function goToNext_Fn(){
    const $activePage = document.querySelector('#app .page[data-status="active"]')
    if($activePage.id === 'intro1' && page('intro1').stepNum === 1){
        page('intro1').stepNum++;
        page('intro1').start()
    }
    
}

export {
    goToNext_Fn
}