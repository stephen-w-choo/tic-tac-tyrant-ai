let initGame = (firstPlayer, secondPlayer) => {
    let players = [firstPlayer, secondPlayer]
    let currentPlayer = firstPlayer
    let gameState = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    let currentTurn = 0
    
    function createBoard() {
        i = 0
        gameArea = document.getElementById("game-area")
        gameArea.innerHTML = ""
        for (line of gameState){
            row = document.createElement("div") 
            for (j in line) {
                cell = document.createElement("div")
                cell.classList.add("box")
                cell.id = `${i}${j}`
                cell.addEventListener("click", () => {
                    this.currentPlayer.makeMove(event.target.id)
                }
                )
                gameArea.appendChild(cell)
                      
            }
            i++  
        }
    }

    function changeTurn(){
        this.currentTurn += 1
        this.currentPlayer = this.players[(this.currentTurn % 2)]
    }

    function updateBoard(turn, position,marker) {
        // will function only if square has not already been filled
        if (gameState[position[0]][position[1]] == 0){
            gameState[position[0]][position[1]] = turn
            document.getElementById(position).style.backgroundColor = "red"
            document.getElementById(position).innerText = marker
            return(true)
        }
        return(false)
    }

    function checkWinner(turn, position) {
        //check current row
        let winner = 0
        for (cell of gameState[position[0]]) {
            if (cell == turn) {
                winner += 1}}
        if (winner == 3) {
            return(true)}
        //check column
        winner = 0
        for (row of gameState) {
            if (row[position[1]] == turn) {
                winner += 1 }}
        if (winner == 3) {
            return(true)}
        //check diagonals
        
        const diagonals = [["00", "11", "22"], ["02", "11", "20"]]
        for (diagonal of diagonals) {
            winner = 0
            if (diagonal.includes(position)) {
                for (i of diagonal) {
                    if (gameState[i[0]][i[1]] == turn) {
                        winner += 1
                    }
                }
            }
            if (winner == 3) {
                return(true)
            }
        }
        return(false)
    }

    return{
        currentPlayer,
        players,
        currentTurn,
        gameState,
        changeTurn,
        createBoard,
        updateBoard,
        checkWinner
    }
};



let Player = (name, turn, marker) => { //X will be assigned as 1, O will be assigned as 2
    function makeMove(position) {
        if (Gameboard.updateBoard(turn, position, marker) == true)
            {
                if (Gameboard.checkWinner(turn, position) == true)
                    {
                        console.log("winner!")
                    }
                Gameboard.changeTurn()
            }
    }
    return {
        name,
        turn,
        marker,
        makeMove,
    }
}

document.getElementById("start").addEventListener("click", () =>{
    let firstPlayer = Player("Stephen", 1, "X")
    let secondPlayer = Player("Computer", 2, "O") 
    Gameboard = initGame(firstPlayer, secondPlayer)
    Gameboard.createBoard()
})

