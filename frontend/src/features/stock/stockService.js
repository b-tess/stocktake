import axios from 'axios'

// const MEDICATION_URL = '/api/medication'
const STOCKITEMS_URL = '/api/stockitems'
const STOCKITEM_URL = '/api/stockitem'

//Create a new stock item as long as user is logged in & an admin
async function createStockItem(stockData, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(STOCKITEMS_URL, stockData, config)

    return response.data
}

//Get all stock items, regardless of the item type,
//as long as user is logged in
async function getAllStockItems(pageNumber, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(
        STOCKITEMS_URL + `?page=${pageNumber}`,
        config
    )
    // console.log(response.data)

    return response.data
}

//Get all stock items, regardless of the item type,
//for stock out purposes as long as user is logged in
async function getAllStockOutItems(pageNumber, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(
        STOCKITEMS_URL + `/stockout?page=${pageNumber}`,
        config
    )

    console.log('All stock items fetched.')
    return response.data
}

//Get all medication stock items,
//for stock out purposes as long as user is logged in
async function getAllMedItems(pageNumber, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(
        STOCKITEMS_URL + `/medication?page=${pageNumber}`,
        config
    )

    console.log('Med items fetched.')
    return response.data
}

//Get all utility stock items,
//for stock out purposes as long as user is logged in
async function getAllUtilityItems(pageNumber, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(
        STOCKITEMS_URL + `/utilities?page=${pageNumber}`,
        config
    )

    console.log('Utility items fetched.')
    return response.data
}

//Get one stock item, regardless of the item type,
//as long as user is logged in and is an admin.
async function getOneStockItem(stockItemId, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(STOCKITEM_URL + `/${stockItemId}`, config)

    return response.data
}

//Update one stock item, regardless of the item type
//Access: user is logged in and is an admin
//Admin can add to inStock amount
//Admin can change the expiry date
async function updateStockItem(stockItemId, updateData, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(
        STOCKITEM_URL + `/${stockItemId}`,
        updateData,
        config
    )

    return response.data
}

//Update one stock item, regardless of the item type
//Access: user is logged in
//User can consume from inStock amount
async function updOnStockOut(requestBody, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(
        STOCKITEMS_URL + '/stockout',
        requestBody,
        config
    )

    return response.data
}

async function deleteStockItem(stockItemId, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(
        STOCKITEM_URL + `/${stockItemId}`,
        config
    )

    return response.data
}

const stockService = {
    createStockItem,
    getAllStockItems,
    getAllStockOutItems,
    getOneStockItem,
    getAllMedItems,
    getAllUtilityItems,
    updateStockItem,
    updOnStockOut,
    deleteStockItem,
}

export default stockService
