cc.Class({
    extends: cc.Component,

    properties: {
        cueSpr: {
            default: null,
            type: cc.Node
        },
        minDis: 20,
    },

    onLoad: function () {
        this.cueScript = this.cueSpr.getComponent("cue");

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
            console.log("vecDegree:" + vecDegree);
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
});
