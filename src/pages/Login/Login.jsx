import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContextAPI } from '../../context/AppContext'

export default function Login() {
    const { loginUser } = useContext(AppContextAPI);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await loginUser({ email, password });
        if (result.success) {
            alert("Login successful!");
            setEmail("");
            setPassword("");
            navigate('/admission-home');
        } else {
            alert("Login failed: " + result.error);
        }
    };
  return (
    <div className='flex items-center justify-center h-screen'>
<div className="w-full max-w-sm bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs">
    <form>
        <h5 className="text-xl font-semibold text-heading mb-6">Sign in</h5>
        <div className="mb-4">
            <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Your email</label>
            <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Enter email" required />
        </div>
        <div className='mb-4'>
            <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">Your password</label>
            <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Enter password" required />
        </div>
        <button type="submit" onClick={handleSubmit} className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none w-full mb-3">Login to your account</button>
    </form>
</div>

    </div>
  )
}
