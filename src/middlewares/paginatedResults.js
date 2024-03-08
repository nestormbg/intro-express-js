const paginatedResults = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    }

    try {
      results.data = await model.find().limit(limit).skip(startIndex).exec();
      res.results = results;
      next();
    } catch (error) {
      return res
        .status(500)
        .json({ statusCode: '500', message: 'Could not fetch data' });
    }
  };
};

module.exports = {
  paginatedResults,
};
