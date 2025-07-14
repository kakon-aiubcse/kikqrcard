import nextConnect from "next-connect";
import multer from "multer";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

console.log(typeof nextConnect);

// Create uploads directory if it doesn't exist
const uploadDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Configure multer for file uploads with image-only filter
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

// Create API route handler using next-connect
const handler = nextConnect({
  onError(err, req, res) {
    res.status(500).end(`Something went wrong! ${err.toString()}`);
  },
  onNoMatch(req, res) {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  },
});

// Use multer middleware to handle single file upload for 'profileImage'
handler.use((req, res, next) => {
  upload.single("profileImage")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
});

// POST /api/signupapi
handler.post(async (req, res) => {
  const uri = process.env.MONGODB_URI;
  if (!uri) return res.status(500).json({ error: "MongoDB URI not configured" });

  const client = new MongoClient(uri);

  const { name, email, phone, password } = req.body;
  const profileImagePath = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    await client.connect();
    const db = client.db("kikqrcard");
    const users = db.collection("users");

    // Check if email already exists
    const existing = await users.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already in use" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await users.insertOne({
      name,
      email,
      phone,
      password: hashedPassword,
      profileImage: profileImagePath,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "User created", userId: result.insertedId });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Signup failed", details: error.message });
  } finally {
    await client.close();
  }
});

// Disable Next.js default body parsing (so multer can work)
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
