import { useParams } from 'react-router-dom';
import useFetch from '../hook/useFetch';
import '../css/Vjencanja.css/VjencanjaPost.css';
import Footer from '../components/Footer';
import Header from "../components/headers/Header"
import { Helmet } from 'react-helmet';
import ShareButtons from '../components/ShareButtons';
const VjencanjaPost = () => {

    const apiUrl = import.meta.env.VITE_API_URL;

    const { id } = useParams();
    const { loading, error, data: blog } = useFetch(
        `${apiUrl}/posts/${id}?_embed&acf_format=standard`
    );

    // Extract gallery images

    const url = window.location.href;


    if (loading) return <div className='loading'>Loading...</div>;
    if (error) return <div className='error'>Error: {error}</div>;
    if (!blog) return <div className='error'>No data</div>;

    return (
        <>
            <Helmet>
                <title>{blog?.title?.rendered || "Vjenčanja"}</title>

                {/* Standard Meta Description */}
                <meta
                    name="description"
                    content={
                        blog?.excerpt?.rendered
                            ? blog.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 160)
                            : 'Pogledajte detalje ovog vjenčanja na našoj stranici.'
                    }
                />

                {/* Open Graph Meta Tags for Facebook and other platforms */}
                <meta property="og:title" content={blog?.title?.rendered || "Vjenčanja"} />
                <meta
                    property="og:description"
                    content={
                        blog?.excerpt?.rendered
                            ? blog.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 160)
                            : 'Pogledajte detalje ovog vjenčanja na našoj stranici.'
                    }
                />
                {blog?._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                    <meta property="og:image" content={blog._embedded['wp:featuredmedia'][0].source_url} />
                )}
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="article" />

                {/* Twitter Card Meta Tags for Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={blog?.title?.rendered || "Vjenčanja"} />
                <meta
                    name="twitter:description"
                    content={
                        blog?.excerpt?.rendered
                            ? blog.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 160)
                            : 'Pogledajte detalje ovog vjenčanja na našoj stranici.'
                    }
                />
                {blog?._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                    <meta name="twitter:image" content={blog._embedded['wp:featuredmedia'][0].source_url} />
                )}

                {/* Canonical link */}
                <link rel="canonical" href={window.location.href} />
            </Helmet>


            <Header />
            <div className="vjencanja-post">
                {/* Featured Image */}
                {blog?._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                    <div className="featured-image-container">
                        <img
                            src={blog._embedded['wp:featuredmedia'][0].source_url}
                            alt={blog.title.rendered}
                            className="featured-image"
                            loading='lazy'
                        />
                    </div>
                )}

                {/* Title */}
                <h1 className="post-title">{blog?.title?.rendered}</h1>

                {/* Content */}
                <div
                    className="post-content"
                    dangerouslySetInnerHTML={{ __html: blog?.content?.rendered }}
                />
                <ShareButtons url={url} title={blog?.title?.rendered} />
            </div>
            <Footer />
        </>
    );
};

export default VjencanjaPost;