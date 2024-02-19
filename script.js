
let currentPlayer = "x";
const NUMBER_OF_ROWS = 4;
const turns = NUMBER_OF_ROWS**2;
let turnsCounter = 0;

const createBoardArray = ()=>{
    let board = [];
    for(let rows = 0 ; rows < NUMBER_OF_ROWS; rows++){
        board.push(Array.from({length:NUMBER_OF_ROWS}, ()=>"_"));
    }
    return board;
}
let board = createBoardArray();
const resetButton = document.querySelector("#reset");

const getCellPlacement = (index,numberOfRow)=>{
    const row = Math.floor(index/numberOfRow);
    const column = index % numberOfRow;
    return [row,column]

} 
const checkRow = (currentPlayer)=> {
    let col = 0;
    for(let row = 0; row < NUMBER_OF_ROWS ; row++){
        while(col< NUMBER_OF_ROWS){
            if(board[row][col] !== currentPlayer){
                col = 0;
                break;
            }
            col++;
            if(col === NUMBER_OF_ROWS){
                return true;
            }
        }
    }
}
const checkColomn = (currentPlayer)=> {
    let row = 0;
    for(let col = 0; col < NUMBER_OF_ROWS ; col++){
        while(row < NUMBER_OF_ROWS){
            if(board[row][col] !== currentPlayer){
                row = 0;
                break;
            }
            row++;
            if(row === NUMBER_OF_ROWS){
                return true;
            }
        }
    }
}
const checkCross = ()=>{
    let col = 0;
        while(col< NUMBER_OF_ROWS){
            if(board[col][col] !== currentPlayer){
                col = 0;
                break;
            }
            col++;
            if(col === NUMBER_OF_ROWS){
                return true;
            }
        }
}
const checkCrossReverse = ()=>{
    let col = 2;
        while(col >= 0 ){
            if(board[col][NUMBER_OF_ROWS - 1 -col] !== currentPlayer){
                col = 0;
                break;
            }
            col++;
            if(col === NUMBER_OF_ROWS){
                return true;
            }
        }
}

const checkWin = (currentPlayer)=> {
   /*
    return(
        checkRow(currentPlayer) ||
        checkColomn(currentPlayer) ||
        checkCross(currentPlayer) ||
        checkCrossReverse(currentPlayer)
    );
    نفس اللى تحت 
    */
    if(checkRow(currentPlayer)) return true;
    if(checkColomn(currentPlayer)) return true;
    if(checkCross(currentPlayer)) return true;
    if(checkCrossReverse(currentPlayer)) return true;
    
    
    
}; 

const runEventWin = (currentPlayer) => {
    setTimeout(()=> {
        alert(` player ${currentPlayer} won`);
        makeReset();
    },100 )
    
}
const runDrawEvent = ()=>{
    setTimeout(()=>{
        alert("Draw");
        makeReset();
    },100)
}
const makeReset = ()=>{

    board = createBoardArray();
    document.querySelector(".board").remove();
    createBoard();
    currentPlayer = "x";
    turnsCounter =0;
}

const cellClickHandler = (event,index)=>{
    const cell = event.target;
    const [row,col] = getCellPlacement(index,NUMBER_OF_ROWS); 

    if(board[row][col] === "_"){
        turnsCounter++;
        board[row][col] = currentPlayer;

        cell.querySelector(".value").textContent = currentPlayer
        cell.classList.add(`cell--${currentPlayer}`);
    }

    if(checkWin(currentPlayer)){
        runEventWin(currentPlayer);

    }else{
        turnsCounter === turns &&  runDrawEvent();  // if condition
        currentPlayer = (currentPlayer === "x") ? "o" : "x"; //if condition
    }
}

const createBoard = ()=> {
    const container = document.querySelector(".container");
    const boardDiv = document.createElement("div");
    boardDiv.classList.add("board");

    for (let i = 0 ; i <= turns ; i++){
        const cellElementString = `<div class="cell" role="button" tabindex="${i+1}"><span class="value"></span></div>`
        const cellElement = document.createRange().createContextualFragment(cellElementString);
        //must this first before append
    
        cellElement.querySelector(".cell").onclick = (event) => cellClickHandler(event,i);
        //accesability 
        //whey click on tab make (if click enter put mark and return true (why? for moving to next cell whent enter tab))
        cellElement.querySelector(".cell").onkeydown = (event) =>event.key==="Enter"? cellClickHandler(event,i): true;

        boardDiv.appendChild(cellElement);

        document.documentElement.style.setProperty("--grid-rows",NUMBER_OF_ROWS)
    }
    container.insertAdjacentElement("afterbegin",boardDiv);
}
resetButton.addEventListener("click",makeReset)

createBoard();

