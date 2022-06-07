
class Gameboard {
    constructor(firstSymbol, secondSymbol) {
        this.first = first
        this.second = second
        this.gameState = [[null, null, null], [null, null, null], [null, null, null]]
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
                    this.currentPlayer.makeMove(event.target.id)
                }
                )
                gameArea.appendChild(cell)
                      
            }
            i++  
        }
    }
    currentTurn(){

    }
    
    renderBoard(){
        for (let i = 0; i <3; i++) {
            for (let j = 0; j < 3; j++) {
                cell = document.getElementById(`${i}${j}`)
                cell.
            }
        }
    }

}