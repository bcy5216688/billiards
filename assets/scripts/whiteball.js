var Ball = require("ball");

cc.Class({
    // extends: cc.Component,
    extends: Ball,

    properties: {
        cueSpr: {
            default: null,
            type: cc.Node
        },
        minDis: 20,
    },

    onLoad: function () {
        this.cueScript = this.cueSpr.getComponent("cue");
        this.startX = this.node.x;
        this.startY = this.node.y;
        this.rigidBody = this.node.getComponent(cc.RigidBody);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(event) {
            var worldPos = event.getLocation();
            var endPos = this.node.parent.convertToNodeSpaceAR(worldPos);
            var ballPos = this.node.getPosition();
            var vec = cc.pSub(endPos,ballPos);
            var vecLen = cc.pLength(vec);

            if (vecLen < this.minDis) {
                this.cueSpr.active = false;
                return;
            }

            this.cueSpr.active = true;
            var vecRadian = Math.atan2(vec.y, vec.x);
            var vecDegree = vecRadian / Math.PI * 180;
            // console.log("vecDegree:" + vecDegree);
            this.cueSpr.rotation = 360 - vecDegree + 180;
            this.cueSpr.position = endPos;

            // 球杆锚点在中心点时,算球杆位置的方法. 把球杆锚点设置到球杆头处可以省去下面的算法
            // var cueLenHalf = this.cueSpr.width / 2;
            // var cuePos = endPos;
            // cuePos.x += cueLenHalf / vecLen * vec.x;
            // cuePos.y += cueLenHalf / vecLen * vec.y;
            // this.cueSpr.setPosition(cuePos);
        },this);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
            if (this.cueSpr.active === false) {
                return;
            }
            this.cueScript.shootAt(this.node.getPosition());
        }, this);
    },

    // update: function (dt) {

    // },

    // reset: function () {
    //     this.node.scale = 1;
    //     this.node.x = this.startX;
    //     this.node.y = this.startY;
    //     this.rigidBody.linearVelocity = cc.p(0,0);  // Vec2 刚体在世界坐标下的线性速度
    //     this.rigidBody.angularVelocity = 0;  // 刚体的角速度
    // },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        // 白球可能碰到 球杆,球,桌边,球袋
        if (otherCollider.node.groupIndex == 2) {
            this.node.scale = 0;
            this.scheduleOnce(this.reset.bind(this),1);  // 1秒后把白球放回原处
            return;
        }
    }
});
