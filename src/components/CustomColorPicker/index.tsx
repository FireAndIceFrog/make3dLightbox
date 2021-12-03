import { useAppSelector } from '../../app/hooks'
import Picker from './Picker';
import "./index.css"

export default function CustomColorPickerContainer() {
  const isSelected = useAppSelector(state=> state.canvasSlice.elementHasBeenSelected);
  const isBrushing = useAppSelector(state=>state.brushSlice.isBrushing)
  const color = useAppSelector(state=>state.brushSlice.selectedColor)

  if((isSelected && color) || isBrushing ) return <Picker></Picker>
  else return <div></div>
}