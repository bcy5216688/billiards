cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        this.startX = this.node.x;
        this.startY = this.node.y;
        this.rigidBody = this.node.getComponent(cc.RigidBody);
    },

    // update: function (dt) {

    // },

    reset: function () {
        this.node.scale = 1;
        this.node.x = this.startX;
        this.node.y = this.startY;
        this.rigidBody.linearVelocity = cc.p(0,0);  // Vec2 刚体在世界坐标下的线性速度
        this.rigidBody.angularVelocity = 0;  // 刚体的角速度
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        // 白球可能碰到 球杆,球,桌边,球袋
        if (otherCollider.node.groupIndex == 2) {
            this.node.active = false;
            return;
        }
    }
});
