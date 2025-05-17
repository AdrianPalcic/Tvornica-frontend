import React from 'react'
import useFetch from '../hook/useFetch';

const Reklama = () => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const { loading, error, data } = useFetch(`${apiUrl}/posts?categories=28&_embed`);

    const ad = data?._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

    console.log(data)

    if (loading) return <div className='loading'>Loading...</div>;
    if (error) return <div className='error'>Error: {error}</div>;
    if (!data) return <div className='error'>No data</div>;
    return (
        <div className="reklama">
            <img src={ad} alt='' loading='lazy' />
        </div>
    )
}

export default Reklama