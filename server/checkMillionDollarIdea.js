const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;
    if (Number(numWeeks) && Number(weeklyRevenue)) {
        const earnings = Number(numWeeks) * Number(weeklyRevenue);
        if (earnings < 1000000) {
            res.status(400).send();
        } else {
            next();
        };
    } else {
        res.status(400).send();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
