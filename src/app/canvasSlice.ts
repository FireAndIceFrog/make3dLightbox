import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setBrushColor } from "./brushSlice";
import { store } from "./store";

interface ICanvasSliceState {
    shouldComponentUpdate: boolean, // boolean dictates whether to update the canvas (changing this updates canvas)
    elementHasBeenSelected: boolean,
    width: number,
    height: number
}

const canvasSlice = createSlice(
    {
        name: "canvas",
        initialState: {
            shouldComponentUpdate: true, // boolean dictates whether to update the canvas (changing this updates canvas)
            elementHasBeenSelected: false,
            width: window.innerWidth,
            height: window.innerHeight
    
        } as ICanvasSliceState,
        reducers: {
            setCanvasUpdating: (state, action) => {
                state.shouldComponentUpdate = action.payload;
            },
            SetSelectedElement: {
                reducer: (state, action: PayloadAction<boolean>) => {
                    state.elementHasBeenSelected = action.payload;
                },
                prepare: (value: boolean):  PayloadAction<boolean> => {
                    return {
                        payload: value, 
                        type: "SetSelectedElement"
                    }
                }
            },
            setCanvasSize: (state, action: {payload: {width: number, height: number}})=>{
                state.width = action.payload.width;
                state.height = action.payload.height;
            }
        },
    }
)

export const {  setCanvasUpdating, SetSelectedElement, setCanvasSize } = canvasSlice.actions;
export const canvasSliceReducer = canvasSlice.reducer;