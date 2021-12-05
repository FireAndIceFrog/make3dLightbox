import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../app/hooks'
import {init, renderer, setThreeCanvasSize} from '../../ThreeJs/main'
import { HandlePaintingMouseClick, HandleStandardMouseClick } from '../../ThreeJs/MouseEvents/MouseClickSingle';
import "./index.scss"

const classes = {
    isBrushing: "three-canvas--isBrushing",
    isGrabbing: "three-canvas--isGrabbing",
}

export default function ThreeCanvas() {
    useAppSelector(s=>s.canvasSlice.shouldComponentUpdate);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const width = useAppSelector(s=>s.canvasSlice.width);
    const height = useAppSelector(s=>s.canvasSlice.height);
    const isBrushing = useAppSelector(s=>s.brushSlice.isBrushing);
    const [mouseDown, setMouseDown] = useState(false)

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

    const currClass = isBrushing ? classes.isBrushing : !mouseDown ? "":classes.isGrabbing;
    
    return <canvas 
    ref = {canvasRef} 
    onMouseDown ={!isBrushing ? HandleStandardMouseClick : ()=>setMouseDown(true)} 
    onMouseUp = {()=>setMouseDown(false)}
    onMouseMove ={isBrushing &&  mouseDown? HandlePaintingMouseClick : undefined}
    className = {currClass}
    style = {
        {
            width, 
            height
        }
    }/>
}