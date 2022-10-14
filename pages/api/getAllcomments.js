import { getComentario, table } from "../../lib/comments";

const getAllcomments = async (req, res) => {
  console.log("KARGANNDO");
  try {
    const mensajes = await table
      .select({ sort: [{ field: "fecha", direction: "desc" }] })
      .firstPage();
    res.json(getComentario(mensajes));
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

export default getAllcomments;
