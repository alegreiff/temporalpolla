import { Center, Container, Text } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";
const prisma = new PrismaClient();
export default function Home({ initialContacts }) {
  console.log(initialContacts);
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
            <Text fontSize="5xl">No es mi polla</Text>
          </Center>
          <Center>
            <Text fontSize="4xl">No es tu polla</Text>
          </Center>
          <Center>
            <Text fontSize="3xl">¡Es Nuestra Polla!</Text>
          </Center>
        </Container>
      </>
    </div>
  );
}

export async function getServerSideProps() {
  const contacts = await prisma.contact.findMany();
  return {
    props: {
      initialContacts: contacts,
    },
  };
}

//https://youtu.be/FMnlyi60avU?t=409
