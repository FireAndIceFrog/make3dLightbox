import { Color, Vector2 } from "three";
import { setBrushColor } from "../../app/brushSlice";
import { SetSelectedElement } from "../../app/canvasSlice";
import { store } from "../../app/store";
import { raycaster, camera, scene } from "../main";
import { intersectedObject } from "./IntersectedObject";

const mouse = new Vector2();

export const HandleMouseClickSingle: React.MouseEventHandler<HTMLCanvasElement> = ( event ) => {
    const dispatch = store.dispatch;
    const isBrushing = store.getState().brushSlice.isBrushing
    if(intersectedObject.length > 0 && !isBrushing){
        
        dispatch(SetSelectedElement(false));
        dispatch(setBrushColor(null))
    }
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );
    const intersects = raycaster.intersectObjects( scene.children );

    if(intersects.length > 0  && !isBrushing){
        intersectedObject.reset()
    }

	if(intersects[0] && intersects[0].object)
    {
        const objInList = intersectedObject.some(x=>x.name == intersects[0].object.name);
        if(objInList)
        {
            intersectedObject.filter(item=> item.name === intersects[0].object.name);
        }
        else 
        {
            intersectedObject.push(intersects[0].object);
        }
	}

    if(intersects.length > 0 && !isBrushing)
    {
        const colour = (intersects[0] as any)?.object?.material?.color as Color | undefined;
        
        if(colour)
        {
            dispatch(setBrushColor(colour.getHexString()))
            dispatch(SetSelectedElement(true));
        }
    }
}