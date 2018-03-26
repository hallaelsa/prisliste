function initState() {
	return {
		search: [],
		items: [
			{
				item: "Melkesjokolade", itemInfo: [
					{ storeName: "Rema", price: "30", date: "10.03.2018" },
					{ storeName: "Kiwi", price: "25", date: "10.12.2017" },
					{ storeName: "Joker", price: "33", date: "10.12.2016" },
					{ storeName: "Meny", price: "50", date: "10.12.2017" },
					{ storeName: "Coop", price: "42", date: "10.12.2016" },
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
			{
				item: "Druer", itemInfo: [
					{ storeName: "Joker", price: "32", date: "10.03.2018" },
					{ storeName: "Kiwi", price: "27", date: "10.12.2017" },
					{ storeName: "Meny", price: "25", date: "10.12.2017" },
					{ storeName: "Rema 1000", price: "33", date: "10.12.2016" },
				]
			},
			{
				item: "Banan", itemInfo: [
					{ storeName: "Joker", price: "2", date: "10.03.2018" },
					{ storeName: "Kiwi", price: "5", date: "10.12.2017" },
				]
			},
			{
				item: "vaskepulver", itemInfo: [
					{ storeName: "Joker", price: "80", date: "10.03.2018" },
					{ storeName: "Kiwi", price: "50", date: "10.12.2017" },
				]
			},
			{
				item: "Gulrot", itemInfo: [
					{ storeName: "Joker", price: "30", date: "10.03.2018" },
					{ storeName: "Kiwi", price: "18", date: "10.12.2017" },
					{ storeName: "Rema", price: "25", date: "10.12.2017" },
					{ storeName: "Meny", price: "12", date: "10.12.2016" },
				]
			},
			{
				item: "Melk", itemInfo: [
					{ storeName: "Joker", price: "22", date: "10.03.2018" },
					{ storeName: "Kiwi", price: "24", date: "10.12.2017" },
				]
			},
			{
				item: "Melis", itemInfo: [
					{ storeName: "Joker", price: "10", date: "10.03.2018" },
					{ storeName: "Kiwi", price: "18", date: "10.12.2017" },
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
		case "ADD_ITEMINFO": {
			let nextState = Object.assign({}, state)
			nextState.items.find(items => items.item === action.item).itemInfo.push(action.itemInfo);
			return nextState;
		}
		// dette kan ikke være en bra måte å gjøre dette på.....
		case "DELETE_ITEMINFO": {
			let nextState = Object.assign({}, state)
			index = nextState.items.find(items => items.item === action.item).itemInfo.findIndex(values => values.storeName == action.itemInfo.storeName && values.date == action.itemInfo.date);
			nextState.items.find(items => items.item === action.item).itemInfo.splice(index, 1);
			return nextState;
		}
		case "GET_SEARCH": {
			let nextState = Object.assign({}, state)
			nextState.search = []
			nextState.search = action.searchHits
			return nextState;
		}
		default:
			return state;
	}
}

export default reducer;