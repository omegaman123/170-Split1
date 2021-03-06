class Boot extends Phaser.Scene {
    constructor() {
        super("bootScene");
    }

    create() {
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }
    }

    preload() {
        //Load images
            //For gardenScene
            this.load.image("extraLargeGrass", "./assets/sprites/background/massiveGrassbackdrop.png")
            this.load.image("gardenBackground", "./assets/sprites/background/sampleGarden-01.png");
            this.load.image("exit", "./assets/sprites/background/LeftArrowGREEN.png");
            this.load.image("dirtDry", "./assets/sprites/spritesheetFrames/plotDry.png");
            this.load.image("dirtWet", "./assets/sprites/spritesheetFrames/plotWet.png");
            this.load.image("hive", "./assets/sprites/background/hive.png");
            this.load.image("bearBee", "./assets/sprites/character/beeTiny.png");
            this.load.image("tempLavender", "./assets/sprites/background/lavTest.png");
            this.load.image('sprinkler', './assets/sprites/background/sprinkler.png');
            this.load.image('sprinklerHighlight', './assets/sprites/old/blue.png');
            this.load.image('hiveHighlight', './assets/sprites/old/orange.png');
            //Flower stages for Garden
            this.load.image("seedling", "./assets/sprites/spritesheetFrames/uni0.png");
            this.load.image("sprout", "./assets/sprites/spritesheetFrames/uni1.png");
            this.load.image("flowerWhite2", "./assets/sprites/spritesheetFrames/white2.png");
            this.load.image("flowerWhite3", "./assets/sprites/spritesheetFrames/white3.png");
            this.load.image("flowerWhite4", "./assets/sprites/spritesheetFrames/white4.png");
            this.load.image("flowerWhite5", "./assets/sprites/spritesheetFrames/white5.png");
            this.load.image("flowerBlue2", "./assets/sprites/spritesheetFrames/blue2.png");
            this.load.image("flowerBlue3", "./assets/sprites/spritesheetFrames/blue3.png");
            this.load.image("flowerBlue4", "./assets/sprites/spritesheetFrames/blue4.png");
            this.load.image("flowerBlue5", "./assets/sprites/spritesheetFrames/blue5.png");
            this.load.image("flowerRed2", "./assets/sprites/spritesheetFrames/red2.png");
            this.load.image("flowerRed3", "./assets/sprites/spritesheetFrames/red3.png");
            this.load.image("flowerRed4", "./assets/sprites/spritesheetFrames/red4.png");
            this.load.image("flowerRed5", "./assets/sprites/spritesheetFrames/red5.png");
            this.load.image("flowerPurple2", "./assets/sprites/spritesheetFrames/purple2.png");
            this.load.image("flowerPurple3", "./assets/sprites/spritesheetFrames/purple3.png");
            this.load.image("flowerPurple4", "./assets/sprites/spritesheetFrames/purple4.png");
            this.load.image("flowerPurple5", "./assets/sprites/spritesheetFrames/purple5.png");
            //For hubScene
            this.load.image('background', './assets/sprites/background/garden_base.png');
            this.load.image('bee','./assets/sprites/character/hubBee.jpg');
            this.load.image('bike','./assets/sprites/background/bike.png');
            this.load.image('bikeShed', './assets/sprites/background/tempBikeUpgrade.png');
            this.load.image('gardeningShed','./assets/sprites/background/tempGardeningSupplies.png');
            this.load.image('dialogbox', './assets/img/dialogbox.png');
            this.load.image('playerWealthTracker', './assets/sprites/UI/moneyhoney.png');
            //For shop
            this.load.image('toadLeckman', './assets/sprites/character/mrleckman_510x300.png');
            //For Market
            this.load.image('basicDogNPC', './assets/sprites/character/dognpc_275x458.png');
            this.load.image('boothFull', './assets/sprites/background/boothFull.png');
            this.load.image('booth', './assets/sprites/background/boothZoom.png');
            this.load.image('cloth', './assets/sprites/background/clothFull.png');
            this.load.image('honeyPlain', './assets/sprites/background/honeyPlain.png');
            this.load.image('honeyPink', './assets/sprites/background/honeyPink.png');
            this.load.image('honeyBlue', './assets/sprites/background/honeyBlue.png');
            this.load.image('honeyPurple', './assets/sprites/background/honeyPurple.png');
            this.load.image('redMinus', './assets/sprites/UI/minusRed_240.png');
            this.load.image('greenMinus', './assets/sprites/UI/minusGreen_240.png');
            this.load.image('greenPlus', './assets/sprites/UI/plusGreen_240.png');
            this.load.image('plusRed', './assets/sprites/UI/plusRed_240.png');
            //For mapScene
            this.load.image('TownMap', './assets/sprites/background/WhiteBackground.png');
            this.load.image('PlayerIcon', './assets/sprites/character/playerMapIcon.png');
            //For menuScene
            this.load.image('TitleScreen', './assets/sprites/background/TempTitle.png');
            //For playScene
            this.load.image("Player", "./assets/sprites/character/bearOnBike.png");
            this.load.image("Road", "./assets/sprites/background/roadFullEX-02.png");
            this.load.image("Obstacle_1", './assets/sprites/character/playerMapIcon.png');
            //For pauseScene
            this.load.image("TempPause", "./assets/sprites/background/tempPause.png");
            //For settingsScene
            this.load.image("TempSettingsScreen", "./assets/img/TempSettings3_3_21.png");
            //For creditsScene
            this.load.image("TempCreditsScreen", "./assets/img/TempCredits3_3_21.png");
            //For tutorialScene
            this.load.image("TempTutorialScreen", "./assets/img/TempTutorial3_3_21.png");


        //Load Spritesheets
            //For gardenScene
            //this.load.spritesheet('flowerSheet', './assets/spritesheets/flowerStages.png', { frameWidth: 407, frameHeight: 456, startFrame: 0, endFrame: 4 });
            //For hubScene
            //this.load.spritesheet('player', './assets/spritesheets/bearFrontBack.png', {frameWidth:40, frameHeight:72, startFrame:0, endFrame:1});
            this.load.spritesheet('player', './assets/spritesheets/bearIdle.png', {frameWidth: 140, frameHeight:249, startFrame:0, endFrame:3});
            //For mapScene 
            /*
            this.load.spritesheet('Beehive','./assets/spritesheets/HoneyBearSampleHive.png',{frameWidth: 88, frameHeight: 108, startFrame:0 , endFrame: 1});
            this.load.spritesheet('Work','./assets/spritesheets/HoneyBearSampleWork.png',{frameWidth: 69, frameHeight: 87, startFrame:0 , endFrame: 1});
            this.load.spritesheet('House','./assets/spritesheets/HoneyBearHouseSample1.png',{frameWidth: 80, frameHeight: 80, startFrame:0 , endFrame: 1});
            this.load.spritesheet('Path1_2','./assets/spritesheets/Road1_2.png',{frameWidth: 641, frameHeight: 479, startFrame:0 , endFrame: 1});
            this.load.spritesheet('Path2_5','./assets/spritesheets/Road2_5.png',{frameWidth: 641, frameHeight: 479, startFrame:0 , endFrame: 1});
            this.load.spritesheet('Path3_4','./assets/spritesheets/Road3_4.png',{frameWidth: 641, frameHeight: 479, startFrame:0 , endFrame: 1});
            this.load.spritesheet('Path4_5','./assets/spritesheets/Road4_5.png',{frameWidth: 641, frameHeight: 479, startFrame:0 , endFrame: 1});
            this.load.spritesheet('PathBees_Work','./assets/spritesheets/RoadBees_Work.png',{frameWidth: 641, frameHeight: 479, startFrame:0 , endFrame: 1});
            this.load.spritesheet('PathWork_1','./assets/spritesheets/RoadWork_1.png',{frameWidth: 641, frameHeight: 479, startFrame:0 , endFrame: 1});
            this.load.spritesheet('PathWork_2','./assets/spritesheets/RoadWork_2.png',{frameWidth: 641, frameHeight: 479, startFrame:0 , endFrame: 1});
            this.load.spritesheet('PathWork_3','./assets/spritesheets/RoadWork_3.png',{frameWidth: 641, frameHeight: 479, startFrame:0 , endFrame: 1});
            this.load.spritesheet('PathWork_4','./assets/spritesheets/RoadWork_4.png',{frameWidth: 641, frameHeight: 479, startFrame:0 , endFrame: 1});
            */
            //For menuScene
            this.load.spritesheet('Play','./assets/spritesheets/PlayInitial.png',{frameWidth: 130, frameHeight: 66, startFrame:0 , endFrame: 1});
            this.load.spritesheet('Settings','./assets/spritesheets/SettingsInitial.png',{frameWidth: 158, frameHeight: 50, startFrame:0 , endFrame: 1});
            this.load.spritesheet('Tutorial', './assets/spritesheets/TempTutorialCombined.png', {frameWidth: 148, frameHeight: 28, startFrame:0 , endFrame: 1});
            this.load.spritesheet('Credits', './assets/spritesheets/TempCreditsCombined.png', {frameWidth: 124, frameHeight: 28, startFrame:0 , endFrame: 1});
            //For settingsScene
            this.load.spritesheet('Back', './assets/spritesheets/BackInitial.png', {frameWidth: 114, frameHeight: 36, startFrame: 0, endFrame: 1});


        //Load Music
            //For hubScene
            this.load.audio("hubMusic", "./assets/audio/music/bear_full.mp3");
            //For mapScene
            this.load.audio("mapMusic", "./assets/audio/music/honeybear.wav");
            //For menuScene
            this.load.audio("menuMusic", "./assets/audio/music/honeybear_2.wav");
            //For shopScene
            this.load.audio("shopMusicFull", "./assets/audio/music/toad_shop_theme_full_intro.mp3");
            this.load.audio("shopMusicShort", "./assets/audio/music/toad_shop_theme_short_intro.mp3");
            //For marketScene
            this.load.audio("marketMusic", "./assets/audio/music/market.mp3");
            this.load.audio("bedtimeMusic", "./assets/audio/music/Bedtime.mp3");

        //Load SFX
            //For hubScene and marketScene
            this.load.audio("hubMarketTransition", "./assets/audio/sfx/settingupstall.mp3");


    
        //Load Fonts
            //For hubScene
            this.load.bitmapFont('gem_font', './assets/font/gem.png', './assets/font/gem.xml');



        //Load dialogue
        this.load.json('dialog', './assets/json/dialog.json');






        //Make the background for the loading bar
        //credit to https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(config.width/2 -160, 270, 320, 50);
        
        //Whenever progress is made
        this.load.on('progress', function (value) {
          console.log(value);
          progressBar.clear();
          progressBar.fillStyle(0xffffff, 1);
          progressBar.fillRect(config.width/2 -150, 280, 300 * value, 30);
        });
                
        //Whenever a file is loaded
        this.load.on('fileprogress', function (file) {
          console.log(file.src);
        });
       
        //When all files are loaded
        this.load.on('complete', function () {
          console.log('complete');
          progressBar.destroy();
          progressBox.destroy();
        });
    }

    create(){
        // go to Title scene
        this.scene.start('menuScene');
    }
}