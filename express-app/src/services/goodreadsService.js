const axios = require('axios');
const xml2js = require('xml2js');
// To parse the xml response to json
const parser = xml2js.Parser({ explicitArray: false });
function goodreadsService() {
    function getBookById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=okG3Vd1bhDKKoit4d0KVA`)
                .then((response) => {
                    parser.parseString(response.data, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(result);
                            resolve(result.GoodreadsResponse.book);

                        }

                    })

                })
                .catch((error) => {
                    reject(error);
                    console.log(error);
                })
        })

    }
    return { getBookById };
};
module.exports = goodreadsService();