import { renderStyles } from "visual/utils/cssStyle";

export function styleWrapper(v, vs, vd) {
  const styles = {
    ".brz &&:hover": {
      standart: ["cssStyleVisible"]
    }
  };
  return renderStyles({ v, vs, vd, styles });
}

export function styleContainer(v, vs, vd) {
  const styles = {
    ".brz &&:hover": {
      standart: [
        "cssStylePadding",
        "cssStyleMargin",
        "cssStyleZIndex",
        "cssStyleFlexHorizontalAlign",
        "cssStylePositionMode"
      ]
    }
  };

  return renderStyles({ v, vs, vd, styles });
}
