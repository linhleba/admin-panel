import callAPI from '../utils/apiCaller';

export const postBookAPI = async (book) => {
  let responseStatus;
  let category_ids = [];
  book.categories.map((item) => {
    category_ids.push(item.id);
  });
  let author_ids = [];
  book.authors.map((item) => {
    author_ids.push(item.id);
  });
  const payload = {
    name: book.name,
    description: book.description,
    quantity: book.quantity,
    price: book.price,
    category_id: category_ids,
    author_id: author_ids,
  };
  await callAPI('api/book', 'POST', payload).then((response) => {
    responseStatus = response.status;
    // return response;
    // get data from call api
    // setBooks(response.data);
  });
  // console.log('responseStatus', responseStatus);
  return responseStatus;
};

export const postCategoryAPI = async (item) => {
  let responseData;
  const payload = {
    name: item.name,
  };
  await callAPI('api/category', 'POST', payload).then((response) => {
    // item.id = response.data.data.id;
    responseData = response.data.data.id;
  });
  return responseData;
};
export const postAuthorAPI = async (item) => {
  let responseData;
  const payload = {
    name: item.name,
    telephone: '',
  };
  await callAPI('api/author', 'POST', payload).then((response) => {
    responseData = response.data.data.id;
  });
  return responseData;
};
