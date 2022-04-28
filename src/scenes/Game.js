import Phaser from 'https://codepen.io/kaka2023/pen/NWwjJWJ.js'

import Carrot from 'https://codepen.io/kaka2023/pen/MWOmYwO.js'
import DiamondCarrot from 'https://codepen.io/kaka2023/pen/NWwzxNd.js'
import GoldenCarrot from 'https://codepen.io/kaka2023/pen/MWOBPgX.js'
import RottenCarrot from 'https://codepen.io/kaka2023/pen/ExbBgrr.js'

export default class Game extends Phaser.Scene
{
	/** @type {Phaser.Physics.Arcade.StaticGroup} */
	platforms

	/** @type {Phaser.Physics.Arcade.Sprite} */
	player

	/** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
	cursors

	/** @type {Phaser.Physics.Arcade.Group} */
	carrots

	carrotsCollected = 0

	/** @type {Phaser.GameObjects.Text} */
	carrotsCollectedText

	constructor()
	{
		super('game')
	}

	init()
	{
		this.carrotsCollected = 0
	}
/**assets start here*/
	preload()
	{
		this.load.image('background', 'https://raw.githubusercontent.com/xmas2701/Infinite-Jumper/main/assets/Beautiful%20Rape%20Flower%20Spring%20Spring%20Background.png')
		this.load.image('platform', 'https://raw.githubusercontent.com/xmas2701/Infinite-Jumper/main/assets/ground_grass.png')
		this.load.image('bunny-stand', 'https://raw.githubusercontent.com/xmas2701/Infinite-Jumper/main/assets/bunny1_stand.png')
		this.load.image('bunny-jump', 'https://raw.githubusercontent.com/xmas2701/Infinite-Jumper/main/assets/bunny1_jump.png')
		this.load.image('carrot', 'https://raw.githubusercontent.com/xmas2701/Infinite-Jumper/main/assets/carrot.png')
	  	this.load.image('DiamondCarrot', 'https://raw.githubusercontent.com/xmas2701/Infinite-Jumper/main/assets/Diamond%20carrot.PNG')
    		this.load.image('GoldenCarrot', 'https://raw.githubusercontent.com/xmas2701/Infinite-Jumper/main/assets/Golden%20carrot.PNG')
   		this.load.image('RottenCarrot', 'https://raw.githubusercontent.com/xmas2701/Infinite-Jumper/main/assets/Rotten%20carrot.PNG')
    		this.load.image('DiamondBunnyStand', 'https://raw.githubusercontent.com/xmas2701/Infinite-Jumper/994035cf208640c4657283d0996605142592e6e6/assets/A1F720E0-A543-4687-B645-9AA0A51250B9.png')
    		this.load.image('GoldenBunnyStand', 'https://raw.githubusercontent.com/xmas2701/Infinite-Jumper/b13f14cd768ef1c2b7fc3689993119b573e83bed/assets/9E63185B-83AA-4826-9054-6B7DD66FB68D.png')
    		this.load.image('DiamondBunnyJump', 'https://raw.githubusercontent.com/xmas2701/Infinite-Jumper/2452a51c428b11d92d102f85467af8968fbdbdbc/35B8095F-7657-43E4-A0C4-EB3041D7753F.png')
    		this.load.image('GoldenBunnyJump', 'https://raw.githubusercontent.com/xmas2701/Infinite-Jumper/a59cc455d88b8b3f2a36961300debbc8b2c3a5f5/assets/010151B8-5FCA-46BE-B39C-84F4B0658325.png')
    
		this.load.audio('jump', 'https://raw.githubusercontent.com/xmas2701/Infinite-Jumper/main/assets/sfx/phaseJump1.wav')
    this.load.audio("BackgroundMusic","https://raw.githubusercontent.com/xmas2701/Infinite-Jumper/main/assets/sfx/Monkeys-Spinning-Monkeys.wav")
    this.load.audio("collectDiamondCarrot","https://raw.githubusercontent.com/xmas2701/Infinite-Jumper/main/assets/sfx/mixkit-player-boost-recharging-2040.wav")
  this.load.audio("collectGoldenCarrot","https://raw.githubusercontent.com/xmas2701/Infinite-Jumper/main/assets/sfx/mixkit-player-boost-recharging-2040.wav")
		this.cursors = this.input.keyboard.createCursorKeys()
	}
/**creates the background*/
	create()
	{
    this.bunnyjumptex = "bunny-jump";
    this.bunnystandtex = "bunny-stand";
		this.add.image(240, 320, 'background')
			.setScrollFactor(1, 0)

		this.platforms = this.physics.add.staticGroup()

		// then create 5 platforms from the group
		for (let i = 0; i < 5; ++i)
		{
			const x = Phaser.Math.Between(80, 400)
			const y = 150 * i
	
			/** @type {Phaser.Physics.Arcade.Sprite} */
			const platform = this.platforms.create(x, y, 'platform')
			platform.scale = 0.5
	
			/** @type {Phaser.Physics.Arcade.StaticBody} */
			const body = platform.body
			body.updateFromGameObject()
		}

		this.player = this.physics.add.sprite(240, 320, this.bunnystandtex)
			.setScale(0.5)

		this.physics.add.collider(this.platforms, this.player)
		
		this.player.body.checkCollision.up = false
		this.player.body.checkCollision.left = false
		this.player.body.checkCollision.right = false

		this.cameras.main.startFollow(this.player)
		this.cameras.main.setDeadzone(this.scale.width * 1.5)

		this.carrots = this.physics.add.group({
			classType: Carrot
		})
    this.diamondcarrots = this.physics.add.group({
			classType: DiamondCarrot
		})
     this.goldencarrots = this.physics.add.group({
			classType: GoldenCarrot
		})
     this.rottencarrots = this.physics.add.group({
			classType: RottenCarrot
     })
		this.physics.add.collider(this.platforms, this.carrots)
    this.physics.add.collider(this.platforms, this.diamondcarrots)
		this.physics.add.overlap(this.player, this.carrots, this.handleCollectCarrot, undefined, this)
    this.physics.add.overlap(this.player, this.diamondcarrots, this.handleCollectCarrot, undefined, this)
    this.physics.add.overlap(this.player, this.goldencarrots, this.handleCollectCarrot, undefined, this)
    this.physics.add.overlap(this.player, this.rottencarrots, this.handleCollectCarrot, undefined, this)
    	

		this.carrotsCollectedText = this.add.text(240, 10, 'Carrots: 0', { color: '#000', fontSize: 24 })
			.setScrollFactor(0)
			.setOrigin(0.5, 0)
	}

	update(t, dt)
	{
		if (!this.player)
		{
			return
		}

		this.platforms.children.iterate(child => {
			/** @type {Phaser.Physics.Arcade.Sprite} */
			const platform = child

			const scrollY = this.cameras.main.scrollY
			if (platform.y >= scrollY + 700)
			{
				platform.y = scrollY - Phaser.Math.Between(50, 100)
				platform.body.updateFromGameObject()
				this.addCarrotAbove(platform)
			}
		})

		const touchingDown = this.player.body.touching.down

		if (touchingDown)
		{
			this.player.setVelocityY(-300)
      this.player.setTexture(this.bunnyjumptex)
			this.sound.play('jump')
		}
  
		const vy = this.player.body.velocity.y
		if (vy > 0 && this.player.texture.key !== this.bunnystandtex)
		{
			this.player.setTexture(this.bunnystandtex)
		}

		if (this.cursors.left.isDown && !touchingDown)
		{
			this.player.setVelocityX(-200)
		}
		else if (this.cursors.right.isDown && !touchingDown)
		{
			this.player.setVelocityX(200)
		}
		else
		{
			this.player.setVelocityX(0)
		}

		/**
    var velocity = {
      this.diamondcarrots.setVelocityY(5);
      
      return this;
    }
    */
    this.horizontalWrap(this.player)

		const bottomPlatform = this.findBottomMostPlatform()
		if (this.player.y > bottomPlatform.y + 200)
		{
			this.scene.start('game-over')
		}
	}

	/**
	 * 
	 * @param {Phaser.GameObjects.Sprite} sprite 
	 */
	horizontalWrap(sprite)
	{
		const halfWidth = sprite.displayWidth * 0.5
		const gameWidth = this.scale.width
		if (sprite.x < -halfWidth)
		{
			sprite.x = gameWidth + halfWidth
		}
		else if (sprite.x > gameWidth + halfWidth)
		{
			sprite.x = -halfWidth
		}
	}

	/**
	 * 
	 * @param {Phaser.GameObjects.Sprite} sprite 
	 */
	addCarrotAbove(sprite)
	{
		const y = sprite.y - sprite.displayHeight

		/** @type {Phaser.Physics.Arcade.Sprite} */  
    
    let carrot
    /**
    if(Math.random() <0.25) {
       carrot = this.carrots.get(sprite.x, y, 'carrot')
    } else {
        carrot = this.diamondcarrots.get(sprite.x, y, 'DiamondCarrot')
    }
	 */
    
    let p = Math.random()
    if (p < 0.10) {
        carrot = this.diamondcarrots.get(sprite.x, y, 'DiamondCarrot')
    } else if (0.1<= p && p < 0.3) {
        carrot = this.goldencarrots.get(sprite.x, y, 'GoldenCarrot')
    } else if (0.4<= p && p < 0.5) {
        carrot = this.rottencarrots.get(sprite.x, y, 'RottenCarrot')
    } else {
        carrot = this.carrots.get(sprite.x, y, 'carrot')
    }
    
      
		carrot.setActive(true)
		carrot.setVisible(true)

		this.add.existing(carrot)

		carrot.body.setSize(carrot.width, carrot.height)

		this.physics.world.enable(carrot)

		return carrot
	}

	/**
	 * 
	 * @param {Phaser.Physics.Arcade.Sprite} player 
	 * @param {Carrot} carrot 
	 */
	handleCollectCarrot(player, carrot)
	{
		this.carrots.killAndHide(carrot)
    this.diamondcarrots.killAndHide(carrot)
    this.goldencarrots.killAndHide(carrot)
    this.rottencarrots.killAndHide(carrot)
		this.physics.world.disableBody(carrot.body)

		this.carrotsCollected+= carrot.points
    this.bunnystandtex = carrot.standtex
    this.bunnyjumptex = carrot.jumptex
    
      if (carrot.constructor.name == "DiamondCarrot") {
      console.log(Game.time);
      this.time.addEvent({
        delay: 5000,
        callback: this.changebackEvent,
        callbackScope: this
      });
     
    }

		this.carrotsCollectedText.text = `Carrots: ${this.carrotsCollected}`
	}
    changebackEvent() {
       this.bunnystandtex = "bunny-stand";
       this.bunnyjumptex = "bunny-jump";
       this.player.setTexture(this.bunnystandtex);
  }


	findBottomMostPlatform()
	{
		const platforms = this.platforms.getChildren()
		let bottomPlatform = platforms[0]

		for (let i = 1; i < platforms.length; ++i)
		{
			const platform = platforms[i]

			// discard any platforms that are above current
			if (platform.y < bottomPlatform.y)
			{
				continue
			}

			bottomPlatform = platform
		}

		return bottomPlatform
	}
}
