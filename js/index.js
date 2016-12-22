/**
 * Created by IceWolf on 2016/12/22.
 */
(function (win) {
    function replaceP(a) {return Math.PI/180*a;}//�Ƕ�ת��Ϊ����.
    //����ʽ�̳�
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
    //����ԭ������(����o1ԭ��,o2�ն���)
    extend(NewPipe.prototype,{
        draw:function(){
            var num=0;
            //�������ܺ�
            this.data.forEach(function (obj) {
                num+=obj.val;
            })
            //��ʼ�����ο�ʼ����λ��
            var startAngle=0;
            var endAngle=0;
            var self=this;
            var lineAngle=0;
            var lineX=0;
            var lineY=0;
            this.data.forEach(function (obj, index) {
                //ÿһ�����ε���ʼ��������һ�����ε���ֹ����
                startAngle=endAngle;
                //ÿ�����ε���ֹ�Ƕ�
                endAngle+=360/num*obj.val;
                //ÿ��������ֱ����Ҫ��ת�ĽǶ�
                lineAngle=startAngle+180/num*obj.val;
                //ÿ��������ֱ�ߵ��յ�����
                lineX=self.x+(self.r+20)*Math.cos(replaceP(lineAngle));
                lineY=self.y+(self.r+20)*Math.sin(replaceP(lineAngle));
                self.ctx.beginPath();
                self.ctx.moveTo(self.x,self.y);
                self.ctx.arc(self.x,self.y,self.r,replaceP(startAngle),replaceP(endAngle));
                //��ÿ�����������ɫ
                self.ctx.fillStyle=self.colors[index];
                self.ctx.fill();
                //����
                self.ctx.beginPath();
                self.ctx.moveTo(self.x,self.y);
                self.ctx.lineTo(lineX,lineY);
                self.ctx.strokeStyle=self.colors[index];
                self.ctx.stroke();
                //��������
                self.ctx.beginPath();
                self.ctx.font="40 ΢���ź�";
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