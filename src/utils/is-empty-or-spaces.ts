export const isEmptyOrSpaces = (str: string) => {
	return str === null || str.match(/^[\s\n]*$/) !== null;
};
