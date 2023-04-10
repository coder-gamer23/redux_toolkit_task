
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cartActions } from "./redux_store";
import './page.css';
import {  useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Api from "./api_service";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ListProductsPage = () => {
    const [productList, setproductList] = useState([]);
    const { ProductsaddToCart } = useSelector(state => state.cart);
    const { addedFavoriteList } = useSelector(state => state.cart);
    const { totalCount } = useSelector(state => state.cart);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        Api.get('/products')
            .then((res) => {
                setproductList(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    const handleaddtoCart = (productItem) => {
        const isAlreadyExist = ProductsaddToCart.some((prod) => {
            return prod.id == productItem.id
        });
        if (isAlreadyExist) {
            dispatch(cartActions.addexistProductToCart(productItem.id));
        } else {
            dispatch(cartActions.addProductToCart(productItem));
        }
    }
    const handleAddtoFavorite = (item) => {
        dispatch(cartActions.addfavList(item));
    }
    const handleRemovefromFavorite = (item) => {
        dispatch(cartActions.removefavList(item));
    }

    return (
        <div className="productContainer">
            <h1 className="ProductText">Available Products</h1>
            <div><Button onClick={()=>{navigate('/myfavorites')}} variant="contained" sx={{backgroundColor:'yellow',color:'black'}}>Go to My Favorites</Button></div>
            <br />
            <section style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
               {
                    productList.map((item, index) => {
                        return (<>
                            <div key={item.id} style={{ border: '1px solid #cdcdcd', margin: 1, textAlign: 'center', padding: 10, width:'40%' }}>
                                <h3 style={{ color: 'whitesmoke' }}>{item.product}</h3>
                                <p style={{ color: 'whitesmoke' }}>{item.description}</p>
                                <img className="productImage" style={{ height: '200px', width: '200px' }} src={item.image} alt={item.title} />
                                <p style={{ color: 'whitesmoke' }}>₹ {item.price}</p>
                                <button disabled={totalCount >= 100} onClick={() => handleaddtoCart(item)}><ShoppingCartIcon /></button>
                                {addedFavoriteList.find(element => element.id == item.id) ? <button onClick={() => handleRemovefromFavorite(item.id)}><FavoriteIcon sx={{color:'red'}}/></button> : <button onClick={() => handleAddtoFavorite(item)}><FavoriteBorderIcon /></button>}
                            </div><div style={{ marginRight: '7%' }}></div>
                        </>
                        )
                    })
                }
            </section>
        </div>
    )
}

export default ListProductsPage;

















