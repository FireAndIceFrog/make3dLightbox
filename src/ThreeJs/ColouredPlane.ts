import * as THREE from 'three';
import { BufferGeometry, IUniform, Material, Mesh, PlaneGeometry, ShaderMaterial, Vector2, Vector3 } from 'three';
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

    render(colours?: number[][][]): Mesh | undefined {
        if (!this.rendered && colours) {
            this.rerender(colours);
            this.rendered = true;
        }
        return this.mesh;
    }

    rerender(colors: number[][][]): Mesh {
        this.geometry = new PlaneGeometry(this.width, this.height);
        this.rows = colors.length;
        this.cols = colors[0].length;

        let negativeSpacingX = 0
        let negativeSpacingY = 0
        let positions: Vector2[] = []
        let colorVecs: Vector3[] = []
        for(let i = 0; i < colors.length; ++i) {
            let spacingY = (i+1)/colors.length -0.5
            for(let j = 0; j < colors[0].length; ++j) {
                let spacingX = (j+1)/colors[0].length -0.5
                let positionVec = new Vector2(spacingX - negativeSpacingX, spacingY - negativeSpacingY)
                let colorVec = new Vector3(colors[i][j][0], colors[i][j][1], colors[i][j][2])
                colorVecs.push(colorVec)
                positions.push(positionVec)
            }
        }

        this.material = new ShaderMaterial({
            fragmentShader: `#define listLength ${colorVecs.length} \n${DiffuseShader}`,
            vertexShader: BasicVertex,
            uniforms: {
                 resolution: {value: new Vector2(this.width,this.height)},
                positions: { type: 'v2v', value: positions} as unknown as IUniform<Vector2>,
                colors: { type: 'v3v', value: colorVecs } as unknown as IUniform<Vector3>
            },
            glslVersion: 1
        })
        this.mesh = new Mesh(this.geometry, this.material)
        return this.mesh;
    }

    updateColors(colors: number[][][]) {
        let negativeSpacingX = 0
        let negativeSpacingY = 0
        let positions: Vector2[] = []
        let colorVecs: Vector3[] = []
        for(let i = 0; i < colors.length; ++i) {
            let spacingY = (i+1)/colors.length -0.5
            for(let j = 0; j < colors[0].length; ++j) {
                let spacingX = (j+1)/colors[0].length -0.5
                let positionVec = new Vector2(spacingX - negativeSpacingX, spacingY - negativeSpacingY)
                let colorVec = new Vector3(colors[i][j][0], colors[i][j][1], colors[i][j][2])
                colorVecs.push(colorVec)
                positions.push(positionVec)
            }
        }

        this.material = new ShaderMaterial({
            fragmentShader: `#define listLength ${colorVecs.length} \n${DiffuseShader}`,
            vertexShader: BasicVertex,
            uniforms: {
                 resolution: {value: new Vector2(this.width,this.height)},
                positions: { type: 'v2v', value: positions} as unknown as IUniform<Vector2>,
                colors: { type: 'v3v', value: colorVecs } as unknown as IUniform<Vector3>
            },
            glslVersion: 1
        });
        (this.mesh as Mesh).material = this.material;
        return this.mesh
    }
}