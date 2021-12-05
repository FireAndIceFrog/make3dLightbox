import * as THREE from 'three';
import { BufferGeometry } from 'three';
import { isJSDocCallbackTag } from 'typescript';

export class ColouredPlane {
    private geometry = new BufferGeometry();
    private indices: number[] = [];
    private vertices: number[] = [];
    private normals: number[] = [];
    private colors: number[] = [];
    private size = 10;
    private segments = 10;
    private halfSize = 0;
    private triangleSize = 0;
    private rendered = false;


    // generate vertices, normals and color data for a simple grid geometry
    constructor(size?:number, segments?: number) {
        if(size) {
            this.size = size;
        }
        if(segments) {
            this.segments = segments ;
        }
        this.halfSize = this.size / 2 ;
        this.triangleSize = this.size / this.segments ;
    }

    render(colours?: number[][]): BufferGeometry {
        if (!this.rendered) {
            this.rerender(colours);
            this.rendered = true;
        }
        return this.geometry;
    }

    rerender(colours?: number[][]): BufferGeometry {
        const dummyColors: number[] = []
        this.vertices = []
        this.normals = []
        this.indices = []
        this.colors = []

        for ( let row = 0; row < this.segments; row++ ) {

            const y = ( row * this.triangleSize ) - this.halfSize; // make y relative to the center of the plane

            for ( let col = 0; col < this.segments; col ++ ) {
                const x = ( col * this.triangleSize ) - this.halfSize; // make x relative to the center of the plane

                this.vertices.push( x, - y, 0 ); //centre of the square
                this.normals.push( 0, 0, 1 );

                if(!colours) {
                    const r = ( x / this.size ) + 0.5;
                    const g = ( y / this.size ) + 0.5;
                    dummyColors.push( r, g, 0 );
                }
            }

        }
        
        if(!colours) {
            this.colors = dummyColors;
        } else {
            this.colors = colours.map(x=>{
                const items = []
                items.push(x)
                return items.flat()
            }).flat();
        }
        // generate indices (data for element array buffer)

        for ( let col = 0; col < (this.segments-1); col ++ ) {

            for ( let row = 0; row < (this.segments-1); row ++ ) {

                const topLeft = ( col * this.segments ) + row;
                const topRight = (col *  this.segments ) + ( row + 1 );
                const bottomLeft = ( ( col + 1) * this.segments ) + row;
                const bottomRight = ( ( col + 1 ) * this.segments ) + ( row + 1);
                // generate two faces (triangles) per iteration

                this.indices.push( topLeft, topRight, bottomRight ); // face one

                this.indices.push( bottomRight, bottomLeft, topLeft ); // face two
            }
        }

        this.geometry.setIndex( this.indices );
        this.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( this.vertices, 3 ) );
        this.geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( this.normals, 3 ) );
        this.geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( this.colors, 3 ) );
        this.geometry.rotateZ(Math.PI/2);
        return this.geometry;
    }

    updateColors(colours: number[][]) {
        
        this.colors = colours.map(x=>{
            const items = []
            items.push(x)
            return items.flat()
        }).flat();
        
        this.geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( this.colors, 3 ) );
        return this.geometry
    }
}