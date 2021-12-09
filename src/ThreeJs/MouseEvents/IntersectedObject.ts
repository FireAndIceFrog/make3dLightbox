import { Color, Event, Mesh, Object3D } from "three";
import { setBrushNeedsUpdate } from "../../app/brushSlice";
import { store } from "../../app/store";
import { lightBulbFactory } from "../LightBulbFactory";
import { colouredPlaneGeom, colouredPlaneMesh } from "../main";
import { Vector2 } from "three";
import { raycaster, camera, scene } from "../main";

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
    private mouse = new Vector2();

    constructor() {
        store.subscribe(()=>{
            const state = store.getState();
            if( state.brushSlice.needsUpdate || state.brushSlice.selectedColor !== this.currColor)
            {
                this.currColor = state.brushSlice.selectedColor;
                if( (state.canvasSlice.elementHasBeenSelected || state.brushSlice.isBrushing) && this.currColor !== null)
                {
                    this.SetSelectedColor(this.currColor)

                    if(state.brushSlice.isBrushing)
                    {
                        this.reset();
                        store.dispatch(setBrushNeedsUpdate(false))
                    }
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
                    colouredPlaneGeom.updateColors(lightBulbColors) as Mesh;
                }
            }
        })
    }

    public intersectOnFrame(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>, shouldReset: boolean = true) {
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
        raycaster.setFromCamera( this.mouse, camera );
        const intersects = raycaster.intersectObjects( scene.children );
    
        if(intersects.length > 0  && shouldReset){
            this.reset()
        }
    
        if(intersects[0] && intersects[0].object)
        {
            const objInList = this.some(x=>x.name.toLowerCase() === intersects[0].object.name.toLowerCase());
            if(!objInList)
            {
                this.push(intersects[0].object);
            }
        }
    
        return intersects
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