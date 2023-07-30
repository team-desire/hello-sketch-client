const ColorPicker = ({ color, onColorChange, toShow }) => {
  if (toShow) {
    return <input type="color" value={color} onChange={onColorChange} />;
  }
};

export default ColorPicker;
