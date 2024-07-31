import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ListingCard from '../components/ListingCard';

export default function Search() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);

    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc'
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortFromUrl || orderFromUrl) {
            setSidebarData({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            })
        }

        const fetchListings = async () => {
            setLoading(true);
            setShowMore(false);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            if (data.length > 8) {
                setShowMore(true);
            }else{
                setShowMore(false)
            }
            setListings(data);
            setLoading(false);
        }
        fetchListings();

    }, [location.search])

    const handleChange = (e) => {
        if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setSidebarData({ ...sidebarData, type: e.target.id })
        }
        if (e.target.id === 'searchTerm') {
            setSidebarData({ ...sidebarData, searchTerm: e.target.value })
        }
        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setSidebarData({ ...sidebarData, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false })
        }
        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebarData({ ...sidebarData, sort, order });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('type', sidebarData.type);
        urlParams.set('parking', sidebarData.parking);
        urlParams.set('furnished', sidebarData.furnished);
        urlParams.set('offer', sidebarData.offer);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('order', sidebarData.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    const onShowMoreClick = async () => {
        const numberOfListings = listings.length;
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if(data.length < 9){
            setShowMore(false);
        }
        setListings([...listings, ...data]);
    }

    return (
        <div className='flex flex-col md:flex-row'>
            <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Termo de busca:</label>
                        <input
                            type="text"
                            id="searchTerm"
                            placeholder='Buscar...'
                            className='border rounded-lg p-3 w-full'
                            value={sidebarData.searchTerm}
                            onChange={handleChange} />
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Tipo:</label>
                        <div className='flex gap-2'>
                            <input
                                type="checkbox"
                                id="all"
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebarData.type === 'all'} />
                            <span>Aluguel e Venda</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type="checkbox"
                                id="rent"
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebarData.type === 'rent'} />
                            <span>Aluguel</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type="checkbox"
                                id="sale"
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebarData.type === 'sale'} />
                            <span>Venda</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type="checkbox"
                                id="offer"
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebarData.offer} />
                            <span>Oferta</span>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Amenities:</label>
                        <div className='flex gap-2'>
                            <input
                                type="checkbox"
                                id="parking"
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebarData.parking} />
                            <span>Garagem</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type="checkbox"
                                id="furnished"
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebarData.furnished} />
                            <span>Mobiliado</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort:</label>
                        <select
                            id="sort_order"
                            className='outline-none border rounded-lg p-3 select-none'
                            onChange={handleChange}
                            defaultValue={'created_at_desc'}>
                            <option value='regularPrice_desc'>Preço maior para menor</option>
                            <option value='regularPrice_asc'>Preço menor para maior</option>
                            <option value='createdAt_desc'>Mais recentes</option>
                            <option value='createdAt_asc'>Mais antigos</option>
                        </select>
                    </div>
                    <button className='bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-90'>Buscar</button>
                </form>
            </div>
            <div className=" w-full">
                <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Imóveis Encontrados:</h1>
                <div className='p-8'>
                    {!loading && listings.length === 0 && (
                        <p className='text-xl text-slate-700'>
                            Nenhum resultado encontrado!
                        </p>
                    )}
                    {loading && (
                        <p className='text-xl text-slate-700 text-center'>Carregando...</p>
                    )}
                    <div className='flex flex-wrap  gap-6 2xl:gap-20'>
                        {!loading && listings && listings.map((listing, index) => (
                            <ListingCard key={index} listing={listing} />
                        ))}
                    </div>
                    {showMore && (
                        <button onClick={onShowMoreClick}
                            className='text-green-700 hover:underline p-7 w-full text-center'
                        >
                            Mostrar mais
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
