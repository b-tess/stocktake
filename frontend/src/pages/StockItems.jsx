import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    getAllStockItems,
    getAllMedItems,
    getAllUtilityItems,
    reset,
} from '../features/stock/stockSlice'
import Spinner from '../components/Spinner'
import StockItem from '../components/StockItem'
import BackButton from '../components/BackButton'
import { toast } from 'react-toastify'
import Pagination from '@mui/material/Pagination'

function StockItems() {
    //Access the global state
    const { stockItems, count, isLoading, isError, message } = useSelector(
        (state) => state.stock
    )

    //Manage the state of the page to load
    //and the initial state of the select input
    const [pageNumber, setPageNumber] = useState(1)
    const [filterValue, setFilterValue] = useState('All')

    const dispatch = useDispatch()

    //Fetch the stock items depending on the filter value
    useEffect(() => {
        if (filterValue === 'All') {
            dispatch(getAllStockItems(pageNumber))
        }

        if (filterValue === 'Medication') {
            dispatch(getAllMedItems(pageNumber))
        }

        if (filterValue === 'Utility') {
            dispatch(getAllUtilityItems(pageNumber))
        }

        if (isError) {
            toast.error(message)
        }
    }, [isError, message, pageNumber, filterValue, dispatch])

    //Handle any potential errors and info
    // useEffect(() => {
    //     if (isSuccess && stockItems.length === 0) {
    //         toast.info('No items in stock.')
    //     }
    //     if (isError) {
    //         toast.error(message)
    //     }
    //     // dispatch(reset())
    // }, [isSuccess, stockItems.length, isError, message])

    //Reset the state on unmount -
    //Not sure why this is needed yet
    useEffect(() => {
        return () => {
            dispatch(reset())
        }
    }, [dispatch])

    //Function to load correct page items
    function onPageLoad(e, value) {
        setPageNumber(value)
    }

    //Reset the page number to 1 before a new query function is called
    function onChange(e) {
        setFilterValue(e.target.value)
        if (pageNumber !== 1) {
            setPageNumber(1)
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className='after-the-header-container'>
                <BackButton url={'/adminspace'} />
                <div className='filter-div'>
                    <label htmlFor='filter'>Filter by:</label>
                    <select
                        name='filter'
                        id='filter'
                        onChange={onChange}
                    >
                        <option value='select'>--Select--</option>
                        <option value='All'>All</option>
                        <option value='Medication'>Medication</option>
                        <option value='Utility'>Utilities</option>
                    </select>
                </div>
            </div>
            <div className='stock-items-container'>
                <h1>Stock Items</h1>
                <div className='stockItemHeadings'>
                    <div>Name</div>
                    <div>In Stock</div>
                    <div>Expiry Date</div>
                    <div>Item Type</div>
                    <div></div>
                </div>
                {stockItems.map((stockItem) => (
                    <StockItem
                        key={stockItem._id}
                        stockItem={stockItem}
                    />
                ))}
            </div>
            <Pagination
                count={count}
                page={pageNumber}
                siblingCount={0}
                variant='outlined'
                onChange={onPageLoad}
            />
        </>
    )
}

export default StockItems
