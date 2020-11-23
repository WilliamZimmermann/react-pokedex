const initialState = {
    pokemons: [],
    next: '',
    previous: '',
    count: 0,
}

export default function(state = initialState, action) {
    return { ... state};
}