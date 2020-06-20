import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'

const PostCard = ({ post }) => {
    const url = `/${post.slug}/`
    console.log(post)
    return (
        <Link to={url} className="post-card">
            <header className="post-card-header">
                {post.feature_image &&
                  <div className="post-card-image" style={{
                      backgroundImage: `url(${post.feature_image})`,
                  }}
                  />}
                {post.tags &&
                  <div className="post-card-tags">
                      <div><Tags post={post} visibility="public" autolink={false} /></div>
                      By {post.primary_author.name} on {post.published_at_pretty}
                  </div>
                }
                {post.featured && <span>Featured</span>}
                <h2 className="post-card-title">{post.title}</h2>
            </header>
            <section className="post-card-excerpt">{post.excerpt.slice(0, 58)}...</section>
        </Link>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        created_at_pretty: PropTypes.string,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
}

export default PostCard
