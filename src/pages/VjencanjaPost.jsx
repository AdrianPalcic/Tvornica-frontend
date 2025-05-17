import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useFetch from '../hook/useFetch';
import Header from '../components/headers/Header';
import Footer from '../components/Footer';
import "../css/Vjencanja.css/VjencanjaPost.css";
import ShareButtons from '../components/ShareButtons';

const VjencanjaPost = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { id } = useParams();
    const { loading, error, data: blog } = useFetch(`${apiUrl}/posts/${id}?_embed&acf_format=standard`);

    const url = `https://tvornicavjencanja.hr/vjencanja/${id}`;
    const featuredImage = blog?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
    const title = blog?.title?.rendered || "Vjenčanja";
    const description = blog?.excerpt?.rendered ? blog.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 160) : 'Pogledajte detalje ovog vjenčanja na našoj stranici.';

    if (loading) return <div className='loading'>Loading...</div>;
    if (error) return <div className='error'>Error: {error}</div>;
    if (!blog) return <div className='error'>No data</div>;

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={featuredImage} />
                <meta property="og:url" content={url} />
                <meta property="og:site_name" content="Tvornica Vjenčanja" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={featuredImage} />
                <link rel="canonical" href={url} />
            </Helmet>

            <Header />
            <div className="vjencanja-post">
                {featuredImage && (
                    <div className="featured-image-container">
                        <img
                            src={featuredImage}
                            alt={title}
                            className="featured-image"
                            loading='lazy'
                        />
                    </div>
                )}

                <h1 className="post-title">{title}</h1>

                <div
                    className="post-content"
                    dangerouslySetInnerHTML={{ __html: blog?.content?.rendered }}
                />
                <ShareButtons url={url} title={title} />
            </div>
            <Footer />
        </>
    );
};

export default VjencanjaPost;
