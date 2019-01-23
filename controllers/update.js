/**
 * GET /
 * LISTER SECTION.
 */
exports.update = (req, res) => {
    var data = req.body;
    var secret = data.secret;
    var dataToUpdate = data.listedCoins;
    if (secret == process.env.UPDATE_DATA_SECRET) {
        
    }
    res.send({
        status: true,
        message: `Updated successfully`
    });
};