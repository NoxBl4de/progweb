const express = require('express')
const apiKey = '2dd9a2bf-ade8-4d9b-a026-2a2719f1ccb0'
const fetch = require('isomorphic-fetch')

const router = new express.Router()

router.get('/currencies/:name', (req, res) => {
    res.json(req.params.name)
})

router.get('/currencies', (req, res) => {
    fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', 
    {
        headers: {
            accept: 'application/json',
            'x-cmc_pro_api_key': apiKey,
        }
    })
    .then(function(res) {
        return res.json();
    })
    .then(function(responseData) {
        const errorCode = responseData.status.error_code
        if (errorCode != 0) {
            res.json({
                success: false,
                message: 'Error'
            })
            return
        }
        const currencies = responseData.data
        // console.log(currencies)
        res.json({
            success: true,
            currencies
        })
    })
  })

module.exports = router