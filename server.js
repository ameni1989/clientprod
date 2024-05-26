console.log("bonjour la vie");
const express=require('express');
const app=new express()
// . represente le repertoire actuel
require('./config/connect')

 app.use(express.json());
const Client= require('./models/clients')
const Produit= require('./models/produits')
// '/' est la route racine
app.get('/A', function (req, res) {
  res.send('heloo !');
});


app.get('/b', function (req, res) {
   console.log('ameni !');
  });

//   app.post('/add', function (req, res) {
//     console.log('update workss node js 2023!');
//    });

app.post('/add',  (req, res)=> {

    data=req.body
    client=new Client(data);
    client.save()
    .then (
      (saved)=>{
        console.log('erregisrr')
          res.send(saved)
         

      })
  .catch (
    (err)  =>{
      res.send(err)
    }
  )

        
    
    
    console.log(data)

   });


app.post('/creer',async (req,res)=>{
 try{
  data=req.body
  client=new Client(data);
  saveduser=await client.save()
  res.send(saveduser);
 }
catch (error) {
  console.log(error);

}

})

app.get('/getall',(req,res)=>{

Client.find()
.then (
  (clients)=>{
      res.send(clients)

  })
.catch (
(err)  =>{
  res.send(err)
})


})


app.get('/getbyid/:id',(req,res)=>{

  myid=req.params.id
  Client.findById(myid)
  .then (
    (client)=>{
        res.send(client)
  
    })
  .catch (
  (err)  =>{
    res.send(err)
  })
  
  
  })

app.delete ('/delete/:id', (req,res)=>{
  myid=req.params.body
   Client.deleteOne(myid)
   .then(
    (deleted)=>{
      res.json({client:deleted,message:"suprimé"})
    }
   )
   .catch (
    (err)  =>{
      res.send(err)
    })
    
})


app.put('/update_img/:id', (req, res) => {
  const myid = req.params.id; // Récupérer l'ID de l'URL
  const mydata = req.body; // Récupérer les données du corps de la requête

  Client.updateOne({ _id: myid },  { $set: { age: 111 } })
    .then(() => {
      res.json({ message: 'Mise à jour réussie' });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});


app.get('/filterbyage', (req, res) => {
//  const age = req.params.age;
  // Min=parseInt(req.params.minage)
  // Max=parseInt(req.params.maxage)
  const age=req.body.age
  // const minage=req.body.minage
  // const maxage=req.body.maxage
  // Utilisez la méthode "find" de Mongoose pour rechercher les clients avec l'âge spécifié
  // Client.find({ age: age })
  Client.find({ age: { $lt:age } })
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      res.send(error);
    });
});

//produits
// diskStorage methode dans multer utilisé pour stocker les images
//  téléchargées
const multer=require ('multer')
filename=""
// methode split retourne un tableau ["image", "jpeg"].
  //  la valeur associée à cette propriété (filename) est une fonction de rappel (qui prend req, file, et redirect comme paramètres). Cette fonction de rappel sera appelée par Multer 
  // lorsque le nom de fichier doit être généré pour un fichier téléchargé.
 const mystorage=multer.diskStorage
  ({ destination:'./uploads',  filename:(req,file, redirect)=>{
	  
     console.log( "ff" +file)
	    console.log("Informations sur le fichier:", file);
    let f1=Date.now()+'.'+ file.mimetype.split ('/')[1];
    //  f1=file.originalname;

    // gère la redirection du flux du fichier vers le bon emplacement de stockage pour l'enregistrement.
    redirect(null,f1);

filename=f1;
console.log(f1)

  }})
const upload=multer({storage:mystorage})


    // file.mimtype: image/png=> c'est une image au format png
  
  //  Donc, lorsque vous appelez redirect(null, f1);, vous dites à Multer que le nom du fichier 
  // à enregistrer est f1. Multer utilisera ensuite ce nom pour enregistrer le fichier téléchargé dans le répertoire
  //  de destination spécifié dans la configuration.


  // vous dites à Multer d'utiliser la méthode de stockage personnalisée spécifiée dans mystorage lorsque 
  // vous téléchargez des fichiers à l'aide de cette instance Multer.
  // la variable upload contient la methode de stockage.
 

//  upload.any('imagee') indique à Multer de gérer les fichiers téléchargés dans cette route spécifique.
  //  Plus précisément, any('imagee') signifie que cette route acceptera n'importe quel type de fichier (any) avec le champ de formulaire nommé "imagee". Cela permet de 
  // télécharger des fichiers dans la requête POST.
  // 
app.post('/creer_prod',upload.any('imagee'),(req,res)=>{
 
  
   let data=req.body
   console.log(data)
  //   crée une nouvelle instance d'une classe produit en utilisant les données stockées dans la variable data
   let produit=new Produit(data);
    produit.imagee=filename;
   produit.save()
   .then (
    (prod)=>{
       
          res.send(prod)
    }
   )
   .catch (
    (err)=>{
       res.json (err)
    }
   )

})

// express.static permet de rendre les images statiques, accessibles via des URLs 
app.use('/getimages',express.static('./uploads'))
app.get('/getbyid_prod/:id', (req,res)=>{
 myid=req.params.id

  Produit.findById(myid)

  .then (
   (produit)=>{
         res.json(produit)
   }
  )
  .catch (
   (err)=>{
      res.json (err)
   }
  )

})


app.get('/filter_prix/:min/:max',(req,res)=>{

min=req.params.min;
max=req.params.max;
if (isNaN (min)|| isNaN (min)){
  res.json("tapez des nombres valides")

};
Produit.find ({price: {$gte:min, $lte:max}})
.then (

  
  (produits)=>{
    if (produits==0){
      res.json('produit non trouvé')
    }
    else {
    res.json(produits)}
  }
)


})

app.put ('/update_prod/:id',upload.any('imagee'),(req,res)=>{
  myid=req.params.id;
  data=req.body

  if (filename.length>0) {
    data.imagee=filename;

  }
  Produit.findByIdAndUpdate ({_id:myid},data)
  .then (
    (produit)=>{
    if(!produit){
      res.send("Produit n'est pas trouvé")
    }
      res.send(produit)
    }
  )
  .catch(
    (err)=>{
      console.log(err)
    }
  )
})


app.listen(3000, ()=>{
    console.log("server work");
})


