function groupBy(arr, field) {
    return arr.reduce((r, a) => {
        r[a[field]] = [...(r[a[field]] || []), a]
        return r
    }, {})
}

module.exports.groupBy = groupBy
