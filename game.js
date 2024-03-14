const p1="O";
const p2="X";
const n=" ";
let player=0;

 function create(){
    return[[n,n,n],[n,n,n],[n,n,n]]
 }

 function upState(player,p,state){
    const i=p[0];
    const j=p[1];

    if(p[0]<0 || p[0]>state[0].length){
        return [state,false];
    }
    if(p[1]<0 || p[1]>state[0].length){
        return [state,false];
    }
    if(state[p[0]][p[1]]!==n){
        return [state,false];
    }
    const newState=state.map((row,rowIndex)=>{
        return row.map((i,columnIndex)=>{
            if(rowIndex===p[0] && columnIndex===p[1]){
                return player;
            }
            return i
        })
    })
    return [newState,true];
 }

 function checkWin(state){
    const winner=row(state) || column(state)||dig(state);
    const full=tie(state);
    if(winner != null){return winner};
    if(full){return "平手"};
    return null;
 }
 function row(state){
    for(const i of state){
        if(i.every(k=>k==i[0] && i[0]!=n)){
            return i[0];
        }
    }
    return null;
 }
 function column(state){
    for(let i=0;i<state.length;i++){
        const col=state.map((j)=>j[i]);
        if(col.every((value)=>value==col[0]) && col[0]!==n){
            return col[0];
        }
    }
    return null;
 }
 function dig(state){
    const d1=state.map((j,i)=>j[i])
    const d2=state.map((j,i)=>j[j.length-i-1])
    if(d1.every((value)=>value==d1[0]) && d1[0]!==n){
        return d1[0];
    }
    if(d2.every((value)=>value==d2[0]) && d2[0]!==n){
        return d2[0];
    }
    return null;
 }
 function tie(state){
    for(let i=0;i<state.length;i++){
        for(let j=0;j<state[i].length;j++){
            if(state[i][j] == n){
                return false
            }
        }
    }
    return true;
 }

function getPlayer(){
    if(player%2===0){
        return p1
    }
    else{
        return p2
    }
}

function changePlayer(){
    player+=1;
}

 module.exports = {
create,
upState,
checkWin,
p1,
p2,
n,
getPlayer,
changePlayer,
 }