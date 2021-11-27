import {  Color, Mesh, MeshPhongMaterial,  NoBlending, Object3D, PointLight, Scene, SphereGeometry, SpotLight, SubtractiveBlending } from "three";
import { generateUUID } from "three/src/math/MathUtils";

export default class Lightbulb {
    private bulb: Mesh;
    private color: number;
    constructor(color: number){
        const bulbGeom = new SphereGeometry(0.5, 20, 20, 16);
        const bulbMaterial = new MeshPhongMaterial( 
            { 
                color: color, 
                specular: color,
                blending: NoBlending,
                shininess: 0,
            } );
        this.bulb = new Mesh( bulbGeom, bulbMaterial );
        this.bulb.name = `bulb - ${generateUUID()}`;
        this.color = color;
    }

    public AddToScene(scene: Object3D<Event> | Scene  ): void {
        scene.add(this.bulb)
    }

    public Move(x:number, y:number, z:number): void {
        this.bulb.position.set(x, y, z);
    }

    public getColor(): number[] {
        return [(this.color&0xff0000)/0xff0000, (this.color&0x00ff00)/0x00ff00, (this.color&0x0000ff)/0x0000ff];
    }

    public setColor(color: Color) {
        this.color = color.getHex();
        (this.bulb.material as MeshPhongMaterial).color = color
    }

    public getName() {
        return this.bulb.name;
    }
}