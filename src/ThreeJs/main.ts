import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { Object3D, PointLight, Scene } from 'three';
import Lightbulb from './lightbulb';
import { store } from '../app/store';
import { SetSelectedElement } from '../app/canvasSlice';

export let renderer: THREE.WebGLRenderer;
export let scene: THREE.Object3D<THREE.Event> | THREE.Scene;
export let camera: THREE.PerspectiveCamera;
export const raycaster = new THREE.Raycaster();
export let stats: { dom: any; update: () => void; };
export let intersectedObject: Object3D<THREE.Event> | null = null;

const mouse = new THREE.Vector2();

export function generateLightBulbs(z:number, row:number, cols:number, scene: Object3D<Event> | Scene)
{
    const lightbulbs: Lightbulb[][] = [];
    for (let i = 0; i < row; i++)
    {
        const rowData = [];
        let color =  i % 3 === 0 ? 0xff0000 : i % 2 === 0 ? 0x00ff00 : 0x0000ff;
        for (let j = 0; j < cols; j++)
        {
            const lightbulb = new Lightbulb(color);
            lightbulb.AddToScene(scene);
            lightbulb.Move(0.5+i-Math.floor(row/2), j+0.5, z);
            rowData.push(lightbulb);
        }
        lightbulbs.push(rowData);
    }
    return lightbulbs;
}

function onMouseClick( event: MouseEvent ) {
    const dispatch = store.dispatch;
    if(intersectedObject){
        dispatch(SetSelectedElement(false));
    }
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );
    const intersects = raycaster.intersectObjects( scene.children );
    if(intersects.length > 0){
        intersectedObject = null;
    }

	for ( let i = 0; i < intersects.length; i ++ ) {
        intersectedObject = intersects[ 0 ].object;
	}
    if(intersectedObject)
    {
        dispatch(SetSelectedElement(true));
    }
}
document.addEventListener( 'mousedown', onMouseClick )

export function init(canvas: HTMLCanvasElement = document.createElement('canvas')) {
    renderer = new THREE.WebGLRenderer( { antialias: true, canvas: canvas } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animation );
    renderer.outputEncoding = THREE.sRGBEncoding;

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 0, 5, - 15 );

    scene = new Scene();

    RectAreaLightUniformsLib.init();

    const bulbs = generateLightBulbs(0.5, 10, 10, scene as Scene);
    
    const highlightSource = new PointLight( 0xffffff, 1, 100);
    highlightSource.position.set(0, 0,  25);
    scene.add(highlightSource);

    const box = new THREE.BoxGeometry(10, 10, 1, 16);
    const matKnot = new THREE.MeshPhongMaterial( 
        { 
            color: 0xffffff, 
            combine: THREE.MixOperation,
        } );

    const meshKnot = new THREE.Mesh( box, matKnot );
    meshKnot.name = 'meshKnot';
    meshKnot.position.set( 0, 5, 0 );
    scene.add( meshKnot );

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.target.copy( meshKnot.position );
    controls.update();

    window.addEventListener( 'resize', onWindowResize );

    stats = Stats();
    document.body.appendChild( stats.dom );
}

function onWindowResize() {

    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = ( window.innerWidth / window.innerHeight );
    camera.updateProjectionMatrix();

}

function animation( time: number ) {

    // const mesh = scene.getObjectByName( 'meshKnot' );
    // if ( mesh ) mesh.rotation.y = time * 0.001;

    renderer.render( scene, camera );

    stats.update();
}