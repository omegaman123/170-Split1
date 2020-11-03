class Hub extends Phaser.Scene {
    constructor() {
        super("hubScene");
    }

    // Load all needed assets for main hub scene. Player/walls/npcs
    preload() {
        this.load.image("player", './assets/HubPlayer.png')
        this.load.image('background', './assets/hubBackground.jpg')
        this.load.image('map','./assets/hubMap.jpg');
        this.load.image('bee','./assets/hubBee.jpg');
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');

    }

    create() {
        this.cameras.main.setBackgroundColor(0x000000)
        this.background1 = this.add.image(10, 10, 'background').setOrigin(0,0);
        this.background2 = this.add.image(config.width/2, 10, 'background').setOrigin(0,0);
        this.bee = this.add.image(2*config.width/3, config.height/4, 'bee').setOrigin(.5,.5).setScale(.01,.01);
        this.map = this.add.image(config.width/5, config.height/4,'map').setOrigin(.5,.5).setScale(.2,.2);
        this.player = new HubPlayer(this, 'player', 0, config.width / 2, config.height / 2).setScale(.2,.2);
        this.bounceFactor = .1;
        this.counter = 0;

        this.scoreConfig = {
            fontFamily: "Courier",
            fontSize: "14px",
            color: "#ffffff",
            align: "right",
            padding: {
                top: 5,
                bottom: 5
            },
        };
        this.interactText = this.add.text(this.player.x,this.player.y, "'SPACE' to interact", this.scoreConfig).setOrigin(.5,.5);
        this.interactText.setVisible(false);
        this.moveText = this.add.text(this.player.x, this.player.y+config.height/3, "Use the arrowkeys to move", this.scoreConfig).setOrigin(.5,.5);


        //establish controls for gameplay
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESCAPE);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (this.counter % 60 === 0){
            this.bounceFactor = -this.bounceFactor;
        }
        if (Math.abs(Phaser.Math.Distance.Between(this.map.x,this.map.y, this.player.x,this.player.y)) < 100){
            this.map.y += this.bounceFactor;
            this.interactText.x = this.map.x;
            this.interactText.y = this.map.y;
            this.interactText.setVisible(true)
            if (Phaser.Input.Keyboard.JustDown(keySPACE)){
                this.scene.start('mapScene')
            }
        } else {
            this.interactText.setVisible(false)
        }
        if (Math.abs(Phaser.Math.Distance.Between(this.bee.x,this.bee.y, this.player.x,this.player.y)) < 100){
            this.bee.y += this.bounceFactor;
        }

        this.player.update();
        this.counter++;
    }
}