export const showSpinner = () => {
	return {
		type: 'SHOW_SPINNER',
		payload: true
	}
}

export const closeSpinner = () => {
	return {
		type: 'CLOSE_SPINNER',
		payload: false
	}
}