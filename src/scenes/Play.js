class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    init(data) {
        this.destination = data.destination;
        this.honeyDemandData = data.honeyDemand;
        this.honeyDemand = data.honeyDemand[0][this.destination];
        this.remainHoney = this.honeyDemand;
    }

    preload() {
        //load audio
        let audioRoulette = ["BackgroundMusic.wav", "castle_theme_loop.mp3", "happy_thing_that_i_got_bored_with.mp3", "thing.mp3"];
        let chance = Phaser.Math.Between(0, audioRoulette.length-1);
        this.load.audio("music", "./assets/audio/music/"+audioRoulette[chance]);
    }

    create() {
        this.cameras.main.setBackgroundColor("#999");

        //Scrolling Background
        this.townRoad = this.add.tileSprite(0,0,1920,1080,'Road').setOrigin(0,0).setScale(.5, .5);

        //Player Prefab
        this.player = new BikePlayer(this, game.config.width / 4, 3 * game.config.height / 5, "Player", 0);

        //Misc Set Up
        this.paused = false;
        this.gameOver = false;
        this.distanceToTravel = 1000;
        this.distanceTraveled = 0;

        //UI Text Configurations
        this.textConfig = {
            fontFamily: font,
            fontSize: "20px",
            color: "#000",
            align: "center",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        };

        //UI Text for Top of Screen
        this.totalHoneyText = this.add.text(.5 * game.config.width, game.config.height / 8 - 20, "Max jars to deliver: " + 
            this.honeyDemand, this.textConfig).setOrigin(.5);
        this.totalHoneyText.depth = 99;
        this.remainHoneyText = this.add.text(.5 * game.config.width, game.config.height / 8, "Remaining jars: " + 
            this.honeyDemand, this.textConfig).setOrigin(.5);
        this.remainHoneyText.depth = 99;
        this.distanceText = this.add.text(.5 * game.config.width, game.config.height / 8 + 20, "Remaining distance: " + 
            this.distanceToTravel, this.textConfig).setOrigin(.5);
        this.distanceText.depth = 99;

        //Overlays for Pause & Game Over
        this.textConfig.fontSize = "32px";
        this.pauseText = this.add.text(.5 * game.config.width, game.config.height / 2, "PAUSED",
            this.textConfig).setOrigin(.5);
        this.pauseText.alpha = 0;
        this.pauseText.depth = 100;
        this.gameOverText = this.add.text(.5 * game.config.width, game.config.height / 2 - 50, "GAME OVER\n"+
            "Up to get up\nDown to go to map",this.textConfig).setOrigin(.5);
            //DEV TOOLS
        this.gameOverText.alpha = 0;
        this.gameOverText.depth = 100;

        //Reserve Keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //Start Up Music
        this.music = this.sound.add("music");
        this.music.volume = config.volume;
        this.music.loop = true;
        this.music.play();
        
        //create obstacles
        this.obstacles = this.add.group({
            runChildUpdate: true
        });
        this.createObstacles();
    }

    update() {
        //Pause Game
        if(Phaser.Input.Keyboard.JustDown(keyESCAPE) || Phaser.Input.Keyboard.JustDown(keyP)){
            console.log("Pausing Game");
            this.scene.pause();
            this.scene.launch("pauseScene", {previousScene:"playScene"});
        }

        //Possible Game States
        if (this.gameOver) { //Game is over

            //DEV TOOLS
            if (Phaser.Input.Keyboard.JustDown(keyUP)) {
                this.gameOverText.alpha = 0;
                this.remainHoney = this.honeyDemand;
                this.remainHoneyText.text = "Remaining jars: " + this.remainHoney;
                this.obstacles.runChildUpdate = true;
                this.gameOver = false;
            }
            if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
                this.music.stop();
                this.cache.audio.remove("music");
                //ADD HERE
                //COMPENSATE FOR MISSING HONEY
                this.scene.start('mapScene', { arrivingAt:this.destination, honeyDemand:this.honeyDemandData });
            }
            //ALTER FOR FINAL VERSION

        } else { //Game is running
            //Move Background
            this.townRoad.tilePositionX += 6;

            this.distanceTraveled += 1;
            this.distanceText.text = "Remaining distance: " + (this.distanceToTravel - this.distanceTraveled);

            //check for collusion
            this.physics.world.overlap(this.player, this.obstacles, this.collideWithObstacle, null, this);

            //update player
            this.player.update();
            this.player.depth = this.player.y / 10;
            
            //track distance remaining
            if (this.distanceTraveled >= this.distanceToTravel) {
                //if not heading home, have delivery dialog
                this.p
                if(this.destination != 1){
                    //Start Dialogue
                    dialogueSection = 2;
                    this.scene.pause();
                    this.scene.launch('talkingScene', {previousScene:"playScene"});
                }
                //Let scene end
                this.gameOver = true;
                this.obstacles.runChildUpdate = false;
            }
        }
        
    }


    //Function to create all obstacles in one place, will need to likely create some way
    //to define a map of sorts as this only creates one static set of obstacles.
    createObstacles(){
        this.obstacles.add(new RandObstacle(this, 1300, (3*config.height/5), // lane2
            "Obstacle_1", 0 , 4).setOrigin(.5,.5));

        this.obstacles.add(new RandObstacle(this, 1100, (2*config.height/5), // lane1
            "Obstacle_1", 0 , 2.5).setOrigin(.5,.5))

    }

    //function that is called when the player collides with an obstacle.
    collideWithObstacle(player, obstacle){
        if(this.player.alpha == 1) {
            console.log("Ouch i hit an obstacle.");
            this.remainHoney -= 1;
            playerVariables.honey -= 1;
            this.remainHoneyText.text = "Remaining jars: " + this.remainHoney;
            if(this.remainHoney <= 0) {
                //play animation or something
                this.gameOver = true;
                this.obstacles.runChildUpdate = false;
                this.gameOverText.alpha = 1;
            } else {
                this.player.alpha = .25;
                this.time.addEvent({
                    delay: 2500,
                    callback: () => {
                        this.player.alpha = 1;
                    },
                    loop: false,
                    callbackScope: this
                });
            }
        }
    }
}