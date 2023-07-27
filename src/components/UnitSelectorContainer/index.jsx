import UnitSelector from "../UnitSelector";

const UnitSelectorContainer = ({ style }) => {
  return (
    <div className={style}>
      <UnitSelector title="Head" unitType="head" />
      <UnitSelector title="Body" unitType="body" />
      <UnitSelector title="Bottom" unitType="bottom" />
    </div>
  );
};

export default UnitSelectorContainer;
