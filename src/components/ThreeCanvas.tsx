
import { useEffect, useRef } from 'react';
import { useAppSelector } from '../app/hooks'
import {init, renderer, scene} from '../ThreeJs/main'
import * as THREE from 'three';
import { Scene } from 'three';

export default function ThreeCanvas() {
    useAppSelector(s=>s.canvasSlice.shouldComponentUpdate);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(()=>{
        if(canvasRef && canvasRef.current !== null && canvasRef.current !== undefined)
        {
            init(canvasRef.current as HTMLCanvasElement);
            return ()=>{
                renderer.dispose();
            }
        }
    },[canvasRef])
    return <canvas ref = {canvasRef}/>
}