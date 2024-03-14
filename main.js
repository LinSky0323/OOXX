const readlineSync=require("readline-sync")
const {create,getPlayer, upState, checkWin, changePlayer, PCMove}=require("./game")

function printBoard(board){
    console.log("-----------");
    for (const row of board){
        console.log(` ${row[0]} | ${row[1]} | ${row[2]} `);
        console.log("-----------")
    }
}

function twoPlayer(){
    let board=create();
    while(true){
    printBoard(board);
    console.log(`It is ${getPlayer()}'s turn .`);
    const input=readlineSync.question("Enter row and column(separate by space)");
    const p=input.split(" ");
    if(p.length!==2){
        console.log("聽話好嗎?");
        continue;
    };
    const[row,col]=p.map((x)=>parseInt(x));
    if(isNaN(row)||isNaN(col)){
        console.log("聽話好嗎?");
        continue;
    }
    const[newBoard,success]=upState(getPlayer(),[row,col],board);
    if(!success){
        console.log("聽話好嗎?");
        continue;
    }
    const winner=checkWin(newBoard)
    if(winner){
        printBoard(newBoard);
        if(winner==="平手"){
            console.log("平手!");
            break;
        }
        console.log(`${winner} win !`);
        break;
    }
    changePlayer();
    board=newBoard;

    }
}

function onePlayer(){
    let board=create();
    const isO=readlineSync.question("Do you play first? (y/n) :");
    let isF=isO==="y";


    while(true){
    let point=[];
    if(isF){
    printBoard(board);
    console.log("It's your turn .");
    const input=readlineSync.question("Enter row and column(separate by space)")
    const p=input.split(" ");
    if(p.length!==2){
    console.log("聽話好嗎?");
    continue;
    };
    point=p.map((x)=>parseInt(x));
    if(isNaN(point[0])||isNaN(point[1])){
    console.log("聽話好嗎?");
    continue;
    }}
    else{
        point=PCMove(getPlayer(),board)
    }
    const [newBoard,success]=upState(getPlayer(),point,board);
    if(!success){
        console.log("聽話好嗎?");
        continue;
    }
    const winner=checkWin(newBoard);
    if(winner){
        printBoard(newBoard);
        if(winner==="平手"){
            console.log("平手!");
            break;
        }
        console.log(`${winner} win !`);
        break;
    }
    changePlayer();
    board=newBoard;
    isF=!isF
}}

function main(){
const mode=readlineSync.question("Do you want to play sungle player? (y/n): ");
if(mode == "y"){
    return onePlayer();
}
return twoPlayer()
}

main()