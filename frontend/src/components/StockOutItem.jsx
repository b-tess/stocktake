import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updOnStockOut, reset } from '../features/stock/stockSlice'
import Spinner from './Spinner'
import Modal from 'react-modal'
import { GoAlert } from 'react-icons/go'

const customStyles = {
    content: {
        width: '85%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
        backgroundColor: '#ffdd76',
    },
}

Modal.setAppElement('#root')

function StockOutItem({ stockItem }) {
    const { isLoading, isError, message } = useSelector((state) => state.stock)

    //Manage the state of the quantity input & modal locally.
    //The modal is for giving a user a warning about trying
    //to consume more than is in stock.
    const [quantity, setQuantity] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            // toast.error(message)
            dispatch(reset())
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, message, dispatch])

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    const requestBody = {
        id: stockItem._id,
        count: quantity,
    }

    function onStockOut() {
        if (quantity > stockItem.inStock) {
            openModal()
        } else {
            dispatch(updOnStockOut(requestBody))
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className='stock-item'>
                <div>{stockItem.name}</div>
                <div>
                    {new Date(stockItem.expDate).toLocaleString().slice(3, 10)}
                </div>
                <div>{stockItem.inStock}</div>
                <div className='form-group'>
                    <label htmlFor='quantity'>Quantity</label>
                    <input
                        type='number'
                        name='quantity'
                        id='quantity'
                        value={quantity}
                        min={0}
                        max={stockItem.inStock}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <button
                    type='button'
                    className='btn btn-sm btn-stock-out-item'
                    onClick={onStockOut}
                    disabled={stockItem.inStock === 0 ? true : false}
                >
                    Stock Out
                </button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel='Excess stock consumption warning'
            >
                <h3>
                    <GoAlert /> Warning <GoAlert />
                </h3>
                <button
                    className='btn-close'
                    onClick={closeModal}
                >
                    X
                </button>
                <p>Your quantity should be less than the amount in stock.</p>
            </Modal>
        </>
    )
}

export default StockOutItem
