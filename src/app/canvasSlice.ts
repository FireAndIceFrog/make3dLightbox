import { createSlice } from "@reduxjs/toolkit";
import { Color } from "three";
import { intersectedObject, setThreeCanvasSize } from "../ThreeJs/main";

interface ICanvasSliceState {
    shouldComponentUpdate: boolean, // boolean dictates whether to update the canvas (changing this updates canvas)
    elementHasBeenSelected: boolean,
    selectedColor: number | null,
    width: number,
    height: number
}

const canvasSlice = createSlice(
    {
        name: "canvas",
        initialState: {
            shouldComponentUpdate: true, // boolean dictates whether to update the canvas (changing this updates canvas)
            elementHasBeenSelected: false,
            selectedColor: 0xffffff
        } as ICanvasSliceState,
        reducers: {
            setCanvasUpdating: (state, action) => {
                state.shouldComponentUpdate = action.payload;
            },
            SetSelectedElement: (state, action) => {
                state.elementHasBeenSelected = action.payload;
                if(action.payload === true && intersectedObject && (intersectedObject as any)?.material?.color){
                    const colour = (intersectedObject as any)?.material?.color as  { r:number, b:number, g: number, set: (color: number) => void };
                    state.selectedColor = (colour.r*0xff0000 | colour.g*0x00ff00 | colour.b*0x0000ff);
                } else {
                    state.selectedColor = null
                }
            },
            setCanvasSize: (state, action: {payload: {width: number, height: number}})=>{
                state.width = action.payload.width;
                state.height = action.payload.height;
                setThreeCanvasSize(action.payload.width, action.payload.height)
            }
        },
    }
)

export const {  setCanvasUpdating, SetSelectedElement, setCanvasSize } = canvasSlice.actions;
export const canvasSliceReducer = canvasSlice.reducer;