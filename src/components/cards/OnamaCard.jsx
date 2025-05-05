import React from 'react'

const OnamaCard = ({ title, desc, list, icon }) => {
    return (
        <div className="onama-card">
            <div className="card-icon">
                {icon}
            </div>
            <h4>{title}</h4>
            <p className='onama-card-desc'>{desc}</p>
            <ul className="card-list">
                {list.map((item, index) => {
                    return (
                        <li key={index}>{item}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default OnamaCard