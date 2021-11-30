import { CSSProperties, useEffect, useState } from 'react'
import ReactColorPicker from '@super-effective/react-color-picker';
import "./index.css"

const style: Record<string, CSSProperties> = {
  container: {
    top: "75vh",
    left: "5vw",
    backgroundColor: "#f1f1f1",
    position: "absolute",
    display: "flex",
    width: "20vw",
    height: "20vh",
    borderRadius: "10px"
  },
  flexBox: {

  },
  swath: {
    marginTop: "7%",
    height: "70%",
    width: "10%"
  }
}

const classes ={ 
  colorPicker:{
    container: "color-picker__container"
  }
}

interface IPicker {
    selectedColor: string | null;
    setSelectedColorCallback: (color: string)=>void
}

export default function Picker({selectedColor, setSelectedColorCallback}: IPicker ) {

    useEffect(()=>{
      if(selectedColor)
      {
        setState({
          ...state, color: selectedColor
        });
      }
    },[selectedColor])

    const [state, setState] = useState({color: "blue"})

    const onChange = (color: string) => {
        setState({
            color
        });
        setSelectedColorCallback(color);
    }

    return <div style = {style.container}>
        <ReactColorPicker 
          className= {classes.colorPicker.container}
          showHex = {false} 
          showSwatch={false} 
          color={state.color} 
          onChange={onChange} />
        <div style={{...style.swath, backgroundColor: state.color}}></div>
    </div>
}