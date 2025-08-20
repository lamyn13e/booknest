import React from 'react';
import AppRoutes from './AppRoutes';
import { AuthProvider } from './components/Auth/AuthContext';

export default function App() {
  return <AuthProvider>
            <AppRoutes />
         </AuthProvider>;
  // return <AppRoutes />;
}