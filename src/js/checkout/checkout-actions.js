export const SPOT_CHECKOUT_SUCCESS = 'SPOT_CHECKOUT_SUCCESS';

export const checkoutSuccess = checkout => {
    return {
        type: SPOT_CHECKOUT_SUCCESS,
        payload: checkout
    };
};
