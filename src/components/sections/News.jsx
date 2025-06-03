import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { API_PATHS } from '../../utils/apiPaths';

// const API_KEY = '353fa2ec998b49b49827ed166233d90e';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get(
      "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=353fa2ec998b49b49827ed166233d90e",)
      .then(res => {
        setNews(res.data.articles);
      }).catch((err) => {
        console.error();
      })
  }, [])


  const newsList = news.map(({author, title, description, url, urlToImage, publishedAt, content}) => {
  return (
    <>
    <section className='p-3'>
        <div className='card-image relative'>
          <img src={urlToImage} alt={title} />
          <p className='absolute top-0 right-0 bg-[#0e63b0] text-white p-1'>Technology</p>
        </div>
      <div className='card border border-b-[#0e63b0] border-r-[#0e63b0] border-l-[#0e63b0] rounded-b-md'>
        <div className='card-content p-2'>
          <h2 className='text-xl text-black font-bold'>{title}</h2>
          <p>{description}</p> <br />
          <hr className='text-black'/>
          <p className='mt-3'><strong>Author:</strong> {author}</p>
          <p><strong>Published At:</strong> {new Date(publishedAt).toLocaleDateString()}</p>
          <a href={url} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
      </div>
      </section>
    </>
  );
  })
  return(<>
    <h1 className='text-center underline text-2xl font-bold mb-3'>Top Stories</h1>
    <div className='items-container grid grid-cols-1 md:grid-cols-3 gap-1'>
      {newsList}
    </div>
  </>
  )
}

export default News;

