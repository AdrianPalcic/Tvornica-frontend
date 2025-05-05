import { Heart, Newspaper, Pen } from 'lucide-react'
import React from 'react'
import OnamaCard from '../cards/OnamaCard'

const StoNudimo = () => {

    const usluge = [
        {
            title: "Blog",
            desc: "Stručni uvidi i trendovi za vaše savršeno slavlje",
            list: [
                "Vodiči za stil i trendovi",
                "Savjeti za odabir dobavljača",
                "Upravljanje budžetom",
            ],
            icon: <Pen size={30} className='give-me-color' />,
        },
        {
            title: "Priče sa Vjenčanja",
            desc: "Pogledajte kako su drugi proveli svoj poseban dan",
            list: [
                "Fotografije i videozapisi",
                "Iskustva i preporuke",
                "Savjeti za organizaciju",],
            icon: <Heart size={30} className='give-me-color' />,
        },
        {
            title: "Brendovi i Suradnje",
            desc: "Odabrane kolekcije pouzdanih profesionalaca za vjenčanja",
            list: [
                "Odjeća i obuća",
                "Nakit i dodaci",
                "Usluge i proizvodi",
            ],
            icon: <Newspaper size={30} className='give-me-color' />,
        },
    ]

    return (
        <div className="sto-nudimo">
            <h2>Što nudimo?</h2>
            <div className="sto-nudimo-card-container">
                {usluge.map((usluga, index) => {
                    return (
                        <OnamaCard
                            key={index}
                            title={usluga.title}
                            desc={usluga.desc}
                            list={usluga.list}
                            icon={usluga.icon}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default StoNudimo