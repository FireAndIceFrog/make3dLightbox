import { createSlice } from "@reduxjs/toolkit";

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
        },
    }
)

export const {   } = brushSlice.actions;
export const brushSliceReducer = brushSlice.reducer;