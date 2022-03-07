import callAPI from '../utils/apiCaller';

export const postBookAPI = async (book) => {
  let category_ids = [];
  book.categories.map((item) => {
    // console.log('gia tri item hien tai la', item);
    // console.log('get lai gia tri id', item.id);
    category_ids.push(item.id);
  });
  let author_ids = [];
  book.authors.map((item) => {
    // console.log('gia tri item tac gia hien tai la', item);
    // console.log('get lai gia tri tac gia id', item.id);
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
  console.log(payload);
  await callAPI('api/book', 'POST', payload).then((response) => {
    console.log(response);
    // get data from call api
    // setBooks(response.data);
  });
};

export const postCategoryAPI = async (item) => {
  let responseData;
  const payload = {
    name: item.name,
  };
  console.log(payload);
  await callAPI('api/category', 'POST', payload).then((response) => {
    // console.log(response);
    console.log('response', response.data.data.id);
    // item.id = response.data.data.id;
    responseData = response.data.data.id;
  });
  return responseData;

  // console.log('hehe', responseData);
  // return responseData;
  // .catch((error) => {
  //   // HANDLE ERROR
  //   console.log('error in categories api', error);
  // });
};
export const postAuthorAPI = async (item) => {
  let responseData;
  const payload = {
    name: item.name,
    telephone: '',
  };
  console.log(payload);
  await callAPI('api/author', 'POST', payload).then((response) => {
    responseData = response.data.data.id;
  });
  return responseData;
};
