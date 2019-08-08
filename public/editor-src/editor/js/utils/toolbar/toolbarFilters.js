import { defaultValueKey, defaultValueValue } from "visual/utils/onChange";
import { capitalizeByPrefix } from "visual/utils/string";

export function toolbarFilterHue({
  v,
  device,
  prefix = "",
  devices = "all",
  state
}) {
  return {
    id: defaultValueKey({
      key: capitalizeByPrefix(prefix, "hue"),
      device,
      state
    }),
    icon: "nc-hue",
    className: "brz-ed-option__slider--hue",
    type: "slider",
    devices,
    slider: {
      min: 0,
      max: 360
    },
    input: {
      show: true,
      min: 0,
      max: 360
    },
    suffix: {
      show: true,
      choices: [
        {
          title: "deg",
          value: "deg"
        }
      ]
    },
    value: {
      value: defaultValueValue({
        v,
        key: capitalizeByPrefix(prefix, "hue"),
        device,
        state
      })
    },
    onChange: ({ value }) => ({
      [defaultValueKey({
        v,
        key: capitalizeByPrefix(prefix, "hue"),
        device,
        state
      })]: value
    })
  };
}

export function toolbarFilterSaturation({
  v,
  device,
  prefix = "",
  devices = "all",
  state
}) {
  return {
    id: defaultValueKey({
      key: capitalizeByPrefix(prefix, "saturation"),
      device,
      state
    }),
    icon: "nc-saturation",
    className: "brz-ed-option__slider--saturation",
    type: "slider",
    devices,
    slider: {
      min: 0,
      max: 200
    },
    input: {
      show: true,
      min: 0,
      max: 200
    },
    suffix: {
      show: true,
      choices: [
        {
          title: "%",
          value: "%"
        }
      ]
    },
    value: {
      value: defaultValueValue({
        v,
        key: capitalizeByPrefix(prefix, "saturation"),
        device,
        state
      })
    },
    onChange: ({ value }) => ({
      [defaultValueKey({
        key: capitalizeByPrefix(prefix, "saturation"),
        device,
        state
      })]: value
    })
  };
}

export function toolbarFilterBrightness({
  v,
  device,
  prefix = "",
  devices = "all",
  state
}) {
  return {
    id: defaultValueKey({
      key: capitalizeByPrefix(prefix, "brightness"),
      device,
      state
    }),
    icon: "nc-brightness",
    className: "brz-ed-option__slider--brightness",
    type: "slider",
    devices,
    slider: {
      min: 10,
      max: 200
    },
    input: {
      show: true,
      min: 0,
      max: 200
    },
    suffix: {
      show: true,
      choices: [
        {
          title: "%",
          value: "%"
        }
      ]
    },
    value: {
      value: defaultValueValue({
        v,
        key: capitalizeByPrefix(prefix, "brightness"),
        device,
        state
      })
    },
    onChange: ({ value }) => ({
      [defaultValueKey({
        key: capitalizeByPrefix(prefix, "brightness"),
        device,
        state
      })]: value
    })
  };
}

export function toolbarFilterContrast({
  v,
  device,
  prefix = "",
  devices = "all",
  state
}) {
  return {
    id: defaultValueKey({
      key: capitalizeByPrefix(prefix, "contrast"),
      device,
      state
    }),
    icon: "nc-contrast",
    className: "brz-ed-option__slider--contrast",
    type: "slider",
    devices,
    slider: {
      min: 0,
      max: 200
    },
    input: {
      show: true,
      min: 0,
      max: 200
    },
    suffix: {
      show: true,
      choices: [
        {
          title: "%",
          value: "%"
        }
      ]
    },
    value: {
      value: defaultValueValue({
        v,
        key: capitalizeByPrefix(prefix, "contrast"),
        device,
        state
      })
    },
    onChange: ({ value }) => ({
      [defaultValueKey({
        key: capitalizeByPrefix(prefix, "contrast"),
        device,
        state
      })]: value
    })
  };
}
