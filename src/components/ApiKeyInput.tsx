import React, { useState, useEffect } from 'react';

const ApiKeyInput: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Load API key from localStorage on component mount
    const storedApiKey = localStorage.getItem('qmadmin_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setMessage('API ключ загружен из локального хранилища.');
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };

  const handleSaveClick = () => {
    localStorage.setItem('qmadmin_api_key', apiKey);
    setMessage('API ключ успешно сохранен!');
    setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds
  };

  return (
    <div className="api-key-input-container">
      <h2>Управление API-ключом</h2>
      <div className="input-group">
        <label htmlFor="apiKey">API Ключ:</label>
        <input type="text" id="apiKey" value={apiKey} onChange={handleInputChange} placeholder="Введите ваш API ключ" />
        <button onClick={handleSaveClick}>Сохранить</button>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ApiKeyInput;
