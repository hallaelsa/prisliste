import { AsyncStorage } from 'react-native';

function initState() {
	return {
		search: [],
		dateLimit: 3,
		items: [
			{
				item: "Melkesjokolade", itemInfo: [
					{ storeName: "Rema", price: "30", date: "10.03.2018" },
					{ storeName: "Kiwi", price: "25", date: "10.12.2017" },
					{ storeName: "Joker", price: "33", date: "10.12.2016" },
					{ storeName: "Meny", price: "50", date: "10.11.2017" },
					{ storeName: "Coop", price: "42", date: "10.12.2016" },
					{ storeName: "Extra", price: "50", date: "10.10.2017" },
					{ storeName: "Europris", price: "42", date: "10.02.2018" },
					{ storeName: "Coop prix", price: "50", date: "10.09.2017" },
					{ storeName: "Coop mega", price: "42", date: "10.01.2018" },
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
					{ storeName: "Kiwi", price: "120", date: "10.09.2017" },
				]
			},
			{
				item: "Druer", itemInfo: [
					{ storeName: "Joker", price: "32", date: "10.03.2018" },
					{ storeName: "Kiwi", price: "27", date: "10.08.2017" },
					{ storeName: "Meny", price: "25", date: "10.12.2017" },
					{ storeName: "Rema 1000", price: "33", date: "10.12.2016" },
				]
			},
			{
				item: "Banan", itemInfo: [
					{ storeName: "Joker", price: "2", date: "10.03.2018" },
					{ storeName: "Kiwi", price: "5", date: "10.10.2017" },
				]
			},
			{
				item: "vaskepulver", itemInfo: [
					{ storeName: "Joker", price: "80", date: "10.03.2018" },
					{ storeName: "Kiwi", price: "50", date: "10.10.2017" },
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

function saveItems(items) {
	AsyncStorage.setItem('@pl:items', JSON.stringify(items));
}

function reducer(state = initState(), action) {
	switch (action.type) {
		case "SET_ITEMS": {
			let nextState = Object.assign({}, state)
			nextState.items = action.items;
			return nextState;
		}
		case "ADD_ITEM": {
			let nextState = Object.assign({}, state)
			nextState.items.push(action.item);
			saveItems(nextState.items);
			return nextState;
		}
		case "DELETE_ITEM": {
			let nextState = Object.assign({}, state)
			index = nextState.items.findIndex(items => items.item === action.item);
			nextState.items.splice(index, 1);
			saveItems(nextState.items);
			return nextState;
		}
		case "ADD_ITEMINFO": {
			let nextState = Object.assign({}, state)
			nextState.items.find(items => items.item === action.item).itemInfo.push(action.itemInfo);
			saveItems(nextState.items);
			return nextState;
		}
		// dette kan ikke være en bra måte å gjøre dette på.....
		case "DELETE_ITEMINFO": {
			let nextState = Object.assign({}, state)
			index = nextState.items.find(items => items.item === action.item).itemInfo.findIndex(values => values.storeName == action.itemInfo.storeName && values.date == action.itemInfo.date);
			nextState.items.find(items => items.item === action.item).itemInfo.splice(index, 1);
			saveItems(nextState.items);
			return nextState;
		}
		case "GET_SEARCH": {
			let nextState = Object.assign({}, state)
			nextState.search = []
			nextState.search = action.searchHits
			return nextState;
		}
		case "UPDATE_DATELIMIT": {
			let nextState = Object.assign({}, state)
			nextState.dateLimit = action.dateLimit
			return nextState;
		}
		default:
			return state;
	}
}

export default reducer;