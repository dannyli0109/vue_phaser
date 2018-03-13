/* eslint-disable no-unused-vars */
import 'pixi'
import 'p2'
import Phaser from 'phaser'
import { addAnimation } from './util.js'
/* eslint-enable no-unused-vars */

export default class extends Phaser.Sprite {
    constructor ({ game, x, y, asset }) {
        super(game, x, y, asset)
        this.anchor.setTo(0.5)

        this.scale.setTo(16 / 24, 16 / 24)
        addAnimation(this, 'right', [[3, 4, 16], [3, 6, 16], [7, 0, 16]], 20)
        addAnimation(this, 'left', [[3, 0, 16], [3, 2, 16], [7, 0, 16]], 20)
        addAnimation(this, 'up', [[3, 1, 16], [3, 3, 16], [7, 0, 16]], 20)
        addAnimation(this, 'down', [[3, 5, 16], [3, 7, 16], [7, 0, 16]], 20)
        addAnimation(this, 'stop', [[7, 0, 16]], 20)
        this.game.physics.arcade.enable(this)

        this.animations.play('stop')
        this.cursors = this.game.input.keyboard.createCursorKeys()
    }

    update () {
        // this.game.physics.arcade.collide(this.pacman, this.layer)
        // this.game.physics.arcade.overlap(this.pacman, this.dots, this.eatDot, null, this)

        if (this.lastPressed) {
            if (this.lastPressed === 4) {
                this.body.velocity.x = -90
            } else if (this.lastPressed === 1) {
                this.body.velocity.x = 90
            } else if (this.lastPressed === 2) {
                this.body.velocity.y = -90
            } else {
                this.body.velocity.y = 90
            }
        }
        if (this.cursors.left.isDown) {
            this.body.velocity.x = -90
            this.lastPressed = 4
        } else if (this.cursors.right.isDown) {
            this.body.velocity.x = 90
            this.lastPressed = 1
        } else if (this.cursors.up.isDown) {
            this.body.velocity.y = -90
            this.lastPressed = 2
        } else if (this.cursors.down.isDown) {
            this.body.velocity.y = 90
            this.lastPressed = 3
        }

        if (this.body.position.x > this.body.prev.x) {
            this.animations.play('right')
        } else if (this.body.position.x < this.body.prev.x) {
            this.animations.play('left')
        } else if (this.body.position.y > this.body.prev.y) {
            this.animations.play('down')
        } else if (this.body.position.y < this.body.prev.y) {
            this.animations.play('up')
        } else {
            this.animations.stop()
        }

        if (this.body.position.x < 0) {
            this.body.position.x = 432
        } else if (this.body.position.x > 432) {
            this.body.position.x = 0
        }
    }
}