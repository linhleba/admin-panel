import callAPI from '../utils/apiCaller';

export const postBookAPI = (book) => {
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
  console.log(payload);
  callAPI('api/book', 'POST', payload).then((response) => {
    console.log(response);
    // get data from call api
    // setBooks(response.data);
  });
};
