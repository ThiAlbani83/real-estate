import { useSelector } from 'react-redux'

export default function Profile() {
  const { currentUser } = useSelector(state => state.user)

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
        <input type="text" id='userName' placeholder='username' className='rounded-lg border p-3' />
        <input type="email" id='email' placeholder={currentUser.email} className='rounded-lg border p-3' />
        <input type="password" id='´password' placeholder='password' className='rounded-lg border p-3' />
        <button className='uppercase bg-slate-700 text-white rounded-lg p-3 hover:opacity-90 disabled:opacity-70'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
