const Game = class Gamelogic {
    constructor() {
        this.first = 1
        this.second = -1
        this.gameState = [[null, null, null], [null, null, null], [null, null, null]]
    }

    gameAction(move) {
        // takes a move formatted as a string eg 11, 22, 01 and applies it to the board
        let currentPlayer = currentTurn(this.gameState)
        this.gameState[move[0]][move[1]] = currentPlayer
    }

    simulateAction(move, state) {
        // takes a move formatted as a string and a current state and returns the board that results from that action
        let currentPlayer = currentTurn(state)
        let state_copy = JSON.parse(JSON.stringify(state))
        state_copy[move[0]][move[1]] = currentPlayer
        return(state_copy)
    }

    currentTurn(state){
        let first_count = 0
        let second_count = 0
        for (let line of state)
            for (let cell of line){
                if (cell == first) {
                    first_count += 1
                }
                if (cell == second) {
                    second_count += 1
                }
        if (first_count <= second_count){
            return(this.first)
        }
        else {
            return(this.second)
        }}}
    
    checkWinner(state, position) {
        //returns either -1 or +1 if currentplayer of the state has won
        //returns 0 if there is no winner
        let currentPlayer = currentTurn(state)
        let winner = 0
        //check current row
        for (let cell of state[position[0]]) {
            if (cell == currentPlayer) {
                winner += 1}}
        if (winner == 3) {
            return(currentPlayer)}
        //check current column
        winner = 0
        for (let row of state) {
            if (row[position[1]] == turn) {
                winner += 1 }}
        if (winner == 3) {
            return(currentPlayer)}
        //check diagonals
        
        const diagonals = [["00", "11", "22"], ["02", "11", "20"]]
        for (let diagonal of diagonals) {
            winner = 0
            if (diagonal.includes(position)) {
                for (i of diagonal) {
                    if (state[i[0]][i[1]] == turn) {
                        winner += 1
                    }}}
            if (winner == 3) {
                return(currentPlayer)
            }}
        return(0) 
    }
}



const Board = class Gameboard {
    constructor() {
        this.first = X
        this.second = O
    }

    createBoard() {
        let i = 0
        let gameArea = document.getElementById("game-area")
        gameArea.innerHTML = ""
        for (let line of gameState){
            let row = document.createElement("div") 
            for (let j in line) {
                let cell = document.createElement("div")
                cell.classList.add("box")
                cell.id = `${i}${j}`
                cell.addEventListener("click", () => {
                    this.updateBoard(`${i}${j}`)
                    gameAction(`${i}${j}`)
                }
                )
                gameArea.appendChild(cell)
            }
            i++  
        }
    }

    updateBoard(move) {
        // takes a move formatted as a string and updates the board
        let currentPlayer = Game.currentTurn(Game.gameState)
        if (currentPlayer == 1) {
            symbol = this.first
        }
        else {
            symbol = this.second
        }
        if (currentPlayer == 1) {
            cell = document.getElementById(move)
            cell.innerText = symbol
        }
    }

    resetBoard(){
        for (let i = 0; i <3; i++) {
            for (let j = 0; j < 3; j++) {
                cell = document.getElementById(`${i}${j}`)
                cell.innerText = ""
                }}
    }
}

class Player{
    constructor(title, turn, marker) {
        this.title = title
        this.turn = turn
        this.marker = marker
    }
}