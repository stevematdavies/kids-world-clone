<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TryCat</title>
    @vite(['resources/js/app.js'])
</head>
<body>
<main x-data="game" @keyup.window="onKeyPressed($event.key)">

    <header>
        <h1 aria-label="TryCat">
            <img src="/images/trycat-logo.svg" alt="">
        </h1>
        <output x-text="message"></output>
    </header>

    <div id="game">
        <template x-for="(row, index) in gameBoard">
            <div class="row"
                 :class="{
                     'current': currentRowIndex === index,
                     'invalid': currentRowIndex === index && errors
                 }">
                <template x-for="tile in row">
                    <div class="tile" :class="tile.status" x-text="tile.letter"></div>
                </template>
            </div>
        </template>
    </div>

    <div id="keyboard" @click.stop="$event.target.matches('button') && onKeyPressed($event.target.textContent)">
        <template x-for="row in keyboard">
            <div class="row">
                <template x-for="key in row">
                    <button type="button" class="key" x-text="key"></button>
                </template>
            </div>
        </template>
    </div>

</main>
</body>
</html>
