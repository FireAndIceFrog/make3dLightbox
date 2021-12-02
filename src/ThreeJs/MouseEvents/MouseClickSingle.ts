import { Color, Object3D, Vector2 } from "three";
import { setBrushColor } from "../../app/brushSlice";
import { SetSelectedElement } from "../../app/canvasSlice";
import { store } from "../../app/store";
import { raycaster, camera, scene } from "../main";
import { intersectedObject } from "./IntersectedObject";

const mouse = new Vector2();

export const HandleMouseClickSingle: React.MouseEventHandler<HTMLCanvasElement> = ( event ) => {
    const dispatch = store.dispatch;
    if(intersectedObject.list.length > 0){
        dispatch(SetSelectedElement(false));
        dispatch(setBrushColor(null))
    }
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );
    const intersects = raycaster.intersectObjects( scene.children );
    if(intersects.length > 0){
        intersectedObject.list = [];
    }

	for ( let i = 0; i < intersects.length; i ++ ) {
        intersectedObject.list.push(intersects[0].object);
        break;
	}

    if(intersectedObject.list.length > 0)
    {
        const colour = (intersectedObject.list[0] as any)?.material?.color as Color;
        dispatch(setBrushColor(colour.getHexString()))
        dispatch(SetSelectedElement(true));
    }
}