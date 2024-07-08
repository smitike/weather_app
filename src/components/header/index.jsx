import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authcontext'
import { doSignOut } from '../../firebase/auth'

const Header = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
  
    const handleLogout = async () => {
      await doSignOut();
      navigate('/login');
    };
  
    return (
      <nav className='flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200'>
        {currentUser ? (
          <button onClick={handleLogout} className='text-sm text-blue-600 underline'>Logout</button>
        ) : (
          <>
            <Link className='text-sm text-blue-600 underline' to='/login'>Login</Link>
            <Link className='text-sm text-blue-600 underline' to='/register'>Register</Link>
          </>
        )}
      </nav>
    );
  };
  
  export default Header;
  
  
  
  
  
  
  
  

// const Header = () => {
//     const navigate = useNavigate()
//     const { userLoggedIn } = useAuth()
//     return (
//         <nav className='flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200'>
//             {
//                 userLoggedIn
//                     ?
//                     <>
//                         <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='text-sm text-blue-600 underline'>Logout</button>
//                     </>
//                     :
//                     <>
//                         <Link className='text-sm text-blue-600 underline' to={'/login'}>Login</Link>
//                         <Link className='text-sm text-blue-600 underline' to={'/register'}>Register New Account</Link>
//                     </>
//             }

//         </nav>
//     )
// }

// export default Header