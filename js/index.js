/**
 * Created by IceWolf on 2016/12/22.
 */
(function (win) {
    function replaceP(a) {return Math.PI/180*a;}//角度转化为弧度.
    //混入式继承
    function extend(o1,o2){
        for(var key in o2){
            if(o2.hasOwnProperty(key)){
                o1[key]=o2[key];
            }
        }
    }
    function NewPipe(ctx,x,y,r,data){
        this.ctx=ctx;
        this.x=x;
        this.y=y;
        this.r=r;
        this.data=data;
        this.colors =
            ("purple,rebeccapurple,red,rosybrown,royalblue,saddlebrown,salmon,sandybrown,seagreen,seashell,sienna," +
            "silver,skyblue,slateblue,slategray,slategrey,snow,springgreen,steelblue,tan,teal,thistle,transparent," +
            "tomato,turquoise,violet,wheat,white,whitesmoke,yellow,yellowgreen" ).split( ',' );
    }
    //对象原型扩充(这里o1原型,o2空对象)
    extend(NewPipe.prototype,{
        draw:function(){
            var num=0;
            //求数据总和
            this.data.forEach(function (obj) {
                num+=obj.val;
            })
            //初始化扇形开始结束位置
            var startAngle=0;
            var endAngle=0;
            var self=this;
            var lineAngle=0;
            var lineX=0;
            var lineY=0;
            this.data.forEach(function (obj, index) {
                //每一个扇形的起始弧度是上一个扇形的终止弧度
                startAngle=endAngle;
                //每个扇形的终止角度
                endAngle+=360/num*obj.val;
                //每个扇形里直线需要旋转的角度
                lineAngle=startAngle+180/num*obj.val;
                //每个扇形里直线的终点坐标
                lineX=self.x+(self.r+20)*Math.cos(replaceP(lineAngle));
                lineY=self.y+(self.r+20)*Math.sin(replaceP(lineAngle));
                self.ctx.beginPath();
                self.ctx.moveTo(self.x,self.y);
                self.ctx.arc(self.x,self.y,self.r,replaceP(startAngle),replaceP(endAngle));
                //对每个扇形填充颜色
                self.ctx.fillStyle=self.colors[index];
                self.ctx.fill();
                //划线
                self.ctx.beginPath();
                self.ctx.moveTo(self.x,self.y);
                self.ctx.lineTo(lineX,lineY);
                self.ctx.strokeStyle=self.colors[index];
                self.ctx.stroke();
                //绘制文字
                self.ctx.beginPath();
                self.ctx.font="40 微软雅黑";
                if(lineAngle>=90&&lineAngle<=270){
                    self.ctx.textAlign="right";
                }else{
                    self.ctx.textAlign="left";
                }
                self.ctx.strokeText(obj.msg,lineX,lineY);
            })
        }
    })
    win.NewPipe=NewPipe;
}(window))