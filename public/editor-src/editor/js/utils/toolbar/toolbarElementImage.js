import { t } from "visual/utils/i18n";
import { getDynamicContentChoices } from "visual/utils/options";
import { defaultValueKey, defaultValueValue } from "visual/utils/onChange";

export function toolbarImageLinkExternal({
  v,
  inGallery,
  device,
  state,
  devices = "all"
}) {
  const linkDynamicContentChoices = getDynamicContentChoices("link");

  return {
    id: defaultValueKey({ key: "linkExternal", device, state }),
    type: "input",
    label: t("Link to"),
    placeholder: "http://",
    devices,
    population: {
      show: linkDynamicContentChoices.length > 0 && !inGallery,
      choices: linkDynamicContentChoices
    },
    value: {
      population: defaultValueValue({
        v,
        key: "linkPopulation",
        device,
        state
      }),
      value: defaultValueValue({ v, key: "linkExternal", device, state })
    },
    onChange: (
      { value: linkExternal, population: linkPopulation },
      { changed }
    ) => {
      return {
        linkExternal,
        linkPopulation,
        linkExternalType:
          changed === "value" || linkPopulation === ""
            ? "linkExternal"
            : "linkPopulation"
      };
    }
  };
}
