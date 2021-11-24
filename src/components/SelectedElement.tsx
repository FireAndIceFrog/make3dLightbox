import { useRef, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { intersectedObject } from "../ThreeJs/main";

export default function Selected3DElement() {
    const elmSelected = useAppSelector(state=>state.canvasSlice.elementHasBeenSelected)

    const redRef = useRef<HTMLInputElement>(null);
    const greenRef = useRef<HTMLInputElement>(null);
    const blueRef = useRef<HTMLInputElement>(null);

    if(elmSelected && intersectedObject && (intersectedObject as any)?.material?.color){
        const colour = (intersectedObject as any)?.material?.color as  { r:number, b:number, g: number, set: (color: number) => void };
        
        const onSubmit = () => {
            if(redRef.current && greenRef.current && blueRef.current){
                const red = parseInt(redRef.current.value);
                const green = parseInt(greenRef.current.value);
                const blue = parseInt(blueRef.current.value);
                (intersectedObject as any)?.material?.color?.set(red*0xff0000 + green*0x00ff00 + blue*0x0000ff);
            }
        }

        return (
        <div>
            <p>Selected Element: {intersectedObject?.name}</p>
            <p>Red: <input type="text" defaultValue = {colour.r*255}  ref = {redRef}></input></p>
            <p>Green: <input type="text" defaultValue = {colour.g*255} ref = {greenRef}></input></p>
            <p>Blue: <input type="text" defaultValue = {colour.b*255}  ref = {blueRef }></input></p>
            <button onClick={onSubmit}>Submit</button>
        </div>
        )

    }
    return <div/>
}