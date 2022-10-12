import { Center, Container, Text } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nuestra Polla 2022</title>
        <meta
          name="description"
          content="No es mi polla, no es tu polla. ¡Es Nuestra Polla!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <Container mt={50}>
          <Center>
            <Text fontSize="6xl">No es mi polla</Text>
          </Center>
          <Center>
            <Text fontSize="4xl">No es tu polla</Text>
          </Center>
          <Center>
            <Text fontSize="6xl">¡Es Nuestra Polla!</Text>
          </Center>
        </Container>
      </>
    </div>
  );
}
