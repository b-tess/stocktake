import { Link } from 'react-router-dom'

function StockItem({ stockItem }) {
    // format the expiry date as month/year
    let expiryDate = new Date(stockItem.expDate)
    const month = expiryDate.getMonth() + 1
    const year = expiryDate.getFullYear()
    return (
        <div className='stock-item'>
            <div>{stockItem.name}</div>
            <div>{stockItem.inStock}</div>
            <div>{`${month}/${year}`}</div>
            <div>{stockItem.itemType}</div>
            <Link
                to={`/stockitem/${stockItem._id}`}
                className='btn btn-sm'
            >
                View
            </Link>
        </div>
    )
}

export default StockItem
