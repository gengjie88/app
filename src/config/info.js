var tt = [{
    id: 1,
    name: '111'
}, {
    id: 2,
    name: '222'
}]
var myChart;

function dataFormat(arr) {
    let x = arr[0]
    let y = arr[1]
    let newArr = []
    let length = x.length
    for (let index = 0; index < length; index++) {
        let i = [x[index], y[index]]
        newArr.push(i)
    }
    return newArr
}
export default { tt, myChart, dataFormat };