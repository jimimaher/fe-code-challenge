import { SPOT_CHECKOUT_SUCCESS } from './checkout-actions';

const initialState = {
    selected: null
};

export default function spot(state = initialState, { type, payload: checkout }) {
    switch (type) {
        case SPOT_CHECKOUT_SUCCESS: {
            return {
                ...state,
                ...checkout || null
            };
        }

        default:
            return state;
    }
}
