const axios = require("axios");
const db = require('../models/index');


const apiKey = "d2434f8b-a348-422b-a8d4-639d083c30fb"
const baseUrl = "https://www.kamis.or.kr/service/price/xml.do?";

function formatDate(date) { var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear(); if (month.length < 2) month = '0' + month; if (day.length < 2) day = '0' + day; return [year, month, day].join('-'); }


async function getPriceData(itemCode){
    try{
        const priceData = await axios.get(baseUrl, {
                params: {
                action: 'periodProductList',
                p_productclscode: '02',
                p_startday: formatDate(Date.now()),
                p_endday: formatDate(Date.now()),
                // p_startday: '2021-04-11',
                // p_endday: '2021-04-11',
                p_itemcategorycode: '200',
                // p_itemcode: itemCode,
                p_itemcode: "222",
                p_kindcode: '01',
                p_productrankcode: '01',
                p_countrycode: '1101',
                p_convert_kg_yn: 'Y',
                p_cert_key: apiKey,
                p_cert_id: '222',
                p_returntype: 'json',
            }
        })
        // if(priceData.data.)
        // console.log(priceData._currentUrl)
        db.price.create({
            adddate: Date.now(),
            itemtype: itemCode,
            itemprice: parseInt(priceData.data.data.item[0].price.replace(",",""), 10)
        });

        return;
    }
    catch(e){
        console.log("!!! Can not get price data today.")
        console.log(e)
        return;
    }
} 


getPriceData(222)

module.exports = getPriceData