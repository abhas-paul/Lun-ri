export const getFormattedDate = () => {
    try {
        const today = new Date();

        const day = today.getDate();
        const month = today.toLocaleDateString('en-GB', { month: 'long' });
        const year = today.getFullYear();

        return `${day} ${month}, ${year}`;
    } catch (error) {
        return '';
    }
};