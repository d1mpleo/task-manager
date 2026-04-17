import React, { useState } from 'react';

const CreateTaskModuleWindow = ({ onTaskCreated }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        technologies: [],
        status: 'pending_approval', // Статус за замовчуванням
        deadline: '',
        userId: '' // Якщо потрібно
    });
    const [techInput, setTechInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const API_URL = process.env.REACT_APP_API_URL;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddTechnology = () => {
        if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
            setFormData(prev => ({
                ...prev,
                technologies: [...prev.technologies, techInput.trim()]
            }));
            setTechInput('');
        }
    };

    const handleRemoveTechnology = (techToRemove) => {
        setFormData(prev => ({
            ...prev,
            technologies: prev.technologies.filter(tech => tech !== techToRemove)
        }));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTechnology();
        }
    };

    const validateForm = () => {
        if (!formData.title.trim()) {
            setError('Назва задачі обов\'язкова');
            return false;
        }
        if (!formData.description.trim()) {
            setError('Опис задачі обов\'язковий');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            
            // Підготовка даних для відправки
            const taskData = {
                title: formData.title.trim(),
                description: formData.description.trim(),
                technologies: formData.technologies,
                status: formData.status,
                deadline: formData.deadline || null,
                // Якщо потрібно додати userId
                // userId: formData.userId ? parseInt(formData.userId) : null
            };

            console.log('Відправляємо дані:', taskData); // Для дебагу

            const response = await fetch(`${API_URL}/tasks`, {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Помилка від сервера:', errorData);
                
                // Виводимо детальну помилку
                if (errorData.message) {
                    if (Array.isArray(errorData.message)) {
                        throw new Error(errorData.message.join(', '));
                    } else {
                        throw new Error(errorData.message);
                    }
                } else {
                    throw new Error(`Помилка сервера: ${response.status}`);
                }
            }

            const data = await response.json();
            console.log('Задача створена:', data);
            
            // Очищаємо форму
            setFormData({
                title: '',
                description: '',
                technologies: [],
                status: 'pending_approval',
                deadline: '',
                userId: ''
            });
            setTechInput('');
            
            // Викликаємо callback
            if (onTaskCreated) {
                onTaskCreated(data);
            }
        } catch (err) {
            console.error('Помилка створення задачі:', err);
            setError(err.message || 'Помилка при створенні задачі');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            {error && (
                <div style={styles.errorMessage}>
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Назва задачі *</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        style={styles.input}
                        placeholder="Введіть назву задачі"
                        required
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Опис *</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        style={styles.textarea}
                        placeholder="Введіть опис задачі"
                        rows="4"
                        required
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Статус</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        style={styles.select}
                    >
                        <option value="pending_approval">Очікує схвалення</option>
                        <option value="urgent">Терміново</option>
                        <option value="future">Майбутнє</option>
                    </select>
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Дедлайн</label>
                    <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleInputChange}
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Технології</label>
                    <div style={styles.techInputContainer}>
                        <input
                            type="text"
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            style={styles.techInput}
                            placeholder="Введіть технологію"
                        />
                        <button 
                            type="button" 
                            onClick={handleAddTechnology}
                            style={styles.addTechButton}
                        >
                            Додати
                        </button>
                    </div>
                    
                    {formData.technologies.length > 0 && (
                        <div style={styles.techList}>
                            {formData.technologies.map((tech, index) => (
                                <span key={index} style={styles.techItem}>
                                    {tech}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTechnology(tech)}
                                        style={styles.removeTechButton}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div style={styles.buttonGroup}>
                    <button 
                        type="submit" 
                        style={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Створення...' : 'Створити задачу'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
    },
    label: {
        fontWeight: 'bold',
        fontSize: '14px',
        color: '#333'
    },
    input: {
        padding: '8px 12px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px'
    },
    textarea: {
        padding: '8px 12px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px',
        resize: 'vertical'
    },
    select: {
        padding: '8px 12px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px',
        backgroundColor: 'white'
    },
    techInputContainer: {
        display: 'flex',
        gap: '10px'
    },
    techInput: {
        flex: 1,
        padding: '8px 12px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px'
    },
    addTechButton: {
        padding: '8px 16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    techList: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginTop: '10px'
    },
    techItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '4px 8px',
        backgroundColor: '#e9ecef',
        borderRadius: '12px',
        fontSize: '12px'
    },
    removeTechButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        color: '#666',
        padding: '0 2px'
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '20px'
    },
    submitButton: {
        padding: '10px 24px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold'
    },
    errorMessage: {
        padding: '10px',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        border: '1px solid #f5c6cb',
        borderRadius: '4px',
        marginBottom: '20px'
    }
};

export default CreateTaskModuleWindow;