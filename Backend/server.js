const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const app = express();
const db = require('./src/config/db');
const PORT = process.env.PORT || 8080;
const path = require('path');

const dirName = path.dirname(__filename);

app.use(bodyParser.json());
app.use(cors());

app.use("/uploads", express.static(path.join(dirName, 'uploads')));

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log(req.body);
});

app.post("/api/add-user-data", (req, res) => {
  const { emailLogin, passLogin, nameLogin, roleLogin } = req.body;

  const query = `INSERT INTO  master_user(EMail,Password,Name,Role)
                  VALUES(?,?,?,?)`

  db.query(query, [emailLogin, passLogin, nameLogin, roleLogin], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to add user data" });
    }
    res.status(200).json({ message: "User data inserted successfully" });
  });
});

app.get('/api/fetch-user-data/', (req, res) => {
  const query = `SELECT * FROM master_user`;

  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to validate user data" });
    }
    res.status(200).json({ master_user: results });
  });
});

app.delete("/api/delete-admin-user-data/:id", (req, res) => {
  const id = req.params.id;

  const query = `DELETE from master_user WHERE ID=?`;

  db.query(query, [id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to delete user data" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  });
});

app.get('/api/fetch-user-data-atAdmin/', (req, res) => {
  const query = `SELECT * FROM master_user WHERE role='user'`;

  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to fetch users data" });
    }
    res.status(200).json({ master_user_admin: results });
  });
});

app.put("/api/edit-user-data/", (req, res) => {

  const { emailEdit, nameEdit, idEdit } = req.body;

  const query = `UPDATE master_user SET EMail = ?, Name = ? WHERE ID = ?`;

  db.query(query, [emailEdit, nameEdit, idEdit], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to edit user data" });
    }
    res.status(200).json({ message: "User Data edited successfully" });
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

app.post("/api/upload-movie", upload.single('image'), (req, res) => {

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const movieImage = req.file.filename;
  const movieName = req.body.movieName || '';
  const movieDirector = req.body.movieDirector || '';
  const movieProducer = req.body.movieProducer || '';
  const movieActor = req.body.movieActor || '';
  const movieYear = req.body.movieYear || '';
  const movieShortDesc = req.body.movieShortDesc || '';
  const movieLongDesc = req.body.movieLongDesc || '';
  const movieRating = req.body.movieRating || '';


  const query = `INSERT INTO movieList (MovieName,MovieDirector,MovieProducer,MovieActor,MovieYear,MovieSDesc,MovieLDesc,MovieRating,Image) VALUES (?,?,?,?,?,?,?,?)`;

  db.query(query, [movieName, movieDirector, movieProducer, movieActor, movieYear, movieShortDesc, movieLongDesc, movieRating, movieImage], (err, result) => {
    if (err) {
      return res.status(400).json({ message: "Error Inserting data." })
    }
    res.status(200).json({ message: "Data uploaded successfully." })
  })

})

app.get("/api/get-movie", (req, res) => {
  const query = `SELECT * FROM movieList`;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(400).json({ message: "Error fetching data." })
    }
    res.status(200).json({ get_movie: result })
  })
})

app.get("/api/get-selected-movie/:itemId", (req, res) => {

  const itemID = req.params.itemId;

  const query = `SELECT * FROM movieList WHERE ID=?`;

  db.query(query, [itemID], (err, result) => {
    if (err) {
      return res.status(400).json({ message: "Error fetching data." })
    }
    res.status(200).json({ get_selected_movie: result })

  })
})
app.post("/api/upload-favourite-movie", upload.single('image'), (req, res) => {


  const image = req.body.image || '';
  const movieName = req.body.movieName || '';
  const movieDirector = req.body.movieDirector || '';
  const movieProducer = req.body.movieProducer || '';
  const movieActor = req.body.movieActor || '';
  const movieYear = req.body.movieYear || '';
  const movieShortDesc = req.body.movieShortDesc || '';
  const movieLongDesc = req.body.movieLongDesc || '';
  const movieRating = req.body.movieRating || '';
  const userEmail = req.body.email || '';

  console.error(req.body.image)


  const query = `INSERT INTO favoriteMovies (UserMail,MovieName,MovieDirector,MovieProducer,MovieActor,MovieYear,MovieSDesc,MovieLDesc,MovieRating,Image) VALUES (?,?,?,?,?,?,?,?,?,?)`;

  db.query(query, [userEmail, movieName, movieDirector, movieProducer, movieActor, movieYear, movieShortDesc, movieLongDesc, movieRating, image], (err, result) => {
    if (err) {
      // console.error("Database insertion error:", err);
      return res.status(400).json({ message: "Error Inserting data." })
    }
    res.status(200).json({ message: "Data uploaded successfully." })
  })

})

app.get("/api/get-favourite-movie/:usermail", (req, res) => {

  const userMail = req.params.usermail;

  const query = `SELECT * FROM favoriteMovies WHERE UserMail=?`;

  db.query(query,[userMail], (err, result) => {
    if (err) {
      return res.status(400).json({ message: "Error fetching data." })
    }
    res.status(200).json({ get_favourite_movie: result })
  })
})

app.delete("/api/delete-favourite-movie/:id", (req, res) => {

  const ID = req.params.id;

  const query = `DELETE FROM favoriteMovies WHERE ID=?`;


  db.query(query,[ID], (err, result) => {
    if (err) {
      return res.status(400).json({ message: "Error deleting data." })
    }
    res.status(200).json({ delete_favourite_movie: result })
  })
})

app.post("/api/upload-shows", upload.single('image'), (req, res) => {

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const showsImage = req.file.filename;
  const showsName = req.body.showsName || '';
  const showsPresentedBy = req.body.showsPresentedBy || '';
  const showsEpisodes = req.body.showsEpisodes || '';
  const showsSeasons = req.body.showsSeasons || '';
  const showsNetwork = req.body.showsNetwork || '';
  const showsShortDesc = req.body.showsShortDesc || '';
  const showsLongDesc = req.body.showsLongDesc || '';
  const showsRating = req.body.showsRating || '';


  const query = `INSERT INTO showsList (ShowName,ShowPresentedBy,ShowEpisodes,ShowSeasons,ShowNetwork,ShowSDesc,ShowLDesc,ShowRating,Image) VALUES (?,?,?,?,?,?,?,?)`;

  db.query(query, [showsName, showsPresentedBy, showsEpisodes, showsSeasons, showsNetwork, showsShortDesc, showsLongDesc,showsRating, showsImage], (err, result) => {
    if (err) {
      return res.status(400).json({ message: "Error Inserting data." })
    }
    res.status(200).json({ message: "Data uploaded successfully." })
  })

})

app.post("/api/upload-favourite-show", upload.single('image'), (req, res) => {


  const image = req.body.image || '';
  const showName = req.body.showName || '';
  const showPresentedBy = req.body.showPresentedBy || '';
  const showEpisodes = req.body.showEpisodes || '';
  const showSeasons = req.body.showSeasons || '';
  const showNetwork = req.body.showNetwork || '';
  const showShortDesc = req.body.showShortDesc || '';
  const showLongDesc = req.body.showLongDesc || '';
  const showRating = req.body.showRating || '';
  const userEmail = req.body.email || '';

  // console.error(req.body.image)


  const query = `INSERT INTO favoriteShows (UserMail,ShowName,ShowPresentedBy,ShowEpisodes,ShowSeasons,ShowNetwork,ShowSDesc,ShowLDesc,ShowRating,Image) VALUES (?,?,?,?,?,?,?,?,?,?)`;

  db.query(query, [userEmail, showName, showPresentedBy, showEpisodes, showSeasons, showNetwork, showShortDesc, showLongDesc, showRating, image], (err, result) => {
    if (err) {
      // console.error("Database insertion error:", err);
      return res.status(400).json({ message: "Error Inserting data." })
    }
    res.status(200).json({ message: "Data uploaded successfully." })
  })

})

app.get("/api/get-favourite-show/:usermail", (req, res) => {

  const userMail = req.params.usermail;

  const query = `SELECT * FROM favoriteShows WHERE UserMail=?`;

  db.query(query,[userMail], (err, result) => {
    if (err) {
      return res.status(400).json({ message: "Error fetching data." })
    }
    res.status(200).json({ get_favourite_show: result })
  })
})

app.get("/api/get-shows", (req, res) => {
  const query = `SELECT * FROM showsList`;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(400).json({ message: "Error fetching data." })
    }
    res.status(200).json({ get_shows: result })
  })
})

app.get("/api/get-selected-show/:itemId", (req, res) => {

  const itemID = req.params.itemId;

  const query = `SELECT * FROM showsList WHERE ID=?`;

  db.query(query, [itemID], (err, result) => {
    if (err) {
      return res.status(400).json({ message: "Error fetching data." })
    }
    res.status(200).json({ get_selected_show: result })

  })
})
app.delete("/api/delete-favourite-show/:id", (req, res) => {

  const ID = req.params.id;

  const query = `DELETE FROM favoriteShows WHERE ID=?`;


  db.query(query,[ID], (err, result) => {
    if (err) {
      return res.status(400).json({ message: "Error deleting data." })
    }
    res.status(200).json({ delete_favourite_show: result })
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
