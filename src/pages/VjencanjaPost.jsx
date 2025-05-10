import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hook/useFetch';

const VjencanjaPost = () => {

    const { id } = useParams();
    const { loading, error, data } = useFetch(`http://tvornica-backend.local/wp-json/wp/v2/`)


    return (
        <div>VjencanjaPost {id}</div>
    )
}

export default VjencanjaPost