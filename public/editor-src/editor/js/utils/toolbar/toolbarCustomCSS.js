import { t } from "visual/utils/i18n";
import { defaultValueKey, defaultValueValue } from "visual/utils/onChange";

const helperHTML = `
<p class="brz-p">You can use the following selectors to create targeted CSS.</p>
<p class="brz-p">
  <span class="brz-span brz-ed-tooltip__overlay-code">element</span> {...}
  <br class="brz-br">
  <span class="brz-span brz-ed-tooltip__overlay-code">element .child-element</span> {...}
</p>`;

export function toolbarCustomCSS({
  v,
  device,
  state,
  devices = "all",
  position = 45
}) {
  return {
    id: defaultValueKey({ key: "customCSS", device, state }),
    type: "codeMirror",
    label: t("Custom CSS"),
    position,
    devices,
    helper: true,
    display: "block",
    helperContent: helperHTML,
    placeholder: "element { code goes here }",
    value: defaultValueValue({ v, key: "customCSS", device, state })
  };
}
