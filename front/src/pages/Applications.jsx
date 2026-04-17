import { useEffect, useState } from 'react';

export default function Applications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        description: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [companyError, setCompanyError] = useState(null);
    const [isCompanyChecked, setIsCompanyChecked] = useState(false); // Стан для відстеження перевірки

    const GOAL = 100; // Мета - 100 заявок

    const fetchApplications = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/user/applications', {
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch applications');
            const data = await response.json();
            setApplications(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    // Функція для перевірки, чи вже подавалась заявка в цю компанію
    const checkCompanyDuplicate = (companyName) => {
        if (!companyName.trim()) return false;
        
        const existingApplication = applications.find(
            app => app.company.toLowerCase() === companyName.trim().toLowerCase()
        );
        
        return !!existingApplication;
    };

    // Функція для отримання інформації про існуючу заявку
    const getExistingApplicationInfo = (companyName) => {
        return applications.find(
            app => app.company.toLowerCase() === companyName.trim().toLowerCase()
        );
    };

    // Окрема функція для перевірки компанії по кнопці
// Окрема функція для перевірки компанії по кнопці (компактний варіант)
const handleCheckCompany = () => {
    if (!formData.company.trim()) {
        setCompanyError('Please enter a company name first');
        setIsCompanyChecked(false);
        return;
    }

    if (checkCompanyDuplicate(formData.company)) {
        const existingApp = getExistingApplicationInfo(formData.company);
        const formattedDate = new Date(existingApp.appliedAt).toLocaleDateString('uk-UA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        setCompanyError(
            `❌ You have already applied to "${formData.company}"! ` +
            `Title: "${existingApp.title}". Date: ${formattedDate}. ` +
            `You cannot create another application for this company.`
        );
        setIsCompanyChecked(true);
    } else {
        setCompanyError(
            `✅ Great! "${formData.company}" is available. You haven't applied to this company yet.`
        );
        setIsCompanyChecked(true);
    }
};

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Скидаємо статус перевірки при зміні назви компанії
        if (name === 'company') {
            setIsCompanyChecked(false);
            setCompanyError(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Перевіряємо, чи була проведена перевірка компанії
        if (!isCompanyChecked) {
            setCompanyError('Please check if the company is available first using the "Check Company" button');
            return;
        }

        // Перевіряємо, чи немає помилки дублікату
        if (companyError && companyError.includes('already applied')) {
            setSubmitError('Cannot create application: You have already applied to this company');
            return;
        }

        setSubmitting(true);
        setSubmitError(null);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/user/addApplication', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create application');
            }

            // Оновлюємо список заявок після успішного створення
            await fetchApplications();
            
            // Очищаємо форму та закриваємо модальне вікно
            setFormData({
                title: '',
                company: '',
                description: ''
            });
            setCompanyError(null);
            setIsCompanyChecked(false);
            setIsModalOpen(false);
        } catch (err) {
            setSubmitError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
        setSubmitError(null);
        setCompanyError(null);
        setIsCompanyChecked(false);
        setFormData({
            title: '',
            company: '',
            description: ''
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({
            title: '',
            company: '',
            description: ''
        });
        setSubmitError(null);
        setCompanyError(null);
        setIsCompanyChecked(false);
    };

    // Розрахунок прогресу
    const currentCount = applications.length;
    const progressPercentage = Math.min((currentCount / GOAL) * 100, 100);
    const remaining = Math.max(GOAL - currentCount, 0);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="applications-container">
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '20px',
            }}>
                <h1>Applications</h1>
                <button 
                    onClick={openModal}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    + Create New Application
                </button>
            </div>

            {/* Progress Bar Section */}
            <div style={{
                marginBottom: '30px',
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '12px',
                border: '1px solid #e9ecef'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '12px'
                }}>
                    <h3 style={{ margin: 0, fontSize: '18px', color: '#495057' }}>
                        Application Goal Progress
                    </h3>
                    <span style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#007bff'
                    }}>
                        {currentCount} / {GOAL}
                    </span>
                </div>
                
                {/* Progress Bar */}
                <div style={{
                    width: '100%',
                    height: '30px',
                    backgroundColor: '#e9ecef',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    marginBottom: '12px',
                    position: 'relative'
                }}>
                    <div style={{
                        width: `${progressPercentage}%`,
                        height: '100%',
                        backgroundColor: progressPercentage === 100 ? '#28a745' : '#007bff',
                        transition: 'width 0.5s ease-in-out',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: '10px',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 'bold'
                    }}>
                        {progressPercentage >= 15 && `${Math.round(progressPercentage)}%`}
                    </div>
                </div>
                
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px'
                }}>
                    <div style={{ color: '#6c757d', fontSize: '14px' }}>
                        {remaining === 0 ? (
                            <span style={{ color: '#28a745', fontWeight: 'bold' }}>
                                🎉 Congratulations! You've reached your goal! 🎉
                            </span>
                        ) : (
                            <span>
                                {remaining} more {remaining === 1 ? 'application' : 'applications'} to reach your goal of {GOAL}
                            </span>
                        )}
                    </div>
                    {progressPercentage >= 50 && progressPercentage < 100 && (
                        <div style={{
                            padding: '4px 12px',
                            backgroundColor: '#fff3cd',
                            color: '#856404',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '500'
                        }}>
                            🚀 Halfway there! Keep going!
                        </div>
                    )}
                    {progressPercentage === 100 && (
                        <div style={{
                            padding: '4px 12px',
                            backgroundColor: '#d4edda',
                            color: '#155724',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '500'
                        }}>
                            🌟 Goal Achieved! 🌟
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Window */}
            {isModalOpen && (
                <div style={{
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
                }} onClick={closeModal}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '30px',
                        width: '90%',
                        maxWidth: '550px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        position: 'relative'
                    }} onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={closeModal}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                background: 'none',
                                border: 'none',
                                fontSize: '24px',
                                cursor: 'pointer',
                                color: '#666'
                            }}
                        >
                            ×
                        </button>

                        <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Create New Application</h2>
                        
                        {submitError && (
                            <div style={{
                                color: 'red',
                                marginBottom: '15px',
                                padding: '10px',
                                backgroundColor: '#ffebee',
                                borderRadius: '4px',
                                border: '1px solid #ffcdd2'
                            }}>
                                {submitError}
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ 
                                    display: 'block', 
                                    marginBottom: '8px',
                                    fontWeight: 'bold'
                                }}>
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter application title"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ 
                                    display: 'block', 
                                    marginBottom: '8px',
                                    fontWeight: 'bold'
                                }}>
                                    Company *
                                </label>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter company name"
                                        style={{
                                            flex: 1,
                                            padding: '10px',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px',
                                            fontSize: '14px',
                                            borderColor: companyError && companyError.includes('already applied') ? '#dc3545' : 
                                                       (companyError && companyError.includes('available') ? '#28a745' : '#ddd')
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleCheckCompany}
                                        style={{
                                            padding: '10px 20px',
                                            backgroundColor: '#6c757d',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            whiteSpace: 'nowrap'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5a6268'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6c757d'}
                                    >
                                        🔍 Check Company
                                    </button>
                                </div>
                                {companyError && (
                                    <div style={{
                                        marginTop: '10px',
                                        padding: '12px',
                                        backgroundColor: companyError.includes('available') ? '#d4edda' : '#f8d7da',
                                        color: companyError.includes('available') ? '#155724' : '#721c24',
                                        borderRadius: '4px',
                                        fontSize: '13px',
                                        borderLeft: `3px solid ${companyError.includes('available') ? '#28a745' : '#dc3545'}`,
                                        whiteSpace: 'pre-line'
                                    }}>
                                        {companyError}
                                    </div>
                                )}
                                {!isCompanyChecked && formData.company && !companyError && (
                                    <div style={{
                                        marginTop: '5px',
                                        fontSize: '12px',
                                        color: '#ffc107',
                                        padding: '5px',
                                        backgroundColor: '#fff3cd',
                                        borderRadius: '4px'
                                    }}>
                                        ⚠️ Please click "Check Company" to verify availability
                                    </div>
                                )}
                            </div>
                            
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ 
                                    display: 'block', 
                                    marginBottom: '8px',
                                    fontWeight: 'bold'
                                }}>
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    rows="5"
                                    placeholder="Enter application description"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        resize: 'vertical',
                                        fontSize: '14px',
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#6c757d',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '14px'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting || !isCompanyChecked || (companyError && companyError.includes('already applied'))}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: (!isCompanyChecked || (companyError && companyError.includes('already applied'))) ? '#6c757d' : '#007bff',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: (submitting || !isCompanyChecked || (companyError && companyError.includes('already applied'))) ? 'not-allowed' : 'pointer',
                                        opacity: (submitting || !isCompanyChecked || (companyError && companyError.includes('already applied'))) ? 0.6 : 1,
                                        fontSize: '14px'
                                    }}
                                >
                                    {submitting ? 'Creating...' : 'Create Application'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Applications List */}
            {applications.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '50px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    color: '#666',
                    width: '90%'
                }}>
                    <p>No applications found.</p>
                    <button 
                        onClick={openModal}
                        style={{
                            marginTop: '10px',
                            padding: '8px 16px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Create your first application
                    </button>
                </div>
            ) : (
                <>
                    {/* Summary Cards */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '15px',
                        marginBottom: '25px'
                    }}>
                        <div style={{
                            padding: '15px',
                            backgroundColor: '#e3f2fd',
                            borderRadius: '8px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '14px', color: '#1976d2', marginBottom: '5px' }}>
                                Total Applications
                            </div>
                            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1976d2' }}>
                                {currentCount}
                            </div>
                        </div>
                        <div style={{
                            padding: '15px',
                            backgroundColor: '#f3e5f5',
                            borderRadius: '8px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '14px', color: '#7b1fa2', marginBottom: '5px' }}>
                                Progress to Goal
                            </div>
                            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#7b1fa2' }}>
                                {Math.round(progressPercentage)}%
                            </div>
                        </div>
                        <div style={{
                            padding: '15px',
                            backgroundColor: '#fff3e0',
                            borderRadius: '8px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '14px', color: '#f57c00', marginBottom: '5px' }}>
                                Remaining
                            </div>
                            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f57c00' }}>
                                {remaining}
                            </div>
                        </div>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {applications.map((app) => (
                            <li key={app.id} style={{
                                marginBottom: '15px',
                                padding: '15px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                backgroundColor: 'white',
                                transition: 'box-shadow 0.2s',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                                    <h3 style={{ margin: 0, color: '#333' }}>{app.title}</h3>
                                    {app.company && (
                                        <span style={{
                                            padding: '4px 8px',
                                            backgroundColor: '#e3f2fd',
                                            color: '#1976d2',
                                            borderRadius: '4px',
                                            fontSize: '12px',
                                            fontWeight: '500'
                                        }}>
                                            {app.company}
                                        </span>
                                    )}
                                </div>
                                <p style={{ margin: '0 0 10px 0', color: '#666', lineHeight: '1.5' }}>{app.description}</p>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                                    {app.appliedAt && (
                                        <small style={{ color: '#999' }}>
                                            Applied: {new Date(app.appliedAt).toLocaleDateString('uk-UA', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </small>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}