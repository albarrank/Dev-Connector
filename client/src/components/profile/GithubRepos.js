import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGithubReops } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const GithubReopos = ({ username, getGithubReops, repos }) => {
    useEffect(() => {
        getGithubReops(username)
    }, [getGithubReops]);

    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">Github Repositories</h2>
            {
                repos === null ? 
                <Spinner/> :
                repos.map((repo) => {
                    return (
                        <div key={repo.id} className='repo bg-white p-1 my-1'>
                            <div>
                                <h4>
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                        {repo.name}
                                    </a>
                                </h4>
                                <p>
                                    {repo.description}
                                </p>
                            </div>

                            <div>
                                <ul>
                                    <li className="badge badge-primary">
                                        Stars: {repo.stargazers_count}
                                    </li>
                                    <li className="badge badge-dark">
                                        Watchers: {repo.watchers_count}
                                    </li>
                                    <li className="badge badge-light">
                                        Forks: {repo.forks_count}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
};

GithubReopos.propTypes = {
    username: PropTypes.string.isRequired,
    getGithubReops: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    repos: state.profile.repos
});

export default connect(mapStateToProps, {
    getGithubReops
})(GithubReopos);