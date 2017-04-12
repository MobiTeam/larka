import { fetchBankOperations } from '../api';

export const fetchOperationList = (payload, { redirect, showPreloader, additionHeader }) => {
	return {
		type: 'FETCH_OPERATION_LIST',
		payload: fetchBankOperations(payload, additionHeader),
		handlers: {
			'onSuccess': fetchOperationListSuccess,
			'onError': fetchOperationListError
		},
		redirect,
		showPreloader
	}
}

export const fetchOperationListSuccess = (payload) => {
	return {
		type: 'FETCH_OPERATION_LIST_SUCCESS',
		payload
	}
}

export const fetchOperationListError = (payload) => {
	return {
		type: 'FETCH_OPERATION_LIST_ERROR',
		payload
	}
}