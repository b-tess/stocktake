import { Link } from 'react-router-dom'

function StockItem({ stockItem }) {
    // const { page } = useParams()
    return (
        <div className='stock-item'>
            <div>{stockItem.name}</div>
            <div>{stockItem.inStock}</div>
            <div>
                {new Date(stockItem.expDate).toLocaleString().slice(3, 10)}
            </div>
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
