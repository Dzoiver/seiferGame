var player;
var fightFactor = 0;
var fx;
var randFightnumber = Phaser.Math.Between(200, 1000);

// var Enemy = new Class

var worldScene = new Phaser.Class({

Extends: Phaser.Scene,

initialize:

function worldScene ()
{
	Phaser.Scene.call(this, {key: 'worldScene'})
},

preload: function ()
{
	this.load.image('abilityBar', 'src/assets/abilityBar.png');
	this.load.image('fightBar', 'src/assets/fightStatus.png');
	this.load.image('energyBar', 'src/assets/energyBar.png');
	this.load.image('enemy', 'src/assets/svort.png');
	 this.load.spritesheet('dude', 
        'src/assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
	 this.load.image('tiles', 'src/assets/tiles.png');
	 this.load.tilemapTiledJSON('map', 'src/map/map1.json');
	 this.load.audio('sfx', 'src/music/03.mp3');
	 	 this.load.tilemapTiledJSON('map2', 'src/map/map2.json');
	 this.load.audio('sfx2', 'src/music/04.mp3');
},

create: function ()
{
	var map = this.make.tilemap({key: 'map'});

	var tileset = map.addTilesetImage('seiferGame', 'tiles');

	var backgroundLayer = map.createDynamicLayer('Background', tileset, 0, 0);
	var blockedLayer = map.createDynamicLayer('blocked', tileset, 0, 0);

	fx = this.sound.add('sfx', {volume: 0.1});
	fx.play();
	// this.physics.add.image(500, 400, 'background').setScale(1.5);

	// blockedLayer.setCollisionByProperty({ collides: true });
	blockedLayer.setCollisionBetween(1, 72);

	player = this.physics.add.sprite(500, 50, 'dude').setSize(16, 16).setOffset(8, 32);
	player.setCollideWorldBounds(true);

	this.physics.add.collider(player, blockedLayer);

	const camera = this.cameras.main;
	camera.startFollow(player, false);
	camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

	cursors = this.input.keyboard.createCursorKeys();

	this.anims.create({
	    key: 'left',
	    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
	    frameRate: 10,
	    repeat: -1
	});

	this.anims.create({
	    key: 'turn',
	    frames: [ { key: 'dude', frame: 4 } ],
	    frameRate: 20
	});

	this.anims.create({
	    key: 'right',
	    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
	    frameRate: 10,
	    repeat: -1
	});
},

update: function (time, delta)
{
	        player.setVelocity(0);
	        // console.log(fightFactor);
	    if (player.body.speed > 0) {
	        fightFactor += 1;
	        }
	    if (fightFactor > randFightnumber) {
	    	player.setTint(0xff0000);
	    	fx.stop();
	    	this.scene.start('fightScene');
	    }
	        // console.log(player.body.speed);
	        if (cursors.left.isDown)
        {
            player.setVelocityX(-200);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(200);
        }
    
        if (cursors.up.isDown)
        {
            player.setVelocityY(-200);
        }
        else if (cursors.down.isDown)
        {
            player.setVelocityY(200);
        }
},
});
var Enemy = new Phaser.Class({
	Extends: Phaser.GameObjects.Image,

	initialize:

	function Enemy (scene)
	{
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'enemy');
	},

	spawn: function ()
	{
		this.setPosition(400, 200);
	}
});
var fightBar = new Phaser.Class({
	Extends: Phaser.GameObjects.Image,

	initialize:

	function fightBar (scene)
	{
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'fightBar');
	},

	spawn: function ()
	{
		this.setPosition(125, 560);
	}
});

var energyBar = new Phaser.Class({
	Extends: Phaser.GameObjects.Image,

	initialize:

	function energyBar (scene)
	{
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'energyBar');
	},

	spawn: function ()
	{
		// var percent = 60;
		// percent=percent/100;
		// 
		// this.x = 500;
		this.setPosition(116, 558);
		this.displayOriginX=0;
		// this.body.setSize(30, 45);
		// this.width = 20;
		this.scaleX = 0;
	},
	update: function (time, delta)
	{
		if (this.scaleX < 1) {
			this.scaleX += 0.001 * delta/6;
		}	
	}
});

var abilityBar = new Phaser.Class({
	Extends: Phaser.GameObjects.Image,

	initialize:

	function abilityBar (scene)
	{
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'abilityBar');
		// this.setActive(false).setVisible(false);
	},

	spawn: function (scene)
	{
		this.setPosition(636, 558);
		this.setActive(true).setVisible(true);
		var textAttack = scene.add.text(505, 515, 'Attack');
	},
	update: function (time, delta)
	{
	}
});

// var fight = new 

var fightScene = new Phaser.Class({
	Extends: Phaser.Scene,
    initialize:

    function fightScene ()
    {
    	Phaser.Scene.call(this, { key: 'fightScene'});
    },
    preload: function ()
    {
    },
    create: function ()
    {

    var map2 = this.make.tilemap({key: 'map2'});

	var tileset = map2.addTilesetImage('seiferGame2', 'tiles');

	var backgroundLayer2 = map2.createDynamicLayer('SeiferLayer', tileset, 0, 0);

	var fxs = this.sound.add('sfx2', {volume: 0.1});
	fxs.play();
	// this.physics.add.image(500, 400, 'background').setScale(1.5);

	// backgroundLayer2.setCollisionByProperty({collides: true});
	map2.setCollision(23);
	this.physics.add.collider(player, backgroundLayer2);

    player = this.physics.add.sprite(400, 450, 'dude').setSize(16, 16).setOffset(8, 32);
	player.setCollideWorldBounds(true);
	enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: true });
	var svort = enemies.get().setActive(true).setVisible(true);
	svort.spawn();
	statusBar = this.physics.add.group({ classType: fightBar, runChildUpdate: true});
	var statusBar = statusBar.get().setActive(true).setVisible(true);
	statusBar.spawn();
	bars = this.physics.add.group({ classType: energyBar, runChildUpdate: true });
	bar = bars.get().setActive(true).setVisible(true);
	bar.spawn();
	abilitybars = this.physics.add.group({ classType: abilityBar, runChildUpdate: true });
	abilitybar = abilitybars.get().setActive(false).setVisible(false);

	var textName = this.add.text(40, 548, 'Seifer');
	// bar.charge();


    },
    update: function () {
    	if (bar.scaleX >= 1) {
    		abilitybar.spawn(this);
    	}
    },
	});

function fightFunc () {
	    if (player.body.speed > 0) {
	        fightFactor += 1;
	        }
	    if (fightFactor > randFightnumber) {
	    	player.setTint(0xff0000);
	    	this.scene.start('fightScene');
	    }
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 640,
    pixelArt: true,
    physics: {
    	default: 'arcade',
    	arcade: {
    		debug: false
    	}
    },
    scene: [worldScene, fightScene]
};

var game = new Phaser.Game(config);