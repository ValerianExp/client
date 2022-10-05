const averageStars = (reviews) => {
    console.log(reviews)
    const totalStars = reviews.reduce((acc, review) => {
        return acc + review;
    }, 0);
    return (totalStars / reviews.length).toFixed(2);
}

export default averageStars;