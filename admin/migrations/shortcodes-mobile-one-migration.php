<?php

class Brizy_Admin_Migrations_ShortcodesMobileOneMigration implements Brizy_Admin_Migrations_MigrationInterface {

	use Brizy_Admin_Migrations_PostsTrait;

	/**
	 * Return the version
	 *
	 * @return mixed
	 */
	public function getVersion() {
		return '1.0.44';
	}

	/**
	 * Execute the migration
	 */
	public function execute() {
		$this->posts_migration();
		$this->globals_migration();
	}

	/**
	 * Posts migration
	 */
	public function posts_migration() {
		$result = $this->get_posts_and_meta();
		$class  = get_class();

		// parse each post
		foreach ( $result as $item ) {
			$postMigrationStorage = new Brizy_Admin_Migrations_PostStorage( $item->ID );
			if ( $postMigrationStorage->hasMigration($this) ) {
				continue;
			}

			$json_value = null;
			$instance   = Brizy_Editor_Storage_Post::instance($item->ID);
			$storage    = $instance->get_storage();
			$old_meta   = $instance->get(Brizy_Editor_Post::BRIZY_POST, false);

			if ( is_array($old_meta) ) {
				$json_value = base64_decode($old_meta['editor_data']);
			}
			elseif( is_object($old_meta) ) {
				$json_value = $old_meta->get_editor_data();
			}

			if( !is_null($json_value) ) {
				// make a backup to previous version
				update_post_meta($item->ID, 'brizy-bk-'.$class.'-'.$this->getVersion(), $storage);

				// migrate post
				$new_json = $this->migrate_post($json_value);

				// set the changed value in DB
				if ( is_array($old_meta) ) {
					$old_meta['editor_data'] = base64_encode($new_json);
				}
				elseif( is_object($old_meta) ) {
					$old_meta->set_editor_data($new_json);
				}
				$instance->set(Brizy_Editor_Post::BRIZY_POST, $old_meta);

				// set that migration was successful executed
				$postMigrationStorage->addMigration($this)->save();
			}
		}
	}

	/**
	 * Globals migration
	 */
	public function globals_migration() {
		$class  = get_class();
		$result = $this->get_globals_posts();
		foreach ($result as $item) {
			$postMigrationStorage = new Brizy_Admin_Migrations_PostStorage( $item->ID );
			if ( $postMigrationStorage->hasMigration($this) ) {
				continue;
			}

			$instance   = Brizy_Editor_Storage_Project::instance( $item->ID );
			$storage    = $instance->get_storage();
			$json_value = base64_decode($storage['globals']);

			if( !is_null($json_value) ) {
				// make a backup to previous version
				update_post_meta($item->ID, 'brizy-bk-' . $class . '-' . $this->getVersion(), $storage);

				// migrate post
				$new_json = $this->migrate_post($json_value);

				// set the changed value in DB
				$storage['globals'] = base64_encode($new_json);
				$instance->loadStorage($storage);

				// set that migration was successful executed
				$postMigrationStorage->addMigration($this)->save();
			}
		}
	}

	/**
	 * Parse shortcodes
	 */
	public function parse_shortcodes(array &$array) {
		// Line
		$array = $this->unset_mobile_multi_keys( $array, array(
			"shortcode"   => "Line",
			"mobile_keys" => array(
				"mobileWidth",
				"mobileBorderWidth"
			)
		) );

		// Spacer
		$array = $this->unset_mobile_key( $array, "Spacer", "mobileHeight" );

		// Video
		$array = $this->unset_mobile_multi_keys( $array, array(
			"shortcode"   => "Video",
			"mobile_keys" => array(
				"mobileSize",
				"mobileCoverImageWidth",
				"mobileCoverImageHeight"
			)
		) );

		// EmbedCode
		$array = $this->unset_mobile_multi_keys( $array, array(
			"shortcode"   => "EmbedCode",
			"mobile_keys" => array(
				"mobileWidth",
				"mobileHeight"
			)
		) );

		// Map
		$array = $this->unset_mobile_multi_keys( $array, array(
			"shortcode"   => "Map",
			"mobile_keys" => array(
				"mobileSize",
				"mobileHeight"
			)
		) );

		// SoundCloud
		$array = $this->unset_mobile_multi_keys( $array, array(
			"shortcode"   => "SoundCloud",
			"mobile_keys" => array(
				"mobileWidth",
				"mobileHeight"
			)
		) );

		// Countdown
		$array = $this->unset_mobile_key( $array, "Countdown", "mobileWidth" );

		// ProgressBar
		$array = $this->unset_mobile_multi_keys( $array, array(
			"shortcode"   => "ProgressBar",
			"mobile_keys" => array(
				"mobileWidth",
				"mobileBorderRadius"
			)
		) );

		// Wrapper
		$array = $this->mobile_migation_wrapper_align( $array, "Wrapper" );

		// Cloneable
		$array = $this->mobile_migation_wrapper_align( $array, "Cloneable" );

		// WOOCategories
		$array = $this->unset_mobile_key( $array, "WOOCategories", "mobileWidth" );

		// WOOPages
		$array = $this->unset_mobile_key( $array, "WOOPages", "mobileWidth" );

		// WOOProducts
		$array = $this->unset_mobile_key( $array, "WOOProducts", "mobileWidth" );

		// WPSidebar
		$array = $this->unset_mobile_key( $array, "WPSidebar", "mobileWidth" );

		// WPCustomShortcode
		$array = $this->unset_mobile_key( $array, "WPCustomShortcode", "mobileWidth" );

		// WOOProductPage
		$array = $this->unset_mobile_key( $array, "WOOProductPage", "mobileWidth" );

		// WPNavigation
		$array = $this->unset_mobile_multi_keys( $array, array(
			"shortcode"   => "WPNavigation",
			"mobile_keys" => array(
				"mobileWidth",
				"mobileItemPadding"
			)
		) );

		// Button
		$array = $this->unset_mobile_multi_keys( $array, array(
			"shortcode"   => "Button",
			"mobile_keys" => array(
				"mobileBorderRadius"
			)
		) );

		// Tabs
		$array = $this->unset_mobile_multi_keys( $array, array(
			"shortcode"   => "Tabs",
			"mobile_keys" => array(
				"mobileHorizontalAlign"
			)
		) );

		// Image
		$array = $this->unset_mobile_multi_keys( $array, array(
			"shortcode"      => "Image",
			"mobile_keys"    => array(
				"mobileResize",
				"mobileZoom",
				"mobileWidth",
				"mobileHeight"
			)
		) );

		// Delete image position if all are equal
		$array = $this->unset_mobile_multi_keys( $array, array(
			"shortcode"      => "Image",
			"mobile_keys"    => array(
				"mobilePositionX",
				"mobilePositionY"
			),
			"dependent_keys" => true
		) );

		// Form
		$array = $this->unset_mobile_multi_keys( $array, array(
			"shortcode"      => "Form",
			"mobile_keys"    => array(
				"mobileHorizontalAlign"
			)
		) );

		// Form fields options
		$array = $this->unset_mobile_multi_keys( $array, array(
			"shortcode"      => "FormFields",
			"mobile_keys"    => array(
				"mobilePadding",
				"mobilePaddingRight",
				"mobilePaddingBottom",
				"mobilePaddingLeft",
			),
			"dependent_keys" => true
		) );

		$array = $this->unset_mobile_multi_keys( $array, array(
			"shortcode"      => "FormFields",
			"mobile_keys"    => array(
				"mobileBorderRadius",
				"mobilePaddingTop" // top is used as zero from the default json
			)
		) );

		// Form single field options
		$array = $this->unset_mobile_multi_keys( $array, array(
			"shortcode"      => "FormField",
			"mobile_keys"    => array(
				"mobileWidth",
				"mobileHeight"
			)
		) );

		// Icon
		$array = $this->unset_mobile_multi_keys( $array, array(
			"shortcode"      => "Icon",
			"mobile_keys"    => array(
				"mobilePadding",
				"mobileBorderRadius"
			)
		) );

		$array = $this->unset_mobile_multi_keys( $array, array(
			"shortcode"      => "Icon",
			"mobile_keys"    => array(
				"mobileSize",
				"mobileCustomSize"
			),
			"dependent_keys" => true
		) );

		// Row
		$array = $this->unset_mobile_multi_keys( $array, array(
			"shortcode"      => "Row",
			"mobile_keys"    => array(
				"mobileMedia",
				"mobileBgImageWidth",
				"mobileBgImageHeight",
				"mobileBgImageSrc",
				"mobileBgColorHex",
				"mobileBgColorOpacity",
				"mobileBgColorPalette",
				"mobileBgMapZoom"
			)
		) );

		$array = $this->unset_mobile_multi_keys( $array, array(
			"shortcode"      => "Row",
			"mobile_keys"    => array(
				"mobileBgPositionX",
				"mobileBgPositionY"
			),
			"dependent_keys" => true
		) );

		// Column
		$array = $this->unset_mobile_multi_keys( $array, array(
			"shortcode"      => "Column",
			"mobile_keys"    => array(
				"mobileBgImageWidth",
				"mobileBgImageHeight",
				"mobileBgImageSrc",
				"mobileBgColorHex",
				"mobileBgColorOpacity",
				"mobileBgColorPalette"
			)
		) );

		$array = $this->unset_mobile_multi_keys( $array, array(
			"shortcode"      => "Column",
			"mobile_keys"    => array(
				"mobileBgPositionX",
				"mobileBgPositionY"
			),
			"dependent_keys" => true
		) );

		// Section
		$array = $this->unset_mobile_multi_keys( $array, array(
			"shortcode"      => "SectionItem",
			"mobile_keys"    => array(
				"mobileMedia",
				"mobileBgImageWidth",
				"mobileBgImageHeight",
				"mobileBgImageSrc",
				"mobileBgColorHex",
				"mobileBgColorOpacity",
				"mobileBgColorPalette",
				"mobileBgMapZoom"
			)
		) );

		$array = $this->unset_mobile_multi_keys( $array, array(
			"shortcode"      => "SectionItem",
			"mobile_keys"    => array(
				"mobileBgPositionX",
				"mobileBgPositionY"
			),
			"dependent_keys" => true
		) );

		return $array;
	}

	/**
	 * Special Migration for Wrapper and Cloneable "align"
	 */
	public function mobile_migation_wrapper_align(array &$array, $shortcode = "") {
		if ( empty($shortcode) ) {
			return $array;
		}

		if ( $shortcode == $array['type'] ) {
			if ( isset( $array['value']['horizontalAlign'] )
				&& isset( $array['value']['mobileHorizontalAlign'] )
				&& $array['value']['horizontalAlign'] === $array['value']['mobileHorizontalAlign'] )
			{
				unset( $array['value']['mobileHorizontalAlign'] );
			}
			else
			{
				// !Attention this need only 1-time execution in JSON (to not apply to the same JSON 2 times)
				if ( isset( $array['value']['horizontalAlign'] )
					&& $array['value']['horizontalAlign'] !== "center"
					&& !isset( $array['value']['mobileHorizontalAlign'] ) )
				{
					$array['value']['mobileHorizontalAlign'] = "center";
				}
			}
		}

		return $array;
	}

}
