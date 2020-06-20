import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React from 'react'
import { graphql, Link } from 'gatsby'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

import Disqus from 'disqus-react'

const Post = ({ data, location }) => {
    const post = data.ghostPost
    const disqusShortname = `arseight`
    const disqusConfig = {
        url: `https://arseight.com/${post.slug}/`,
        identifier: post.id,
        title: post.title,
    }
    const twitterUrl = post.primary_author.twitter ? `https://twitter.com/${post.primary_author.twitter.replace(/^@/, ``)}` : null
    console.log(post);
    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="article"
            />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <div className="container">
                    <article className="content">
                        <section className="post-full-content">
                            <div className="post-content-inner">
                                <h1 className="content-title">{post.title}</h1>
                                <section
                                    className="content-body load-external-scripts"
                                    dangerouslySetInnerHTML={{ __html: post.html }}
                                />
                            </div>
                            <div className="post-content-sidebar">
                                <div className="post-date">
                                    Creado - {post.published_at_pretty}
                                </div>
                                <figure className="post-feature-image">
                                    <img src={post.feature_image} alt={post.title} />
                                </figure>
                                <div className="post-date">
                                   Actualización - {post.updated_at_pretty}
                                </div>
                                <div className="post-tags">
                                    {post.tags.map((tag, index) => (
                                        <a
                                            className="post-tag"
                                            href={`/tag/${tag.slug}`}
                                            key={index}
                                        >
                                        #{tag.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="post-author-profile">
                                    <Link to={`/author/${post.primary_author.slug}`}>
                                        <h2>{post.primary_author.name}</h2>
                                    </Link>
                                    <p> {post.primary_author.bio}</p>
                                </div>
                                <div className="post-follow">
                                    <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                                        <img className="site-nav-icon" src="/images/icons/twitter.svg" alt="Twitter" /> {post.primary_author.twitter}
                                    </a>
                                </div>
                            </div>
                        </section>
                        {/* <section className="post-full-content">
                            <div className="post-disqus">
                                <Disqus.DiscussionEmbed
                                    shortname={disqusShortname}
                                    config={disqusConfig}
                                />
                            </div>
                        </section> */}
                    </article>
                </div>
            </Layout>
        </>
    )
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: {eq: $slug }) {
        ...GhostPostFields
      }
      }
  `
