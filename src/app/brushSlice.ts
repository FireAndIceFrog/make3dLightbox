import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetSelectedElement } from "./canvasSlice";
import { store } from "./store";

interface IBrushSlice {
    isBrushing: boolean
    selectedColor: null | string
}

const brushSlice = createSlice(
    {   
        name: "brushSlice",
        initialState: {
            isBrushing: false,
            selectedColor: null
        } as IBrushSlice,
        reducers: {
            setBrushStatus: (state, action: PayloadAction<boolean>) => {
                state.isBrushing = action.payload
            },
            setBrushColor: (state,action: PayloadAction<string | null>) => {
                state.selectedColor = action.payload
            }
        },
    }
)

export const { setBrushStatus, setBrushColor } = brushSlice.actions;
export const brushSliceReducer = brushSlice.reducer;