var cnt = 0;
var printTest = false
class Bee extends Phaser.GameObjects.Sprite{
    constructor(scene, texture, frame, initX, initY) {
        super(scene, initX, initY, texture, frame);
        //vectors rooted @ (0, 0)
        scene.add.existing(this);

        //Math.random()* (1 - -1) + -1: picks random w/ min -1 & max 1
        this.velocity = new Phaser.Math.Vector2(Math.random()* (1 - -1) + -1, Math.random()* (1 - -1) + -1);
        //NOTE: setLength is the same as setMat() (because length = magnitude)
        this.velocity.setLength(Math.random() * (1 - 0) + 0);

        //speed at which boids move
        this.acceleration = new Phaser.Math.Vector2();
        this.position = new Phaser.Math.Vector2(initX, initY)

        //limit boid vector alignment / magnitude
        this.maxForce = 1;
        //set speed limit
        this.maxSpeed = 2;

        //pollen count and carrying
        this.pollenMax = 150;
        this.pollen = 0;
    }

    update() {
        this.position.add(this.velocity);
        this.x = this.position.x;
        this.y = this.position.y;
        this.velocity.add(this.acceleration);
        printTest = false
        this.velocity.limit(this.maxSpeed);
        this.acceleration.reset();
        //console.log("Bee is at : " + this.x + " " + this.y)
    }

    avg(fellowBoids, vectorType, tetherDistance){
        var inRange = 0;			//Flag to check if any boids were in the range at all
        //grab average velocity
        var avgVel = new Phaser.Math.Vector2();
        for(let i = 0; i < fellowBoids.length; i++){
            let distance = this.position.distance(fellowBoids[i].position)
            //if within tether radius from boid
            if(this != fellowBoids[i] && (distance <= tetherDistance)){
                // Cohesion removed due to flower pathing
                /*if(vectorType === 'cohesion'){
                    avgVel.add(fellowBoids[i].position);
                }*/
                if(vectorType === 'separation'){
                    //vector pointing from other to me
                    //init to 0,0
                    let diff = new Phaser.Math.Vector2();
                    diff.x = this.position.x - fellowBoids[i].position.x
                    diff.y = this.position.y - fellowBoids[i].position.y

                    //NOTE: this.position.subtract(fellowBoids[i].position); is attaching position to diff so 
                    //		whatever is done to diff is then done to position. So it was removed

			        diff.divide(new Phaser.Math.Vector2(distance * distance, distance * distance));
			        avgVel.add(diff);
			        inRange++;
                }
                else if(vectorType === 'alignment'){
                    avgVel.add(fellowBoids[i].velocity);
                }
                inRange++;
            }
        }

        if(inRange > 0){
            avgVel.divide(new Phaser.Math.Vector2(inRange, inRange))

            if(vectorType === 'cohesion'){
                avgVel.subtract(this.position);
            }

            avgVel.setLength(this.maxSpeed);
            avgVel.subtract(this.velocity);
            avgVel.limit(this.maxForce);

        }
        return avgVel;
    }

    avoid(player, radius) {
        let direction = new Phaser.Math.Vector2();
        if(this.position.distance(new Phaser.Math.Vector2(player.x, player.y)) <= radius) {
            direction.x = this.position.x - player.x;
            direction.y = this.position.y - player.y;
            direction.normalize();
        }
        return direction;
    }

    flock(fellowBoids, pointPath, player){
        //follow points (start w/ first in list of pointPath)
        
        let pointLocation = pointPath
        let tmpPoint = new Phaser.Math.Vector2(pointLocation[cnt][0], pointLocation[cnt][1])
        let distance = this.position.distance(new Phaser.Math.Vector2(pointLocation[cnt][0], pointLocation[cnt][1]))

        // Avoid the Bear if in range
        let avoidance = this.avoid(player, 100);
        if(avoidance.x != 0 || avoidance.y != 0) {
            this.acceleration.add(avoidance);
        } //if it's close enough to the flower
        else if(distance <= 10) {
            if(this.pollen < this.pollenMax) {
                this.velocity.reset();
                this.acceleration.reset();
                this.pollen++;
            } else {
                this.pollen = 0;
                cnt++;
                if(cnt > pointLocation.length - 1)
                    cnt = 0;
            }
        } //otherwise just flock together
        else {
            let direction = tmpPoint.subtract(this.position);
            direction.normalize();
            direction.x *= .5;
            direction.y *= .5;
            this.acceleration = direction;

            //Cohesion not necessary during path following because bees focused on flower.
            let alignment = this.avg(fellowBoids, 'alignment', Phaser.Math.Between(15, 60));
            //let cohesion = this.avg(fellowBoids, 'cohesion');
            let separation = this.avg(fellowBoids, 'separation', Phaser.Math.Between(10, 45));

            //Since mass =1 then A = F/1
            this.acceleration.add(separation);
            this.acceleration.add(alignment);
            //this.acceleration.add(cohesion);
        }
    }
}