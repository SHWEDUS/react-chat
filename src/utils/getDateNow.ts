export function getDateNow(locale = 'ru', timeZone = 'Europe/Moscow'): string {
	return new Date().toLocaleString(locale, {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		timeZone
	});
}
