const advancedResult = (model, populate) => async (req, res, next) => {
  let query

  // Copy req.query object
  let reqQuery = { ...req.query }

  // Fields to exclude
  const removeFields = ['select', 'sort', 'limit', 'page']

  // Loop over theese fields
  removeFields.forEach((param) => delete reqQuery[param])

  // Create Query string
  let queryStr = JSON.stringify(reqQuery)

  // Create operators ($gte, $gt)
  queryStr = queryStr.replace(
    /\b($gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  )

  // Finding resource
  query = model.find(JSON.parse(queryStr))

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ')
    query = query.select(fields)
  }
  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ')
    query = query.sort(sortBy)
  } else {
    query = query.sort('-createdAt')
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 20
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const total = await model.countDocuments()

  query = query.skip(startIndex).limit(limit)

  if (populate) {
    query = query.populate(populate)
  }

  // Executing resource
  const results = await query

  // Pagination result
  let pagination = {}

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    }
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: limit,
    }
  }

  res.advancedResult = {
    success: true,
    count: results.length,
    pagination: pagination,
    data: results,
  }

  next()
}

module.exports = advancedResult
