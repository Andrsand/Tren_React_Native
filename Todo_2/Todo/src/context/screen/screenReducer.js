import { CHANGE_SCREEN } from '../types'

const hadlers = {
    [CHANGE_SCREEN]: (state, payload) => payload,
    DEFAULT: state => state
}

export const screenReducer = (state, action) => {
    const handler = hadlers[action.type] || handlers.DEFAULT
    return handler(state, action.payload)
}