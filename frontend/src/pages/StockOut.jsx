import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    getAllStockOutItems,
    getAllMedItems,
    getAllUtilityItems,
    reset,
} from '../features/stock/stockSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import StockOutItem from '../components/StockOutItem'
import Pagination from '@mui/material/Pagination'
import { toast } from 'react-toastify'

function StockOut() {
    //Access the global state in the app store
    //isSuccess is used to cause a page refresh
    //that allows a stock item's updated inStock value to
    //reflect on the UI upon update
    const { stockItems, count, isSuccess, isLoading, isError, message } =
        useSelector((state) => state.stock)

    //Create local state for the pagination component to use
    const [pageNumber, setPageNumber] = useState(1)
    //Manage the select input value effects
    const [filterValue, setFilterValue] = useState('All')

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(reset())
        }
    }, [dispatch])

    useEffect(() => {
        //Call the correct functions depending on the
        //value in the filter select input
        //This ensures that the same function is
        //called even if the page number changes
        //in the Pagination component.
        if (filterValue === 'All') {
            dispatch(getAllStockOutItems(pageNumber))
            // dispatch(reset())
        }

        if (filterValue === 'Medication') {
            // dispatch(reset())
            dispatch(getAllMedItems(pageNumber))
        }

        if (filterValue === 'Utility') {
            dispatch(getAllUtilityItems(pageNumber))
        }

        if (isSuccess) {
            dispatch(reset())
        }

        if (isError) {
            toast.error(message)
        }
    }, [pageNumber, filterValue, isSuccess, isError, message, dispatch])

    function onChange(e) {
        setFilterValue(e.target.value)
        if (pageNumber !== 1) {
            setPageNumber(1)
        }
        // console.log(filterValue)
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
                <h1>Stock Out</h1>
                <div className='stockItemHeadings'>
                    <div>Name</div>
                    <div>Expiry Date</div>
                    <div>In Stock</div>
                    <div>Quantity</div>
                    <div></div>
                </div>
                {stockItems.map((stockItem) => (
                    <StockOutItem
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
                onChange={(e, value) => setPageNumber(value)}
            />
        </>
    )
}

export default StockOut
