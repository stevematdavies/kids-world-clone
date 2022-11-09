class Tile {
    letter = '';
    status = '';
    position = 0;

    constructor(position) {
        this.position = position;
    }

    fill(key) {
        this.letter = key.toLowerCase();
    }

    empty() {
        this.letter = '';
    }

    static updateStatusesForRow(row, wordToGuess) {
        for (const tile of row) {
            tile.updateStatus(wordToGuess)
        }
        row
            .filter(tile => tile.status === 'present')
            .filter(tile => row.some(t => t.letter === tile.letter && t.status === 'correct'))
            .forEach(tile => tile.status = 'absent')
    }

    updateStatus(wordToGuess) {
        if (!wordToGuess.includes(this.letter)) {
            return this.status = 'absent'
        }

        if (this.letter === wordToGuess[this.position]) {
            return this.status = 'correct'
        }

        this.status = 'present';
    }

}

export default Tile;
