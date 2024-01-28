add_action('wp_ajax_nopriv_get_current_title', 'get_current_title');
add_action('wp_ajax_get_current_title', 'get_current_title');

function get_current_title() {
	$url = isset($_POST['url']) ? esc_url($_POST['url']) : '';
	$post_id = url_to_postid($url);
	$title = get_the_title($post_id);
	wp_send_json(
		array(
			'title' => $title)
	);
}
