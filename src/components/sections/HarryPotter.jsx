import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_PATHS } from '../../utils/apiPaths';

const HarryPotter = () => {
  const [books, setBooks] = useState([]);
  const [spells, setSpells] = useState([])
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(API_PATHS.HARRYPOTTER.BOOKS)
      .then(res => {
        setBooks(res.data); // res.data is an array
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load books.');
      });
  }, []);


  useEffect(() => {
    axios.get(API_PATHS.HARRYPOTTER.SPELLS)
    .then(res => {
        setSpells(res.data); // res.data is an array
        console.log(res);
    })
    .catch((err) => {
        console.error(err)
        setError('Failed to load spells')
    })
  }, [])

  return (<>
    <div>
      <h2 className='text-xl font-bold'>Harry Potter Books</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {books.map(book => (
          <li key={book.id} className='border p-3'>
            <strong>{book.title}</strong> <br />
            {book.description} <br />
            <div className="mt-3"> <hr />
                Released: {book.releaseDate} <br />
                Pages: {book.pages}                
            </div>

          </li>
        ))}
      </ul>
    </div>

    {/* Spells */}
    <div className='mt-4'>
      <h2 className='text-xl font-bold'>Harry Potter Spells</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {spells.map(spells => (
          <li key={spells.id} className='border p-3'>
            <strong>{spells.spell}</strong> <br />
            {spells.use} <br />

          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default HarryPotter;
