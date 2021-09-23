"use strict";
const axios = require("axios");
const config = require("./utils/constants.json");
const stocks = {
    _apiConfig: config.__api,
    _throw(type, err){
        console.error(err);
    },
    async _req_mixed(url){
        try {
            const { data } = await axios.get(url);
            return {type: "crypto", data: {data, provider: "Binance"}};
        } catch (error) { try {
                const { data } = await axios.get(url.stocks);
                let type = "stocks";
                if(data["Global Quote"]["05. price"] === undefined) type ="404"
                return {type: type, data: {data, provider: "Alpha vantage"}};
            } catch (error){ this._throw(0, error) }
        }
    },
    async price(ticker){
        const _res = await this._req_mixed({
        crypto: `${this._apiConfig.binance.base}/api/v3/ticker/price?symbol=${ticker.toUpperCase()}`, 
        stocks: `${this._apiConfig.alphaVantage.base}/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${this._apiConfig.alphaVantage.apiKey}`});
        const price = _res.type === "crypto" ? _res.data.data.price
        : _res.data.data['Global Quote']['05. price']
        return _res.data === "error" || _res.type === "error" ? "error" : {price, provider: _res.data.provider, type: _res.type};
    },
    async info(ticker){
        const _res = await this
    }
}
module.exports = stocks;