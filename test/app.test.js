const mongoose = require('mongoose');
const connectDB = require('../server/database/database');

describe('connectDB', () => {
  function connect ()  {
        // Connect to test database
    process.env.MONGO_URI = 'mongodb+srv://deosubarno:deosubarno12345@cluster0.llyzn.mongodb.net/todolistdb?retryWrites=true&w=majority';
     mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  };
  beforeAll( () => {
   connect();
  
  });
  function disconnect(){
     mongoose.connection.close();
  }
  afterAll(async () => {
    // Disconnect from test database
    disconnect();
  });

  it('should connect to the database and return a connection object', async () => {
       
    const con = await connectDB();
    expect(con).toBeDefined();
  });

  it('should return false if unable to connect to the database', async () => {
    // Set an invalid MongoDB URI
    process.env.MONGO_URI = 'invalid_uri';
    const con = await connectDB();
    expect(con).toBeFalsy();
  });
});
  

