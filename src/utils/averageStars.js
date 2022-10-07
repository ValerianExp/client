const averageStars = (reviews) => {
    if (reviews.length === 0) return 'N/D'
    const totalStars = reviews.reduce((acc, review) => {
        return acc + review;
    }, 0);
    return (totalStars / reviews.length).toFixed(2);
}

export default averageStars;