const constants = require("../utils/constants.json");
const axios = require("axios");
const genQrCode = async (link) => {
    const url = constants.__baseurl.misc.qr;
    const { data } = await axios.get(`${url}/chart?chs=512x512&cht=qr&chl=${link}&choe=UTF-8&chof=.png`);
    return data;
}       
module.exports = { genQrCode };