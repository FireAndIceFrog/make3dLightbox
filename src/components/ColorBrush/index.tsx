import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBrush } from '@fortawesome/free-solid-svg-icons'
import "./index.scss"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setBrushStatus } from "../../app/brushSlice"
import { useState } from "react"
import Picker from "../CustomColorPicker/Picker"
const classes = {
    iconContainer: "color-brush__icon"
}
export function ColorBrush() {
    const dispatch = useAppDispatch()
    const isBrushing = useAppSelector(s=>s.brushSlice?.isBrushing)
    const setSelected = ()=> dispatch(setBrushStatus(!isBrushing))
    const [color, setColor] = useState("red")
    return (<>
    <div className={classes.iconContainer} onClick={setSelected}>
        <FontAwesomeIcon icon = {faBrush}/>
    </div>

    {isBrushing ? <Picker selectedColor = {color} setSelectedColorCallback={setColor}/> : null}

    </>)
}