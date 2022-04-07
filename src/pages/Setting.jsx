import React, { useState, useEffect } from 'react';
import ProgressBar from '../components/progressbar/ProgressBar';
import product from '../assets/JsonData/product.json';
import * as BookService from '../services/bookService';
import callAPI from '../utils/apiCaller';
import './setting.css';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../components/redux/ducks/snackbar';

const Setting = () => {
  const dispatch = useDispatch();
  const [percent, setPercent] = useState(0);
  let i = percent * 10;
  const handleFillData = async () => {
    let authorDic = await BookService.getAuthor();
    let categoryDic = await BookService.getCategory();

    dispatch(setSnackbar(true, 'warning', 'Đang đổ dữ liệu'));
    window.interval = setInterval(async () => {
      if (i < product.length) {
        const authorId = await BookService.checkAuthorExistence(
          authorDic,
          product[i].authors,
        );

        const categoryId = await BookService.checkCategoryExistence(
          categoryDic,
          product[i].categories,
        );

        const numRandom = Math.floor(Math.random() * 20) + 1;
        const payload = {
          name: product[i].name,
          description: product[i].description,
          quantity: numRandom,
          price: product[i].prices,
          author_id: [authorId],
          category_id: [categoryId],
          image_url: product[i].images,
        };

        // console.log('payload', payload);

        console.log('posting book: ', payload.name);
        await callAPI('api/book', 'post', payload).then((res) => {
          console.log(res);
          // console.log(res);
          // console.log(res.data.message);
        });
        i++;
        if (i % 10 == 0) {
          const percent = Math.floor((i / product.length) * 100);
          setPercent(percent);
        }
        console.log('index: ', i);
      } else {
        clearInterval(window.interval);
        dispatch(setSnackbar(true, 'success', 'Hoàn tất'));
      }
    }, 500);
  };
  return (
    <div>
      <button
        className="table__button-add"
        onClick={() => {
          // setInterval(() => {
          //   setPercent((prevPercent) => prevPercent + 5);
          //   console.log('percent', percent);
          // }, 2000);
          handleFillData();
        }}
      >
        Đổ dữ liệu
      </button>
      <button
        className="table__button-stop"
        onClick={() => {
          // setInterval(() => {
          //   setPercent((prevPercent) => prevPercent + 5);
          //   console.log('percent', percent);
          // }, 2000);
          clearInterval(window.interval);
          dispatch(setSnackbar(true, 'error', 'Đã dừng đổ dữ liệu!'));
          // clearTimeout(window.timeout);
        }}
      >
        Dừng
      </button>
      <ProgressBar done={percent} />
    </div>
  );
};

export default Setting;
