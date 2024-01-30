document.addEventListener('DOMContentLoaded', function () {
	var shareBlock = document.querySelector('.sharedaddy.sd-sharing-enabled');
	if (shareBlock) {
		var copyButton = document.createElement('li');
		copyButton.className = 'share-copy-link';

		function createSvgIcon(pathData) {
			var svgNS = 'http://www.w3.org/2000/svg';
			var svg = document.createElementNS(svgNS, 'svg');
			svg.setAttribute('width', '18');
			svg.setAttribute('height', '18');
			svg.setAttribute('viewBox', '0 0 24 24');
			svg.setAttribute('opacity', '1');
			svg.setAttribute('fill', '#2C3338');
			svg.setAttribute('fill-rule', 'evenodd');
			svg.setAttribute('clip-rule', 'evenodd');
			svg.setAttribute('aria-hidden', 'true');
			svg.setAttribute('focusable', 'false');

			var path = document.createElementNS(svgNS, 'path');
			path.setAttribute('d', pathData);
			svg.appendChild(path);

			return svg;
		}

		var initialIconData = 'M5.625 5.5H15.375C15.444 5.5 15.5 5.55596 15.5 5.625V15.375C15.5 15.444 15.444 15.5 15.375 15.5H5.625C5.55596 15.5 5.5 15.444 5.5 15.375V5.625C5.5 5.55596 5.55596 5.5 5.625 5.5ZM4 5.625C4 4.72754 4.72754 4 5.625 4H15.375C16.2725 4 17 4.72754 17 5.625V10V15.375C17 16.2725 16.2725 17 15.375 17C15.375 17 6.52246 17 5.625 17C4.72754 17 4 16.2725 4 15.375V5.625ZM18.5 17.2812V8.28125H20V17.2812C20 18.7995 18.7704 20 17.2511 20H6.25V18.5H17.2511C17.9409 18.5 18.5 17.9721 18.5 17.2812Z';
		var initialIcon = createSvgIcon(initialIconData);

		var clickedIconData = 'M11 17.768l-4.884-4.884 1.768-1.768L11 14.232l8.658-8.658C17.823 3.39 15.075 2 12 2 6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10c0-1.528-.353-2.97-.966-4.266L11 17.768z';
		var clickedIcon = createSvgIcon(clickedIconData);

		var link = document.createElement('a');
		link.className = 'share-copy-link sd-button share-icon no-text';
		link.href = '#';
		link.title = 'Copy the shared link to the clipboard';
		link.appendChild(initialIcon);

		copyButton.appendChild(link);

		// Click event
		link.addEventListener('click', function(event) {
			event.preventDefault();
			var url = window.location.href;

			fetch('/wp-admin/admin-ajax.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: 'action=get_current_title&url=' + encodeURIComponent(url)
			})
				.then(response => response.json())
				.then(data => {
					var postTitle = data.title;
					if (postTitle != 'undefined') {
						var textToCopy = postTitle + '\n' + url;
						navigator.clipboard.writeText(textToCopy);

						this.innerHTML = '';
						this.appendChild(clickedIcon);

						// Restore original icon after 3 seconds
						setTimeout(() => {
							this.innerHTML = '';
							this.appendChild(initialIcon);
						}, 3000);
					}

				})
				.catch(error => console.error('Error:', error));

		});

		var ul = shareBlock.querySelector('ul');
		var shareEnd = shareBlock.querySelector('.share-end');
		ul.insertBefore(copyButton, shareEnd);
	}
});
