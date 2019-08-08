import { t } from "visual/utils/i18n";
import { defaultValueKey, defaultValueValue } from "visual/utils/onChange";

export function toolbarCustomCSSClass({
  v,
  position = 40,
  device,
  state,
  devices = "all"
}) {
  return {
    id: defaultValueKey({ key: "customClassName", device, state }),
    label: t("CSS Class"),
    position,
    display: "block",
    type: "input",
    devices,
    value: {
      value: defaultValueValue({ v, key: "customClassName", device, state })
    },
    onChange: ({ value: customClassName }) => ({
      customClassName
    })
  };
}
