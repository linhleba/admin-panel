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
    image_url: book.photo,
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

export const updateBookAPI = async (book, bookId) => {
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
    image_url: book.photo,
  };
  await callAPI(`api/book/${bookId}`, 'PUT', payload).then((response) => {
    console.log(bookId);
    console.log(response);
    responseStatus = response.status;
    // return response;
    // get data from call api
    // setBooks(response.data);
  });
  // console.log('responseStatus', responseStatus);
  return responseStatus;
};

export const getAuthor = async () => {
  let result;
  await callAPI('api/author', 'get', null).then((res) => {
    result = res.data;
  });
  return result;
};

export const getCategory = async () => {
  let result;
  await callAPI('api/category', 'get', null).then((res) => {
    result = res.data;
  });
  return result;
};

export const checkAuthorExistence = async (authorList, author) => {
  let authorId = -1;
  console.log(author);
  console.log(authorList);
  Promise.all(
    authorList.map((item) => {
      if (item.name == author) {
        authorId = item.id;
        console.log('author map', author);
      }
    }),
  );
  // handle if not existed id in database
  if (authorId == -1) {
    let payload = {
      name: author,
      telephone: '',
    };
    await callAPI('api/author', 'post', payload).then((res) => {
      console.log('author', res);
      authorId = res?.data?.data?.id;
    });
    // console.log('author id: ', authorId);
    return authorId;
  } else {
    // console.log('author id: ', authorId);
    return authorId;
  }
};

export const checkCategoryExistence = async (categoryList, category) => {
  let categoryId = -1;
  Promise.all(
    categoryList.map((item) => {
      if (item.name == category) {
        categoryId = item.id;
      }
    }),
  );
  // handle if not existed id in database
  if (categoryId == -1) {
    await callAPI('api/category', 'post', { name: category }).then((res) => {
      categoryId = res?.data?.data?.id;
    });
    console.log('category id: ', categoryId);
    return categoryId;
  } else {
    console.log('category id: ', categoryId);
    return categoryId;
  }
};
