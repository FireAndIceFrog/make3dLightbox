import { ColorBrush } from "./components/ColorBrush";
import Cursor from "./components/Cursor";
import PaintBrushIcon from "./components/Cursor/PaintBrushIcon";
import CustomColorPicker from "./components/CustomColorPicker/index";
import ThreeCanvas from "./components/ThreeCanvas/index";

function App() {
  return (
    <div className="App">
      <ColorBrush/>
      <CustomColorPicker/>
      
      <Cursor>
        <PaintBrushIcon/>
      </Cursor>
      <ThreeCanvas />
    </div>
  );
  
}

export default App;
