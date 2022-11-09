import Tile from './Tile';
import words from './words';

export default {
    numberOfAllowedGuesses: 3,
    wordToGuess: "cat",
    currentRowIndex: 0,
    state: 'active',
    errors: false,
    message: '',

    get currentGuess() {
        return this.currentRow.map(tile => tile.letter).join('');
    },

    get currentRow() {
        return this.gameBoard[this.currentRowIndex];
    },

    get remainingGuesses() {
        return this.numberOfAllowedGuesses - this.currentRowIndex - 1;
    },

    init() {
        this.gameBoard = Array.from({length: this.numberOfAllowedGuesses}, () =>
            Array.from({length: this.wordToGuess.length}, () => new Tile())
        )
    },

    onKeyPressed(key) {
        this.message = "";
        this.errors = false;
        if (/^[A-z]$/.test(key)) {
            this.fillCurrentTile(key)
        } else if (key === "Backspace") {
            this.emptyCurrentTile()
        } else if (key === "Enter") {
            this.submitGuess()
        }
    },

    fillCurrentTile(key) {
        for (let tile of this.currentRow) {
            if (!tile.letter) {
                tile.fill(key)
                break;
            }
        }
    },

    emptyCurrentTile() {
        for (let tile of [...this.currentRow].reverse()) {
            if (tile.letter) {
                tile.empty()
                break;
            }
        }
    },

    submitGuess() {
        if (this.currentGuess.length < this.wordToGuess.length) {
            return;
        }

        if (!words.includes(this.currentGuess)) {
            this.errors = true;
            return this.message = "This is not a word...";
        }

        this.currentRow.forEach((tile, index) => {
           tile.updateStatus(this.wordToGuess, index)
        });

        this.currentRow.forEach((tile, index) => {
            if(tile.status !== 'present'){
                return;
            }

            if (this.currentRow.some(t => t.letter === tile.letter && t.status === 'correct')){
                tile.status = 'absent';
            }
        });


        if (this.currentGuess === this.wordToGuess) {
            this.state = 'complete'
            return this.message = 'Well done, you win!';
        }
        if (this.remainingGuesses === 0) {
            this.state = 'complete'
            return this.message = `You loose.The word was: "${this.wordToGuess}"`;
        } else {
            this.currentRowIndex++;
        }
    },
};
