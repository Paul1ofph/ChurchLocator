import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_PATHS } from '../../utils/apiPaths';

const HarryPotter = () => {
  const [books, setBooks] = useState([]);
  const [spells, setSpells] = useState([])
  const [character, setCharacter] = useState([])
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
  
  useEffect(() => {
    axios.get(API_PATHS.HARRYPOTTER.CHARACTERS)
    .then(res => {
        setCharacter(res.data)
        console.log(res);
    })
    .catch((err) => {
        console.error(err)
        setError('Failed to load characters')
    })
  }, [])

  return (<>
    <div className=''>
      <h2 className='text-xl font-bold text-center mb-4'>Harry Potter Books</h2>
      <ul className='grid grid-cols-2 md:grid-cols-4'>
        {books.map(book => (
          <li key={book.index} className='border p-3'>
            <img src={book.cover} alt="" />
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
      <h2 className='text-xl font-bold m-4 text-center'>Harry Potter Spells</h2>
      <ul className='grid grid-cols-2 md:grid-cols-4'>
        {spells.map(spells => (
          <li key={spells.index} className='border p-3'>
            <h1 className=''><strong>Name: </strong> {spells.spell}</h1> <br />
            <p><strong>Use:</strong> {spells.use}</p>

          </li>
        ))}
      </ul>
    </div>

    {/* Characters */}
    <div className="mt-4">
        <h2 className="text-xl font-bold text-center mb-4">Harry Potter Characters</h2>
        <ul className='grid grid-cols-2 md:grid-cols-4'>
            {character.map(character => (
                <li key={character.index} className='border p-3'>
                    <img src={character.image} alt="" />
                    <h1>FullName: {character.fullName}</h1>
                    <h1>Nickname: {character.nickname}</h1>
                    <h2>DOB: {character.birthdate}</h2>
                    <h2>HogwartsHouse: {character.hogwartsHouse}</h2>
                    <h3>Children: {character.children.length > 0 ? `${character.children.length} - ${character.children.join(', ')}` : 'None'}</h3>
                </li>
            ))}
        </ul>
    </div>
    </>
  );
};

export default HarryPotter;
