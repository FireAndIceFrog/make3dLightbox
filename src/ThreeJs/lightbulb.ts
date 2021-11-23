import { ColorRepresentation, Mesh, MeshPhongMaterial,  NoBlending, Object3D, PointLight, Scene, SphereGeometry, SubtractiveBlending } from "three";
import { generateUUID } from "three/src/math/MathUtils";

export default class Lightbulb {
    private lightSource: PointLight;
    private bulb: Mesh;
    constructor(color: ColorRepresentation){
        this.lightSource = new PointLight( color, 1, 4,2 );


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
    }

    public AddToScene(scene: Object3D<Event> | Scene  ): void {
        scene.add(this.bulb)
        scene.add( this.lightSource );
    }

    public Move(x:number, y:number, z:number): void {
        this.lightSource.position.set(x, y, z - 2.5);
        this.bulb.position.set(x, y, z);
    }

}