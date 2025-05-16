import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useFetch from '../hook/useFetch';
import Header from '../components/headers/Header';
import Footer from '../components/Footer';
import "../css/BlogPage.css/BlogPost.css";
import RelatedBlogs from '../components/cards/RelatedBlogs';
import PostNavigation from '../components/BlogPage.components/PostNavigation';
import ShareButtons from '../components/ShareButtons'; // New component

const BlogPost = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { id } = useParams();
    const { loading, error, data } = useFetch(`${apiUrl}/posts/${id}?_embed`);

    const blog = data;
    const tags = blog?._embedded?.['wp:term']?.[1];
    const blogTag = tags && tags.length > 0 ? tags[0].name : 'default-tag';
    const currentTagId = blog?._embedded?.['wp:term']?.[1]?.[0]?.id;
    const featuredImage = blog?._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
    const date = new Date(blog?.date).toLocaleDateString('hr-HR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const authorName = blog?._embedded?.author?.[0]?.name || null;

    const title = blog?.title?.rendered || '';
    const description = blog?.excerpt?.rendered?.replace(/<[^>]+>/g, '') || '';
    const url = `https://your-website.com/blog/${id}`; // Replace with your domain

    const {
        data: featuredPostsData,
        loading: featuredLoading,
        error: featuredError
    } = useFetch(
        currentTagId
            ? `${apiUrl}/posts?tags=${currentTagId}&_embed&exclude=${id}&per_page=3`
            : null
    );

    const featuredBlogs = featuredPostsData?.slice(0, 3).sort((a, b) => new Date(b.date) - new Date(a.date));

    const currentCategoryId = blog?._embedded?.['wp:term']?.[0]?.[0]?.id;

    const fetchAdjacentPosts = async (currentId, currentDate, categoryId) => {
        try {
            const nextRes = await fetch(
                `${apiUrl}/posts?after=${currentDate}&categories=${categoryId}&order=asc&per_page=2&_fields=id,title,slug,date&exclude=${currentId}`
            );

            const prevRes = await fetch(
                `${apiUrl}/posts?before=${currentDate}&categories=${categoryId}&order=desc&per_page=2&_fields=id,title,slug,date&exclude=${currentId}`
            );

            const nextPosts = await nextRes.json();
            const prevPosts = await prevRes.json();

            return {
                nextPost: nextPosts.find(post => post.id !== currentId),
                prevPost: prevPosts.find(post => post.id !== currentId)
            };
        } catch (error) {
            console.error("Error fetching adjacent posts:", error);
            return { nextPost: null, prevPost: null };
        }
    };

    const [adjacentPosts, setAdjacentPosts] = useState({ next: null, prev: null });

    useEffect(() => {
        if (blog?.id && blog?.date && currentCategoryId) {
            fetchAdjacentPosts(blog.id, blog.date, currentCategoryId).then(posts => {
                setAdjacentPosts({
                    next: posts.nextPost,
                    prev: posts.prevPost
                });
            });
        }
    }, [blog?.id, blog?.date, currentCategoryId]);

    if (!currentCategoryId) {
        console.warn("No category found for current post");
    }

    const cleanExcerpt = (raw) => {
        const unicodeDecoded = raw.replace(/\\u[\dA-F]{4}/gi, match =>
            String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))
        );
        const textarea = document.createElement('textarea');
        textarea.innerHTML = unicodeDecoded;
        const htmlDecoded = textarea.value;
        return htmlDecoded.replace(/<[^>]*>/g, '').trim();
    };

    function calculateReadTime(htmlContent, wordsPerMinute = 200, imageReadTime = 12) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;

        const texT = tempDiv.textContent || '';
        const wordCount = texT.trim().split(/\s+/).length;

        const imageCount = tempDiv.querySelectorAll('img').length;

        const wordsTime = (wordCount / wordsPerMinute) * 60;
        const imagesTime = imageCount * imageReadTime;
        const totalSeconds = wordsTime + imagesTime;

        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.round(totalSeconds % 60);

        const roundedMinutes = minutes < 1 ? 1 : minutes;
        const textSuffix = roundedMinutes === 1 ? 'min read' : 'min read';
        const text = `${roundedMinutes} ${textSuffix}`;

        return {
            minutes: roundedMinutes,
            seconds,
            totalSeconds,
            text,
            wordCount,
            imageCount
        };
    }

    if (loading) return <div className='loading'>Loading...</div>;
    if (error) return <div className='error'>Error: {error}</div>;
    if (!data) return <div className='error'>No data</div>;

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={featuredImage} />
                <meta property="og:url" content={url} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={featuredImage} />
            </Helmet>

            <Header />
            <div className="blog section-padding">
                <div className="date">{date}</div>
                <h1>{title}</h1>
                <img className='featured-image' src={featuredImage || null} alt='Blog Title image'></img>
                <p className='tag'>{blogTag}</p>
                <div className="author">
                    <img className="author-avatar" src={'/tvornica-naslovna.jpg'} alt={authorName} />
                    <div className="author-info">
                        <span className="author-name">{authorName}</span>
                        <p className="author-bio">Content Creator</p>
                    </div>
                </div>



                <div dangerouslySetInnerHTML={{ __html: blog?.content?.rendered }} />

                <PostNavigation
                    next={adjacentPosts?.next}
                    prev={adjacentPosts?.prev}
                    nextId={adjacentPosts?.next?.id}
                    prevId={adjacentPosts?.prev?.id}
                />
            </div>

            {featuredPostsData?.length > 0 && (
                <section className="blog-featured-section">
                    <div className="section-header">
                        <h1 className="section-title">Istaknuti članci</h1>
                        <p className="section-description">Ako vam se ovo svidjelo, pročitajte još sadržaja ove kategorije</p>
                    </div>

                    <div className="blog-featured-cards">
                        {featuredBlogs.map((blog) => {
                            const featuredImage = blog._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
                            const excerpt = cleanExcerpt(blog.excerpt.rendered.slice(0, 100) + "...");
                            const tags = blog._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || [];
                            const date = new Date(blog.date).toLocaleDateString('hr-HR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            });
                            const blogContent = cleanExcerpt(blog.content.rendered);
                            const readingTime = calculateReadTime(blogContent);

                            return (
                                <RelatedBlogs
                                    key={blog.id}
                                    id={blog.id}
                                    image={featuredImage}
                                    excerpt={excerpt}
                                    date={date}
                                    readTime={readingTime}
                                    tag={tags}
                                    title={blog.title.rendered}
                                />
                            );
                        })}
                    </div>
                    <ShareButtons url={url} title={title} />
                </section>
            )}

            <Footer />
        </>
    );
};

export default BlogPost;
