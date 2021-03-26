import React from 'react'

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xBase: 400,
            yBase: 40,
            xPos: 400,
            yPos: 40,
            moveUp: true,
            wobbleSwitch: true,
            wobbleAmount: 50,
            cloudX: 900,
            cloudY: 100,
            cloud2X: 1200,
            cloud2Y: 200,
            cloud3X: 1500,
            cloud3Y: 150,
            ufoLightColor: 'rgb(255, 255, 0)',
            skyColorR: 102,
            skyColorG: 205,
            skyColorB: 246,
            sunUp: false,
            starsOut: false,
            starFade: 0.0,
        }
    }
 
    drawScene(ctx, canvas){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        this.drawSky(ctx);
        this.starsOut(ctx)
        this.drawCloudOne(ctx);
        this.drawCloudTwo(ctx);
        this.drawCloudThree(ctx);
        this.drawGround(ctx);
        this.drawTree(ctx, 15, 150);
        this.drawTree(ctx, 70, 250);
        this.drawTree(ctx, 100, 300);
        this.drawTree(ctx, 670, 320);
        this.drawTree(ctx, 640, 300);
        this.drawTree(ctx, 760, 200);
        this.drawTree(ctx, 710, 250);       
        this.ufoBeam(ctx);
        this.drawUFO(ctx);
        this.ufoCabin(ctx);
        this.ufoLights(ctx);
        this.changeAxis();
        this.wobbleUFO();
        this.changeWobbleAmount();
        console.log(this.state.starFade)
    }

    changeColor() {
        if (this.state.ufoLightColor === 'rgb(255, 255, 0)') {
            this.setState(state => ({ufoLightColor: state.ufoLightColor = 'rgb(200, 0, 0)'}))
        } else if (this.state.ufoLightColor === 'rgb(200, 0, 0)') {
            this.setState(state => ({ufoLightColor: state.ufoLightColor = 'rgb(255, 255, 0)'}))
        };
    }

    drawUFO(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.state.xPos, this.state.yPos);
        ctx.quadraticCurveTo(this.state.xPos - 50, this.state.yPos, this.state.xPos - 50, this.state.yPos);
        ctx.quadraticCurveTo(this.state.xPos - 140, this.state.yPos - 15, this.state.xPos - 50, this.state.yPos - 30);
        ctx.quadraticCurveTo(this.state.xPos - 25, this.state.yPos - 50, this.state.xPos, this.state.yPos - 30);
        ctx.quadraticCurveTo(this.state.xPos + 90, this.state.yPos - 15, this.state.xPos, this.state.yPos);
        ctx.fillStyle = 'rgb(100, 100, 100)';
        ctx.fill();
        ctx.stroke();


    }

    ufoCabin(ctx){
        ctx.beginPath();
        ctx.moveTo(this.state.xPos - 50, this.state.yPos -30);
        ctx.quadraticCurveTo(this.state.xPos - 25, this.state.yPos - 50, this.state.xPos, this.state.yPos - 30);
        ctx.quadraticCurveTo(this.state.xPos - 25, this.state.yPos -20, this.state.xPos -50, this.state.yPos - 30);
        ctx.fillStyle = 'rgb(255, 255, 0)';
        ctx.fill();
    }

    ufoLights(ctx){
        ctx.beginPath();
        ctx.arc(this.state.xPos + 30, this.state.yPos - 15, 5, 0, 2 *  Math.PI);
        ctx.fillStyle = this.state.ufoLightColor;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.state.xPos - 80, this.state.yPos - 15, 5, 0, 2 *  Math.PI);
        ctx.fillStyle = this.state.ufoLightColor;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.state.xPos, this.state.yPos - 5, 5, 0, 2 *  Math.PI);
        ctx.fillStyle = this.state.ufoLightColor;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.state.xPos - 50, this.state.yPos - 5, 5, 0, 2 *  Math.PI);
        ctx.fillStyle = this.state.ufoLightColor;
        ctx.fill();
    }

    drawSky(ctx) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(810, 0);
        ctx.lineTo(0, 460);
        let myGradient = ctx.createLinearGradient(500, 1000, 1000, 0);
        myGradient.addColorStop(0, "white");
        myGradient.addColorStop(1, `rgb(${this.state.skyColorR}, ${this.state.skyColorG - 20}, ${this.state.skyColorB - 20})`);
        ctx.fillStyle = myGradient;
        ctx.fill();
        ctx.fillStyle = `rgb(${this.state.skyColorR}, ${this.state.skyColorG}, ${this.state.skyColorB})`;
        ctx.fillRect(0, 0, 800, 450);

        ctx.beginPath();
        ctx.moveTo(800, 450);
        ctx.lineTo(800, 0);
        ctx.lineTo(0, 450);
        let myGradient2 = ctx.createLinearGradient(0, 0, 0, 1000);
        myGradient2.addColorStop(0, `rgba(${this.state.skyColorR}, ${this.state.skyColorG - 20}, ${this.state.skyColorB - 20}, 0.5)`);
        myGradient2.addColorStop(1, "white");
        ctx.fillStyle = myGradient2;
        ctx.fill();
    }

    drawStars(ctx, x, y){
        ctx.beginPath()
        ctx.arc(x, y, 1, 0, 2 *  Math.PI);
        ctx.fillStyle = `rgba(255, 255, 0, ${this.state.starFade})`;
        ctx.fill();
    }

    drawMulipleStars(ctx){
        this.drawStars(ctx, 100, 70)
        this.drawStars(ctx, 300, 60)
        this.drawStars(ctx, 200, 50)
        this.drawStars(ctx, 600, 100)
        this.drawStars(ctx, 250, 100)
        this.drawStars(ctx, 450, 80)
        this.drawStars(ctx, 550, 70)
        this.drawStars(ctx, 350, 40)
        this.drawStars(ctx, 700, 50)

        if (this.state.starFade === 1) this.setState(state => ({starsOut: state.starsOut = true}))
        if (this.state.starFade === 0) this.setState(state => ({starsOut: state.starsOut = false}))
        this.state.starsOut ? this.starsDown() : this.starsUp()
    }

    starsOut(ctx){
        if (this.state.skyColorB < 50) this.drawMulipleStars(ctx)
    }

    starsUp(){
        this.setState(state => ({starFade: state.starFade + 0.01}))
    }

    starsDown(){
        this.setState(state => ({starFade: state.starFade - 0.01}))
    }

    sunRise(){
        this.setState(state => ({skyColorR: state.skyColorR + 1}) );
        this.setState(state => ({skyColorG: state.skyColorG + 1}) );
        this.setState(state => ({skyColorB: state.skyColorB + 1}) );
    }

    sunSet(){
        this.setState(state => ({skyColorR: state.skyColorR - 1}) );
        this.setState(state => ({skyColorG: state.skyColorG - 1}) );
        this.setState(state => ({skyColorB: state.skyColorB - 1}) );
    }

    changeSkyColor(){
        if (this.state.skyColorB === 102) this.setState(state => ({sunUp: state.sunUp = false}) );
        if (this.state.skyColorB === 0) this.setState(state => ({sunUp: state.sunUp = true}) );
        this.state.sunUp ? this.sunRise() : this.sunSet();
    }

    drawGround(ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'rgb(0, 180, 0)';
        ctx.fillRect(0, 430, 800, 20);
    }

    drawCloudOne(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.state.cloudX, this.state.cloudY);
        ctx.quadraticCurveTo(this.state.cloudX - 30, this.state.cloudY - 70, this.state.cloudX -50 , this.state.cloudY -20);
        ctx.quadraticCurveTo(this.state.cloudX - 100, this.state.cloudY - 80, this.state.cloudX -100 , this.state.cloudY - 10);
        ctx.quadraticCurveTo(this.state.cloudX -150, this.state.cloudY -40, this.state.cloudX -110, this.state.cloudY + 20);
        ctx.quadraticCurveTo(this.state.cloudX -150, this.state.cloudY + 70, this.state.cloudX - 80, this.state.cloudY + 40);
        ctx.quadraticCurveTo(this.state.cloudX - 60, this.state.cloudY + 70, this.state.cloudX -30, this.state.cloudY + 30);
        ctx.quadraticCurveTo(this.state.cloudX, this.state.cloudY + 70, this.state.cloudX, this.state.cloudY + 30);
        ctx.quadraticCurveTo(this.state.cloudX + 50, this.state.cloudY + 30, this.state.cloudX, this.state.cloudY);
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fill();
        if (this.state.cloudX === -100) this.setState(state => ({cloudX: state.cloudX = 900 }));
        this.setState(state => ({cloudX: state.cloudX - 1}));
    }

    drawCloudTwo(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.state.cloud2X, this.state.cloud2Y);
        ctx.quadraticCurveTo(this.state.cloud2X - 30, this.state.cloud2Y - 70, this.state.cloud2X -50 , this.state.cloud2Y -20);
        ctx.quadraticCurveTo(this.state.cloud2X - 70, this.state.cloud2Y - 70, this.state.cloud2X -90 , this.state.cloud2Y - 10);
        ctx.quadraticCurveTo(this.state.cloud2X -150, this.state.cloud2Y -40, this.state.cloud2X -110, this.state.cloud2Y + 20);
        ctx.quadraticCurveTo(this.state.cloud2X -150, this.state.cloud2Y + 70, this.state.cloud2X - 80, this.state.cloud2Y + 40);
        ctx.quadraticCurveTo(this.state.cloud2X - 60, this.state.cloud2Y + 70, this.state.cloud2X -30, this.state.cloud2Y + 30);
        ctx.quadraticCurveTo(this.state.cloud2X, this.state.cloud2Y + 70, this.state.cloud2X, this.state.cloud2Y + 30);
        ctx.quadraticCurveTo(this.state.cloud2X + 50, this.state.cloud2Y + 30, this.state.cloud2X, this.state.cloud2Y);
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fill();
        if (this.state.cloud2X === -100) this.setState(state => ({cloud2X: state.cloud2X = 900 }));
        this.setState(state => ({cloud2X: state.cloud2X - 1}));
    }

    drawCloudThree(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.state.cloud3X, this.state.cloud3Y);
        ctx.quadraticCurveTo(this.state.cloud3X - 30, this.state.cloud3Y - 70, this.state.cloud3X -50 , this.state.cloud3Y -20);
        ctx.quadraticCurveTo(this.state.cloud3X - 100, this.state.cloud3Y - 80, this.state.cloud3X -100 , this.state.cloud3Y - 10);
        ctx.quadraticCurveTo(this.state.cloud3X -150, this.state.cloud3Y -40, this.state.cloud3X -110, this.state.cloud3Y + 20);
        ctx.quadraticCurveTo(this.state.cloud3X -150, this.state.cloud3Y + 70, this.state.cloud3X - 80, this.state.cloud3Y + 40);
        ctx.quadraticCurveTo(this.state.cloud3X - 60, this.state.cloud3Y + 70, this.state.cloud3X -30, this.state.cloud3Y + 30);
        ctx.quadraticCurveTo(this.state.cloud3X, this.state.cloud3Y + 70, this.state.cloud3X, this.state.cloud3Y + 30);
        ctx.quadraticCurveTo(this.state.cloud3X + 50, this.state.cloud3Y + 30, this.state.cloud3X, this.state.cloud3Y);
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fill();
        if (this.state.cloud3X === -100) this.setState(state => ({cloud3X: state.cloud3X = 900 }));
        this.setState(state => ({cloud3X: state.cloud3X - 1}));
    }

    changeWobbleAmount(){
        if (this.state.yPos > 300) {
            this.setState(state => ({wobbleAmount: state.wobbleAmount = 10}));
        } else if ((this.state.yPos > 250)) {
            this.setState(state => ({wobbleAmount: state.wobbleAmount = 20}));
        } else if ((this.state.yPos > 200)) {
            this.setState(state => ({wobbleAmount: state.wobbleAmount = 30}));
        } else if ((this.state.yPos > 150)) {
            this.setState(state => ({wobbleAmount: state.wobbleAmount = 40}));
        } else if ((this.state.yPos > 100)) {
            this.setState(state => ({wobbleAmount: state.wobbleAmount = 50}));
        }
    }

    changeAxis() {
        if(this.state.yPos === (this.state.yBase)) this.setState(state => ({moveUp: state.moveUp = false}));
        if(this.state.yPos === (this.state.yBase + 390)) this.setState(state => ({moveUp: state.moveUp = true}));
        this.state.moveUp ? this.yPosUp() : this.yPosDown();
    }

    yPosUp() {
        this.setState(state => ({
            yPos: state.yPos - 1
        }));
    }

    yPosDown() {
        this.setState(state => ({
            yPos: state.yPos + 1
        }));
    }

    wobbleUFO(){
        if(this.state.xPos === this.state.xBase - this.state.wobbleAmount) this.setState(state => ({wobbleSwitch: state.wobbleSwitch = false}));
        if (this.state.xPos === this.state.xBase + this.state.wobbleAmount) this.setState(state => ({wobbleSwitch: state.wobbleSwitch = true}));
        this.state.wobbleSwitch ? this.xPosLeft() : this.xPosRight();
    }

    xPosRight(){
        this.setState(state => ({
            xPos: state.xPos + 1
        }));
    }

    xPosLeft(){
        this.setState(state => ({
            xPos: state.xPos - 1
        }));
    }

    ufoBeam(ctx){
        ctx.beginPath();
        ctx.moveTo(this.state.xPos - 25, this.state.yPos -10);
        ctx.lineTo(this.state.xPos + (4000 / (this.state.yPos / 5)), (435 + (400 / this.state.yPos)));
        ctx.lineTo(this.state.xPos - (50 + (4000 / (this.state.yPos / 5))), (435 + (400 /this.state.yPos)));
        let myGradient = ctx.createLinearGradient(this.state.xPos, this.state.yPos + 30, this.state.xPos, 450);
        myGradient.addColorStop(0, 'rgba(255, 255, 0, 0.8)');
        myGradient.addColorStop(1, 'rgba(255, 255, 255, 0.2)');
        ctx.fillStyle = myGradient;
        ctx.fill();
    }

    drawTree(ctx, treeX, treeY){
        ctx.beginPath();
        ctx.moveTo(treeX, treeY);
        ctx.lineTo(treeX + 80, 400);
        ctx.lineTo(treeX - 80, 400);
        ctx.fillStyle = 'rgba(0, 110, 0, 1)';
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(treeX, treeY - 100);
        ctx.lineTo(treeX + 50, 400);
        ctx.lineTo(treeX - 50, 400);
        ctx.fillStyle = 'rgba(0, 100, 0, 1)';
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(treeX, treeY -50);
        ctx.lineTo(treeX + 60, 400);
        ctx.lineTo(treeX - 60, 400);
        ctx.fillStyle = 'rgba(0, 120, 0, 1)';
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = 'rgb(100, 100, 100)';
        ctx.fillRect(treeX -10, 400, 20, 40);

    }

    componentDidMount() {   
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        this.interval = setInterval(() => this.drawScene(ctx, canvas), 10);
        this.lightsInterval = setInterval(() => this.changeColor(), 300);
        this.skyColorInterval = setInterval(() => this.changeSkyColor(), 50)
    }

    render() {

        return (
            <div>
            <canvas id='canvas' ref='canvas' width='800' height='450'></canvas>
            </div>

            
        )
    }
}


export default Canvas;
