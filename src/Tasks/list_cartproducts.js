import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './page.css';
import { cartActions } from "./redux_store";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Api from "./api_service";


const ListAddedtoCartPage = () => {
    const dispatch = useDispatch();
    const { products, totalCount } = useSelector(storeObj => {
        return {
            products: storeObj.cart?.ProductsaddToCart,
            totalCount: storeObj.cart?.productsTotalCount
        }
    })

    const handleCompletelyRemoveFromCart = (count, index) => {
        dispatch(cartActions.removeProductFromCart({ count: count, index }));
    }
    const handleManyProducts = (e, index) => {
        const count = e.target.value
        dispatch(cartActions.addBulkProductToCart({ count: parseInt(count), index }))
    }
    const handleIncreaseFromCart = (item) => {
        dispatch(cartActions.addexistProductToCart(item.id));
    }

    const handleDecreaseFromCart = (item) => {
        dispatch(cartActions.removeexistProductfromCart(item.id))
    }
    const handleReset = () => {
        dispatch(cartActions.clearFullCart())
    }

    const handleFinishShop = () => {
        var currentdate = new Date();
        const checkOutProduct = [{ 'TOTAL PRODUCT': totalCount, 'CheckOut Date&Time': currentdate }, ...products]
        Api.post('/checkOut', checkOutProduct)
            .then((res) => {
                alert('Successfully Products Received Order. Products will reach you soon... Happy Shopping....')
                dispatch(cartActions.clearFullCart());
            }).catch((err) => console.log('Error from api', err))
    }

    return (
        <div className="shopContainer">
            <h1 className="cartPagetext">Happy to Shop VKS Products</h1>
            <h2>Total Cart Items: {totalCount}</h2>
            <section style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', borderBottom: '1px solid #cdcdcd', textAlign: 'center', padding: 10 }}>
                    <span>S.No</span>
                    <span>Image</span>
                    <span>Title</span>
                    <span>Price</span>
                    <span>Count</span>
                    <span>Action</span>
                </div>
                {
                    products?.map((item, index) => {
                        return (
                            <div key={`item-${index}-${item.id}`} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', borderBottom: '1px solid #cdcdcd', textAlign: 'center', padding: 10 }}>
                                <span>{index + 1}</span>
                                <img src={item.image} alt={item.title} height={40} width='50px' />
                                <span style={{ width: 'auto' }}> <h4 style={{ width: 'auto' }}>{item.product}</h4></span>
                                <span style={{ width: 'auto' }}><p>₹ {item.price}</p></span>
                                <span styles={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <button className="decreaseButton" disabled={item.count == 1} onClick={() => handleDecreaseFromCart(item)} style={{ padding: 4, fontSize: 20 }}>-</button>
                                    <span>
                                        <input type="text" onChange={(e) => handleManyProducts(e, item.id)} value={item.count || 1} style={{ padding: 8, width: 30, borderRadius: '4px', textAlign: 'center' }} />
                                    </span>
                                    <button className="addButton" disabled={totalCount >= 100 ? 'true' : false} onClick={() => handleIncreaseFromCart(item)} style={{ padding: 4, fontSize: 20 }}>+</button>
                                </span>
                                <button onClick={() => handleCompletelyRemoveFromCart(item.count, index)}><DeleteIcon /></button>
                            </div>

                        )
                    })
                }
                {
                    products.length > 0 ?
                        <div className="checkOutButtonsDIV">
                            <Button onClick={handleFinishShop} variant="contained" color="success">Check Out</Button>
                            <Button onClick={handleReset} variant="outlined" sx={{marginLeft:'3px',color:'black'}} startIcon={<DeleteIcon color="error" />}>
                                Delete
                            </Button>
                        </div> : <h3>Nothing in cart</h3>}
            </section>
        </div>
    )
}

export default ListAddedtoCartPage;




