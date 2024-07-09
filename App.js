const express = require('express');
const { sequelize, User, Post } = require('./models');


const app = express();
app.use(express.json());

// Create a new user
app.post('/users', async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const user = await User.create({ name, email, role });
    return res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(400).json({ error: 'Internal server error' });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// Get a user by UUID
app.get('/users/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({ where: { uuid },
    include:'posts' });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// Create a new post
app.post('/posts', async (req, res) => {
  const { userUuid, body } = req.body;

  try {
    const user = await User.findOne({ where: { uuid: userUuid } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const post = await Post.create({ body, userId: user.id });
    return res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/posts', async(req,res) =>{
  try {
    const posts = await Post.findAll({include:'user'})
    return res.json(posts)
  } catch (error) {
    console.error("Something went wrong");
    return res.status(500).json({error:"Something went wrong"})
    
  }
});
// Update the user

app.put("/users/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  const {name,email, role} = req.body
  
  try {
    const user = await User.findOne({ where: { uuid }});
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.name = name
    user.email = email
    user.role = role
    await user.save()
    
    return res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});


// delete an User

app.delete("/users/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({ where: { uuid }});

    await user.destroy()
    return res.json({message:"user deleted successfully"});
  } catch (error) { 
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});


// Start the server
app.listen(5000, async () => {
  console.log('Server up on port 5000');
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.log(error)
  }})
