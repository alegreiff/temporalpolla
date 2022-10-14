const Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("encuesta");

const getComentario = (comentario) => {
  return comentario.map((record) => {
    return {
      ...record.fields,
    };
  });
};

export { table, getComentario };
