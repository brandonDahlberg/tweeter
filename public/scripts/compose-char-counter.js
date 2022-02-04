// Creates HTML textarea & character counter
// Logic and style for character counter text
$(document).ready(function () {
	const $tweetText = $('#tweet-text');
	const $counter = $('.counter');
	$tweetText.on('input', () => {
		let $value = 140 - $tweetText.val().length;
		$counter.text($value);
		if ($value < 0) {
			$counter.text($value).css({ color: 'red' });
		} else $counter.text($value).css({ color: 'black' });
	});
});
