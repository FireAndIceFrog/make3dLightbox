import { Color, Object3D } from "three";
import { store } from "../../app/store";
import { lightBulbFactory } from "../LightBulbFactory";
import { colouredPlaneGeom, colouredPlaneMesh } from "../main";

class IntersectedObject {
    private currColor = "";
    constructor() {
        store.subscribe(()=>{
            const state = store.getState();
            if(state.brushSlice.selectedColor != this.currColor)
            {
                this.SetSelectedColor(state.brushSlice.selectedColor)
            }
        })
    }

    public SetSelectedColor (colorRep: any) {
        this.list.forEach(async (item: any) => {
            if(item && item?.material?.color){
                const name = item?.name as string;
                const col = new Color(colorRep)
        
                const bulb = lightBulbFactory.findBulb(name);
                bulb?.setColor(col)
        
                const lightBulbColors = lightBulbFactory.generateColors();
                colouredPlaneMesh.geometry =  colouredPlaneGeom.updateColors(lightBulbColors)
            }
        })
    }

    public list: Object3D<THREE.Event>[] = [];
}

const intersectedObject = new IntersectedObject()
export {intersectedObject}