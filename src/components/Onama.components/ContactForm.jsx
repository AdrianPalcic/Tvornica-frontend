import { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can add your submission logic
        console.log('Form submitted:', formData);
        // Reset form after submission
        setFormData({
            name: '',
            surname: '',
            email: '',
            message: ''
        });
    };

    return (
        <div className="contact-form" id="contact">
            <h2 className="contact-form__title">Kontaktirajte nas</h2>
            <p className="contact-form__subtitle">Imate pitanja? Javite nam se!</p>

            <form onSubmit={handleSubmit} className="contact-form__form">
                <div className="contact-form__row">
                    <div className="contact-form__group">
                        <label htmlFor="name" className="contact-form__label">Ime</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="contact-form__input"
                            required
                        />
                    </div>

                    <div className="contact-form__group">
                        <label htmlFor="surname" className="contact-form__label">Prezime</label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            className="contact-form__input"
                            required
                        />
                    </div>
                </div>

                <div className="contact-form__group">
                    <label htmlFor="email" className="contact-form__label">Email adresa</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="contact-form__input"
                        required
                    />
                </div>

                <div className="contact-form__group">
                    <label htmlFor="message" className="contact-form__label">Poruka</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="contact-form__textarea"
                        rows="5"
                        required
                    ></textarea>
                </div>

                <button type="submit" className="contact-form__submit">
                    Pošalji poruku
                </button>
            </form>
        </div>
    );
};

export default ContactForm;