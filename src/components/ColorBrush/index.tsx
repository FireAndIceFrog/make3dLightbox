import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBrush } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setBrushStatus } from "../../app/brushSlice"
import { SetSelectedElement } from "../../app/canvasSlice"
import "./index.scss"

const classes = {
    iconContainer: "color-brush__icon"
}

export function ColorBrush() {
    const dispatch = useAppDispatch()
    const isBrushing = useAppSelector(s=>s.brushSlice?.isBrushing)
    const setSelected = ()=> {
        dispatch(setBrushStatus(!isBrushing))
        dispatch(SetSelectedElement(false))
    }

    return (<>
    <div className={classes.iconContainer} onClick={setSelected} style = {{
        cursor: isBrushing? "none" : "pointer"}}>
        <FontAwesomeIcon icon = {faBrush}/>
    </div>

    </>)
}