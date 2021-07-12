class APIFeatures {
  // create 2 properties for using in whole class
  constructor(query, queryString) { 
    this.query = query; // mongoose query object
    this.queryString = queryString; // from the route (url - req.query)
  }

  search() {
    let searchField = ".+";
    if (this.queryString.search) {
      searchField = this.queryString.search;
    } 

    this.query = this.query.find({"name": new RegExp(searchField, "i") });
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdDate');
    }

    return this;
  }

  paginate(limit) {
    const page = this.queryString.page * 1 || 1;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;
