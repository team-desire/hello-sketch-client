import UnitSelector from "../UnitSelector";

// NOTE: 현재는 mock data 활용중!
import {
  BODY_UNITS,
  FACE_UNITS,
  HEAD_UNITS,
} from "../UnitSelector/UnitSelector.mock";

const UnitSelectorContainer = ({ style }) => {
  return (
    <div className={style}>
      <UnitSelector units={HEAD_UNITS} title="Head" unitType="head" />
      <UnitSelector units={FACE_UNITS} title="Face" unitType="face" />
      <UnitSelector units={BODY_UNITS} title="Body" unitType="body" />
    </div>
  );
};

export default UnitSelectorContainer;
