
import { useEffect, useRef } from 'react';
import { useAppSelector } from '../app/hooks'
import {init, renderer, scene, setThreeCanvasSize} from '../ThreeJs/main'
import * as THREE from 'three';
import { Scene } from 'three';
import { useMouseClickHook } from '../hooks/canvasHooks';
import { HandleMouseClickSingle } from '../ThreeJs/MouseEvents/MouseClickSingle';

export default function ThreeCanvas() {
    useAppSelector(s=>s.canvasSlice.shouldComponentUpdate);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const width = useAppSelector(s=>s.canvasSlice.width);
    const height = useAppSelector(s=>s.canvasSlice.height);
    const isBrushing = useAppSelector(s=>s.brushSlice.isBrushing);

    if(canvasRef.current && (width !== canvasRef.current.width || height !== canvasRef.current.height )){
        setThreeCanvasSize(width, height)
    }

    useEffect(()=>{
        if(canvasRef && canvasRef.current !== null && canvasRef.current !== undefined)
        {
            init(canvasRef.current as HTMLCanvasElement);
            return ()=>{
                renderer.dispose();
            }
        }
    },[canvasRef])
    
    return <canvas 
    ref = {canvasRef} 
    onMouseDown ={!isBrushing ? HandleMouseClickSingle : undefined} 
    onMouseMove ={isBrushing ? HandleMouseClickSingle : undefined}
    style = {{width, height}}/>
}