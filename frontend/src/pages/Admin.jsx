import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createStockItem, reset } from '../features/stock/stockSlice'
import { useAdminStatus } from '../hooks/useAdminStatus'
import Modal from 'react-modal'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

const customStyles = {
    content: {
        width: '85%',
        height: '73%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
    },
}

//Set the Modal to originate from index.html/index.js
//i.e. the root element that contains this app
Modal.setAppElement('#root')

function Admin() {
    //Global state
    const { isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.stock
    )

    //Check if a user is admin or not
    const { isAdministrator } = useAdminStatus()

    //Set the initial state of the Modal
    //Set local state for collecting the form data
    //Set the initial state of the date picker
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        inStock: 0,
        itemType: 'Medication',
    })
    const [expDate, setExpDate] = useState()

    const { name, inStock, itemType } = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            toast.success('Item created successfully.')
            // dispatch(reset())
            // navigate('/')
        }

        dispatch(reset())
    }, [isError, message, isSuccess, dispatch])

    //Open the modal
    function openModal() {
        setIsModalOpen(true)
    }

    //Close the modal
    function closeModal() {
        setIsModalOpen(false)
    }

    function onChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    function onSubmit(e) {
        e.preventDefault()
        closeModal()

        const stockItemData = {
            name,
            inStock,
            expDate,
            itemType,
        }

        console.log(`${expDate}Z`.toString())
        dispatch(createStockItem(stockItemData))

        //Reset the values in the modal input fields
        setExpDate()
        setFormData({ name: '', inStock: 0, itemType: 'Medication' })
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <main>
                <div className='capsule'>
                    <p className='heading'>What would you like to do?</p>
                    <button
                        type='button'
                        className='btn'
                        onClick={() => navigate('/stockitems/stockout')}
                    >
                        Stock Out
                    </button>
                    <button
                        type='button'
                        className='btn'
                        disabled={isAdministrator ? false : true}
                        onClick={openModal}
                    >
                        Stock In
                    </button>

                    {/* View stock items button to navigate to /stockitems page */}
                    <button
                        // className={`btn btn-sm ${
                        //     !isAdministrator && 'not-visible'
                        // }`} //Attempt to make it impossible for a non-admin to view the item
                        //No need as the backend handles it & the edit & del buttons are disabled
                        className='btn btn-sm'
                        onClick={() => navigate('/stockitems')}
                    >
                        View Stock Items
                    </button>

                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel='Add Stock Item'
                        // className={'modal'}
                    >
                        <h3>Add Stock Item</h3>
                        <button
                            type='button'
                            className='btn-close'
                            onClick={closeModal}
                        >
                            X
                        </button>
                        <form onSubmit={onSubmit}>
                            <div className='form-group'>
                                <label htmlFor='name'>Item Name</label>
                                <input
                                    type='text'
                                    name='name'
                                    id='name'
                                    value={name}
                                    placeholder='Item Name'
                                    onChange={onChange}
                                    required
                                />
                                <label htmlFor='inStock'>Stock Amount</label>
                                <input
                                    type='number'
                                    name='inStock'
                                    id='inStock'
                                    min={1}
                                    value={inStock}
                                    placeholder='Number in stock'
                                    onChange={onChange}
                                    required
                                />
                                <label htmlFor='expDate'>Expiry Date</label>
                                <DatePicker
                                    id='expDate'
                                    value={expDate}
                                    onChange={setExpDate}
                                    required
                                    calendarClassName={'calendarDiv'}
                                    format='y-M'
                                    view='year'
                                    maxDetail='year'
                                    minDate={new Date()}
                                    yearPlaceholder='yyyy'
                                    monthPlaceholder='mm'
                                    className={'date-picker'}
                                />
                                <label htmlFor='itemType'>Item Type</label>
                                <select
                                    name='itemType'
                                    id='itemType'
                                    value={itemType}
                                    onChange={onChange}
                                >
                                    <option value='Medication'>
                                        Medication
                                    </option>
                                    <option value='Utility'>Utility</option>
                                </select>
                                {/* <input
                                    // type='date'
                                    name='expDate'
                                    id='expDate'
                                    value={expDate}
                                    placeholder='Expiry date'
                                    onChange={onChange}
                                /> */}
                            </div>
                            <div className='form-group'>
                                <button
                                    className='btn'
                                    type='submit'
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </Modal>
                </div>
            </main>
        </>
    )
}

export default Admin
