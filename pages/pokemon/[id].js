import  { useRouter } from "next/router"
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../../styles/Details.module.css'

export async function getServerSideProps({ params }) {
  const resp = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`)

  return {
    props: {
      pokemon: await resp.json()
    }
  }
}

export default function Details({ pokemon }) {
  if(!pokemon) {
    return null
  }

  return (
    <div>
      <head>
        <title>{pokemon.name}</title>
      </head>
      <div>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name.english}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.name}>{pokemon.type.join(", ")}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key="name">
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}