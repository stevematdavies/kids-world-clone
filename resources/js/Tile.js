class Tile {
  letter = '';
  status = '';

  fill(key){
    this.letter = key.toLowerCase();
  }

  empty(key){
    this.letter = '';
  }

  updateStatus(wordToGuess, currentGuess){
   this.status = wordToGuess.includes(this.letter) ? 'present' : 'absent'
    if (currentGuess.indexOf(this.letter) === wordToGuess.indexOf(this.letter)){
      this.status = 'correct'
    }
  }
}

export default Tile;