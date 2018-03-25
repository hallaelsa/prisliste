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
			{
				item: "Druer", itemInfo: [
					{ storeName: "Joker", price: "32", date: "10.03.2018" },
					{ storeName: "Kiwi", price: "27", date: "10.12.2017" },
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
				]
			},
			{
				item: "Melk", itemInfo: [
					{ storeName: "Joker", price: "30", date: "10.03.2018" },
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
			nextState.items[action.index].itemInfo.push(action.item);
			return nextState;
		}
		default:
			return state;
	}
}

export default reducer;