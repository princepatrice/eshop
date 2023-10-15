export const loginRequest = (data,callback) => {
    const url = process.env.REACT_APP_API_URL + "auth/login"
    const requestParam = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    fetchData(url, requestParam, callback)
}

export const registerRequest = (data,callback) => {
    const url = process.env.REACT_APP_API_URL + "auth/register"
    const requestParam = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    fetchData(url, requestParam, callback)
}

export const updateMyInformation = (callback,data,token) => {
    const url = process.env.REACT_APP_API_URL + "auth/user/update"
    const requestParam = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        },
        body: JSON.stringify(data),
    }
    fetchData(url, requestParam, callback)
}


export const purchaseProduct = (callback,data,token) => {
    const url = process.env.REACT_APP_API_URL + "auth/my/purchase"
    const requestParam = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        },
        body: JSON.stringify(data),
    }
    fetchData(url, requestParam, callback)
}


export const getUserListRequest = (callback, token, page=1, search="") => {
    const url = process.env.REACT_APP_API_URL + "users?page="+page+"&search="+search
    const requestParam = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        }
    }
    fetchData(url, requestParam, callback)
}

export const getProductsListRequest = (callback, page=1, search="") => {
    const url = process.env.REACT_APP_API_URL + "items?page="+page+"&search="+search
    const requestParam = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetchData(url, requestParam, callback)
}


export const getProductInfo = (callback, id) => {
    const url = process.env.REACT_APP_API_URL + "items/"+id
    const requestParam = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetchData(url, requestParam, callback)
}

export const getPurchaseListRequest = (callback, token, userId, page=1, search="") => {
    const url = process.env.REACT_APP_API_URL + "users/"+userId+"/purchase-history?page="+page+"&search="+search
    const requestParam = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        }
    }
    fetchData(url, requestParam, callback)
}
export const getMyPurchaseListRequest = (callback, token, page=1, search="") => {
    const url = process.env.REACT_APP_API_URL + "auth/my/purchase-history?page="+page+"&search="+search
    const requestParam = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        }
    }
    fetchData(url, requestParam, callback)
}

export const getMyPurchaseListByLotRequest = (callback, token, page=1, search="") => {
    const url = process.env.REACT_APP_API_URL + "auth/my/purchase-history-lot?page="+page+"&search="+search
    const requestParam = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        }
    }
    fetchData(url, requestParam, callback)
}



export const getUserInfo = (callback,token, id) => {
    const url = process.env.REACT_APP_API_URL + "users/"+id
    const requestParam = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token

        }
    }
    fetchData(url, requestParam, callback)
}


function fetchData(url, params, callback) {
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the response as JSON
        })
        .then((data) => {
            callback({ status: true, data: data }); // Process the data
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
            callback({ status: false, data: null });
        });
}