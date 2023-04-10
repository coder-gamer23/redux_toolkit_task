import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cartActions } from "./redux_store";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

const Favorites = () => {
    const { addedFavoriteList } = useSelector(state => state.cart);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleRemoveFavorite = (item) => {
        dispatch(cartActions.removefavList(item))

    }
    return (
        <div style={{ width: '100%' }}>
            <h1>List of Favorite Products</h1>
            <section style={{
                display: 'flex',
                flexDirection: 'row',
            }}>
                {
                    addedFavoriteList?.map((item, index) => {
                        return (<>
                            <div key={item.id} style={{ border: '1px solid #cdcdcd', margin: 2, textAlign: 'center', padding: 10 }}>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <img className="productImage" style={{ height: '200px', width: '200px' }} src={item.image} alt={item.title} />
                                <p>₹ {item.price}</p>
                                <button onClick={() => handleRemoveFavorite(item.id)}>Remove from Favorite</button>
                            </div><div style={{ marginRight: '3%' }}></div>
                        </>
                        )
                    })
                }
            </section>
            <div><Button onClick={()=>{navigate('/purchasing')}} variant="contained">Go to Shopping Page</Button></div>

        </div>
    )
}

export default Favorites;


