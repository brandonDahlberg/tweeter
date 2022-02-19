/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
	const $tweetButton = $('.tweet-btn');
	const $tweetContainer = $('.tweet-container');
	const $errorMessage = $('#error-message');
	$errorMessage.hide();
	$('#new-tweet-form').on('focus', () => {
		$errorMessage.hide();
	});
	const createTweet = function (tweet) {
		// Creating Tweet with Jquery elements
		// Create Tweet Header
		const timeNow = timeago.format(tweet.created_at);
		const $avatar = $('<img>').attr({ src: tweet.user.avatars, id: 'avatar' });
		const $profileName = $('<h4>').attr('id', 'profile-name').text(`${tweet.user.name}`);
		const $profileContainer = $('<div>').addClass('profile-container');
		const $headerItems = $profileContainer.append($profileName, $avatar);
		const $headerDiv = $('<section>').addClass('tweet-header');
		const $tweetHeader = $headerDiv.append($headerItems);

		// Create Tweet Body
		const $postedText = $('<p>').attr('id', 'posted-text').text(`${tweet.content.text}`);
		const $body = $('<section>').addClass('tweet-body');
		const $tweetBody = $body.append($postedText);

		// Create Tweet Footer
		const $flag = $('<i>').addClass('fas fa-flag');
		const $reTweet = $('<i>').addClass('fas fa-retweet');
		const $heart = $('<i>').addClass('fas fa-heart');
		const $actionDiv = $('<div>').addClass('actions');
		const $actions = $($actionDiv).append($flag, $reTweet, $heart);
		const $ageText = $('<time>').addClass('timeago').attr('datetime', 'new Date()').text(`${timeNow}`);
		const $ageDiv = $('<div>').addClass('age');
		const $age = $ageDiv.append($ageText);
		const $footerDiv = $('<footer>').addClass('tweet-footer');
		const $tweetFooter = $footerDiv.append($age, $actions);

		// Creat Tweet
		const $tweetDiv = $('<article>').addClass('tweet');
		const $tweet = $tweetDiv.append($tweetHeader, $tweetBody, $tweetFooter);
		return $tweet;
	};

	const getTweets = () => {
		$.ajax({
			url: '/tweets',
			method: 'GET',
			success: tweets => {
				$tweetContainer.empty();
				for (const tweet of tweets) {
					const $tweet = createTweet(tweet);
					$tweetContainer.prepend($tweet);
				}
			},
		});
	};

	const tweetText = document.querySelector('#tweet-text');
	getTweets();
	$('#new-tweet-form').on('submit', function (event) {
		event.preventDefault();
		const data = $(this).serialize();
		if (!tweetText.value) {
			$errorMessage.text('You gotta say something!');
			$errorMessage.slideDown(500);
			setTimeout(() => {
				$errorMessage.slideUp(1000);
			}, 1500);
		} else if (tweetText.value.length > 140) {
			$errorMessage.text('Backspace it up.');
			$errorMessage.slideDown(500);
			setTimeout(() => {
				$errorMessage.slideUp(1000);
			}, 1500);
		} else
			$.ajax({
				method: 'POST',
				url: '/tweets',
				data: data,
				success: tweets => {
					tweetText.value = '';
					$('.counter').text(140).css({ color: 'black' });
					getTweets();
				},
			});
	});
});
