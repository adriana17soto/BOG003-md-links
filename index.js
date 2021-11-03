/*
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
   */
   /* 
}
const extraerLinks = (contenido, file) => {
    let links = [];
    const renderer = new marked.Renderer();
    renderer.link = (href, file, text) => {
     links.push({
      href: href,
      text: text,
      file: file,
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
*/





const path = require("path");
const fs = require("fs");
const resolve = require("path").resolve;
//const { resolve } = require('path');

const fileHound = require("filehound");
const axios = require("axios");
const marked = require("marked");
const { RSA_NO_PADDING } = require("constants");

//const { options } = require("marked");
//const { default: axios } = require("axios");
/*
const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    fileOrDirectory(path)
      .then((files) => {
        //console.log(files)
        resolve(files);
      })
      .catch((err) => {
        reject(err);
      });
  });
};*/


/*
// Función mdLinks // 
const mdLinks = (path, options) => {
  const absolutePath = resolve(path);
  return new Promise((resolve, reject) => {
    fileOrDirectory(absolutePath)
      .then((res)=> {
        if(res === true) {
          return readDirectory(absolutePath).then((files) => {
            files.forEach(file =>{
              fileExt(file).then((res) => {
              })
            })
          })
        } else {
          resolve(fileExt(absolutePath))
        }
      })
      .catch((err) => {
        reject(err);
      })
  });
};*/



//Función mdLinks // 
const mdLinks = (path, options) => {
  const validate = {
    validate: true,
    validate: false
  };
  const absolutePath = resolve(path);
  return new Promise((resolve, reject) => {
    fileOrDirectory(absolutePath)
      .then((res)=> {
        if(res === true) {
          return readDirectory(absolutePath).then((files) => {
            files.forEach(file =>{
              fileExt(file).then((res) => {

              });
            });
          });
        } else {
          fileExt(absolutePath).then((res) => {
            return res.map((file) => {
              status(file).then((response) => {
                if(options.validate === true) {
                  resolve(response);
                  //console.log(response);
                } else {
                  resolve(res);
                }
              });
            });
          })
        }
      })
      .catch((err) => {
        reject(err);
      });
    });
  };
  
const isDirectory = (route) => {
  return new Promise((resolve, reject) => {
    fs.stat(route, (err, stat) => {
      if(err) return reject("No hay un directorio en esta ruta",err);
      return resolve(stat.isDirectory());
    })
  })
}

//Funcion que valida si es archivo o directorio
const fileOrDirectory = (path) => {
  return new Promise((resolve, reject) => {
    fs.lstat(path, (err, stats) => {
      if (err) {
        reject("La ruta o el archivo no es válido");
        //console.log("el archivo o la ruta no es valido");
        //Aqui capturamos el error de las promesas
        // reject(`Encontramos un error: La ruta o el archivo no es válido`);
      } else if (stats.isDirectory()) {
        resolve(readDirectory(path));
      } else {
        //resolve([path]);
        resolve(routeFile(path));
        //resolve(mdFile(pathUser)); descomentar
      }
    });
  });
};

//Esta Funcion busca archivos .MD
const routeFile = ((file) => {
  return new Promise((resolve, reject) => {
    let exten = path.extname(file);
    if (exten === ".md") {
      resolve(fileExt(file));
    } else {
      reject("Este archivo no tiene una extensión .md, pruebe con otro archivo o directorio");
    }
  })
})

// Función que extrae links, texto y rutas de archivos con extensión "md"

//const getLinks = (data, file) => {
const readLinks = (data, file) => {
  //mark.js es una biblioteca escrita en JavaScript que puede transcodificar(un archivo pasa a otro formato) Markdown en línea

  //Usando un custom renderer de marked (new marked.Renderer()).

  let links = [];

  const renderer = new marked.Renderer();

  //renderer Las opciones le permiten utilizar estilos personalizados para renderizar
  renderer.link = (href, title, text) => {
    links.push({
      href: href,
      text: text,
      file: file,
    });
  };
  marked(data, {
    renderer: renderer,
  });

  if (links.length === 0) {
    console.log(`no hemos encontrado ningún enlace en ${file}`);
  }

  return links;
};

//funcion que lee archivos md

const fileExt = ((file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      }
      console.log(data);
      //resolve("Hola, esta es la funcion fileExt")
      resolve(readLinks(data, file));
    })
  })
});

// funcion que imprime en terminal los archivos que concuerden con la extención del formato markdown ".md".
const readDirectory = (route) => {
  return new Promise((resolve, reject) => {
      fileHound.create()
          .paths(route)
          .ext(".md")
          .find()
          .then((res) => {
              // console.log(res)

              const results = [];

              res.forEach(file => {
                  results.push(fileExt(file));
              });

              resolve(Promise.all(results));
          })
          .catch(err => {
              reject(err, "La ruta no es válida");
          })
  })
};
/*const readDirectory = (route) => {
  return new Promise((resolve, reject) => {
      FileHound.create()
          .paths(route)
          .ext(".md")
          .find()
          .then((res) => {
            resolve(res);
            console.log(res)
          })
          .catch((err) => {
            reject(err, "El directorio no existe");
          })
})
};*/


const status = (Link) => {
  return new Promise((resolve, reject) => {
    axios
      .get(Link.href)
      .then((response) => {
        resolve({
          href: Link.href,
          text: Link.text,
          file: Link.file,
          status: response.status,
          ok: response.statusText,
        });
      })
      .catch((error) => {
        resolve({
          href: Link.href,
          text: Link.text,
          file: Link.file,
          status: error.errno,
          statusText: "FAIL",
        });
      });
  });
};
// axios.get("https://www.youtube.com/watch?v=TaMpkIcw4jM").then((response) => {
//   console.log("chao");
// }).catch((err) => {
//   console.log("Hola")
// })


 //mdLinks("prueba.md", {});
 //mdLinks("./archivos", {});
//mdLinks(process.argv[2], options = {validate:true, stats:false}).then(res => console.log("Muy bien", res)).catch(err => console.log("Dio error la funcion", err));

mdLinks(process.argv[2], options = {validate:true, stats:false})
  .then((res) => {
   console.log("Muy bien", res);
  })
  .catch(err => 
    console.log("Dio error la funcion", err));

mdLinks("filetest.md")
.then((res) => {
 console.log("Respuesta final ", res);
})
.catch((err) => {
  console.log("Error", err);
})