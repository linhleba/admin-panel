import callAPI from '../utils/apiCaller';

export const postBookAPI = (book) => {
  const payload = {
    name: book.name,
    description: book.description,
    quantity: book.quantity,
    price: book.price,
    category_id: [book.categories[0].id],
    author_id: [book.authors[0].id],
  };
  console.log(payload);
  callAPI('api/book', 'POST', payload).then((response) => {
    console.log(response);
    // get data from call api
    // setBooks(response.data);
  });
};
