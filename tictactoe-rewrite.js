class Gamelogic {
    constructor() {
        this.first = 1
        this.second = -1
        this.gameState = [[null, null, null], [null, null, null], [null, null, null]]
        this.human = null
        this.turncounter = 0
    }

    resetGameLogic(){
        this.gameState = [[null, null, null], [null, null, null], [null, null, null]]
        this.turncounter = 0
    }

    currentTurn(){
        // returns the currentplayer in the gamelogic
        if (this.turncounter % 2 == 0){
            return this.first
        }
        return this.second
    }

    gameAction(move, player) {
        // takes a move formatted as a string eg 11, 22, 01 and applies it to the board
        // updates turn counter by one
        
        this.gameState[move[0]][move[1]] = player
        this.turncounter++
    }

    checkWinner(state, position) {
        //returns either -1 or +1 if currentplayer of the state has won on a move
        //returns 0 if there is a draw
        //returns null if the game isn't over
        let currentPlayer = state[position[0]][position[1]]
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
            if (row[position[1]] == currentPlayer) {
                winner += 1 }}
        if (winner == 3) {
            return(currentPlayer)}
        
        //check diagonals
        const diagonals = [["00", "11", "22"], ["02", "11", "20"]]
        for (let diagonal of diagonals) {
            winner = 0
            if (diagonal.includes(position)) {
                for (let i of diagonal) {
                    if (state[i[0]][i[1]] == currentPlayer) {
                        winner += 1
                    }}}
            if (winner == 3) {
                return(currentPlayer)
            }}

        // checks for any remaining moves - returns null if moves still remaining
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (state[i][j] == null) {
                    return(null)
                }}}
        return(0) 
    }
1
}

class tyrantAI extends Gamelogic {
    simulateAction(state, move) {
        // takes a move formatted as a string and a current state and returns the board that results from that action
        let currentPlayer = this.checkTurn(state)
        let state_copy = JSON.parse(JSON.stringify(state))
        state_copy[move[0]][move[1]] = currentPlayer
        return(state_copy)
    }

    possibleActions(state) {
        // returns all possible actions from a given state as an array of strings
        let possibleActions = []
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (state[i][j] == null) {
                    possibleActions.push(`${i}${j}`)
                }
            }
        }
        return(possibleActions)
    }

    checkTurn(state){
        // returns a turn in the current state (+1/-1)
        let count = 0
        for (let line of state) {
            for (let cell of line){
                if (cell) {
                    count += 1
                }
            }
        }
        if (count % 2 == 0){
            return(this.first)
        }
        else {
            return(this.second)
        }
    }

    minimax(state) {
        // takes a board and returns the move with the highest utility for the current player if terminal
        let self = this
        function max_value(state, move){
            let v = -999
            let utility = self.checkWinner(state, move)
            if (utility != null){
                return(utility)
            }
            for (let action of self.possibleActions(state)) {
                v = Math.max(v, min_value(self.simulateAction(state, action), action))
            }
            return(v)
        }
        function min_value(state, move) {
            let v = 999
            let utility = self.checkWinner(state, move)
            if (utility != null){
                return(utility)
            }
            for (let action of self.possibleActions(state)) {
                v = Math.min(v, max_value(self.simulateAction(state, action), action))
            }
            return(v)
        }

        const currentPlayer = this.checkTurn(state)
        let possible_actions = []
        for (let action of this.possibleActions(state))
            if (currentPlayer == this.first) {
                let action_value = min_value(this.simulateAction(state, action), action)
                if (action_value == this.first) {
                    return(action)
                }
                else if (action_value == 0) {
                    possible_actions.push(action)
                }
            }
            else {
                let action_value = max_value(this.simulateAction(state, action), action)
                if (action_value == this.second) {
                    return(action)
                }
                else if (action_value == 0) {
                    possible_actions.push(action)
                }
            }
            return(possible_actions[0]) 
        }
}

const Game = new Gamelogic()
const tyrant = new tyrantAI()


class Gameboard {

    // stores all the methods for changing/generating the view and the interface on the board
    constructor() {
        this.first = "X"
        this.second = "O"
    }
    showMenu() {
        document.getElementById("outcome-overlay").style.display = "none"
        document.getElementById("game-area").style.display = "none"
        document.getElementById("game-menu").style.display = "flex"
    }

    showBoard() {
        document.getElementById("game-menu").style.display = "none"
        document.getElementById("outcome-overlay").style.display = "none"
        document.getElementById("game-area").style.display = "grid"
    }

    showOverlay(text) {
        document.getElementById("outcome-overlay").style.display = "block"
        document.querySelector("#outcome-overlay>*>p").innerText = text
    }

    hideOverlay() {
        document.getElementById("outcome-overlay").style.display = "none"
    }

    resetBoard(){
        for (let i = 0; i <3; i++) {
            for (let j = 0; j < 3; j++) {
                let cell = document.getElementById(`${i}${j}`)
                cell.innerText = ""
                }}
    }
    updateBoard(move, player) {
        // takes a move formatted as a string and updates the board
        let symbol
        if (player == 1) {
            symbol = this.first
        }
        else {
            symbol = this.second
        }
        const cell = document.getElementById(move)
        cell.innerText = symbol
    }

    makeMove(move) {
        let currentPlayer = Game.currentTurn(this.gameState)
        this.updateBoard(move, currentPlayer)
        Game.gameAction(move, currentPlayer)
    }

    endGame(outcome){
        // takes an outcome and presents the game over screen based on outcome
        // if the human player wins
        if (outcome*Game.human == 1) {
            this.showOverlay("You win")
        }
        else if (outcome*Game.human == -1) {
            this.showOverlay("You lose")
        }
        else {
            this.showOverlay("Draw")
        }
    }

    createBoard() {
        let gameArea = document.getElementById("game-area")
        gameArea.innerHTML = ""
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++) {
                let cell = document.createElement("div")
                cell.classList.add("cell")
                cell.id = `${i}${j}`
                cell.addEventListener("click", () => {
                    if (Game.gameState[i][j] == null){
                        this.makeMove(`${i}${j}`)
                        let outcome = Game.checkWinner(Game.gameState, `${i}${j}`)
                        if (outcome != null) {
                            this.endGame(outcome)
                        }
                        else {
                            let aiMove = tyrant.minimax(Game.gameState)
                            this.makeMove(aiMove)
                            let outcome = Game.checkWinner(Game.gameState, aiMove)
                            if (outcome != null) {
                            this.endGame(outcome)
                            }
                        }
                    }
                })
                gameArea.appendChild(cell)
    }}}
}

class TyrantSpeech {
    // controls all the voicelines of the AI
    menulines = 
    ["Pick a side, human.",
    "First or second? Make your choice.",
    "I'll let you choose your turn. You're not winning anyway."
    ]
    
    speak(textstring) {
        //takes a string and outputs it to the chatbox with a typewriter effect
        let chatbox = document.getElementById("voice")
        chatbox.innerHTML = ""
        function addLetters(){
            chatbox.innerHTML += textstring[i]
            i++
            if (i>= textstring.length) {
                clearInterval(speaking)
            }
        }
        let i = 0
        let speaking = setInterval(addLetters, 50)
    }

    menuSpeak() {
        let menulines = 
        ["Pick a side, human.",
        "First or second? Make your choice.",
        "I'll let you choose your turn. You're not winning anyway."
        ]
        let random_line = menulines[parseInt(Math.random()*menulines.length)]
        this.speak(random_line)
    }

    drawlines() {
        lines = 
        []
    }
}

const Board = new Gameboard()
Board.createBoard()
voicebox = new TyrantSpeech
document.getElementById("first").addEventListener("click", ()=>{
    Game.human = 1
    Game.resetGameLogic()
    Board.resetBoard()
    Board.showBoard()
})

document.getElementById("second").addEventListener("click", ()=>{
    Game.human = -1
    Game.resetGameLogic()
    Board.resetBoard()
    Board.showBoard()
    const moves = ["00", "02", "20", "22"]
    Board.makeMove(moves[Math.floor(Math.random()*4)])
})

document.getElementById("replay").addEventListener("click", ()=>{
    Board.showMenu()
    voicebox.menuSpeak()
})