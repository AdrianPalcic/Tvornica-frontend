import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hook/useFetch';
import Header from '../components/headers/Header';
import Footer from '../components/Footer';
import { MapPin, Tag, Phone, Mail, Globe, Instagram, Facebook, InstagramIcon } from 'lucide-react';
import "../css/PonudePage.css/PonudePost.css"
import { Helmet } from 'react-helmet';
import ShareButtons from '../components/ShareButtons';

const PonudePost = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { id } = useParams();
    const { loading, error, data: blog } = useFetch(
        `${apiUrl}/posts/${id}?_embed&acf_format=standard`
    );

    // Extract tags
    const tags = blog?._embedded?.['wp:term']?.[1]?.map(tag => ({
        id: tag.id,
        name: tag.name.includes(':') ? tag.name.split(':')[1].trim() : tag.name,
        type: tag.name.startsWith('Lokacija:') ? 'lokacija' : 'kategorija'
    })) || [];

    // Extract ACF fields
    const address = blog?.acf?.adresa;
    const phone = blog?.acf?.telefon;
    const email = blog?.acf?.email;
    const website = blog?.acf?.website || blog?.acf?.web;
    const instagram = blog?.acf?.instagram;
    const facebook = blog?.acf?.facebook;

    if (loading) return <div className='loading'>Loading...</div>;
    if (error) return <div className='error'>Error: {error}</div>;
    if (!blog) return <div className='error'>No data</div>;
    const url = window.location.href


    if (loading) return <div className='loading'>Loading...</div>;
    if (error) return <div className='error'>Error: {error}</div>;
    if (!blog) return <div className='error'>No data</div>;

    return (
        <>
            <Helmet>
                <title>{blog?.title?.rendered || "Ponuda"}</title>
                <meta
                    name="description"
                    content={
                        blog?.excerpt?.rendered
                            ? blog.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 160)
                            : 'Pogledajte detalje ove ponude na našoj stranici.'
                    }
                />

                {/* Open Graph / Facebook */}
                <meta property="og:title" content={blog?.title?.rendered || "Ponuda"} />
                <meta
                    property="og:description"
                    content={
                        blog?.excerpt?.rendered
                            ? blog.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 160)
                            : 'Pogledajte detalje ove ponude na našoj stranici.'
                    }
                />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://tvornica.local/ponude/${blog?.id}`} />
                {blog?._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                    <meta property="og:image" content={blog._embedded['wp:featuredmedia'][0].source_url} />
                )}

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={blog?.title?.rendered || "Ponuda"} />
                <meta
                    name="twitter:description"
                    content={
                        blog?.excerpt?.rendered
                            ? blog.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 160)
                            : 'Pogledajte detalje ove ponude na našoj stranici.'
                    }
                />
                {blog?._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                    <meta name="twitter:image" content={blog._embedded['wp:featuredmedia'][0].source_url} />
                )}

                {/* Canonical */}
                <link rel="canonical" href={`https://tvornica.local/ponude/${blog?.id}`} />
            </Helmet>

            <Header />
            <div className="ponude-post">
                {/* Tags Row */}
                <div className="tags-row">
                    {tags.map(tag => (
                        <span key={tag.id} className={`tag ${tag.type}`}>
                            {tag.type === 'lokacija' ? <MapPin size={14} /> : <Tag size={14} />}
                            {tag.name}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h1 className="post-title">{blog?.title?.rendered}</h1>

                {/* Address */}
                {address && (
                    <div className="address-section">
                        <p>{address}</p>
                    </div>
                )}

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

                {/* Content */}
                <div
                    className="post-content"
                    dangerouslySetInnerHTML={{ __html: blog?.content?.rendered }}
                />

                {/* Visit Us Section */}
                {(phone || email || website || instagram || facebook) ? (
                    <section className="visit-section">
                        <h2 className="section-heading">Posjetite nas na</h2>
                        <div className="contact-grid">
                            {phone && (
                                <a target='_blank' href={`tel:${phone}`} className="contact-item phone">
                                    <Phone size={18} color='gray' />
                                    {phone}
                                </a>
                            )}
                            {email && (
                                <a target='_blank' href={`mailto:${email}`} className="contact-item email">
                                    <Mail size={18} color='gray' />
                                    {email}
                                </a>
                            )}
                            {website && (
                                <a target='_blank' href={website} className="contact-item website">
                                    <Globe size={18} color='gray' />
                                    {website.replace(/^https?:\/\//, '')}
                                </a>
                            )}
                            {instagram && (
                                <a target='_blank' href={instagram} className="contact-item instagram">
                                    <Globe size={18} />
                                    Instagram
                                </a>
                            )}
                            {facebook && (
                                <a target='_blank' href={facebook} className="contact-item facebook">
                                    <Globe size={18} />
                                    Facebook
                                </a>
                            )}
                        </div>
                    </section>
                ) : "hehhehehe"}
                <ShareButtons url={url} title={blog?.title?.rendered} />

            </div>
            <Footer />
        </>
    );
};

export default PonudePost;