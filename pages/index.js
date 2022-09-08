import styles from '../styles/Home.module.css'

import Image from 'next/image'

import Card from '../components/Card.js'

export async function getStaticProps() {

  const api = 'https://pokeapi.co/api/v2/pokemon/'
  const maxPokemons = 252
  
  const res = await fetch(`${api}/?limit=${maxPokemons}`)
  const data = await res.json();
  
  data.results.forEach((item, index) => {
    item.id = index + 1
  })

  return {
    props: {
      pokemons: data.results,
    },
  }
}

export default function Home({ pokemons }) {
  return (
    <>
      <div className={styles.title_container}>
        <h1>Poke<span>Next</span></h1>
        <Image
          src="/images/pokeball.png"
          width="40"
          height="40"
          alt="Pokeball"
        />
      </div>
      <div className={styles.pokemons_container}>
          {pokemons.map((pokemon) => (
            <Card key={pokemon.id} pokemon={pokemon} />
          ))}
      </div>
    </>
  )
}
