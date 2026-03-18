import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateTaskModuleWindow from "./createTask"; // Імпортуємо компонент

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Стан для модального вікна
    const navigate = useNavigate();

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            
            const response = await fetch("http://localhost:3001/tasks", {
                credentials: "include",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 401) {
                localStorage.removeItem('token');
                navigate('/signin');
                return;
            }

            if (!response.ok) {
                throw new Error(`Помилка сервера: ${response.status}`);
            }

            const data = await response.json();
            
            if (Array.isArray(data)) {
                setTasks(data);
            } else {
                console.error('Отримано не масив:', data);
                setTasks([]);
                setError('Отримано некоректні дані від сервера');
            }
        } catch (err) {
            console.error('Помилка завантаження задач:', err);
            setError(err.message);
            setTasks([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [navigate]);

    const handleTaskCreated = () => {
        // Закриваємо модальне вікно і перезавантажуємо список задач
        setIsModalOpen(false);
        fetchTasks(); // Перезавантажуємо список задач
    };

    if (loading) {
        return <div style={styles.center}>Завантаження задач...</div>;
    }

    if (error) {
        return (
            <div style={styles.center}>
                <p style={styles.error}>Помилка: {error}</p>
                <button onClick={() => window.location.reload()} style={styles.button}>
                    Спробувати знову
                </button>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Заголовок з кнопкою */}
            <div style={styles.header}>
                <h2>Список задач</h2>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    style={styles.addButton}
                >
                    + Додати задачу
                </button>
            </div>

            {/* Модальне вікно */}
            {isModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <div style={styles.modalHeader}>
                            <h3>Створення нової задачі</h3>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                style={styles.closeButton}
                            >
                                ×
                            </button>
                        </div>
                        <CreateTaskModuleWindow onTaskCreated={handleTaskCreated} />
                    </div>
                </div>
            )}

            {/* Список задач */}
            {tasks.length === 0 ? (
                <p style={styles.center}>Немає доступних задач</p>
            ) : (
                tasks.map((el) => (
                    <div key={el.id} style={styles.taskCard}>
                        <h3>{el.title}</h3>
                        <p>{el.description}</p>
                        <h4>Автор: {el.user?.fullname || el.user?.username || 'Невідомий'}</h4>
                        {el.technologies && el.technologies.length > 0 && (
                            <div style={styles.techContainer}>
                                {el.technologies.map((tech, i) => (
                                    <span key={i} style={styles.techBadge}>{tech}</span>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    addButton: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold'
    },
    center: {
        textAlign: 'center',
        padding: '40px',
        color: '#666'
    },
    error: {
        color: 'red',
        marginBottom: '20px'
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    taskCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px',
        backgroundColor: '#f9f9f9'
    },
    techContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px',
        marginTop: '10px'
    },
    techBadge: {
        backgroundColor: '#e9ecef',
        padding: '3px 8px',
        borderRadius: '12px',
        fontSize: '12px'
    },
    // Стилі для модального вікна
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: '8px',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        borderBottom: '1px solid #ddd'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: '#666'
    }
};

export default Task;