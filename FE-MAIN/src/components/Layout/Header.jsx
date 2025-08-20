// import React from 'react';
// import { Link } from 'react-router-dom';

// export default function Header() {
//   return (
//     <header className="bg-primary text-white px-8 py-4 flex justify-between items-center">
//       <h1 className="text-2xl font-semibold">BookNest</h1>
//       <nav>
//         <Link to="/" className="ml-4 font-medium hover:text-secondary transition duration-default">
//           Home
//         </Link>
//         <Link to="/login" className="ml-4 font-medium hover:text-secondary transition duration-default">
//           Login
//         </Link>
//         <Link to="/register" className="ml-4 font-medium hover:text-secondary transition duration-default">
//           Register
//         </Link>
//       </nav>
//     </header>
//   );
// }


import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import axios from 'axios';

export default function Header() {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await axios.post('http://localhost:8081/logout', {}, { withCredentials: true });
    setUser(null);
    window.location.href = '/';
  };

  return (
    <header className="bg-primary text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">BookNest</h1>
      <nav>
        <Link to="/" className="ml-4 font-medium hover:text-secondary transition duration-default">Home</Link>

        {user ? (
          <>
            {user.roles.some(r => r.authority === 'ROLE_ADMIN') && (
              <Link to="/admin" className="ml-4 font-medium hover:text-secondary">Admin</Link>
            )}
            {user.roles.some(r => r.authority === 'ROLE_SELLER') && (
              <>
              <Link to="/seller" className="ml-4 font-medium hover:text-secondary">Books</Link>
              <Link to="/orders" className="ml-4 font-medium hover:text-secondary">Orders</Link>
              <Link to="/statistical" className="ml-4 font-medium hover:text-secondary">Statistical</Link>
              </>
            )}
            <button onClick={handleLogout} className="ml-4 font-medium hover:text-secondary">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="ml-4 font-medium hover:text-secondary">Login</Link>
            <Link to="/register" className="ml-4 font-medium hover:text-secondary">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
