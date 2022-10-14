import { getComentario, table } from "../../lib/comments";

const createComent = async (req, res) => {
  if (req.method === "POST") {
    let coment = req.body;
    coment.cuota = [req.body.cuota];
    console.log(coment.fecha);

    const buscacoment = await table
      .select({
        filterByFormula: `correo="${coment.correo}"`,
      })
      .firstPage();

    if (buscacoment.length !== 0) {
      const comentario = getComentario(buscacoment);
      res.json({ message: "Ya existe el correo", coment: comentario[0] });
    } else {
      //console.log(coment);
      const mensajeSaved = await table.create([{ fields: coment }]);

      const mensaje = getComentario(mensajeSaved);

      res.json(mensaje);
    }
  } else {
    res.json({ message: "GET METHOD" });
  }
};

export default createComent;
