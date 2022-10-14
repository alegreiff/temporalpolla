import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Switch,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import Swal from "sweetalert2";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import { Mensajes } from "../components/Mensajes";
export default function Home() {
  const [email, setEmail] = useState("");
  const [cuota, setCuota] = useState("");
  const [polleroamigo, setPolleroamigo] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const [envia, setEnvia] = useState(false);

  const { data, error } = useSWR(`/api/getAllcomments`, fetcher);
  const [mensajes, setMensajes] = useState(data);

  useEffect(() => {
    if (data && data.length > 0) {
      setMensajes(data);
    }
  }, [data]);

  const creaComentario = async (comentario) => {
    try {
      const response = await fetch("/api/createComent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comentario),
      });
      const datoCargado = await response.json();
      if (datoCargado) {
        setEnvia(true);
      }
    } catch (error) {
      console.error("Error creando comentario", error);
    }
  };

  const procesaComentario = async () => {
    const coment = {
      correo: email,
      polleroamigo,
      cuota,
      mensaje: mensaje || "",
    };
    //console.info(coment);
    const y = await creaComentario(coment);
    console.log("RES", y);
    /* Swal.fire({
      title: "Vamos bien",
      text: `Correo ${coment.correo}  ${coment.polleroamigo ? "SI" : "NO"} - ${
        coment.cuota
      } - ${coment.mensaje}`,
      confirmButtonText: "Sisas",
    }); */
  };
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
        <Container mt={50} minWidth={["sm", "lg", "3xl"]}>
          <Center>
            <Stack align="center" direction="row">
              <Switch
                size="lg"
                checked={envia}
                onChange={(e) => {
                  setEnvia(e.target.checked);
                }}
              />
            </Stack>
          </Center>
        </Container>
        {envia && (
          <>
            <Container mt={50} minWidth={["sm", "lg", "3xl"]}>
              <Center>
                <VStack>
                  {mensajes &&
                    mensajes.map((msg, i) => (
                      <Mensajes key={i} mensaje={msg} />
                    ))}
                </VStack>
              </Center>
            </Container>
          </>
        )}
        {!envia && (
          <Container mt={50} minWidth={["sm", "lg", "3xl"]}>
            <Center>
              <Text fontSize="3xl">No es mi polla</Text>
            </Center>
            <Center>
              <Text fontSize="4xl">No es tu polla</Text>
            </Center>
            <Center>
              <Text fontSize="3xl">¡Es Nuestra Polla!</Text>
            </Center>
            <Box>
              Esta <strong>NO</strong> es la inscripción a la polla. Se trata de
              un sondeo de opinión.
            </Box>
            <Spacer />
            <VStack>
              <Spacer />
              <FormControl>
                <FormLabel>Correo electrónico</FormLabel>
                <Input
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <FormHelperText>El correo no será publicado </FormHelperText>
              </FormControl>
              <Spacer />
              <FormControl>
                <FormLabel>¿Cuántos pesos colombianos le metemos?</FormLabel>
                <RadioGroup onChange={setCuota} value={cuota}>
                  <Stack direction="column">
                    <Radio size="lg" value="100000">
                      100.000
                    </Radio>
                    <Radio size="lg" value="150000">
                      150.000
                    </Radio>
                    <Radio size="lg" value="200000">
                      200.000
                    </Radio>
                    <Radio size="lg" value="250000">
                      250.000
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              <Spacer />
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="email-alerts" mb="0">
                  Me interesa ser pollero amigo
                </FormLabel>
                <Switch
                  id="email-alerts"
                  checked={polleroamigo}
                  onChange={(e) => {
                    setPolleroamigo(e.target.checked);
                  }}
                />
              </FormControl>
              <FormControl>
                <Textarea
                  placeholder="Ideas / opiniones / comentarios"
                  onChange={(e) => {
                    setMensaje(e.target.value);
                  }}
                />
              </FormControl>
              <Button onClick={procesaComentario}>Envío mi opinión</Button>
            </VStack>
          </Container>
        )}
      </>
    </div>
  );
}
