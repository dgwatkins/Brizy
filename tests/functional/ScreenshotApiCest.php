<?php


class ScreenshotApiCest {

	const PIXEL_IMG_PNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==';
	const PIXEL_IMG_GIF = 'R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

	public function _before( FunctionalTester $I ) {
		wp_cache_flush();
		$I->loginAs( 'admin', 'admin' );
	}

	public function requestWithoutVersionKey( FunctionalTester $I ) {
		$I->wantToTest( 'Request with invalid editor version' );
		$I->sendAjaxPostRequest( 'wp-admin/admin-ajax.php?' . build_query(
				[ 'action' => 'brizy_create_block_screenshot' ] ), [
			'block_type' => 'global',
			'ibsf'       => self::PIXEL_IMG_PNG,
		] );
		$I->seeResponseCodeIs( 400 );
	}

	protected function invalidDataProvider() {
		return [
			[ 'block_type' => 'normal', 'ibsf' => null ],
			[ 'block_type' => 'normal', 'ibsf' => '' ],
			[ 'block_type' => 'normal', ],

			[ 'block_type' => null, 'ibsf' => self::PIXEL_IMG_PNG ],
			[ 'block_type' => '', 'ibsf' => self::PIXEL_IMG_PNG ],
			[ 'ibsf' => self::PIXEL_IMG_PNG ],
			[ 'block_type' => 'global', 'ibsf' => 'asdasdasdasdasd' ],
		];
	}

	protected function validDataProvider( FunctionalTester $I ) {

		$postId = $I->havePostInDatabase( [ 'post_type' => 'post', 'post_status' => 'publish' ] );

		return [
			[
				'block_type' => 'global',
				'ibsf'       => self::PIXEL_IMG_PNG,
				'file_type'  => '.png',
				'post'       => null
			],
			[
				'block_type' => 'global',
				'ibsf'       => self::PIXEL_IMG_GIF,
				'file_type'  => '.gif',
				'post'       => null
			],
			[
				'block_type' => 'saved',
				'ibsf'       => self::PIXEL_IMG_PNG,
				'file_type'  => '.png',
				'post'       => null
			],
			[
				'block_type' => 'normal',
				'ibsf'       => self::PIXEL_IMG_PNG,
				'file_type'  => '.png',
				'post'       => $postId
			],
			[
				'block_type' => 'normal',
				'ibsf'       => self::PIXEL_IMG_GIF,
				'file_type'  => '.gif',
				'post'       => $postId
			],
		];
	}

	/**
	 * @dataProvider invalidDataProvider
	 *
	 * @param FunctionalTester $I
	 * @param $example
	 */
	public function invalidPostScreenShotTest( FunctionalTester $I, $example ) {

		$I->sendAjaxPostRequest( 'wp-admin/admin-ajax.php?' . build_query( [
				'action'  => 'brizy_create_block_screenshot',
				'version' => BRIZY_EDITOR_VERSION
			] ), (array) $example );
		$I->seeResponseCodeIs( 400 );
	}

	/**
	 * @param FunctionalTester $I
	 *
	 * @throws Exception
	 */
	public function postScreenShotTest( FunctionalTester $I ) {
		foreach ( $this->validDataProvider( $I ) as $data ) {
			$this->_postScreenShotTest( $I, $data );
		}
	}

	/**
	 * @dataProvider validDataProvider
	 *
	 * @param FunctionalTester $I
	 *
	 * @throws Exception
	 */
	private function _postScreenShotTest( FunctionalTester $I, $example ) {

		$I->sendAjaxPostRequest( 'wp-admin/admin-ajax.php?' . build_query( [
				'action'  => 'brizy_create_block_screenshot',
				'version' => BRIZY_EDITOR_VERSION
			] ), [
			'block_type' => $example['block_type'],
			'ibsf'       => $example['ibsf'],
			'post'       => $example['post'],

		] );
		$I->seeResponseCodeIs( 200 );

		$response = $I->grabResponse();
		$object   = json_decode( $response );

		$this->assertScreenshotResponse( $I, $object );

		$urlBuilder = new Brizy_Editor_UrlBuilder( Brizy_Editor_Project::get(), $example['post'] );
		if ( $example['block_type'] == 'normal' ) {
			$filePath = $urlBuilder->page_upload_path( 'blockThumbnails' . DIRECTORY_SEPARATOR . $object->data->id . $example['file_type'] );
		} else {
			$filePath = $urlBuilder->brizy_upload_path( 'blockThumbnails' . DIRECTORY_SEPARATOR . $example['block_type'] . DIRECTORY_SEPARATOR . $object->data->id . $example['file_type'] );
		}

		$I->assertTrue( file_exists( $filePath ), 'The screenshot file should be present in FS' );
	}

	/**
	 * @param FunctionalTester $I
	 *
	 * @throws Exception
	 */
	public function putScreenShotTest( FunctionalTester $I ) {

		$I->sendAjaxPostRequest( 'wp-admin/admin-ajax.php?' . build_query( [
				'action'  => 'brizy_create_block_screenshot',
				'version' => BRIZY_EDITOR_VERSION
			] ), [
			'block_type' => 'global',
			'ibsf'       => self::PIXEL_IMG_PNG,
		] );

		$response = $I->grabResponse();
		$object   = json_decode( $response );

		$I->sendAjaxPostRequest( 'wp-admin/admin-ajax.php?' . build_query( [
				'action'  => 'brizy_update_block_screenshot',
				'version' => BRIZY_EDITOR_VERSION
			] ), [
			'block_type' => 'global',
			'ibsf'       => self::PIXEL_IMG_PNG,
			'id'         => $object->data->id,
		] );


		$response = $I->grabResponse();

		$object = json_decode( $response );

		$I->seeResponseCodeIs( 200 );

		$this->assertScreenshotResponse( $I, $object );

	}


	private function assertScreenshotResponse( FunctionalTester $I, $object ) {
		$I->assertArrayHasKey( 'data', (array) $object, 'It should contain key "data"' );
		$I->assertArrayHasKey( 'id', (array) $object->data, 'It should contain screenshot id' );
	}
}