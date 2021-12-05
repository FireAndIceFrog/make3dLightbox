import { setBrushColor, setBrushNeedsUpdate } from "../../app/brushSlice";
import { SetSelectedElement } from "../../app/canvasSlice";
import { store } from "../../app/store";
import { intersectedObject } from "./IntersectedObject";

export const HandlePaintingMouseClick: React.MouseEventHandler<HTMLCanvasElement> = ( event ) => {
    const dispatch = store.dispatch;
    const isBrushing = store.getState().brushSlice.isBrushing
    if(intersectedObject.length > 0){
        dispatch(SetSelectedElement(false));
        dispatch(setBrushColor(null))
    }
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
    intersectedObject.intersectOnFrame(event, isBrushing);

    dispatch(setBrushNeedsUpdate(true));
}