import { Badge, Box, Spacer, Text } from "@chakra-ui/react";
import React from "react";

export const Mensajes = ({ mensaje }) => {
  const partialEmail = mensaje?.correo
    ? mensaje?.correo.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1***@$2")
    : "";

  return (
    <>
      {mensaje?.mensaje && (
        <Box bg="blue.100" p="4" width="450px">
          <Badge>{mensaje.fecha}</Badge>

          <Spacer />
          <Badge colorScheme="purple">$ {mensaje.cuota}</Badge>
          <Spacer />

          <Text fontSize="2xl">{mensaje.mensaje}</Text>
          <span> {partialEmail} </span>

          {mensaje.polleroamigo && (
            <>
              <Badge variant="subtle" colorScheme="green">
                Quisiera ser pollere amigue
              </Badge>
              <Spacer />
            </>
          )}
        </Box>
      )}
    </>
  );
};
