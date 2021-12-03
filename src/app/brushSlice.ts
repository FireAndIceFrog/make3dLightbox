import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IBrushSlice {
    isBrushing: boolean
    selectedColor: null | string
    needsUpdate: boolean
}

const brushSlice = createSlice(
    {   
        name: "brushSlice",
        initialState: {
            isBrushing: false,
            selectedColor: null,
            needsUpdate: false
        } as IBrushSlice,
        reducers: {
            setBrushStatus: (state, action: PayloadAction<boolean>) => {
                state.isBrushing = action.payload
            },
            setBrushColor: (state,action: PayloadAction<string | null>) => {
                state.selectedColor = action.payload
            },
            setBrushNeedsUpdate: (state, action: PayloadAction<boolean>) => {
                state.needsUpdate = action.payload
            }
        },
    }
)

export const { setBrushStatus, setBrushColor, setBrushNeedsUpdate } = brushSlice.actions;
export const brushSliceReducer = brushSlice.reducer;