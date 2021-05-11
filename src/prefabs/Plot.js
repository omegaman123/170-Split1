class Plot {
    constructor(gridx, gridy) {
        //Positions
        this.gridx = gridx;
        this.gridy = gridy;

        //States
        this.dug = false;
        this.water = false;
        this.mulchAmt = 0;
        this.item = null;

        //Images
        this.dirt = null;
        this.mulch = null;
        this.spot = null;
        this.honeyIndicator = null;
    }

    renderPlot(scene, coords) {
        this.destroyImages();
        let img = "";
        let spotx = coords[0];
        let spoty = coords[1];
        if(this.dug) {
            img = "dirtDry";
            if(this.water) { img = "dirtWet"}
            this.dirt = scene.add.image(spotx, spoty, img);
            this.dirt.setOrigin(.5, .5).setScale(.25, .25);
            scene.add.existing(this.dirt);
            this.dirt.depth = this.dirt.y/10 - 20;
        }
        /*if(this.mulchAmt > 0) {
            this.mulch = scene.add.image(spotx, spoty, "mulch");
            this.mulch.setOrigin(.5, .5).setScale(.35, .35);
            scene.add.existing(this.mulch);
            this.mulch.depth = this.mulch.y/10 - 18;
        }*/
        if(this.item) {
            //console.log("putting",this.item,"at",spotx," ",spoty);
            this.spot = this.item.addToScene(scene, spotx, spoty);
            if(this.item instanceof Hive){ 
                console.log(this.item);
                console.log(this.honeyIndicator);
            }
            if(this.item instanceof Hive && this.item.hasStock() && !this.honeyIndicator){
                console.log("honey indicator added");
                let hexColor = 0xE5A515;
                let stock = this.item.stock;
                if(stock['blue']>stock['yellow']+stock['pink']+stock['purple']) { hexColor = 0x252595; }
                if(stock['purple']>stock['yellow']+stock['pink']+stock['blue']) { hexColor = 0x752595; }
                if(stock['pink']>stock['yellow']+stock['blue']+stock['purple']) { hexColor = 0x952575; }
                this.honeyIndicator = scene.add.ellipse(coords[0], coords[1] + 40, config.width / 10,
                    config.height / 10, hexColor);
                this.honeyIndicator.alpha = .75;
            }
        } 
        
    }

    destroyImages() {
        if(this.dirt) {
            this.dirt.destroy();
            this.dirt = null;
        }
        if(this.mulch) {
            this.mulch.destroy();
            this.mulch = null;
        }
        if(this.spot) {
            this.spot.destroy();
            this.spot = null;
        }
        if(this.honeyIndicator) {
            this.honeyIndicator.destroy();
            this.honeyIndicator = null;
        }
    }
}

function objToPlot(obj){
    let plot = new Plot();
    plot.gridx = obj.gridx;
    plot.gridy = obj.gridy;

    //States
    plot.dug = obj.dug;
    plot.water = obj.water;
    plot.mulchAmt = obj.mulchAmt;

    //plot.item
    if(obj.item){
        //console.log("obj.item.type: ", obj.item.type);
        switch(obj.item.type){
            case "Daisy":
            case "Delphinium":
            case "Lavender":
            case "Tulip":
                plot.item = new Flower(obj.item.age, obj.item.water, obj.item.type);
                break;
            case "Beehive":
                plot.item = new Hive(plot.gridx, plot.gridy);
                break;
            case "Bramble":
                plot.item = new Bramble(plot.gridx, plot.gridy);
                break;
            case "Sprinkler":
                plot.item = new Sprinkler(plot.gridx, plot.gridy);
                break;
            case "Watering Can":
                plot.item = new WateringCan();
                break;
            case "Weed":
                plot.item = new Weed(plot.gridx, plot.gridy);
                break;
            case "Bench":
                plot.item = new DecorativeWide("Bench", obj.item.isLeft);
                break;
            default:
                plot.item = null;
                break;
        }
        //plot.spot = this.item.addToScene(scene, spotx, spoty);
    }
    else{
        plot.item = obj.item;
    }

    //Images
    plot.dirt = null;
    plot.mulch = null;
    //plot.spot = null;
    plot.honeyIndicator = null;

    return plot;
}