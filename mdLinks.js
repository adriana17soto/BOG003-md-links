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

/*leerArchivoP(process.argv[2], options = {validate:false, stats:true})
        // leerArchivoP(process.argv[2], options)
  .then((data) => {
        const validate = false;
        const links = extraerLinks(data);
    //console.log(links);
   if(validate){
       const linksValidados = links.map((link) => {
           status(link).then(response => {
               console.log('holaaaaa1', response);
               //ressolve(response);
           })
       })
         console.log(linksValidados);
       } else if (options.validate === false && options.stats === true){
           console.log(statsLinks(links));
         //ressolve(response);
       } else {
        console.log(links);
         //ressolve(response);
       }
    })*/
/*leerArchivoP("prueba.md")
.then((data)=>{
    //console.log(data);
    
    const links = extraerLinks(data);
  //  if( === true){
        console.log(links);
})*/
/*
leerArchivoP("README.md")
  .then((data) => {
        const validate = true;
        const links = extraerLinks(data);
    //console.log(links);
   if(validate){
       const linksValidados = links.map((link) => {
           status(link).then(response => {
               console.log(response);
               //ressolve(response);
           })
       })
         console.log(linksValidados);
       }else{
        console.log(links);
         //ressolve(response);
       }
         })
 */

    /*    leerArchivoP(process.argv[2], options = {validate:false, stats:true})
        // leerArchivoP(process.argv[2], options)
  .then((data) => {
        const validate = false;
        const links = extraerLinks(data);
    //console.log(links);
   if(validate){
       const linksValidados = links.map((link) => {
           status(link).then(response => {
               console.log('holaaaaa1', response);
               //ressolve(response);
           })
       })
         console.log(linksValidados);
       } else if (options.validate === false && options.stats === true){
           console.log(statsLinks(links));
         //ressolve(response);
       } else {
        console.log(links);
         //ressolve(response);
       }
    })
     */
    /*
    leerArchivoP(process.argv[2])
  .then((data) => {
        const validate = false;
        const links = extraerLinks(data);
    //console.log(links);
   if(validate){
       const linksValidados = links.map((link) => {
           status(link).then(response => {
               console.log('holaaaaa1', response);
               //ressolve(response);
           })
       })
         console.log(linksValidados);
       } else if (validate === false){
           console.log(stats(links));
         //ressolve(response);
       } else {
        console.log(links);
         //ressolve(response);
       }
      })

*/
        //  mdLinks(process.argv[2], options = {validate:true, stats:false})
        //  .then(res => console.log("Muy bien", res)).catch(err => console.log("Dio error la funcion", err));



        //   else if (options.validate === false && options.stats === true) {
        //     fileOrDirectory(path)
        //         .then(res => {
        //             resolve(statsLinks(res));
        //         })
        //         .catch(err => {
        //             reject(err)
        //         })
        // }
         // Stats para los links, total y unique.





// leerArchivoP("prueba.md")
//   .then((data) => {
//     const links = extraerLinks(data);
//     console.log(links);
//    if(argv.v){
//      data.forEach(element =>{
//        status(element).then((v) => {
//          console.log(v)
//        })
//          .catch((err) => {
//            console.log(err)
//          })
//      });
//   }
//   });
/*
status(file).then((response) => {
    if(options.validate === true) {
      resolve(response);
      //console.log(response);
    } else {
      resolve(res);
    }
  });*/
  //module.exports = mdLinks;


























