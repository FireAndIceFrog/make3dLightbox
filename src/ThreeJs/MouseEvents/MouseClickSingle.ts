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
    if(intersectedObject.list.length > 0 && !isBrushing){
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
        intersectedObject.list = [];
    }

	if(intersects[0] && intersects[0].object)
    {
        const objInList = intersectedObject.list.some(x=>x.name == intersects[0].object.name);
        if(objInList)
        {
            intersectedObject.list.filter(item=> item.name === intersects[0].object.name);
        }
        else 
        {
            intersectedObject.list.push(intersects[0].object);
        }
	}

    if(intersectedObject.list.length > 0 && !isBrushing)
    {
        const colour = (intersectedObject.list[0] as any)?.material?.color as Color;
        dispatch(setBrushColor(colour.getHexString()))
        dispatch(SetSelectedElement(true));
    }
}