cc.Class({
    extends: cc.Component,

    properties: {
        ballRoot: {
            default: null,
            type: cc.Node
        },
        whiteBallNode: {
            default: null,
            type: cc.Node
        }
    },

    // onLoad: function () {

    // },

    start: function () {
        this.isGameStart = true;
    },

    resetGame: function () {
        for (var i = 0; i < this.ballRoot.childrenCount; i++) {
            var ballNode = this.ballRoot.children[i];
            ballNode.getComponent("ball").reset();
        }
        this.whiteBallNode.getComponent("whiteball").reset();
        this.isGameStart = true;
    },

    checkIsGameOver: function () {
        for (var i = 0; i < this.ballRoot.childrenCount; i++) {
            var ballNode = this.ballRoot.children[i];
            if (ballNode.active === true) {
                return;
            }
        }

        this.isGameStart = false;
        this.scheduleOnce(this.resetGame.bind(this),5);
    },

    // update: function (dt) {

    // },
});
