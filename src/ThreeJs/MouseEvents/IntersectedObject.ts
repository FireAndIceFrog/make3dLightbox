import { Color, Event, Object3D } from "three";
import { store } from "../../app/store";
import { lightBulbFactory } from "../LightBulbFactory";
import { colouredPlaneGeom, colouredPlaneMesh } from "../main";

type listIterator = (value: Object3D<Event>, index: number, array: Object3D<THREE.Event>[]) => boolean | Object3D<THREE.Event>

interface IIntersectedObject 
{
    SetSelectedColor: (color:any)=> void;
    push: (...items: Object3D<Event>[])=>void;
    filter: (pred: listIterator) => void;
    some: (pred: listIterator)=>void
}

class IntersectedObject implements IIntersectedObject{
    private currColor: string | null = null;
    private list: Object3D<THREE.Event>[] = [];

    constructor() {
        store.subscribe(()=>{
            const state = store.getState();
            if(state.brushSlice.selectedColor !== this.currColor)
            {
                this.currColor = state.brushSlice.selectedColor;
                if((state.canvasSlice.elementHasBeenSelected || state.brushSlice.isBrushing) && this.currColor !== null)
                {
                    this.SetSelectedColor(this.currColor)
                }
            }
        })
    }

    public SetSelectedColor (colorRep: any) {
        const col = new Color(colorRep)
        this.list.forEach(async (item: any) => {
            if(item && item.material && item.material.color){
                const name = item.name as string;
                const bulb = lightBulbFactory.findBulb(name);

                if(bulb) {
                    bulb.setColor(col)
        
                    const lightBulbColors = lightBulbFactory.generateColors();
                    colouredPlaneMesh.geometry =  colouredPlaneGeom.updateColors(lightBulbColors)
                }
            }
        })
    }

    public push(...items: Object3D<THREE.Event>[])
    {
        this.list.push(...items)
    }

    public filter(pred: listIterator ) 
    {
        return this.list.filter(pred)
    }

    public some(pred: listIterator) 
    {
        return this.list.some(pred)
    }

    public reset() 
    {
        this.list = []
    }

    get length() {
        return this.list.length;
    }

    set color(color: string|null) {
        if(color !== this.currColor)
        {
            this.SetSelectedColor(color);
        }
        this.currColor = color;
    }

    get color() {
        return this.currColor;
    }
}

const intersectedObject = new IntersectedObject()
export {intersectedObject}