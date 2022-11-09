class Tile {
    letter = '';
    status = '';

    fill(key) {
        this.letter = key.toLowerCase();
    }

    empty(key) {
        this.letter = '';
    }

    updateStatus(wordToGuess, index){
        if (!wordToGuess.includes(this.letter)) {
            return this.status = 'absent'
        }

        if (this.letter ===  wordToGuess[index]) {
            return this.status = 'correct'
        }

        this.status = 'present';
    }

}

export default Tile;
