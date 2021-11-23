import { createSlice } from "@reduxjs/toolkit";

const canvasSlice = createSlice(
    {
        name: "canvas",
        initialState: {
            shouldComponentUpdate: true, // boolean dictates whether to update the canvas (changing this updates canvas)
            width: 0,
            height: 0,
            mouseX: 0,
            mouseY: 0,
        },
        reducers: {
            setCanvas: (state, action) => {
                state.width = action.payload.width;
                state.height = action.payload.height;
            },
            setMousePosition: (state, action) => {
                state.mouseX = action.payload.x;
                state.mouseY = action.payload.y;
            },
            setCanvasDimensions: (state, action) => {
                state.width = action.payload.width;
                state.height = action.payload.height;
            },
            setCanvasUpdating: (state, action) => {
                state.shouldComponentUpdate = action.payload;
            }
        },
    }
)

export const { setCanvas, setMousePosition, setCanvasDimensions, setCanvasUpdating } = canvasSlice.actions;
export const canvasSliceReducer = canvasSlice.reducer;