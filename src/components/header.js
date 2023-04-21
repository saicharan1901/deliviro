import Link from 'next/link';
import { auth } from '../pages/firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react'

const Header = () => {

    const [user, setUser] = useAuthState(auth);
    const googleAuth = new GoogleAuthProvider();
    const login = async () => {
        const results = await signInWithPopup(auth, googleAuth);
        const { user } = results;
        const userInfo = {
            name: user.displayName,
            email: user.email
        }
    }
    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <div className="flex items-center justify-between py-4 px-4 sm:px-8 shadow-gray-500 shadow-md bg-gradient-to-r from-black to-purple-800">
            <Link href='/home' className="flex items-center">
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5 10C5 7.23858 7.23858 5 10 5H14C16.7614 5 19 7.23858 19 10V10.8382C17.9457 9.59948 16.026 9.60669 14.9818 10.8598C14.7311 11.1607 14.2689 11.1607 14.0182 10.8598C12.9679 9.59944 11.0321 9.59944 9.98178 10.8598C9.73105 11.1607 9.26895 11.1607 9.01822 10.8598C7.97395 9.60669 6.05435 9.59948 5 10.8382V10ZM21 10V10.5C21.2559 10.5 21.5118 10.5976 21.7071 10.7929C22.0976 11.1834 22.0976 11.8166 21.7071 12.2071L21.5246 12.3896C21.1544 12.7599 20.7056 12.999 20.234 13.1095C21.2565 13.4231 22 14.3747 22 15.5C22 16.3607 21.565 17.1199 20.9029 17.5696C20.9651 17.6999 21 17.8459 21 18V18.5C21 20.433 19.433 22 17.5 22H6.5C4.567 22 3 20.433 3 18.5V18C3 17.8459 3.03486 17.6999 3.09712 17.5696C2.43498 17.1199 2 16.3607 2 15.5C2 14.3747 2.74348 13.4231 3.76602 13.1095C3.29437 12.999 2.84564 12.7599 2.47537 12.3896L2.29289 12.2071C1.90237 11.8166 1.90237 11.1834 2.29289 10.7929C2.48816 10.5976 2.74408 10.5 3 10.5V10C3 6.13401 6.13401 3 10 3H14C17.866 3 21 6.13401 21 10ZM5.35966 13H8.83259C8.32453 12.8675 7.84903 12.5809 7.48178 12.1402C7.23105 11.8393 6.76895 11.8393 6.51822 12.1402L6.46105 12.2088C6.15489 12.5762 5.77366 12.8406 5.35966 13ZM10.1674 13H13.8326C13.3245 12.8675 12.849 12.5809 12.4818 12.1402C12.2311 11.8393 11.7689 11.8393 11.5182 12.1402C11.151 12.5809 10.6755 12.8675 10.1674 13ZM15.1674 13H18.6403C18.2263 12.8406 17.8451 12.5762 17.5389 12.2088L17.4818 12.1402C17.2311 11.8393 16.7689 11.8393 16.5182 12.1402C16.151 12.5809 15.6755 12.8675 15.1674 13ZM5 18V18.5C5 19.3284 5.67157 20 6.5 20H17.5C18.3284 20 19 19.3284 19 18.5V18H5ZM4 15.5C4 15.2239 4.22386 15 4.5 15H19.5C19.7761 15 20 15.2239 20 15.5C20 15.7761 19.7761 16 19.5 16H4.5C4.22386 16 4 15.7761 4 15.5Z" fill="#ffffff" className='hover:fill-[#7B1FA2] transition duration-500' />
                </svg>
            </Link>
            <div className='flex gap-4'>
                {!user && <Link href='/signin'>
                    <p className=" hover:bg-purple-600 transition duration-1000 text-white py-2 px-4 rounded-lg">
                        Sign In
                    </p>
                </Link>}
                {user && <Link href='/order'>
                    <p className=" hover:bg-purple-600 transition duration-1000 text-white py-2 px-4 rounded-lg">
                        Orders
                    </p>
                </Link>}
                {user && <Link href='/profile'>
                    <p className=" hover:bg-purple-600 transition duration-1000 text-white py-2 px-4 rounded-lg">
                        Profile
                    </p>
                </Link>}
                {user && <Link href='/cart'>
                    <p className=" hover:bg-purple-600 transition duration-1000 text-white py-2 px-4 rounded-lg">
                        Cart
                    </p>
                </Link>}
                {user && <button onClick={() => auth.signOut()} className='mx-auto py-2 px-4 items-center justify-center flex  hover:bg-purple-600   text-white rounded-lg shadow-lg transition duration-1000 ease-out'>Sign Out</button>}

            </div>

        </div>

    );
};

export default Header;
