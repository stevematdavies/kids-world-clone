import Tile from './Tile';

export default {
  numberOfAllowedGuesses: 3,
  wordToGuess: "cat",
  currentRowIndex: 0, 
  state: 'active',
  message: '',
  
  get currentGuess() {
      return this.currentRow.map(tile => tile.letter).join('');
  },

  get currentRow(){
    return this.gameBoard[this.currentRowIndex];
  },

  get remainingGuesses(){
    return this.numberOfAllowedGuesses === this.currentRowIndex + 1;
  },

  init(){
    this.gameBoard = Array.from({ length: this.numberOfAllowedGuesses}, () => 
      Array.from({length: this.wordToGuess.length}, () => new Tile())
    ) 
  },

  onKeyPressed(key){
    this.message = "";
    if (/^[A-z]$/.test(key)){
      this.fillTileWithKey(key)
    } else {
      if (key === "Enter"){
       this.submitGuess()
      }
    }
  },
  emptyTile(){},


  fillTileWithKey(key){
    for (let tile of this.currentRow){
      if(!tile.letter){
       tile.fill(key)
        break;
      } 
    }
    if (this.currentTileIndex === this.wordToGuess.length -1){
      this.currentRowIndex++;
      this.currentTileIndex =0;
    } else {
      this.currentTileIndex ++;
    }
  },

  colorTileForCurrentRow(){
   for (let tile of this.currentRow){
      tile.updateStatus(this.wordToGuess, this.currentGuess)
    }
  },

  updateMessage(){
    if (this.currentGuess === this.wordToGuess){
      this.message = 'Well done, you win!';
    } else if (this.remainingGuesses){
        this.message = `You loose.The word was: "${this.wordToGuess}"`;
        this.state = 'complete'
      } else {
        this.message = `...incorrect keep guessing`;
        this.currentRowIndex++;
      }
  },

  submitGuess(){
      if (this.currentGuess.length < this.wordToGuess.length) return;
      this.colorTileForCurrentRow();
      this.updateMessage();
  }
};