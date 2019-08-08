import { t } from "visual/utils/i18n";
import { getDynamicContentChoices } from "visual/utils/options";
import { defaultValueKey, defaultValueValue } from "visual/utils/onChange";

export function toolbarLinkAnchor({ v, device, state, devices = "all" }) {
  return {
    id: defaultValueKey({ key: "linkAnchor", device, state }),
    label: t("Anchor"),
    type: "blockThumbnail",
    devices,
    value: defaultValueValue({ v, key: "linkAnchor", device, state })
  };
}

export function toolbarLinkExternal({ v }) {
  const linkDynamicContentChoices = getDynamicContentChoices("link");

  return {
    id: "linkExternal",
    type: "input",
    label: t("Link to"),
    placeholder: "http://",
    population: {
      show: linkDynamicContentChoices.length > 0,
      choices: linkDynamicContentChoices
    },
    value: {
      value: v.linkExternal,
      population: v.linkPopulation
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

export function toolbarLinkExternalBlank({
  v,
  device,
  state,
  devices = "all"
}) {
  return {
    id: defaultValueKey({ key: "linkExternalBlank", device, state }),
    type: "switch",
    label: t("Open In New Tab"),
    devices,
    value: defaultValueValue({ v, key: "linkExternalBlank", device, state })
  };
}

export function toolbarLinkExternalRel({ v, device, state, devices = "all" }) {
  return {
    id: defaultValueKey({ key: "linkExternalRel", device, state }),
    type: "switch",
    label: t("Make it Nofollow"),
    devices,
    value: defaultValueValue({ v, key: "linkExternalRel", device, state })
  };
}

export function toolbarLinkPopup({
  v,
  device,
  state,
  canDelete = true,
  disabled = false,
  component,
  devices = "all"
}) {
  return {
    id: defaultValueKey({ key: "linkPopup", device, state }),
    type: "promptAddPopup",
    label: t("Popup"),
    canDelete,
    disabled,
    popupKey: `${component.getId()}_${defaultValueValue({
      v,
      key: "linkPopup",
      device,
      state
    })}`,
    devices,
    value: {
      value: defaultValueValue({ v, key: "linkPopup", device, state }),
      popups: defaultValueValue({ v, key: "popups", device, state })
    },
    onChange: ({ value, popups }) => ({
      [defaultValueKey({ key: "linkPopup", device, state })]: value,
      [defaultValueKey({ key: "popups", device, state })]: popups
    })
  };
}

export function toolbarLinkTargetUrl({ v, device, devices = "all", state }) {
  return {
    id: defaultValueKey({ key: "targetUrl", device, state }),
    label: t("Target URL"),
    devices,
    type: "select",
    choices: [
      {
        title: t("Current Page"),
        value: "current"
      },
      {
        title: t("Custom Page"),
        value: "custom"
      }
    ],
    value: defaultValueValue({ v, key: "targetUrl", device, state })
  };
}

export function toolbarLinkHref({ v, device, devices = "all", state }) {
  return {
    id: defaultValueKey({ key: "href", device, state }),
    label: t("Link"),
    devices,
    type: "input",
    disabled: v.targetUrl === "current" ? true : false,
    placeholder: "http://",
    value: {
      value: defaultValueValue({ v, key: "href", device, state })
    },
    onChange: ({ value }) => ({
      [defaultValueKey({ v, key: "href", device })]: value
    })
  };
}
