import api from "../../../configs/api";

export const buyMart = (params: any) => {
    return async (dispatch: any) => {
        const response = await api.post("/wallet/buyMart", {
            params
        }).then(response => {
            const result = response.data
            if (result.success === true) {
                dispatch({
                    type: 'BUY_MART',
                })
                dispatch({
                    type: 'FETCH_WALLET',
                    wallet: result.data
                })
            }
        });
        return response;
    }
}
