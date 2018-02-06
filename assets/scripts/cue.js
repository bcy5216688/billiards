cc.Class({
    extends: cc.Component,

    properties: {
        shootPower: 18,
    },

    // onLoad: function () {
        
    // },

    start: function() {
        this.body = this.node.getComponent(cc.RigidBody);
    },

    // update: function (dt) {

    // },

    // 球杆锚点在中心的算法
    // shootAt: function(dst) {
    //     // 冲量: 给这个球杆一个方向的冲量，矢量，大小，有方向;
    //     // 方向问题:  src---> dst;
    //     var src = this.node.getPosition();
    //     var dir = cc.pSub(dst, src);


    //     // 大小问题;
    //     var cue_len_half = this.node.width * 0.5;
    //     var len = cc.pLength(dir);
    //     var distance = len - cue_len_half;
    //     // end 

    //     var power_x = distance * this.shootPower * dir.x / len;
    //     var power_y = distance * this.shootPower * dir.y / len;

    //     // applyLinearImpulse(冲量大小向量, 球杆的原点转成世界坐标, true)
    //     this.body.applyLinearImpulse(cc.p(power_x, power_y), this.node.convertToWorldSpaceAR(cc.p(0, 0)), true);
    // },

    shootAt: function(dst) {
        // 冲量: 给这个球杆一个方向的冲量，矢量，大小，有方向;
        // 方向问题:  src---> dst;
        var src = this.node.getPosition();
        var dir = cc.pSub(dst, src);
        console.log("dir:" + dir.x + "," + dir.y);
        var power_x = this.shootPower * dir.x;
        var power_y = this.shootPower * dir.y;
        console.log("power_x, power_y:" + power_x + "," + power_y);
        // applyLinearImpulse(冲量大小向量, 球杆的原点转成世界坐标, true)
        this.body.applyLinearImpulse(cc.p(power_x, power_y), this.node.convertToWorldSpaceAR(cc.p(0, 0)), true);
    },

    onPreSolve: function(contact, selfCollider, otherCollider) {
        this.node.active = false;
    },
});
