import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetSelectedElement } from "./canvasSlice";
import { store } from "./store";

interface IBrushSlice {
    isBrushing: boolean
}

const brushSlice = createSlice(
    {   
        name: "brushSlice",
        initialState: {
            isBrushing: false
        } as IBrushSlice,
        reducers: {
            setBrushStatus: (state, action: PayloadAction<boolean>) => {
                state.isBrushing = action.payload
            }
        },
    }
)

export const { setBrushStatus } = brushSlice.actions;
export const brushSliceReducer = brushSlice.reducer;