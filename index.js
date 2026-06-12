import express from 'express';

const port = 3000;
const app = express();

let bID = 0;

function Blog(bTitle, bText) {
    bID += 1;
    this.bID = bID;
    this.bTitle = bTitle;
    this.bText = bText;
    this.bDate = new Date().toLocaleString();
}

let db = [];
let index;

// db.push(new Blog("test1", "test text"));
// db.push(new Blog("test1", "test text"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    // console.log(req.body);
    // console.log(db);
    res.locals = {
        title: "MyBlog",
        db: db
    };
    res.render("index.ejs");
});

app.post("/", (req, res) => {
    db.push(new Blog(req.body.title, req.body.text))
    res.locals = {
        title: "MyBlog",
        db: db
    };
    res.render("index.ejs");
});

app.get('/create', (req, res) => {
    res.locals = {
        title: "Create Blog"
    };
    res.render('create.ejs');
});

app.get("/blog/:blogId", (req, res) => {
    res.locals = {
        title: "MyBlog",
        blog: db.find(blog => blog.bID === parseInt(req.params.blogId))
    };
    // console.log(db.find(blog => blog.bID === req.params.blogId));
    res.render('blog.ejs');
    // console.log(db[0]);
});

app.post("/blog/:blogId/delete", (req, res) => {
    index = db.findIndex(blog => blog.bID === parseInt(req.params.blogId));
    db.splice(index, 1);
    res.redirect("/");
});

app.get("/blog/:blogId/edit", (req, res) => {
    res.locals = {
        title: "Edit Blog",
        blog: db.find(blog => blog.bID === parseInt(req.params.blogId))
    };
    res.render('create.ejs');
});

app.post("/blog/:blogId/edit", (req, res) => {
    index = db.findIndex(blog => blog.bID === parseInt(req.params.blogId));
    db[index].bTitle = req.body.title;
    db[index].bText = req.body.text;
    res.locals = {
        title: "MyBlog",
        db: db
    };
    res.redirect("/");
});


app.get("/about", (req, res) => {
    res.locals = {
        title: "About Us"
    }
    res.render("about.ejs");
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
