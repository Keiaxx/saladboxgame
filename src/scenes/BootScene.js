import {Scene} from 'phaser'
import logo from '../assets/logo.png'
import startButton from '../assets/shittystartbutton.png'

export default class BootScene extends Scene {
    constructor() {
        super({key: 'BootScene'})
    }

    preload() {

        this.load.image('logo', logo)
        this.load.image('startbutton', startButton)


    }

    create() {
        this.add.text(16, 16, 'BootScene', { fontSize: '16px', fontFamily: 'adventurer', fill: '#FFF' });
        this.scene.start('StartGameScene')
        // function fs_status()
        // {
        //     if(document.fullscreenElement)
        //     {
        //         return true;
        //     }
        //     else if(document.webkitFullscreenElement)
        //     {
        //         return true;
        //     }
        //     else if(document.mozFullScreenElement)
        //     {
        //         return true;
        //     }
        //     else
        //     {
        //         return false;
        //     }
        // }
        //
        // function goFullscreen()
        // {
        //     if(fs_status())
        //     {
        //         return;
        //     }
        //
        //     var el = document.getElementsByTagName('canvas')[0];
        //     var requestFullScreen = el.requestFullscreen || el.msRequestFullscreen || el.mozRequestFullScreen || el.webkitRequestFullscreen;
        //
        //     if(requestFullScreen)
        //     {
        //         requestFullScreen.call(el);
        //     }
        // }
        //
        // document.getElementsByTagName('div')[0].addEventListener('click', goFullscreen);


    }
}
