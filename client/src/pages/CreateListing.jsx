import { useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'


export default function CreateListing() {

  const { currentUser } = useSelector(state => state.user)

  const navigate = useNavigate();

  const [files, setFiles] = useState([]);

  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'sell',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountedPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(formData)

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false)
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
        setImageUploadError(false);
        setUploading(false);
      }).catch((err) => {
        setImageUploadError('Image upload failed (2mb max per image)!');
        setUploading(false);
      });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`)
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          })
        }
      )
    })
  }

  const handleDeleteImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index)
    })
  };

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id
      })
    }

    if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked
      })
    }

    if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) return setError('You must uploat at least one image')
      if (+formData.regularPrice < +formData.discountedPrice) return setError('Discounted price must be lower than regular price')
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message)
      }
      navigate(`/listing/${data._id}`)
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Crie um Anúncio</h1>
      <form onSubmit={handleSubmit} className='flex flex-col md:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input type="text" placeholder='Título' className='border p-3 rounded-lg outline-none' id='name' maxLength='62' minLength='10' required onChange={handleChange} value={formData.name} />
          <textarea type="text" placeholder='Descrição' className='border p-3 rounded-lg outline-none' id='description' required onChange={handleChange} value={formData.description} />
          <input type="text" placeholder='Endereço' className='border p-3 rounded-lg outline-none' id='address' required onChange={handleChange} value={formData.address} />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input type="checkbox" id="sale" className='w-5 outline-none' onChange={handleChange} checked={formData.type === "sale"} />
              <span>Venda</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" id="rent" className='w-5 outline-none' onChange={handleChange} checked={formData.type === "rent"} />
              <span>Aluguel</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" id="parking" className='w-5 outline-none' onChange={handleChange} checked={formData.parking} />
              <span>Garagem</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" id="furnished" className='w-5 outline-none' onChange={handleChange} checked={formData.furnished} />
              <span>Mobília</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" id="offer" className='w-5 outline-none' onChange={handleChange} checked={formData.offer} />
              <span>Oferta</span>
            </div>
          </div>
          <div className='flex gap-6 flex-wrap'>
            <div className="flex items-center gap-2">
              <input type="number" id="bedrooms" min='1' max='10' required className='p-3 border border-gray-300 rounded-lg w-16 outline-none' onChange={handleChange} value={formData.bedrooms} />
              <span>Quartos</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" id="bathrooms" min='1' max='10' required className='p-3 border border-gray-300 rounded-lg w-16 outline-none' onChange={handleChange} value={formData.bathrooms} />
              <span>Banheiros</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" id="regularPrice" min='50' max='10000000' required className='p-3 border border-gray-300 rounded-lg w-16 outline-none' onChange={handleChange} value={formData.regularPrice} />
              <div className="flex flex-col">
                <span>Preço Normal</span>
                <span className={`${formData.type === "rent" ? "text-sm text-center" : "hidden"}`}>($ / Mês)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input type="number" id="discountedPrice" min='0' max='10000000' required className='p-3 border border-gray-300 rounded-lg w-16 outline-none' onChange={handleChange} value={formData.discountedPrice} />
                <div className="flex flex-col">
                  <span>Preço com Oferta</span>
                  <span className={`${formData.type === "rent" ? "text-sm text-center" : "hidden"}`}>($ / Mês)</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <span className='font-semibold'>Fotos:
            <span className='font-normal text-gray-600 ml-2'>A primeira foto será a capa (max: 6)</span>
          </span>
          <div className='flex gap-4'>
            <input onChange={(e) => setFiles(e.target.files)} className="p-3 border border-gray-300 rounded w-full" type="file" id="images" accept='images/*' multiple />
            <button disabled={uploading} type="button" onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>
              {uploading ? 'Enviando' : 'Enviar'}
            </button>
          </div>
          <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>
          {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
            <div className="flex justify-between p-3 border rounded-lg items-center" key={index}>
              <img src={url} alt="listing image" className="w-20 object-contain rounded-lg" />
              <button onClick={() => handleDeleteImage(index)} type="button" className="p-3 text-red-700 uppercase rounded-lg hover:opacity-70">Excluir</button>
            </div>
          ))}
          <button disabled={loading || uploading} className='p-3 bg-slate-700 text-white uppercase rounded-lg hover:opacity-90 disabled:opacity-80'>
            {loading ? 'Creating...' : 'Create Listing'}
          </button>
          {error && <p className="text-sm text-red-700">{error}</p>}
        </div>
      </form>
    </main>
  )
}
