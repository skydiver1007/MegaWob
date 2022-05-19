import api from "../../configs/api";

export const claim = (params: any) => {
    return async (dispatch: any) => {
        const response = await api.post("/furrsol/claim", {
            params
        }).then(response => {
            const result = response.data
            if (result.success === true) {
                dispatch({
                    type: 'CLAIM_FLUFF',
                    fluff: result.data.fluff
                })
            }
        });
        return response;
    }
}

export const fetchWallet = (params: any) => {
    return async (dispatch: any) => {
        const response = await api.post("/wallet/fetchWallet", {
            params
        }).then(response => {
            const result = response.data
            if (result.success === true) {
                dispatch({
                    type: 'FETCH_WALLET',
                    wallet: result.data
                })
            }
        });
        return response;
    }
}

export const getFurrsols = () => {
    return async (dispatch: any) => {

        return
    }
}

