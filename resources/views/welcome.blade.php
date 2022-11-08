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
        <div id="game-grid">
            <template x-for="row in gameBoard">
                    <div class="row">
                    <template x-for="tile in row">
                        <div class="tile" :class="tile.status" x-text="tile.letter"></div>
                    </template>
                    </div>
            </template>
        </div>
        <output x-text="message"></> 
    </main>
</body>
</html>