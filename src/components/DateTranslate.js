import { useState } from 'react';

const useDateTranslate = () => {
    const viWeekdays = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const englishWeekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const translateWeekdays = (weekday) => {
        const dayIndex = englishWeekdays.indexOf(weekday);
        return viWeekdays[dayIndex];
    };
    
    return {translateWeekdays};
}

export default useDateTranslate;