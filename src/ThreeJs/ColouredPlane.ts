import * as THREE from 'three';
import { BufferGeometry, IUniform, Mesh, PlaneGeometry, ShaderMaterial, Vector2, Vector3 } from 'three';
import BasicVertex from './shaders/BasicVertex';
import DiffuseShader from './shaders/DiffuseShader';

export class ColouredPlane {
    private geometry = new PlaneGeometry();
    private width = 0;
    private height = 0;
    private rows = 0;
    private cols = 0;
    private rendered = false;
    private material = new ShaderMaterial();
    private mesh: undefined | Mesh = undefined

    // generate vertices, normals and color data for a simple grid geometry
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    render(colours?: number[][]): Mesh | undefined {
        if (!this.rendered && colours) {
            this.rerender(colours);
            this.rendered = true;
        }
        return this.mesh;
    }

    rerender(colors: number[][]): Mesh {
        this.geometry = new PlaneGeometry(this.width, this.height);
        this.rows = colors.length;
        this.cols = colors[0].length;

        this.material = new ShaderMaterial({
            fragmentShader: `#define listLength ${4} \n${DiffuseShader}`,
            vertexShader: BasicVertex,
            uniforms: {
                 resolution: {value: new Vector2(this.width,this.height)},
                // positions: { type: 'v2v', value: [
                //     new Vector2(0.5,0.2),
                //     new Vector2(-0.5, 0.2),
                //     new Vector2(0.0, -0.7)
                // ]} as unknown as IUniform<Vector2>,
                // colors: { type: 'v2v', value: [
                //     new Vector3(1,0,0),
                //     new Vector3(0,1,0),
                //     new Vector3(0,0,1)
                // ] } as unknown as IUniform<Vector2>
            },
            glslVersion: 1
        })
        this.mesh = new Mesh(this.geometry, this.material)
        return this.mesh;
    }

    updateColors(colours: number[][]) {
        
        return this.mesh
    }
}