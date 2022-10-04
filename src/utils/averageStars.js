const averageStars = (reviews) => {
    const totalStars = reviews.reduce((acc, review) => {
        return acc + review.stars;
    }, 0);
    return totalStars / reviews.length;
}

export default averageStars;