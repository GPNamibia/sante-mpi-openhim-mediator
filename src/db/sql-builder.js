async function readData(model) {
    const foundItems = await model.findAll({limit:2000})
    return foundItems
}


module.exports = {
    readData
}