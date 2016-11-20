module.exports = {
    index: function(req, res) {
        res.status(200).json({
            count: 1,
            users: [
                {
                    id: 0,
                    name: 'Tom',
                    password: '$DXEc584D5D1dDe9220'
                }
            ]
        });
    }
};