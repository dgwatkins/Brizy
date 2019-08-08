import { t } from "visual/utils/i18n";
import { hexToRgba } from "visual/utils/color";
import { getOptionColorHexByPalette } from "visual/utils/options";
import { defaultValueKey, defaultValueValue } from "visual/utils/onChange";
import {
  toolbarBgImage,
  toolbarGradientType,
  toolbarBgColor2,
  toolbarBgColorHexField2,
  toolbarGradientLinearDegree,
  toolbarGradientRadialDegree,
  toolbarPadding,
  toolbarMargin,
  toolbarBorderRadius,
  toolbarBorderColor2,
  toolbarBorderColorHexField2,
  toolbarBorderWidthBorderColorPicker2,
  toolbarBoxShadow2,
  toolbarBoxShadowHexField2,
  toolbarBoxShadowFields2,
  toolbarHoverTransition,
  toolbarShowOnDesktop,
  toolbarShowOnResponsive,
  toolbarZIndex,
  toolbarCustomCSSClass,
  toolbarEntranceAnimation,
  toolbarImageLinkExternal,
  toolbarLinkExternalBlank,
  toolbarLinkExternalRel,
  toolbarLinkAnchor,
  toolbarVerticalAlign
} from "visual/utils/toolbar";

export function getItems({ v, device }) {
  const { hex: bgColorHex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: "bgColorHex", device }),
    defaultValueValue({ v, key: "bgColorPalette", device })
  );

  return [
    toolbarShowOnResponsive({ v, device, devices: "responsive" }),
    {
      id: defaultValueKey({
        key: "toolbarCurrentElement",
        device,
        state: "normal"
      }),
      type: "popover",
      icon: "nc-background",
      title: t("Background"),
      position: 80,
      options: [
        {
          id: defaultValueKey({ key: "tabsState", device, state: "normal" }),
          tabsPosition: "left",
          type: "tabs",
          value: defaultValueValue({
            v,
            key: "tabsState",
            device,
            state: "normal"
          }),
          tabs: [
            {
              id: defaultValueKey({
                key: "tabNormal",
                device,
                state: "normal"
              }),
              tabIcon: "nc-circle",
              title: t("Normal"),
              options: [
                toolbarBgImage({
                  v,
                  device,
                  state: "normal",
                  onChange: [
                    "onChangeBgImage",
                    "onChangeBgImageBgOpacity",
                    "onChangeBgImageDependencies",
                    "onChangeBgImageColumnAndRowSyncMobile"
                  ]
                })
              ]
            },
            {
              id: defaultValueKey({ key: "tabHover", device, state: "normal" }),
              tabIcon: "nc-hover",
              title: t("Hover"),
              options: [
                toolbarBgImage({
                  v,
                  device,
                  state: "hover",
                  devices: "desktop",
                  onChange: [
                    "onChangeBgImage",
                    "onChangeBgImageBgOpacity",
                    "onChangeBgImageDependencies",
                    "onChangeBgImageColumnAndRowSyncMobile"
                  ]
                })
              ]
            }
          ]
        }
      ],
      onChange: (_, { isOpen }) => ({
        [defaultValueKey({
          key: "tabsState",
          device,
          state: "normal"
        })]: !isOpen
          ? ""
          : defaultValueValue({
              v,
              key: "tabsState",
              device,
              state: "normal"
            })
      })
    },
    {
      id: defaultValueKey({ key: "toolbarColor", device, state: "normal" }),
      type: "popover",
      size: "auto",
      title: t("Colors"),
      position: 90,
      icon: {
        style: {
          backgroundColor: hexToRgba(
            bgColorHex,
            defaultValueValue({ v, key: "bgColorOpacity", device })
          )
        }
      },
      options: [
        {
          id: defaultValueKey({ key: "tabsState", device, state: "normal" }),
          tabsPosition: "left",
          type: "tabs",
          value: defaultValueValue({
            v,
            key: "tabsState",
            device,
            state: "normal"
          }),
          tabs: [
            {
              id: defaultValueKey({
                key: "tabNormal",
                device,
                state: "normal"
              }),
              tabIcon: "nc-circle",
              title: t("Normal"),
              options: [
                {
                  id: defaultValueKey({
                    key: "tabsColor",
                    device,
                    state: "normal"
                  }),
                  type: "tabs",
                  value: defaultValueValue({
                    v,
                    key: "tabsColor",
                    device,
                    state: "normal"
                  }),
                  tabs: [
                    {
                      id: defaultValueKey({
                        key: "tabOverlay",
                        device,
                        state: "normal"
                      }),
                      label: t("Overlay"),
                      options: [
                        toolbarBgColor2({
                          v,
                          device,
                          state: "normal",
                          onChangeType: ["onChangeBgColorType2"],
                          onChangeHex: [
                            "onChangeBgColorHexAndOpacity2",
                            "onChangeBgColorHexAndOpacityPalette2",
                            "onChangeBgColorHexAndOpacityDependencies2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangePalette: [
                            "onChangeBgColorPalette2",
                            "onChangeBgColorPaletteOpacity2",
                            "onChangeBgColorHexAndOpacityDependencies2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangeGradientHex: [
                            "onChangeBgColorHexAndOpacity2",
                            "onChangeBgColorHexAndOpacityPalette2",
                            "onChangeBgColorHexAndOpacityDependencies2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangeGradientPalette: [
                            "onChangeBgColorPalette2",
                            "onChangeBgColorPaletteOpacity2",
                            "onChangeBgColorHexAndOpacityDependencies2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangeGradient: ["onChangeGradientRange2"]
                        }),
                        {
                          type: "grid",
                          className: "brz-ed-grid__color-fileds",
                          columns: [
                            {
                              width: 30,
                              options: [
                                toolbarBgColorHexField2({
                                  v,
                                  device,
                                  state: "normal",
                                  prefix:
                                    defaultValueValue({
                                      v,
                                      key: "gradientActivePointer",
                                      device,
                                      state: "normal"
                                    }) === "startPointer"
                                      ? "bg"
                                      : "gradient",
                                  onChange: [
                                    "onChangeBgColorHexAndOpacity2",
                                    "onChangeBgColorHexAndOpacityPalette2",
                                    "onChangeBgColorHexAndOpacityDependencies2",
                                    "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                                  ]
                                })
                              ]
                            },
                            {
                              width: 52,
                              options: [
                                toolbarGradientType({
                                  v,
                                  device,
                                  state: "normal",
                                  className:
                                    "brz-ed__select--transparent brz-ed__select--align-right",
                                  disabled:
                                    defaultValueValue({
                                      v,
                                      key: "bgColorType",
                                      device,
                                      state: "normal"
                                    }) === "solid"
                                })
                              ]
                            },
                            {
                              width: 18,
                              options: [
                                toolbarGradientLinearDegree({
                                  v,
                                  device,
                                  state: "normal",
                                  disabled:
                                    defaultValueValue({
                                      v,
                                      key: "bgColorType",
                                      device,
                                      state: "normal"
                                    }) === "solid" ||
                                    defaultValueValue({
                                      v,
                                      key: "gradientType",
                                      device,
                                      state: "normal"
                                    }) === "radial"
                                }),
                                toolbarGradientRadialDegree({
                                  v,
                                  device,
                                  state: "normal",
                                  disabled:
                                    defaultValueValue({
                                      v,
                                      key: "bgColorType",
                                      device,
                                      state: "normal"
                                    }) === "solid" ||
                                    defaultValueValue({
                                      v,
                                      key: "gradientType",
                                      device,
                                      state: "normal"
                                    }) === "linear"
                                })
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      id: defaultValueKey({
                        key: "tabBorder",
                        device,
                        state: "normal"
                      }),
                      label: t("Border"),
                      options: [
                        toolbarBorderColor2({
                          v,
                          device,
                          state: "normal",
                          onChangeStyle: [
                            "onChangeBorderStyle2",
                            "onChangeContainerBorderStyleDependencies2"
                          ],
                          onChangeHex: [
                            "onChangeBorderColorHexAndOpacity2",
                            "onChangeBorderColorHexAndOpacityPalette2",
                            "onChangeContainerBorderColorHexAndOpacityDependencies2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncTablet2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangePalette: [
                            "onChangeBorderColorPalette2",
                            "onChangeBorderColorPaletteOpacity2",
                            "onChangeContainerBorderColorHexAndOpacityDependencies2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncTablet2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncMobile2"
                          ]
                        }),
                        {
                          type: "grid",
                          className: "brz-ed-grid__color-fileds",
                          columns: [
                            {
                              width: 38,
                              options: [
                                toolbarBorderColorHexField2({
                                  v,
                                  device,
                                  state: "normal",
                                  onChange: [
                                    "onChangeBorderColorHexAndOpacity2",
                                    "onChangeBorderColorHexAndOpacityPalette2",
                                    "onChangeContainerBorderColorHexAndOpacityDependencies2",
                                    "onChangeBorderColorHexAndOpacityColumnAndRowSyncTablet2",
                                    "onChangeBorderColorHexAndOpacityColumnAndRowSyncMobile2"
                                  ]
                                })
                              ]
                            },
                            {
                              width: 54,
                              options: [
                                toolbarBorderWidthBorderColorPicker2({
                                  v,
                                  device,
                                  state: "normal",
                                  onChangeType: ["onChangeBorderWidthType2"],
                                  onChangeGrouped: [
                                    "onChangeBorderWidthGrouped2",
                                    "onChangeBorderWidthGroupedDependencies2"
                                  ],
                                  onChangeUngrouped: [
                                    "onChangeBorderWidthUngrouped2",
                                    "onChangeBorderWidthUngroupedDependencies2"
                                  ]
                                })
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      id: defaultValueKey({
                        key: "tabBoxShadow",
                        device,
                        state: "normal"
                      }),
                      label: t("Shadow"),
                      options: [
                        toolbarBoxShadow2({
                          v,
                          device,
                          state: "normal",
                          onChangeStyle: [
                            "onChangeBoxShadowStyle2",
                            "onChangeBoxShadowStyleDependencies2"
                          ],
                          onChangeHex: [
                            "onChangeBoxShadowHexAndOpacity2",
                            "onChangeBoxShadowHexAndOpacityPalette2",
                            "onChangeBoxShadowHexAndOpacityDependencies2"
                          ],
                          onChangePalette: [
                            "onChangeBoxShadowPalette2",
                            "onChangeBoxShadowPaletteOpacity2",
                            "onChangeBoxShadowHexAndOpacityDependencies2"
                          ]
                        }),
                        {
                          type: "grid",
                          className: "brz-ed-grid__color-fileds",
                          columns: [
                            {
                              width: 41,
                              options: [
                                toolbarBoxShadowHexField2({
                                  v,
                                  device,
                                  state: "normal",
                                  onChange: [
                                    "onChangeBoxShadowHexAndOpacity2",
                                    "onChangeBoxShadowHexAndOpacityPalette2",
                                    "onChangeBoxShadowHexAndOpacityDependencies2"
                                  ]
                                })
                              ]
                            },
                            {
                              width: 59,
                              options: [
                                toolbarBoxShadowFields2({
                                  v,
                                  device,
                                  state: "normal",
                                  onChange: [
                                    "onChangeBoxShadow2",
                                    "onChangeBoxShadowDependencies2"
                                  ]
                                })
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: defaultValueKey({ key: "tabHover", device, state: "normal" }),
              tabIcon: "nc-hover",
              title: t("Hover"),
              options: [
                {
                  id: defaultValueKey({
                    key: "tabsColor",
                    device,
                    state: "normal"
                  }),
                  type: "tabs",
                  devices: "desktop",
                  value: defaultValueValue({
                    v,
                    key: "tabsColor",
                    device,
                    state: "normal"
                  }),
                  tabs: [
                    {
                      id: defaultValueKey({
                        key: "tabOverlay",
                        device,
                        state: "normal"
                      }),
                      label: t("Overlay"),
                      options: [
                        toolbarBgColor2({
                          v,
                          device,
                          state: "hover",
                          devices: "desktop",
                          onChangeType: ["onChangeBgColorType2"],
                          onChangeHex: [
                            "onChangeBgColorHexAndOpacity2",
                            "onChangeBgColorHexAndOpacityPalette2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangePalette: [
                            "onChangeBgColorPalette2",
                            "onChangeBgColorPaletteOpacity2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangeGradientHex: [
                            "onChangeBgColorHexAndOpacity2",
                            "onChangeBgColorHexAndOpacityPalette2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangeGradientPalette: [
                            "onChangeBgColorPalette2",
                            "onChangeBgColorPaletteOpacity2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangeGradient: ["onChangeGradientRange2"]
                        }),
                        {
                          type: "grid",
                          className: "brz-ed-grid__color-fileds",
                          columns: [
                            {
                              width: 30,
                              options: [
                                toolbarBgColorHexField2({
                                  v,
                                  device,
                                  state: "hover",
                                  devices: "desktop",
                                  prefix:
                                    defaultValueValue({
                                      v,
                                      key: "gradientActivePointer",
                                      device,
                                      state: "hover"
                                    }) === "startPointer"
                                      ? "bg"
                                      : "gradient",
                                  onChange: [
                                    "onChangeBgColorHexAndOpacity2",
                                    "onChangeBgColorHexAndOpacityPalette2",
                                    "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                                  ]
                                })
                              ]
                            },
                            {
                              width: 52,
                              options: [
                                toolbarGradientType({
                                  v,
                                  device,
                                  state: "hover",
                                  devices: "desktop",
                                  className:
                                    "brz-ed__select--transparent brz-ed__select--align-right",
                                  disabled:
                                    defaultValueValue({
                                      v,
                                      key: "bgColorType",
                                      device,
                                      state: "hover"
                                    }) === "solid"
                                })
                              ]
                            },
                            {
                              width: 18,
                              options: [
                                toolbarGradientLinearDegree({
                                  v,
                                  device,
                                  state: "hover",
                                  devices: "desktop",
                                  disabled:
                                    defaultValueValue({
                                      v,
                                      key: "bgColorType",
                                      device,
                                      state: "hover"
                                    }) === "solid" ||
                                    defaultValueValue({
                                      v,
                                      key: "gradientType",
                                      device,
                                      state: "hover"
                                    }) === "radial"
                                }),
                                toolbarGradientRadialDegree({
                                  v,
                                  device,
                                  devices: "desktop",
                                  state: "hover",
                                  disabled:
                                    defaultValueValue({
                                      v,
                                      key: "bgColorType",
                                      device,
                                      state: "hover"
                                    }) === "solid" ||
                                    defaultValueValue({
                                      v,
                                      key: "gradientType",
                                      device,
                                      state: "hover"
                                    }) === "linear"
                                })
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      id: defaultValueKey({
                        key: "tabBorder",
                        device,
                        state: "normal"
                      }),
                      label: t("Border"),
                      options: [
                        toolbarBorderColor2({
                          v,
                          device,
                          state: "hover",
                          devices: "desktop",
                          onChangeStyle: [
                            "onChangeBorderStyle2",
                            "onChangeContainerBorderStyleDependencies2"
                          ],
                          onChangeHex: [
                            "onChangeBorderColorHexAndOpacity2",
                            "onChangeBorderColorHexAndOpacityPalette2",
                            "onChangeContainerBorderColorHexAndOpacityDependencies2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncTablet2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangePalette: [
                            "onChangeBorderColorPalette2",
                            "onChangeBorderColorPaletteOpacity2",
                            "onChangeContainerBorderColorHexAndOpacityDependencies2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncTablet2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncMobile2"
                          ]
                        }),
                        {
                          type: "grid",
                          className: "brz-ed-grid__color-fileds",
                          columns: [
                            {
                              width: 38,
                              options: [
                                toolbarBorderColorHexField2({
                                  v,
                                  device,
                                  state: "hover",
                                  devices: "desktop",
                                  onChange: [
                                    "onChangeBorderColorHexAndOpacity2",
                                    "onChangeBorderColorHexAndOpacityPalette2",
                                    "onChangeContainerBorderColorHexAndOpacityDependencies2",
                                    "onChangeBorderColorHexAndOpacityColumnAndRowSyncTablet2",
                                    "onChangeBorderColorHexAndOpacityColumnAndRowSyncMobile2"
                                  ]
                                })
                              ]
                            },
                            {
                              width: 54,
                              options: [
                                toolbarBorderWidthBorderColorPicker2({
                                  v,
                                  device,
                                  state: "hover",
                                  devices: "desktop",
                                  onChangeType: ["onChangeBorderWidthType2"],
                                  onChangeGrouped: [
                                    "onChangeBorderWidthGrouped2",
                                    "onChangeBorderWidthGroupedDependencies2"
                                  ],
                                  onChangeUngrouped: [
                                    "onChangeBorderWidthUngrouped2",
                                    "onChangeBorderWidthUngroupedDependencies2"
                                  ]
                                })
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      id: defaultValueKey({
                        key: "tabBoxShadow",
                        device,
                        state: "normal"
                      }),
                      label: t("Shadow"),
                      options: [
                        toolbarBoxShadow2({
                          v,
                          device,
                          state: "hover",
                          devices: "desktop",
                          onChangeStyle: [
                            "onChangeBoxShadowStyle2",
                            "onChangeBoxShadowStyleDependencies2"
                          ],
                          onChangeHex: [
                            "onChangeBoxShadowHexAndOpacity2",
                            "onChangeBoxShadowHexAndOpacityPalette2",
                            "onChangeBoxShadowHexAndOpacityDependencies2"
                          ],
                          onChangePalette: [
                            "onChangeBoxShadowPalette2",
                            "onChangeBoxShadowPaletteOpacity2",
                            "onChangeBoxShadowHexAndOpacityDependencies2"
                          ]
                        }),
                        {
                          type: "grid",
                          className: "brz-ed-grid__color-fileds",
                          columns: [
                            {
                              width: 41,
                              options: [
                                toolbarBoxShadowHexField2({
                                  v,
                                  device,
                                  state: "hover",
                                  devices: "desktop",
                                  onChange: [
                                    "onChangeBoxShadowHexAndOpacity2",
                                    "onChangeBoxShadowHexAndOpacityPalette2",
                                    "onChangeBoxShadowHexAndOpacityDependencies2"
                                  ]
                                })
                              ]
                            },
                            {
                              width: 59,
                              options: [
                                toolbarBoxShadowFields2({
                                  v,
                                  device,
                                  state: "hover",
                                  devices: "desktop",
                                  onChange: [
                                    "onChangeBoxShadow2",
                                    "onChangeBoxShadowDependencies2"
                                  ]
                                })
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      onChange: (_, { isOpen }) => ({
        [defaultValueKey({
          key: "tabsState",
          device,
          state: "normal"
        })]: !isOpen
          ? ""
          : defaultValueValue({
              v,
              key: "tabsState",
              device,
              state: "normal"
            }),
        [defaultValueKey({
          key: "tabsColor",
          device,
          state: "normal"
        })]: !isOpen
          ? ""
          : defaultValueValue({
              v,
              key: "tabsColor",
              device,
              state: "normal"
            })
      })
    },
    {
      id: defaultValueKey({ key: "toolbarLink", device, state: "normal" }),
      type: "popover",
      icon: "nc-link",
      title: t("Link"),
      size: "medium",
      position: 100,
      disabled:
        device === "desktop"
          ? v.linkLightBox === "on"
          : defaultValueValue({
              v,
              key: "linkType",
              device,
              state: "normal"
            }) !== "popup" || v.linkPopup === "",
      options: [
        {
          id: defaultValueKey({ key: "linkType", device, state: "normal" }),
          type: "tabs",
          value: defaultValueValue({
            v,
            key: "linkType",
            device,
            state: "normal"
          }),
          tabs: [
            {
              id: defaultValueKey({ key: "external", device, state: "normal" }),
              label: t("URL"),
              options: [
                toolbarImageLinkExternal({
                  v,
                  device,
                  state: "normal",
                  devices: "desktop"
                }),
                toolbarLinkExternalBlank({
                  v,
                  device,
                  state: "normal",
                  devices: "desktop"
                }),
                toolbarLinkExternalRel({
                  v,
                  device,
                  state: "normal",
                  devices: "desktop"
                })
              ]
            },
            {
              id: defaultValueKey({ key: "anchor", device, state: "normal" }),
              label: t("Anchor"),
              options: [
                toolbarLinkAnchor({
                  v,
                  device,
                  state: "normal",
                  devices: "desktop"
                })
              ]
            }
          ]
        }
      ]
    },
    {
      id: defaultValueKey({ key: "toolbarSettings", device, state: "normal" }),
      type: "popover",
      icon: "nc-cog",
      title: t("Settings"),
      position: 110,
      devices: "desktop",
      options: [
        toolbarVerticalAlign({
          v,
          device,
          state: "normal",
          devices: "desktop"
        }),
        {
          id: defaultValueKey({
            key: "advancedSettings",
            device,
            state: "normal"
          }),
          type: "advancedSettings",
          sidebarLabel: t("More Settings"),
          label: t("More Settings"),
          icon: "nc-cog",
          devices: "desktop",
          options: [
            {
              id: defaultValueKey({
                key: "settingsTabs",
                device,
                state: "normal"
              }),
              type: "tabs",
              align: "start",
              tabs: [
                {
                  id: defaultValueKey({
                    key: "settingsStyling",
                    device,
                    state: "normal"
                  }),
                  label: t("Styling"),
                  tabIcon: "nc-styling",
                  options: [
                    toolbarPadding({
                      v,
                      device,
                      state: "normal",
                      devices: "desktop",
                      onChangeGrouped: ["onChangePaddingGrouped"],
                      onChangeUngrouped: ["onChangePaddingUngrouped"]
                    }),
                    toolbarMargin({
                      v,
                      device,
                      state: "normal",
                      devices: "desktop",
                      onChangeGrouped: ["onChangeMarginGrouped"],
                      onChangeUngrouped: ["onChangeMarginUngrouped"]
                    }),
                    toolbarBorderRadius({
                      v,
                      device,
                      state: "normal",
                      devices: "desktop",
                      onChangeGrouped: [
                        "onChangeBorderRadiusGrouped",
                        "onChangeBorderRadiusGroupedDependencies"
                      ],
                      onChangeUngrouped: [
                        "onChangeBorderRadiusUngrouped",
                        "onChangeBorderRadiusUngroupedDependencies"
                      ]
                    })
                  ]
                },
                {
                  id: defaultValueKey({
                    key: "moreSettingsAdvanced",
                    device,
                    state: "normal"
                  }),
                  label: t("Advanced"),
                  tabIcon: "nc-cog",
                  options: [
                    toolbarShowOnDesktop({ v, devices: "desktop" }),
                    toolbarZIndex({
                      v,
                      device,
                      state: "normal",
                      devices: "desktop"
                    }),
                    toolbarCustomCSSClass({
                      v,
                      device,
                      state: "normal",
                      devices: "desktop"
                    }),
                    toolbarEntranceAnimation({
                      v,
                      device,
                      state: "normal",
                      devices: "desktop"
                    }),
                    toolbarHoverTransition({
                      v,
                      device,
                      state: "normal",
                      position: 60,
                      devices: "desktop"
                    })
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: defaultValueKey({ key: "advancedSettings", device, state: "normal" }),
      type: "advancedSettings",
      sidebarLabel: t("More Settings"),
      icon: "nc-cog",
      title: t("Settings"),
      position: 110,
      devices: "responsive",
      options: [
        {
          id: defaultValueKey({ key: "settingsTabs", device, state: "normal" }),
          type: "tabs",
          align: "start",
          tabs: [
            {
              id: defaultValueKey({
                key: "settingsStyling",
                device,
                state: "normal"
              }),
              label: t("Styling"),
              tabIcon: "nc-styling",
              options: [
                toolbarPadding({
                  v,
                  device,
                  state: "normal",
                  devices: "responsive",
                  onChangeGrouped: ["onChangePaddingGrouped"],
                  onChangeUngrouped: ["onChangePaddingUngrouped"]
                }),
                toolbarMargin({
                  v,
                  device,
                  state: "normal",
                  devices: "responsive",
                  onChangeGrouped: ["onChangeMarginGrouped"],
                  onChangeUngrouped: ["onChangeMarginUngrouped"]
                }),
                toolbarBorderRadius({
                  v,
                  device,
                  state: "normal",
                  devices: "responsive",
                  onChangeGrouped: [
                    "onChangeBorderRadiusGrouped",
                    "onChangeBorderRadiusGroupedDependencies"
                  ],
                  onChangeUngrouped: [
                    "onChangeBorderRadiusUngrouped",
                    "onChangeBorderRadiusUngroupedDependencies"
                  ]
                })
              ]
            }
          ]
        }
      ]
    }
  ];
}
