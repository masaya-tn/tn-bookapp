// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

const handleHeartDisplay = (hasLiked) => {
	if (hasLiked) {
		$('.active-heart').removeClass('hidden')
	} else {
		$('.inactive-heart').removeClass('hidden')
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const dataset = $('#article-show').data()
	const articleId = dataset.articleId

	axios.get(`/articles/${articleId}/likes`)
	  .then((response) => {
			const hasLiked = response.data.hasLiked
			handleHeartDisplay(hasLiked)
		})
	
	$('.inactive-heart').on('click', () => {
		axios.post(`/articles/${articleId}/likes`)
		  .then((response) => {
        if (response.data.status === 'ok') {
					$('.active-heart').removeClass('hidden')
					$('.inactive-heart').addClass('hidden')
				}
			})
			.catch((e) => {
				window.alert('Error')
				console.log(e)
			})
	})

	$('.active-heart').on('click', () => {
		axios.delete(`/articles/${articleId}/likes`)
		  .then((response) => {
        if (response.data.status === 'ok') {
					$('.active-heart').addClass('hidden')
					$('.inactive-heart').removeClass('hidden')
				}
			})
			.catch((e) => {
				window.alert('Error')
				console.log(e)
			})
	})
})

// follow ---------------------------------------
const handleFollowButtonDisplay = (hasFollowed) => {
	if (hasFollowed) {
		$('.unfollow').removeClass('hidden')
	} else {
		$('.follow').removeClass('hidden')
	}
}

const listenFollowEvent = (followingId) => {
	$('.unfollow').on('click', () => {
		axios.post(`/accounts/${followingId}/unfollows`)
		  .then((response) => {
				if (response.data.status === 'ok') {
					$('.follow').removeClass('hidden')
					$('.unfollow').addClass('hidden')
				}
			})
			.catch((e) => {
				window.alert('Error')
				console.log(e)
			})
	})
}

const listenUnfollowEvent = (followingId) => {
	$('.follow').on('click', () => {
		axios.post(`/accounts/${followingId}/follows`)
		  .then((response) => {
				if (response.data.status === 'ok') {
					$('.unfollow').removeClass('hidden')
					$('.follow').addClass('hidden')
				}
			})
			.catch((e) => {
				window.alert('Error')
				console.log(e)
			})
	})
}

document.addEventListener('DOMContentLoaded', () => {
	const dataset = $('#profile-show').data()
	const followingId = dataset.followingId
	const followerId = dataset.followerId

	axios.get(`/accounts/${followingId}/follows/${followerId}`)
	  .then((response) => {
			const hasFollowed = response.data.hasFollowed
			handleFollowButtonDisplay(hasFollowed)
		})

		listenFollowEvent
		listenUnfollowEvent
	  
})
