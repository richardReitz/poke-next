import Image from 'next/image'

import styles from '../../styles/Pokemon.module.css'

export const getStaticPaths = async() => { 
  const api = 'https://pokeapi.co/api/v2/pokemon/'
  const maxPokemons = 252
  
  const res = await fetch(`${api}/?limit=${maxPokemons}`)
  const data = await res.json();

  const paths = data.results.map((pokemon, index) => {
    return {
        params: { pokemonId: (index+1).toString() },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async(context) => {
    const id = context.params.pokemonId

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

    const data = await res.json()

    return {
        props: { pokemon: data },
    }
}

export default function Pokemon({ pokemon }){
    return(
        <div className={styles.details_container}>
            <h1 className={styles.pokemon_title}>{pokemon.name}</h1>
            <Image
                src={`https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png`}
                width="200"
                height="200"
                alt={pokemon.name}
            />
            <div className={styles.type_container}>
                <h3>Tipo:</h3>
                <div>
                    {pokemon.types.map((item, index) => (
                        <span className={`${styles.type} ${styles['type_' + item.type.name]}`} key={index}>{item.type.name}</span>
                    ))}
                </div>
            </div>
            <div className={styles.infos_container}>
                <h3>Altura:</h3>
                <p>{pokemon.height * 10} cm</p>
            </div>
            <div className={styles.infos_container}>
                <h3>Peso:</h3>
                <p>{pokemon.weight / 10} kg</p>
            </div>
        </div>

    )
}