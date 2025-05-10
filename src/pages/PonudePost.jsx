import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hook/useFetch';
import Header from '../components/headers/Header';
import Footer from '../components/Footer';
import { Tags } from 'lucide-react';

const PonudePost = () => {

    const [tags, setTags] = useState([]);

    const { id } = useParams();

    const { loading, error, data } = useFetch(`http://tvornica-backend.local/wp-json/wp/v2/posts/${id}?_embed&acf_format=standard`)

    const blog = data;
    const featuredImage = blog?._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

    const address = blog?.acf.adresa;
    const telefon = blog?.acf.telefon;
    const instagram = blog?.acf.instagram;
    const website = blog?.acf.web;
    const facebook = blog?.acf.facebook;
    ;

    console.log(address, telefon, instagram, website, facebook)

    useEffect(() => {

        if (!blog) return;

        const blogTags = blog?._embedded?.['wp:term']?.[1] || [];
        const filteredTags = blogTags.reduce((acc, tag) => {
            if (!tag?.name) return acc

            if (tag.name.startsWith("Lokacija:") || tag.name.startsWith("Kategorija:")) {
                const prefix = tag.name.startsWith("Lokacija:") ? "Lokacija:" : "Kategorija:";
                const tagName = tag.name.replace(prefix, "").trim();
                acc.push({
                    id: tag.id,
                    name: tagName,
                    type: prefix.replace(":", ""),
                })
            }
            return acc;
        }, [])
        setTags(filteredTags)

    }, [blog])



    return (
        <>
            <Header />
            <div className="ponuda section-padding">
                <div className="tags">{tags?.map((tag) => (
                    <p>{tag.name}</p>
                ))}</div>
                <h1>{blog?.title.rendered}</h1>
            </div>
            <Footer />
        </>
    )
}

export default PonudePost