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
        if (this.currentTileIndex === this.wordToGuess.length - 1) {
            this.currentRowIndex++;
            this.currentTileIndex = 0;
        } else {
            this.currentTileIndex++;
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

    colorTileForCurrentRow() {
        for (let tile of this.currentRow) {
            tile.updateStatus(this.wordToGuess, this.currentGuess)
        }
    },

    updateMessage() {
        if (this.currentGuess === this.wordToGuess) {
            this.state = 'complete'
            return this.message = 'Well done, you win!';
        }
        if (this.remainingGuesses === 0) {
            this.state = 'complete'
            return this.message = `You loose.The word was: "${this.wordToGuess}"`;
        }
        this.currentRowIndex++;
        return this.message = `...incorrect keep guessing`;

    },

    submitGuess() {
        if (this.currentGuess.length < this.wordToGuess.length) return;

        if (!words.includes(this.currentGuess)) {
            this.errors = true;
            return this.message = "This is not a word...";
        }

        this.colorTileForCurrentRow();
        this.updateMessage();
    }
};
