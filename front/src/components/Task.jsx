import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateTaskModuleWindow from "./createTask";
const API_URL = process.env.REACT_APP_API_URL;
const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'urgent', 'future', 'pending', 'done'
    const navigate = useNavigate();

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            
            const response = await fetch(`${API_URL}/tasks`, {
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
        setIsModalOpen(false);
        fetchTasks();
    };

    const handleStatusChange = async (taskId, newStatus, event) => {
        event.stopPropagation(); // Зупиняємо всплиття події, щоб не відкривалося модальне вікно
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/tasks/${taskId}/status`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                fetchTasks(); // Оновлюємо список після зміни статусу
            }
        } catch (err) {
            console.error('Помилка зміни статусу:', err);
        }
    };

    const handleDeleteTask = async (taskId, event) => {
        event.stopPropagation(); // Зупиняємо всплиття події, щоб не відкривалося модальне вікно
        if (window.confirm('Ви впевнені, що хочете видалити цю задачу?')) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${API_URL}/tasks/${taskId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    fetchTasks(); // Оновлюємо список після видалення
                }
            } catch (err) {
                console.error('Помилка видалення задачі:', err);
            }
        }
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setIsDetailsModalOpen(true);
    };

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false);
        setSelectedTask(null);
    };

    // Фільтрація задач за статусом
    const filterTasksByStatus = () => {
        switch (activeTab) {
            case 'urgent':
                return tasks.filter(task => task.status === 'urgent');
            case 'future':
                return tasks.filter(task => task.status === 'future');
            case 'pending':
                return tasks.filter(task => task.status === 'pending_approval');
            case 'done':
                return tasks.filter(task => task.status === 'done');
            default:
                return tasks;
        }
    };

    const filteredTasks = filterTasksByStatus();

    // Форматування дати
    const formatDate = (dateString) => {
        if (!dateString) return 'Невідомо';
        const date = new Date(dateString);
        return date.toLocaleDateString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Отримання кольору для статусу
    const getStatusColor = (status) => {
        switch (status) {
            case 'urgent':
                return '#dc3545'; // червоний
            case 'future':
                return '#17a2b8'; // блакитний
            case 'pending_approval':
                return '#ffc107'; // жовтий
            case 'done':
                return '#28a745'; // зелений
            default:
                return '#6c757d'; // сірий
        }
    };

    // Отримання тексту статусу
    const getStatusText = (status) => {
        switch (status) {
            case 'urgent':
                return 'Терміново';
            case 'future':
                return 'Майбутнє';
            case 'pending_approval':
                return 'Очікує схвалення';
            case 'done':
                return 'Виконано';
            default:
                return status;
        }
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
            <div style={styles.header}>
                <h2>Список задач</h2>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    style={styles.addButton}
                >
                    + Додати задачу
                </button>
            </div>

            {/* Таби для фільтрації */}
            <div style={styles.tabs}>
                <button
                    style={{...styles.tab, ...(activeTab === 'all' && styles.activeTab)}}
                    onClick={() => setActiveTab('all')}
                >
                    Всі задачі ({tasks.length})
                </button>
                <button
                    style={{...styles.tab, ...(activeTab === 'urgent' && styles.activeTab)}}
                    onClick={() => setActiveTab('urgent')}
                >
                    🔴 Термінові ({tasks.filter(t => t.status === 'urgent').length})
                </button>
                <button
                    style={{...styles.tab, ...(activeTab === 'future' && styles.activeTab)}}
                    onClick={() => setActiveTab('future')}
                >
                    🔵 Майбутні ({tasks.filter(t => t.status === 'future').length})
                </button>
                <button
                    style={{...styles.tab, ...(activeTab === 'pending' && styles.activeTab)}}
                    onClick={() => setActiveTab('pending')}
                >
                    🟡 Очікують схвалення ({tasks.filter(t => t.status === 'pending_approval').length})
                </button>
                <button
                    style={{...styles.tab, ...(activeTab === 'done' && styles.activeTab)}}
                    onClick={() => setActiveTab('done')}
                >
                    ✅ Виконані ({tasks.filter(t => t.status === 'done').length})
                </button>
            </div>

            {/* Модальне вікно створення задачі */}
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

            {/* Модальне вікно деталей задачі */}
            {isDetailsModalOpen && selectedTask && (
                <div style={styles.modalOverlay} onClick={closeDetailsModal}>
                    <div style={styles.detailsModalContent} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h3>Деталі задачі</h3>
                            <button 
                                onClick={closeDetailsModal}
                                style={styles.closeButton}
                            >
                                ×
                            </button>
                        </div>
                        <div style={styles.detailsBody}>
                            <div style={styles.detailsSection}>
                                <h4>{selectedTask.title}</h4>
                                <span 
                                    style={{
                                        ...styles.statusBadge,
                                        backgroundColor: getStatusColor(selectedTask.status),
                                        display: 'inline-block',
                                        marginBottom: '15px'
                                    }}
                                >
                                    {getStatusText(selectedTask.status)}
                                </span>
                            </div>

                            <div style={styles.detailsSection}>
                                <strong>Опис:</strong>
                                <p style={styles.detailsText}>{selectedTask.description}</p>
                            </div>

                            <div style={styles.detailsGrid}>
                                <div style={styles.detailsItem}>
                                    <strong>Автор:</strong>
                                    <span>{selectedTask.user?.fullname || selectedTask.user?.username || 'Невідомий'}</span>
                                </div>
                                <div style={styles.detailsItem}>
                                    <strong>Дата створення:</strong>
                                    <span>{formatDate(selectedTask.createdAt)}</span>
                                </div>
                                {selectedTask.deadline && (
                                    <div style={styles.detailsItem}>
                                        <strong>Дедлайн:</strong>
                                        <span style={styles.deadline}>{formatDate(selectedTask.deadline)}</span>
                                    </div>
                                )}
                                {selectedTask.doneAt && (
                                    <div style={styles.detailsItem}>
                                        <strong>Дата виконання:</strong>
                                        <span style={styles.doneDate}>{formatDate(selectedTask.doneAt)}</span>
                                    </div>
                                )}
                            </div>

                            {selectedTask.technologies && selectedTask.technologies.length > 0 && (
                                <div style={styles.detailsSection}>
                                    <strong>Технології:</strong>
                                    <div style={styles.techContainer}>
                                        {selectedTask.technologies.map((tech, i) => (
                                            <span key={i} style={styles.techBadge}>{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Список задач (тільки заголовок, дата, автор) */}
            {filteredTasks.length === 0 ? (
                <p style={styles.center}>Немає задач у цій категорії</p>
            ) : (
                filteredTasks.map((el) => (
                    <div 
                        key={el.id} 
                        style={{
                            ...styles.taskCard,
                            ...(el.status === 'done' && styles.doneTaskCard),
                            cursor: 'pointer'
                        }}
                        onClick={() => handleTaskClick(el)}
                    >
                        <div style={styles.taskHeader}>
                            <h3 style={{
                                ...styles.taskTitle,
                                ...(el.status === 'done' && styles.doneTitle),
                                margin: 0
                            }}>
                                {el.title}
                            </h3>
                            <div style={styles.statusContainer} onClick={(e) => e.stopPropagation()}>
                                <span 
                                    style={{
                                        ...styles.statusBadge,
                                        backgroundColor: getStatusColor(el.status)
                                    }}
                                >
                                    {getStatusText(el.status)}
                                </span>
                                
                                {/* Кнопки зміни статусу (не показуємо для виконаних задач) */}
                                {el.status !== 'done' && (
                                    <>
                                        {el.status !== 'urgent' && (
                                            <button
                                                onClick={(e) => handleStatusChange(el.id, 'urgent', e)}
                                                style={styles.statusActionButton}
                                                title="Позначити як термінове"
                                            >
                                                🔴
                                            </button>
                                        )}
                                        {el.status !== 'future' && (
                                            <button
                                                onClick={(e) => handleStatusChange(el.id, 'future', e)}
                                                style={styles.statusActionButton}
                                                title="Перенести в майбутнє"
                                            >
                                                🔵
                                            </button>
                                        )}
                                        {el.status !== 'pending_approval' && (
                                            <button
                                                onClick={(e) => handleStatusChange(el.id, 'pending_approval', e)}
                                                style={styles.statusActionButton}
                                                title="Відправити на схвалення"
                                            >
                                                🟡
                                            </button>
                                        )}
                                    </>
                                )}
                                
                                {/* Кнопка "Виконано" для всіх невиконаних задач */}
                                {el.status !== 'done' && (
                                    <button
                                        onClick={(e) => handleStatusChange(el.id, 'done', e)}
                                        style={styles.statusActionButton}
                                        title="Позначити як виконано"
                                    >
                                        ✅
                                    </button>
                                )}
                                
                                {/* Кнопка видалення */}
                                <button
                                    onClick={(e) => handleDeleteTask(el.id, e)}
                                    style={styles.deleteButton}
                                    title="Видалити задачу"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                        
                        <div style={styles.taskFooter}>
                            <span style={styles.taskMeta}>
                                📅 {formatDate(el.createdAt)}
                            </span>
                            <span style={styles.taskMeta}>
                                👤 {el.user?.fullname || el.user?.username || 'Невідомий'}
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '900px',
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
    tabs: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        flexWrap: 'wrap'
    },
    tab: {
        padding: '8px 16px',
        border: '1px solid #ddd',
        backgroundColor: '#f8f9fa',
        cursor: 'pointer',
        borderRadius: '4px',
        fontSize: '14px'
    },
    activeTab: {
        backgroundColor: '#007bff',
        color: 'white',
        borderColor: '#007bff'
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
        backgroundColor: '#fffae8',
        color: 'black',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        ':hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            transform: 'translateY(-2px)'
        }
    },
    doneTaskCard: {
        backgroundColor: '#f0f0f0',
        opacity: 0.8,
        borderColor: '#28a745'
    },
    taskHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
    },
    taskTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        flex: 1,
        marginRight: '10px'
    },
    taskFooter: {
        display: 'flex',
        gap: '20px',
        fontSize: '14px',
        color: '#666'
    },
    taskMeta: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    statusContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        flexWrap: 'wrap'
    },
    statusBadge: {
        padding: '4px 8px',
        borderRadius: '12px',
        color: 'white',
        fontSize: '12px',
        fontWeight: 'bold'
    },
    statusActionButton: {
        background: 'none',
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer',
        padding: '0 2px',
        transition: 'transform 0.2s',
        ':hover': {
            transform: 'scale(1.2)'
        }
    },
    deleteButton: {
        background: 'none',
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer',
        padding: '0 2px',
        color: '#dc3545',
        transition: 'transform 0.2s',
        ':hover': {
            transform: 'scale(1.2)'
        }
    },
    deadline: {
        color: '#dc3545',
        fontWeight: 'bold'
    },
    doneDate: {
        color: '#28a745',
        fontWeight: 'bold'
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
    doneTechBadge: {
        backgroundColor: '#d4edda',
        color: '#155724'
    },
    doneTitle: {
        textDecoration: 'line-through',
        color: '#6c757d'
    },
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
    detailsModalContent: {
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '8px',
        maxWidth: '700px',
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
    },
    detailsBody: {
        padding: '20px'
    },
    detailsSection: {
        marginBottom: '20px'
    },
    detailsText: {
        margin: '10px 0',
        lineHeight: '1.6',
        color: '#333'
    },
    detailsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
    },
    detailsItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
    }
};

export default Task;