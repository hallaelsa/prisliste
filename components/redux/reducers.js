function initState() {
    return {
        items: [
            {
                item: "Melkesjokolade", itemInfo: [
                    { storeName: "Rema", price: "30", date: "10.03.2018" },
                    { storeName: "Kiwi", price: "25", date: "10.12.2017" },
                    { storeName: "Joker", price: "33", date: "10.12.2016" },
                ]
            },
            {
                item: "Vasa knekkebrod", itemInfo: [
                    { storeName: "Joker", price: "10", date: "10.03.2018" },
                    { storeName: "Kiwi", price: "12", date: "10.12.2017" },
                ]
            },
            {
                item: "Salmalaks", itemInfo: [
                    { storeName: "Joker", price: "100", date: "10.03.2018" },
                    { storeName: "Kiwi", price: "120", date: "10.12.2017" },
                ]
            },
        ]
    };
}

function reducer(state = initState(), action) {
    switch (action.type) {
        case "ADD_ITEM": {
            let nextState = Object.assign({}, state)
            nextState.items.push(action.item);
            return nextState;
        }
        case "DELETE_ITEM": {
            let nextState = Object.assign({}, state)
            nextState.items.splice(action.index, 1);
            return nextState;
        }
        default:
            return state;
    }
}

export default reducer;