import * as THREE from 'three';
import { BufferGeometry } from 'three';

export class ColouredPlane {
    private geometry = new BufferGeometry();
    private indices: number[] = [];
    private vertices: number[] = [];
    private normals: number[] = [];
    private colors: number[] = [];
    private size = 10;
    private segments = 10;
    private halfSize = 0;
    private segmentSize = 0;
    private rendered = false;


    // generate vertices, normals and color data for a simple grid geometry
    constructor(size?:number, segments?: number) {
        if(size) {
            this.size = size;
        }
        if(segments) {
            this.segments = segments;
        }
        this.halfSize = this.size / 2;
        this.segmentSize = this.size / this.segments;
    }

    render(colours?: number[]): BufferGeometry {
        if (!this.rendered) {
            this.rerender(colours);
            this.rendered = true;
        }
        return this.geometry;
    }

    rerender(colours?: number[]): BufferGeometry {
        if(!colours) {
            for ( let i = 0; i < this.segments; i ++ ) {

                const y = ( i * this.segmentSize ) - this.halfSize;

                for ( let j = 0; j < this.segments; j ++ ) {

                    const x = ( j * this.segmentSize ) - this.halfSize;

                    this.vertices.push( x, - y, 0 );
                    this.normals.push( 0, 0, 1 );

                    const r = ( x / this.size ) + 0.5;
                    const g = ( y / this.size ) + 0.5;

                    this.colors.push( r, g, 0 );
                }

            }
        } else {
            this.colors = colours;
            for ( let i = 0; i < this.segments; i ++ ) {

                const y = ( i * this.segmentSize ) - this.halfSize;

                for ( let j = 0; j < this.segments; j ++ ) {

                    const x = ( j * this.segmentSize ) - this.halfSize;

                    this.vertices.push( x, - y, 0 );
                    this.normals.push( 0, 0, 1 );
                }

            }
        }
        // generate indices (data for element array buffer)

        for ( let i = 0; i < this.segments-1; i ++ ) {

            for ( let j = 0; j < this.segments-1; j ++ ) {

                const a = i * ( this.segments ) + ( j + 1 );
                const b = i * ( this.segments ) + j;
                const c = ( i + 1 ) * ( this.segments ) + j;
                const d = ( i + 1 ) * ( this.segments ) + ( j + 1 );

                // generate two faces (triangles) per iteration

                this.indices.push( a, b, d ); // face one
                this.indices.push( b, c, d ); // face two

            }

        }

        //

        this.geometry.setIndex( this.indices );
        this.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( this.vertices, 3 ) );
        this.geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( this.normals, 3 ) );
        this.geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( this.colors, 3 ) );
        this.geometry.rotateZ(Math.PI/2);
        return this.geometry;
    }

    updateColors(colours: number[]) {
        this.colors = colours;
        this.geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( this.colors, 3 ) );
        return this.geometry
    }
}