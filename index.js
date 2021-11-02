//const fs = require("fs");
const fsP = require("fs").promises;
const marked = require("marked");
const axios = require("axios").default;


//const path = require("path");
//const fs = require("fs");
//const resolve = require("path").resolve;
//const { resolve } = require('path');

// const fileHound = require("filehound");
// const axios = require("axios");
// const marked = require("marked");
// const { RSA_NO_PADDING } = require("constants");

//Lee el archivo y trae los links
const leerArchivoP = (ruta) => {
    return fsP.readFile(ruta, {encoding: "utf-8"})
   
    
}
const extraerLinks = (contenido/*, file*/) => {
    let links = [];
    const renderer = new marked.Renderer();
    renderer.link = (href, file, text) => {
     links.push({
      href: href,
      text: text,
      //file: file,
    });
  }
  marked(contenido, { renderer: renderer });
  if (links.length === 0){
    console.log("no se encontro ningun link  " + file)
  }
  return links;
}
const status = (link, file) => {
    return new Promise((resolve, reject) => {
      axios.get(link.href)
        .then((response) => {
          resolve({
            href: link.href,
            text: link.text,
            file: file,
            statusCode: response.status,
            status: "OK",
          });
        })
        .catch((error) => {
          resolve({
            href: link.href,
            text: link.text,
            file: file,
            statusCode: error.err,
            status: "FAIL",
          });
        });
    });
  };

  const stats = (linkS) => {

    let statsArray = {};

    statsArray.Total = linkS.length;
    statsArray.Unique = 0;
    let uniqueLinks = new Set() //Permite almacenar valores unicos de cualquier tipo.

    linkS.forEach(link => {
        uniqueLinks.add(link.href);

    });
    statsArray.Unique = uniqueLinks.size

    return `Total: ${statsArray.Total}\nUnique: ${statsArray.Unique} `;


}
leerArchivoP(process.argv[2])
  .then((data) => {
        const validate = true;
        const links = extraerLinks(data);
    //console.log(links);
   if(validate){
       const linksValidados = links.map((link) => {
           status(link, process.argv[2]).then(response => {
               console.log(response);
               //ressolve(response);
           })
       })
         console.log(linksValidados);
       } else if (validate === false){
           console.log(stats(links));
         //resolve(response);
       } else {
        console.log(links);
         //resolve(response);
       }
      })
