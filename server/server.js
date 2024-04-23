const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

const port = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: process.env.REACT_APP_BASE_URL,
    methods: ["GET", "POST", "DELETE", "PATCH"],
  })
);
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/user", userRoutes);

// Connect to DB
console.log("Connecting to the database ...");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(port, () => {
      console.log(`Connected to the Database\nListening on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
