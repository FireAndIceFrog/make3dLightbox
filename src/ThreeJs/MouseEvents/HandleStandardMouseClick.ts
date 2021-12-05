import { Color } from "three";
import { setBrushColor } from "../../app/brushSlice";
import { SetSelectedElement } from "../../app/canvasSlice";
import { store } from "../../app/store";
import { intersectedObject } from "./IntersectedObject";

export const HandleStandardMouseClick: React.MouseEventHandler<HTMLCanvasElement> = ( event ) => {
    const dispatch = store.dispatch;
    if(intersectedObject.length > 0){
        dispatch(SetSelectedElement(false));
        dispatch(setBrushColor(null))
    }
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
    const intersects = intersectedObject.intersectOnFrame(event);

    if(intersects.length > 0)
    {
        dispatch(SetSelectedElement(true));
            
        const colour = (intersects[0] as any)?.object?.material?.color as Color | undefined;
        if(colour)
        {
            dispatch(setBrushColor(colour.getHexString()))
        }
    }
}