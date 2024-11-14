import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChatBox } from './components/ChatBox';
import { LoginForm } from './components/LoginForm';
import { RegistrationForm } from './components/RegistrationForm';
import { useStores } from './stores';

function ProtectedRoute({ element }: { element: React.ReactElement }) {
    const { authStore } = useStores();
    return authStore.isAuthenticated ? element : <Navigate to="/" replace />;
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/chat" element={<ProtectedRoute element={<ChatBox />} />} />
            </Routes>
        </Router>
    );
}

export default App;