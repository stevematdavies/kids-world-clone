import '../css/app.css';
import Alpine from 'alpinejs';
import game from './game';

Alpine.data('game', () => game)
Alpine.start();

