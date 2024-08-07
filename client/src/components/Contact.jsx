import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {

  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("")

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data)
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchLandlord();
  }, [listing.userRef])

  const onChange = (e) => {
    setMessage(e.target.value);
  }

  return (
    <>

      {landlord && (
        <div className='flex flex-col gap-2'>
          <p>Fale com <span className='font-semibold'>{landlord.userName}</span> sobre <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
          <textarea name="message" id="message" rows="3" value={message} onChange={onChange} placeholder='Escreva sua mensagem aqui...' className='w-full border p-3 rounded-lg'></textarea>
          <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className='bg-slate-700 text-white text-center p-3 rounded-lg uppercase hover:opacity-90'>
            Enviar mensagem
          </Link>
        </div>
      )}

    </>
  )
}
