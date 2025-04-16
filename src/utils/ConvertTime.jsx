export default function ConvertTime(timePresent) {
    if (!timePresent) {
        return timePresent;
    }
    const dateObj = new Date(timePresent);
    const vietnameseTime = new Date(dateObj.getTime() + 60 * 60);
    const formattedVietnameseTime = vietnameseTime.toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour12: false,
    });
    return formattedVietnameseTime;
}
