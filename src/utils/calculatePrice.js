const calculatePrice = (duration) => {
    let price = 5
    const words = duration.split(' ')
    words.forEach((word, index) => {
        if (word.includes('day')) {
            price += parseInt(words[index - 1]) * 24 * 60
        }
        if (word.includes('hour')) {
            price += parseInt(words[index - 1]) * 60
        }
        if (word.includes('min')) price += parseInt(words[index - 1])
    })
    return (price)
}

export default calculatePrice
