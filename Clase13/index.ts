class Color {
    getColor():string  {
        let color:string = (Math.floor(Math.random() * (256 - 0)) + 0).toString().padStart(3, '0');
        return color
    }
    generateColor ():void {
        console.log(`rgb(${this.getColor()}, ${this.getColor()}, ${this.getColor()})`)
    }

}

const color:Color   = new Color(); 
color.generateColor ();