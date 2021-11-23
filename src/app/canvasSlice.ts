import { createSlice } from "@reduxjs/toolkit";

const canvasSlice = createSlice(
    {
        name: "canvas",
        initialState: {
            shouldComponentUpdate: true, // boolean dictates whether to update the canvas (changing this updates canvas)
            elementHasBeenSelected: false
        },
        reducers: {
            setCanvasUpdating: (state, action) => {
                state.shouldComponentUpdate = action.payload;
            },
            SetSelectedElement: (state, action) => {
                state.elementHasBeenSelected = action.payload;
            }
        },
    }
)

export const {  setCanvasUpdating, SetSelectedElement } = canvasSlice.actions;
export const canvasSliceReducer = canvasSlice.reducer;