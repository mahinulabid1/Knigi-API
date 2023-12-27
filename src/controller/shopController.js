// controller fetches model 
//and do data operations

const ShopModel = require('../model/shopModel');
const fs = require('fs');
const {
  mongoose,
  generateUniqueKey,
  s3,
  app,
  cloudFrontUrl
} = require('../../index');

const { imageInput, deleteImageFile } = require('../AWS_S3/FileController');


class UploadData { // probable future name : InsertRecord

  async shopData(dataObj, fileNameCollection) {
    // upload data to mongodb
    const data = JSON.parse(dataObj);
    const productImage = fileNameCollection.productImage;
    const thumbnail = fileNameCollection.thumbnail;

    const imageInfo = {

      productImage: {
        url: `${cloudFrontUrl}/shopItem/${productImage}`,
        imageName: productImage
      },

      thumbnail: {
        url: `${cloudFrontUrl}/shopItem/${thumbnail}`,
        imageName: thumbnail
      }
    }

    data.imageCollection = imageInfo;
    const prepInsertion = new ShopModel(data);
    prepInsertion.save();
  }

}


class GetData {
  constructor() {
    this.executionDuration = undefined;
  }

  async allShopItem(limit) {
    if (limit === undefined) {
      limit = null;
    }

    let execStartTime = Date.now();
    const data = await ShopModel.find({ /* find all */ }).limit(limit);
    this.executionDuration = Date.now() - execStartTime;
    console.log(`Finished fetching data. Took time: ${this.executionDuration}ms`);
    return data;
  }

  async getItemById(id) {
    let execStartTime = Date.now();
    const data = await ShopModel.findById(id);
    this.executionDuration = Date.now() - execStartTime;
    data === null ? data = 'No data found!' : console.info(`Data Fetching Complete. Took time: ${this.executionDuration}ms`);
    return data;
  }
}


class UpdateDB {
  constructor() {
    this.executionDuration = undefined;
  }

  async itemById(id, data, option) {

    // error handling
    if (id === undefined) {
      console.error('id is not defined updateById(id, data, option) \n Operation Aborted!');
      return;
    } else if (data === undefined) {
      console.error('data is not defined in updateById(id, data, option) \n Operation Aborted!');
      return;
    } else if (id === undefined && data === undefined) {
      console.error('data & id is not defined in updateById(id, data, option) \n Operation Aborted!')
      return;
    }

    option === undefined ? option = null : option = option;
    const execStartTime = Date.now();
    await ShopModel.findByIdAndUpdate(id, data, option);       // data = firstName: 'john', change firstName field Value to 'john'
    const execEndTime = Date.now();
    this.executionDuration = execEndTime - execStartTime;
    console.info(` Data dated successfully. Took time: ${this.executionDuration}ms`);
  }

}


class DeleteRecord {
  constructor() {

  }

  async whereId(id) {
    try {
      await ShopModel.deleteOne({ _id: id });        // {'_id': id} this '' is wrong, I kept getting error
    } catch (err) {
      console.log(`Failed to delete `);
      return;
    }
    console.log(`Deletion Successful id: ${id}`);
  }
}



module.exports = {
  UploadData,
  GetData,
  DeleteRecord,
  UpdateDB
};