import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { Color, Mesh, PointLight, Scene } from 'three';
import { store } from '../app/store';
import { ColouredPlane } from './ColouredPlane';
import {lightBulbFactory} from './LightBulbFactory';
import { intersectedObject } from './MouseEvents/IntersectedObject';

export let renderer: THREE.WebGLRenderer;
export let scene: THREE.Object3D<THREE.Event> | THREE.Scene;
export let camera: THREE.PerspectiveCamera;
export const raycaster = new THREE.Raycaster();
export let mouseOrbitControls: OrbitControls

export function EnableControls(status: boolean) { 
    mouseOrbitControls.enabled = status
}

export let colouredPlaneGeom:ColouredPlane
export let colouredPlaneMesh: Mesh

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

    lightBulbFactory.generateLightBulbs(0.5, 10, 10, scene as Scene);
    
    const highlightSource = new PointLight( 0xffffff, 1, 100);
    highlightSource.position.set(0, 0,  25);
    scene.add(highlightSource);

    const light = new THREE.AmbientLight( 0xffffff,1 ); // soft white light
    scene.add( light );

    // setGradient(box);
    const matKnot = new THREE.MeshPhongMaterial( 
        { 
            side: THREE.DoubleSide,
            vertexColors: true
        } );
    
    const lightBulbColors = lightBulbFactory.generateColors();
    const numBulbs = lightBulbFactory.cols();
    colouredPlaneGeom = new ColouredPlane(11, numBulbs);

    colouredPlaneMesh = new THREE.Mesh( colouredPlaneGeom.render(lightBulbColors), matKnot );
    colouredPlaneMesh.name = 'meshKnot';
    colouredPlaneMesh.position.set( 0.5, 5.5, 0 );
    scene.add( colouredPlaneMesh );

    mouseOrbitControls = new OrbitControls( camera, renderer.domElement );
    mouseOrbitControls.target.copy( colouredPlaneMesh.position );
    mouseOrbitControls.update();
}

store.subscribe(()=>{
    const state = store.getState();
    if(state.brushSlice.isBrushing === mouseOrbitControls.enabled) {
        mouseOrbitControls.enabled = !state.brushSlice.isBrushing;
    }
})

export function setThreeCanvasSize(width: number, height: number) 
{
    renderer.setSize( width,height );
    camera.aspect = ( width / height );
    camera.updateProjectionMatrix();
}

function animation( time: number ) {

    // const mesh = scene.getObjectByName( 'meshKnot' );
    // if ( mesh ) mesh.rotation.y = time * 0.001;

    renderer.render( scene, camera );

}