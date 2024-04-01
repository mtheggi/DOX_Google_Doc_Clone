import axios from 'axios'

export const putRequest = async (url, body) => {
    try {
        const response = await axios.put(url, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;

    } catch (error) {
        return error.response;
    }
}

export const postRequest = async (url, body) => {
    try {
        const response = await axios.post(url, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;

    } catch (error) {
        return error.response;
    }
}

export const patchRequest = async (url, body) => {
    try {
        const response = await axios.patch(url, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;

    } catch (error) {
        return error.response;
    }
}
export const getRequest = async (url) => {
    try {
        const response = await axios.get(url);
        return response;

    } catch (error) {
        return error.response;
    }
}

export const deleteRequest = async (url) => {
    try {
        const response = await axios.delete(url);

        return response;

    } catch (error) {
        return error.response;
    }

}