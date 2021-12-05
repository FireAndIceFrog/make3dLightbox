import { Color, Vector2 } from "three";
import { setBrushColor, setBrushNeedsUpdate } from "../../app/brushSlice";
import { SetSelectedElement } from "../../app/canvasSlice";
import { store } from "../../app/store";
import { raycaster, camera, scene } from "../main";
import { intersectedObject } from "./IntersectedObject";

const mouse = new Vector2();

export function intersectOnFrame(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>, shouldReset: boolean = true) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );
    const intersects = raycaster.intersectObjects( scene.children );

    if(intersects.length > 0  && shouldReset){
        intersectedObject.reset()
    }

	if(intersects[0] && intersects[0].object)
    {
        const objInList = intersectedObject.some(x=>x.name.toLowerCase() === intersects[0].object.name.toLowerCase());
        if(!objInList)
        {
            intersectedObject.push(intersects[0].object);
        }
	}

    return intersects
}

export const HandleStandardMouseClick: React.MouseEventHandler<HTMLCanvasElement> = ( event ) => {
    const dispatch = store.dispatch;
    if(intersectedObject.length > 0){
        dispatch(SetSelectedElement(false));
        dispatch(setBrushColor(null))
    }
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
    const intersects = intersectOnFrame(event);

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

export const HandlePaintingMouseClick: React.MouseEventHandler<HTMLCanvasElement> = ( event ) => {
    const dispatch = store.dispatch;
    const isBrushing = store.getState().brushSlice.isBrushing
    if(intersectedObject.length > 0){
        dispatch(SetSelectedElement(false));
        dispatch(setBrushColor(null))
    }
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
    intersectOnFrame(event, isBrushing);

    dispatch(setBrushNeedsUpdate(true));
}

export const HandleMouseClickSingle: React.MouseEventHandler<HTMLCanvasElement> = ( event ) => {
    const dispatch = store.dispatch;
    const isBrushing = store.getState().brushSlice.isBrushing
    if(intersectedObject.length > 0 && !isBrushing){
        
        dispatch(SetSelectedElement(false));
        dispatch(setBrushColor(null))
    }
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
    const intersects = intersectOnFrame(event, !isBrushing);

    if(intersects.length > 0)
    {
        if(!isBrushing)
        {
            dispatch(SetSelectedElement(true));
            
            const colour = (intersects[0] as any)?.object?.material?.color as Color | undefined;
            if(colour)
            {
                dispatch(setBrushColor(colour.getHexString()))
            }
        }
        else 
        {
            dispatch(setBrushNeedsUpdate(true));
        }
        
    }
}

