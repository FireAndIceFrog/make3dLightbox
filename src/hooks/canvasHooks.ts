import { setCanvasUpdating } from '../app/canvasSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {canvasRefs} from '../Common/InjectedVars';

export function useCanvas(index: number): [null | HTMLCanvasElement,
    (canvasRef: HTMLCanvasElement)=>void] 
{
    const dispatch = useAppDispatch();
    const shouldComponentUpdate = useAppSelector(state => state.canvasSlice.shouldComponentUpdate); 
    const fireUpdate = (x: boolean)=>dispatch(setCanvasUpdating(x));

    const updateCanvas = (canvasRef: HTMLCanvasElement) => 
    {
        canvasRefs.set(index, canvasRef);
        fireUpdate(!shouldComponentUpdate);
    }  

    let currentCanvas = canvasRefs.get(index) ?? null;
    return [ currentCanvas, updateCanvas ];
}