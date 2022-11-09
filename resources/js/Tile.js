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

    empty(key) {
        this.letter = '';
    }

    static updateStatusesForRow(row, wordToGuess) {
        for (const tile of row) {
            tile.updateStatus(wordToGuess)
        }

        row.filter(ti => ti.status === 'present' &&
            row.some(t => t.letter === ti.letter && t.status === 'correct'))
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
