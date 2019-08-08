import { renderStyles } from "visual/utils/cssStyle";

export function styleBg(v, vs, vd) {
  const styles = {
    ".brz &&:hover": {
      standart: [
        "cssStyleSizeWidthPercent",
        "cssStyleBorderRadius",
        "cssStyleBg2Color",
        "cssStyleBoxShadow"
      ],
      interval: ["cssStyleHoverTransition"]
    }
  };

  return renderStyles({ v, vs, vd, styles });
}

export function styleBar(v, vs, vd) {
  const styles = {
    ".brz &&:hover": {
      standart: [
        "cssStyleSizeProgressBarMaxWidthPercent",
        "cssStyleElementProgressBarPadding",
        "cssStyleBorderRadius",
        "cssStyleTypography2FontFamily",
        "cssStyleTypography2FontSize",
        "cssStyleTypography2LineHeight",
        "cssStyleTypography2FontWeight",
        "cssStyleTypography2LetterSpacing",
        "cssStyleColor",
        "cssStyleBgColor"
      ],
      interval: ["cssStyleHoverTransition"]
    }
  };

  return renderStyles({ v, vs, vd, styles });
}
