import "../css/components.css";

export const greet = (name) => {
  console.log("Createing h1 label");
  const h1 = document.createElement("h1");
  h1.innerText = `Hola, ${name}, como estas?`;
  document.body.append(h1);
};
