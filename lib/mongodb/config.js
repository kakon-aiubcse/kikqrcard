import { MongoClient } from 'mongodb';


const client = new MongoClient(process.env.MONGODB_URI, { tlsAllowInvalidCertificates: true });
;

async function connect() {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db('kikqrcarddb'); // replace with your DB name or create one later
}

export default connect;
