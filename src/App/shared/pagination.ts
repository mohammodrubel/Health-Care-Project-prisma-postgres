type calculate = {
  page?: number,
  limit?: number,
  sortBy?: string,
  sortOrder?: string
}

type calculateReturenType = {
  page?: number,
  limit?: number,
  sortBy?: string,
  sortOrder?: string,
  skip:number
}
const calculateNumber = (options:calculate):calculateReturenType => {
    const page = options.page ? Number(options.page) : 1;
    const limit = options.limit ? Number(options.limit) : 5;
    const skip = (page - 1) * limit;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
  
    return {
      page,
      limit,
      skip,
      sortBy,
      sortOrder
    };
  };
  

  export default calculateNumber