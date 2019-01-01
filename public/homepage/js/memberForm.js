$(document).ready(function(){
    let isFirstClick = true;
           
    $('button[name="forward"]').click( function (){
        if(isFirstClick) {
            isFirstClick = false;
            let numberOfMem = parseInt($('input[name="numberOfMem"]')[0].value);
            let numOfdeleted = 5 - numberOfMem;
            for(;numOfdeleted > 0; numOfdeleted--){
                $('div[data-mark="after"]')[0].remove();
            }
        }
    })
    
  });