import Tile from './Tile';
import { easyGuessWords, allWords } from './words';

export default {
    numberOfAllowedGuesses: 3,
    wordToGuess: easyGuessWords[Math.floor(Math.random() * easyGuessWords.length)],
    currentRowIndex: 0,
    state: 'active',
    errors: false,
    message: '',
    keyboard: [
        'qwertyuiop'.split(''),
        'asdfghjkl'.split(''),
        ['Enter', ...'zxcvbnm'.split(''), 'Backspace'],
    ],

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
            Array.from({length: this.wordToGuess.length},
                (item, index) => new Tile(index))
        );
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

        if (!allWords.includes(this.currentGuess)) {
            this.errors = true;
            return this.message = "This is not a word...";
        }

        Tile.updateStatusesForRow(this.currentRow, this.wordToGuess)

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

    matchingTileForKey(key) {
        return this.gameBoard
            .flat()
            .filter(tile => tile.status)
            .sort((t1, t2) =>
                Number((t2.status === 'correct')) ?? -1)
            .find(tile => tile.letter === key)
    }
};
