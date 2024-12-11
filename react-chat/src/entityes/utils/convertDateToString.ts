export class ConvertDateToString {
    public static convDateToStringFormat(dateString: string | null = null, dateFromFormat: Date | null = null): string {
        let date;
        if (!dateFromFormat) {
            const [datePart, timePart] = dateString!.split(', ');
            const [day, month, year] = datePart.split('.').map(Number);
            const [hours, minutes, seconds] = timePart.split(':').map(Number);
    
            date = new Date(year, month - 1, day, hours, minutes, seconds);
        } else {
            date = new Date(dateFromFormat.getFullYear(), dateFromFormat.getMonth(), 
                            dateFromFormat.getDate(), dateFromFormat.getHours(),
                            dateFromFormat.getMinutes(), dateFromFormat.getSeconds());
        }

        const currentDay = new Date();

        const today = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const inputData = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        if (inputData.getTime() === today.getTime()) {
            return `Today, ${date.toLocaleTimeString()}`;
        } else if (inputData.getTime() === yesterday.getTime()) {
            return `Yesterday, ${date.toLocaleTimeString()}`;
        } else {
            return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
        }
    }
}