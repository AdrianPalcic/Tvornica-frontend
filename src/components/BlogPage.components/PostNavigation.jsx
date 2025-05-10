import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const PostNavigation = ({ next, prev, nextId, prevId }) => {

    console.log(prevId)
    return (
        <div className="post-navigation">
            {prev && (
                <Link to={`/blog/${prevId}`} className="nav-link prev">
                    <ArrowLeft size={20} />
                    <div className="nav-content">
                        <span>Prijašnji</span>
                        <h4 dangerouslySetInnerHTML={{ __html: prev.title.rendered }} />
                    </div>
                </Link>
            )}

            {next && (
                <Link to={`/blog/${nextId}`} className="nav-link next">
                    <div className="nav-content">
                        <span>Sljedeči</span>
                        <h4 dangerouslySetInnerHTML={{ __html: next.title.rendered }} />
                    </div>
                    <ArrowRight size={20} />
                </Link>
            )}
        </div>
    )
}

export default PostNavigation