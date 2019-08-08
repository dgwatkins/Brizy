import { t } from "visual/utils/i18n";
import { getAnimations } from "visual/utils/options";
import { defaultValueKey, defaultValueValue } from "visual/utils/onChange";

export function toolbarEntranceAnimation({
  v,
  position = 60,
  device,
  state,
  devices = "all"
}) {
  const animationKey = defaultValueKey({ key: "animation", device, state });

  const animationNameKey = defaultValueKey({
    key: "animationName",
    device,
    state
  });

  const animationDurationKey = defaultValueKey({
    key: "animationDuration",
    device,
    state
  });

  const animationDelayKey = defaultValueKey({
    key: "animationDelay",
    device,
    state
  });

  const animationNameValue = defaultValueValue({
    v,
    key: "animationName",
    device,
    state
  });

  const tempAnimationNameValue = defaultValueValue({
    v,
    key: "tempAnimationName",
    device,
    state
  });

  const animationDurationValue = defaultValueValue({
    v,
    key: "animationDuration",
    device,
    state
  });

  const animationDelayValue = defaultValueValue({
    v,
    key: "animationDelay",
    device,
    state
  });

  const getAnimationChoices = () => {
    if (animationNameValue !== "none" || animationNameValue === "initial") {
      const choices =
        animationNameValue === "initial"
          ? tempAnimationNameValue
          : animationNameValue;
      return {
        [`${choices}`]: [
          {
            id: animationDurationKey,
            label: t("Duration"),
            type: "slider",
            devices,
            slider: {
              min: 0,
              max: 5,
              step: 0.1
            },
            input: {
              show: true,
              min: 0
            },
            suffix: {
              show: true,
              choices: [
                {
                  title: "s",
                  value: "s"
                }
              ]
            },
            value: {
              value: animationDurationValue / 1000
            },
            onChange: ({ value: animationDuration }, { sliderDragEnd }) => {
              return {
                animationName: sliderDragEnd
                  ? tempAnimationNameValue
                  : "initial",
                animationDuration: animationDuration * 1000
              };
            }
          },
          {
            id: animationDelayKey,
            label: t("Delay"),
            type: "slider",
            slider: {
              min: 0,
              max: 5,
              step: 0.1
            },
            input: {
              show: true,
              min: 0
            },
            suffix: {
              show: true,
              choices: [
                {
                  title: "s",
                  value: "s"
                }
              ]
            },
            value: {
              value: animationDelayValue / 1000
            },
            onChange: ({ value: animationDelay }, { sliderDragEnd }) => {
              return {
                animationName: sliderDragEnd
                  ? tempAnimationNameValue
                  : "initial",
                animationDelay: animationDelay * 1000
              };
            }
          }
        ]
      };
    }

    return { none: [] };
  };

  return {
    id: animationKey,
    type: "multiPicker",
    position,
    picker: {
      id: animationNameKey,
      label: t("Entrance Animation"),
      type: "select",
      choices: getAnimations(),
      value:
        animationNameValue === "initial"
          ? tempAnimationNameValue
          : animationNameValue,
      onChange: animationName => ({
        animationName,
        tempAnimationName: animationName
      })
    },
    choices: getAnimationChoices()
  };
}
