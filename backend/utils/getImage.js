const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

const getImage = async (fileId) => {
  const db = mongoose.connection.db;
  const bucket = new GridFSBucket(db, {
    bucketName: 'uploads'
  });

  const _id = new mongoose.Types.ObjectId(fileId);
  const files = await db.collection('uploads.files').findOne({ _id });

  if (!files) throw new Error('No file found');

  const readStream = bucket.openDownloadStream(_id);
  return { readStream, file: files };
};

module.exports = { getImage };
