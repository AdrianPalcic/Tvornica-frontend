import React from 'react'
import FeaturedBrandsCard from '../cards/FeaturedBrandsCard'
import { ChevronRight } from 'lucide-react'
import useFetch from '../../hook/useFetch'

const FeaturedBrands = () => {

    const API_URL = import.meta.env.VITE_API_URL

    const { loading, error, data } = useFetch(`http://tvornica-backend.local//wp-json/wp/v2/posts?categories=7&_embed`)

    if (loading) return <div className='loading'>Loading...</div>
    if (error) return <div className='error'>Error: {error}</div>
    if (!data) return <div className='error'>No data</div>

    const posts = data.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (

        <div className="section-padding featured-brands">

            <h1>Najbolje ponude</h1>
            <h3>Za vaše savršeno vjenčanje</h3>
            <div className="featured-brands-carousel-container">
                {
                    posts.map((post) => {
                        // Check if wp:featuredmedia is available for the post
                        const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

                        return (
                            <FeaturedBrandsCard
                                key={post.id}
                                title={post.title.rendered}
                                image={featuredImage}
                            />
                        )
                    })
                }
            </div>
            <button className='see-more'>Pročitajte više <ChevronRight size={18} /></button>
        </div>
    )
}

export default FeaturedBrands