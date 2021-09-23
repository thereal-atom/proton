const secondsToDhms = (seconds) => {
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    return `${d} Days, ${h} hrs, ${m} mins, ${s} secs`;
}
module.exports = { secondsToDhms };