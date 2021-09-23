const constants = require("../utils/constants.json");
const axios = require("axios");

const triviaUrl = constants.__baseurl.fun.trivia;
const quoteUrl = constants.__baseurl.fun.quote;

const getTrivia = async () => {
    const { data } = await axios.get(`${triviaUrl}/api/random`);
    return data;
}
const getQuote = async () => {
    const { data } = await axios.get(`${quoteUrl}/random`);
    return {
        content: data.content,
        author: data.author,
    }
}

module.exports = { getQuote, getTrivia };