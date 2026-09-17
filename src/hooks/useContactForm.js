import { useState, useEffect } from 'react';

export const useContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ loading: false, success: false, error: '' });

    // Efecto para hacer desaparecer el mensaje (éxito o error) tras 5 segundos
    useEffect(() => {
        if (status.success || status.error) {
            const timer = setTimeout(() => {
                setStatus((prevStatus) => ({
                    ...prevStatus,
                    success: false,
                    error: ''
                }));
            }, 5000); // 5000 ms = 5 segundos

            // Limpieza del temporizador si el componente se desmonte o el estado cambie
            return () => clearTimeout(timer);
        }
    }, [status.success, status.error]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            setStatus({ loading: false, success: false, error: 'Por favor, completa todos los campos requeridos.' });
            return;
        }

        setStatus({ loading: true, success: false, error: '' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Ocurrió un error al enviar el mensaje.');
            }

            setStatus({ loading: false, success: true, error: '' });
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setStatus({ loading: false, success: false, error: err.message });
        }
    };

    return {
        formData,
        status,
        handleChange,
        handleSubmit
    };
};