import { t } from "visual/utils/i18n";
import { defaultValueKey, defaultValueValue } from "visual/utils/onChange";

export function toolbarHoverTransition({
  v,
  position = 150,
  device,
  state,
  devices = "all"
}) {
  return {
    id: defaultValueKey({ key: "hoverTransition", device, state }),
    label: t("Hover Transition"),
    devices,
    position,
    devices,
    type: "slider",
    slider: {
      min: 0,
      max: 99
    },
    input: {
      show: true,
      min: 0,
      max: 99
    },
    suffix: {
      show: true,
      choices: [
        {
          title: "ms",
          value: "ms"
        }
      ]
    },
    value: {
      value: defaultValueValue({ v, key: "hoverTransition", device, state })
    },
    onChange: ({ value }) => ({
      [defaultValueKey({ key: "hoverTransition", device })]: value
    })
  };
}
