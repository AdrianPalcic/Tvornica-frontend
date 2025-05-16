import TransparentHeader from '../components/headers/TransparentHeader'
import VjencanjaHero from '../components/Vjencanja.components/VjencanjaHero'
import "../css/Vjencanja.css/Vjencanja.css"
import VjencanjaCard from '../components/cards/VjencanjaCard'
import VjencanjaCTA from '../components/Vjencanja.components/VjencanjaCTA'
import useFetch from '../hook/useFetch'
import Footer from '../components/Footer'


const Vjencanja = () => {

    const apiUrl = import.meta.env.VITE_API_URL
    const { loading, error, data } = useFetch(`${apiUrl}/posts?categories=8&_embed`)

    const posts = data?.sort((a, b) => new Date(b.date) - new Date(a.date));

    const cleanExcerpt = (raw) => {
        const unicodeDecoded = raw.replace(/\\u[\dA-F]{4}/gi, match =>
            String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))
        );
        const textarea = document.createElement('textarea');
        textarea.innerHTML = unicodeDecoded;
        const htmlDecoded = textarea.value;
        return htmlDecoded.replace(/<[^>]*>/g, '').trim();
    };

    return (
        <>
            <TransparentHeader />
            <VjencanjaHero />
            <div className="vjencanja-container">
                <div className="blog-grid">
                    {posts?.map((post) => {
                        const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
                        const excerpt = cleanExcerpt(post.excerpt.rendered);
                        const date = new Date(post.date).toLocaleDateString('hr-HR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });
                        const tags = post._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || [];

                        return (
                            <VjencanjaCard
                                id={post.id}
                                key={post.id}
                                title={tags}
                                image={featuredImage}
                                date={date}
                                excerpt={excerpt}
                            />
                        );
                    })}
                </div>
                <VjencanjaCTA />
            </div>
            <Footer />
        </>
    )
}

export default Vjencanja