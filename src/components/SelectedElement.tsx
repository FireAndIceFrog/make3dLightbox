import { useAppSelector } from "../app/hooks";
import { intersectedObject } from "../ThreeJs/main";

export default function Selected3DElement() {
    const elmSelected = useAppSelector(state=>state.canvasSlice.elementHasBeenSelected)
    

    if(elmSelected && intersectedObject){
        const colour = (intersectedObject as any)?.material.color as { r:number, b:number, g: number};

        return (
        <div>
            <p>Selected Element: {intersectedObject?.name}</p>
            <p>Red: {colour?.r}</p>
            <p>Green:{colour?.g} </p>
            <p>blue:{colour?.b} </p>
        </div>
        )

    }
    return <div/>
}