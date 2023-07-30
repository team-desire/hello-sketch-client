import UnitSelector from "../UnitSelector";

const UnitSelectorContainer = ({ style, elements, onElementChange }) => {
  return (
    <div className={style}>
      <UnitSelector
        title="Head"
        unitType="head"
        elements={elements}
        onElementChange={onElementChange}
      />
      <UnitSelector
        title="Face"
        unitType="face"
        elements={elements}
        onElementChange={onElementChange}
      />
      <UnitSelector
        title="Body"
        unitType="body"
        elements={elements}
        onElementChange={onElementChange}
      />
    </div>
  );
};

export default UnitSelectorContainer;
