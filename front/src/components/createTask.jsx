import { useState } from "react";

const CreateTaskModuleWindow = ({ onTaskCreated }) => { // Додаємо пропс
    const [formData, setFormData] = useState({
        title: '',
        technologies: [],
        description: ''
    });

    const [techInput, setTechInput] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddTechnology = () => {
        if (techInput.trim()) {
            setFormData(prev => ({
                ...prev,
                technologies: [...prev.technologies, techInput.trim()]
            }));
            setTechInput('');
        }
    };

    const handleRemoveTechnology = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            technologies: prev.technologies.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const token = localStorage.getItem('token');
            
            const response = await fetch('http://localhost:3001/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Задачу створено успішно');
                if (onTaskCreated) {
                    onTaskCreated(); // Викликаємо функцію з батьківського компонента
                }
            } else {
                console.error('Помилка створення задачі');
            }
        } catch (err) {
            console.error('Помилка:', err);
        }
    };

    // ... решта коду без змін (return і styles)
    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                {/* Поле Title */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Назва задачі:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        style={styles.input}
                        placeholder="Введіть назву задачі"
                    />
                </div>

                {/* Поле Description */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Опис:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        style={{...styles.input, minHeight: '100px'}}
                        placeholder="Детальний опис задачі"
                    />
                </div>

                {/* Поле Technologies (масив) */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Технології:</label>
                    <div style={styles.techInputContainer}>
                        <input
                            type="text"
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            style={{...styles.input, flex: 1}}
                            placeholder="React, Node.js, TypeScript..."
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddTechnology();
                                }
                            }}
                        />
                        <button 
                            type="button" 
                            onClick={handleAddTechnology}
                            style={styles.addButton}
                        >
                            Додати
                        </button>
                    </div>
                    
                    <div style={styles.technologiesList}>
                        {formData.technologies.map((tech, index) => (
                            <span key={index} style={styles.techBadge}>
                                {tech}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTechnology(index)}
                                    style={styles.removeTechButton}
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                        {formData.technologies.length === 0 && (
                            <p style={styles.hint}>Додайте технології, які використовуються</p>
                        )}
                    </div>
                </div>

                <button type="submit" style={styles.submitButton}>
                    Створити задачу
                </button>
            </form>
        </div>
    );
};

// Стилі (без змін)
const styles = {
    container: {
        padding: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    label: {
        fontWeight: 'bold',
        fontSize: '14px',
        color: '#333'
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        outline: 'none'
    },
    techInputContainer: {
        display: 'flex',
        gap: '10px'
    },
    addButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    technologiesList: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginTop: '10px'
    },
    techBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '5px 10px',
        backgroundColor: '#e9ecef',
        borderRadius: '16px',
        fontSize: '14px'
    },
    removeTechButton: {
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        color: '#666'
    },
    hint: {
        color: '#999',
        fontSize: '14px',
        margin: 0
    },
    submitButton: {
        padding: '12px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold'
    }
};

export default CreateTaskModuleWindow;