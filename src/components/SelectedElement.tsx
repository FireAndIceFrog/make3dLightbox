import { useAppSelector } from "../app/hooks";
import { intersectedObject } from "../ThreeJs/main";

export default function Selected3DElement() {
    const elmSelected = useAppSelector(state=>state.canvasSlice.elementHasBeenSelected)
    

    if(elmSelected && intersectedObject){
        const colour = (intersectedObject as any)?.material?.color as undefined | null | { r:number, b:number, g: number, set: (color: number) => void };
        
        
        (intersectedObject as any)?.material?.color?.set(0x00ff00);
        const onRedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if(colour && colour.set){
                const currentColor = colour.r + colour.g + colour.b;
                colour.set(parseInt(e.target.value, 16));
            }
        }

        return (
        <div>
            <p>Selected Element: {intersectedObject?.name}</p>
            <p>Red: <input type="number" value = {colour?.r}></input></p>
            <p>Green: <input type="number" value = {colour?.g}></input></p>
            <p>Blue: <input type="number" value = {colour?.b}></input></p>
        </div>
        )

    }
    return <div/>
}