export function FORMAT_BILL_ID (id1, id2) {

    let ID1_SHOW;
    let ID2_SHOW;

    if(id1.length === 1){
        ID1_SHOW = "00"+id1;
    }

    if(id1.length === 2){
        ID1_SHOW = "0"+id1;
    }
    
    if(id1.length === 3){
        ID1_SHOW = id1;
    }

    if(id2.length === 1){
        ID2_SHOW = "00000"+id2;
    }

    if(id2.length === 2){
        ID2_SHOW = "0000"+id2;
    }

    if(id2.length === 3){
        ID2_SHOW = "000"+id2;
    }

    if(id2.length === 4){
        ID2_SHOW = "00"+id2;
    }

    if(id2.length === 5){
        ID2_SHOW = "0"+id2;
    }

    if(id2.length === 6){
        ID2_SHOW = id2;
    }

    return {ID1 : id1, ID2 : id2, ID1_SHOW : ID1_SHOW, ID2_SHOW : ID2_SHOW}

}