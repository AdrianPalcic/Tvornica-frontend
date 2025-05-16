import "../css/besplatniCSS/besplatne-stvari.css"
import useFetch from '../hook/useFetch';
import Header from '../components/headers/Header';
import Footer from '../components/Footer';
import { FileText } from 'lucide-react';

const BesplatneStvari = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { loading, error, data } = useFetch(
        `${apiUrl}/posts?categories=25&_embed&acf_format=standard`
    );

    const extractPdfInfo = (htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const downloadLink = doc.querySelector('.wp-block-file__button');
        const fileName = doc.querySelector('a[href$=".pdf"]')?.textContent || 'Preuzmi PDF';

        return downloadLink
            ? {
                href: downloadLink.getAttribute('href'),
                text: fileName,
            }
            : null;
    };

    return (
        <>
            <Header />
            <div className="besplatni-sadrzaj">
                <h1>Besplatni sadržaj</h1>
                <p>
                    Ova stranica nudi besplatne PDF materijale vezane uz organizaciju vjenčanja — od planera i budžet tablica do popisa zadataka i rasporeda dana. Preuzmite sadržaj koji će vam pomoći da vaše vjenčanje bude savršeno isplanirano i bez stresa.
                </p>

                {loading && <p>Učitavanje...</p>}
                {error && <p>Greška prilikom dohvaćanja podataka.</p>}
                {!loading &&
                    data &&
                    data.map((post) => {
                        const pdfInfo = extractPdfInfo(post.content.rendered);
                        return (
                            pdfInfo && (
                                <div key={post.id} className="pdf-item">
                                    <p>{pdfInfo.text}</p>
                                    <a
                                        href={pdfInfo.href}
                                        className="download-button"
                                        download
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FileText />   Preuzmi PDF
                                    </a>
                                </div>
                            )
                        );
                    })}
            </div>
            <Footer />
        </>
    );
};

export default BesplatneStvari;
