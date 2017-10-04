import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    selectSubreddit,
    fetchPostsIfNeeded,
    invalidateSubreddit
} from '../actions';
import Picker from '../components/Picker';
import logo from '../logo.svg';
import Posts from '../components/Posts';

class AsyncApp extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleRefreshClick = this.handleRefreshClick.bind(this)
    }

    componentDidMount() {
        const { dispatch, selectedSubreddit } = this.props;
    }

    handleChange(nextSubreddit) {
        this.props.dispatch(selectSubreddit(nextSubreddit));
        this.props.dispatch(fetchPostsIfNeeded(nextSubreddit))
    }

    handleRefreshClick(e) {
        e.preventDefault();

        const { dispatch, selectedSubreddit } = this.props;
        dispatch(invalidateSubreddit(selectedSubreddit));
        dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }

    render() {
        const { posts, isFetching } = this.props;
        return (
            <div>
                <div>

                    <div className="logo">
                        <img src={logo} className="App-logo" alt="logo"/><br />
                    </div>

                    <div className="row">
                        <Picker
                            onChange={this.handleChange}
                        />
                    </div>
                </div>


                <p>
                    {!isFetching &&
                    <a href="#" onClick={this.handleRefreshClick}>
                        Refresh
                    </a>}
                </p>
                {isFetching && posts.length === 0 && <h2>Loading...</h2>}
                {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
                {posts.length > 0 &&
                <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                    <Posts posts={posts} />
                </div>}
            </div>
        )
    }
}

AsyncApp.propTypes = {
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { selectedSubreddit, postsBySubreddit } = state
    const {
        isFetching,
        lastUpdated,
        items: posts
    } = postsBySubreddit[selectedSubreddit] || {
        isFetching: true,
        items: []
    }

    return {
        selectedSubreddit,
        posts,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(AsyncApp)