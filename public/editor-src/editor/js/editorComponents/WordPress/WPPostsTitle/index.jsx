import React, { Fragment } from "react";
import EditorComponent from "visual/editorComponents/EditorComponent";
import EditorArrayComponent from "visual/editorComponents/EditorArrayComponent";
import CustomCSS from "visual/component/CustomCSS";
import { WPShortcode } from "../common/WPShortcode";
import Link from "visual/component/Link";
import Toolbar from "visual/component/Toolbar";
import * as toolbarConfig from "./toolbar";
import defaultValue from "./defaultValue.json";
import { getStore } from "visual/redux/store";
import { globalBlocksSelector } from "visual/redux/selectors";
import classnames from "classnames";
import { style } from "./styles";
import { css } from "visual/utils/cssStyle";
import Config from "visual/global/Config";

class WPPostsTitle extends EditorComponent {
  static get componentId() {
    return "WPPostsTitle";
  }

  static defaultValue = defaultValue;

  renderPopups() {
    const popupsProps = this.makeSubcomponentProps({
      bindWithKey: "popups",
      itemProps: itemData => {
        let isGlobal = false;

        if (itemData.type === "GlobalBlock") {
          itemData = globalBlocksSelector(getStore().getState())[
            itemData.value.globalBlockId
          ];
          isGlobal = true;
        }

        const {
          blockId,
          value: { popupId }
        } = itemData;

        return {
          blockId,
          instanceKey: IS_EDITOR
            ? `${this.getId()}_${popupId}`
            : isGlobal
            ? `global_${popupId}`
            : popupId
        };
      }
    });

    return <EditorArrayComponent {...popupsProps} />;
  }

  renderWrapper(content, v) {
    const { linkType, linkAnchor, linkExternalType, linkPopup, linkUpload } = v;
    const hrefs = {
      anchor: linkAnchor,
      external: v[linkExternalType],
      popup: linkPopup,
      upload: linkUpload
    };

    return hrefs[linkType] || IS_EDITOR ? (
      <Link
        className={IS_EDITOR && "brz-blocked"}
        href={hrefs[linkType]}
        type={linkType}
      >
        <span
          className="brz-span"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Link>
    ) : (
      <div dangerouslySetInnerHTML={{ __html: content }} />
    );
  }

  renderForEdit(v, vs, vd) {
    const { className, linkType, linkPopup, popups } = v;
    const classNameWPPostsTitle = classnames(
      css(
        `${this.constructor.componentId}`,
        `${this.getId()}`,
        style(v, vs, vd)
      ),
      className
    );

    const { isTemplate, page } = Config.get("wp");
    const attributes = {
      ...(IS_PREVIEW
        ? { post: "{{brizy_dc_post_id}}" }
        : !isTemplate
        ? { post: page }
        : {}),
      property: "post_title"
    };

    return (
      <Fragment>
        <Toolbar {...this.makeToolbarPropsFromConfig2(toolbarConfig)}>
          <CustomCSS selectorName={this.getId()} css={v.customCSS}>
            <WPShortcode
              attributes={attributes}
              name="brizy_post_field"
              placeholderIcon="wp-shortcode"
              className={classNameWPPostsTitle}
              render={content => this.renderWrapper(content, v)}
            />
          </CustomCSS>
        </Toolbar>
        {popups.length > 0 &&
          linkType === "popup" &&
          linkPopup !== "" &&
          this.renderPopups()}
      </Fragment>
    );
  }
}

export default WPPostsTitle;
