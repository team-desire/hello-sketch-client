const ColorPicker = ({ color, onColorChange }) => {
  return (
    <div>
      <input type="color" value={color} onChange={onColorChange} />
    </div>
  );
};

export default ColorPicker;
