const getPrev = (page) => {
  if (page - 1 <= 0) {
    return null;
  }

  return page - 1;
};

const getNext = (totalPages, page) => {
  if (page + 1 > totalPages) {
    return null;
  }

  return page + 1;
};

const buildRangePagination = (page, totalPages) => {
  let current = page,
    last = totalPages,
    delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range = [],
    rangeWithDots = [],
    l;

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }

    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
};

const buildPagination = async (req, model) => {
  const modelSetClone = model.clone();
  const modelSetPagin = model.clone();
  let page = 1;

  if (req.query.page) {
    page = parseInt(req.query.page) || page;
  }

  const pageLimit = req.query.limit ? parseInt(req.query.limit) : 10;
  const firstPage = page > 1 ? page * pageLimit - pageLimit : 0;

  const count = await modelSetClone.countDocuments();
  const totalPages = Math.ceil(count / pageLimit);
  const results = await modelSetPagin.limit(pageLimit).skip(firstPage);

  const prev = getPrev(page);
  const next = getNext(totalPages, page);

  return {
    current: page,
    next,
    prev,
    count,
    ranges: buildRangePagination(page, totalPages),
    results: await results,
  };
};

module.exports = {
  buildPagination,
};
