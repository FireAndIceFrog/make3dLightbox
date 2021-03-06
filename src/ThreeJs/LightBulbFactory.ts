import { Object3D, Scene } from "three";
import Lightbulb from "./lightbulb";

class LightBulbFactory {
    private bulbs: Lightbulb[][] = [];

    public generateLightBulbs(z:number, row:number, cols:number, scene: Object3D<Event> | Scene)
    {
        const lightbulbs: Lightbulb[][] = [];
        for (let i = 0; i < row; i++)
        {
            const rowData = [];
            // let color =  Math.random() * i % 3 === 0 ? 0xff0000 : i % 2 === 0 ? 0x00ff00 : 0x0000ff;
            let color = (Math.random() * (i* 0x111111 >> i)) % 0xffffff
            for (let j = 0; j < cols; j++)
            {
                
                // let color = (Math.random()*0xffffff)&0xffffff
                const lightbulb = new Lightbulb(color);
                lightbulb.AddToScene(scene);
                lightbulb.Move(0.5+i-Math.floor(row/2), j+0.5, z);
                rowData.push(lightbulb);
            }
            lightbulbs.push(rowData);
        }
        this.bulbs = lightbulbs;
        return this.bulbs;
    }

    getBulbs() {
        if(this.bulbs.length === 0) {
            return null;
        }
        return this.bulbs;
    }

    count() {
        return this.bulbs.length * this.bulbs[0].length; // expected square size
    }

    cols() {
        return this.bulbs.length
    }

    generateColors() {
        const colors:number[][][] = new Array(this.bulbs.length);
        for (let i = 0; i < this.bulbs.length; i++)
        {
            const row = new Array(this.bulbs[i].length)
            for (let j = 0; j < this.bulbs[i].length; j++)
            {
                row[j] = this.bulbs[i][j].getColor();
            }
            colors[i] = row;
        }
        return colors;
    }

    findBulb(name:string) {
        const flatBulbs = this.bulbs.flat()
        return flatBulbs.find(x=>x.getName() === name)
    }
}

export const lightBulbFactory = new LightBulbFactory()