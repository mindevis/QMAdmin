import React, { useState, useEffect } from 'react';

// Define the interface for a Module
interface ModuleInfo {
  name: string;
  version: string;
  is_free: boolean;
  is_default: boolean;
  description: string;
}

const ModuleList: React.FC = () => {
  const [modules, setModules] = useState<ModuleInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/modules');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ModuleInfo[] = await response.json();
        setModules(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  if (loading) {
    return <div>Загрузка модулей...</div>;
  }

  if (error) {
    return <div>Ошибка при загрузке модулей: {error}</div>;
  }

  return (
    <div className="module-list-container">
      <h2>Установленные модули</h2>
      {modules.length === 0 ? (
        <p>Модули не найдены.</p>
      ) : (
        <ul className="module-list">
          {modules.map((module) => (
            <li key={module.name} className="module-item">
              <h3>
                {module.name} (Версия: {module.version})
              </h3>
              <p>{module.description}</p>
              <p>
                Статус: {module.is_default ? 'По умолчанию' : 'Пользовательский'},{' '}
                {module.is_free ? 'Бесплатный' : 'Платный'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ModuleList;
