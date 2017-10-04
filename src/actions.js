import fetch from 'isomorphic-fetch'

import axios from 'axios';

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export function selectSubreddit(subreddit) {
    console.log('selectSubreddit');
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    }
}

export function invalidateSubreddit(subreddit) {
    console.log('invalidateSubreddit');
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    }
}

function requestPosts(subreddit) {
    console.log('requestPosts');
    return {
        type: REQUEST_POSTS,
        subreddit
    }
}

function receivePosts(subreddit, json) {
    console.log('receivePosts');
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: {'title': 'test'},//json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

function fetchPosts(subreddit) {
    console.log('fetchPosts');
    return dispatch => {
        dispatch(requestPosts(subreddit));
        return axios.get(`https://mossbyte.com/api/v1/${subreddit}`)
            .then(json => dispatch(receivePosts(subreddit, json)))
            .catch(function() {
                console.log('Failed to find device');
            });
    }
}

function shouldFetchPosts(state, subreddit) {
    console.log('shouldFetchPosts');
    const posts = state.postsBySubreddit[subreddit]
    if (!posts) {
        return true
    } else if (posts.isFetching) {
        return false
    } else {
        return posts.didInvalidate
    }
}

export function fetchPostsIfNeeded(subreddit) {
    console.log('fetchPostsIfNeeded');
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), subreddit)) {
            return dispatch(fetchPosts(subreddit))
        }
    }
}