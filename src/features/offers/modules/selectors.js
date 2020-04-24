const offersState = state => state.offers

export const offerById = id => state => offersState(state).offers.find(offer => offer.id === id)
