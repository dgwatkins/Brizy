import { t } from "visual/utils/i18n";
import { defaultValueKey, defaultValueValue } from "visual/utils/onChange";

export function toolbarZIndex({
  v,
  device,
  state,
  position = 20,
  devices = "all"
}) {
  return {
    type: "slider",
    id: defaultValueKey({ key: "zIndex", device, state }),
    position,
    label: t("Z-index"),
    devices,
    slider: {
      min: 0,
      max: 100
    },
    input: {
      show: true,
      min: 0
    },
    value: {
      value: defaultValueValue({ v, key: "zIndex", device, state })
    },
    onChange: ({ value: zIndex }) => ({
      zIndex
    })
  };
}
