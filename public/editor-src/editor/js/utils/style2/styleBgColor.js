import { defaultValueValue } from "visual/utils/onChange";
import { hexToRgba } from "visual/utils/color";
import { styleState } from "visual/utils/style";
import { getOptionColorHexByPalette } from "visual/utils/options";

export function styleBgColor({ v, device, state, prefix = "bg" }) {
  const isHover = styleState({ v, state });

  const { hex: bgColorHex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: `${prefix}ColorHex`, device, state }),
    defaultValueValue({ v, key: `${prefix}ColorPalette`, device, state })
  );

  const bgColorOpacity = defaultValueValue({
    v,
    key: `${prefix}ColorOpacity`,
    device,
    state
  });

  const { hex: hoverBgColorHex } = getOptionColorHexByPalette(
    defaultValueValue({
      v,
      key: `${prefix}ColorHex`,
      device,
      state: "hover"
    }),
    defaultValueValue({
      v,
      key: `${prefix}ColorPalette`,
      device,
      state: "hover"
    })
  );

  const hoverBgColorOpacity = defaultValueValue({
    v,
    key: `${prefix}ColorOpacity`,
    device,
    state: "hover"
  });

  return isHover === "hover"
    ? hexToRgba(hoverBgColorHex, hoverBgColorOpacity)
    : hexToRgba(bgColorHex, bgColorOpacity);
}
