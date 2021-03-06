var express = require("express");
var router = express.Router();
var articleModel = require("../models/articles");
var orderModel = require("../models/orders");

var uniqid = require("uniqid");
const fs = require("fs");
const { exec } = require("child_process");
// var cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: 'cedric',
//   api_key: '544843767135618',
//   api_secret: 'FRzV3kMqg2-g8mpCduExkzLFY1o'
// });

router.post("/create-article", async function (req, res, next) {
  console.log("---REQ.BODY SUR LE ROUTE CREATE ARTICLE---", req.body);

  var result = false;
  var error = [];
  var saveArticle = null;

  if (
    req.body.categoryFromFront == "" ||
    req.body.subCategoryFromFront == "" ||
    req.body.brandFromFront == "" ||
    req.body.state == "" ||
    req.body.price == "" ||
    req.body.titleFromFront == "" ||
    req.body.urlFromFront == "" ||
    req.body.descriptionFromFront == ""
  ) {
    error.push("Tous les champs doivent être remplis ou sélectionnés");
  }

  if (error.length == 0) {
    var newArticle = new articleModel({
      category: req.body.categoryFromFront,
      subCategory: req.body.subCategoryFromFront,
      brand: req.body.brandFromFront,
      state: req.body.stateFromFront,
      price: req.body.priceFromFront,
      title: req.body.titleFromFront,
      images: req.body.urlFromFront,
      description: req.body.descriptionFromFront,
      sellerToken: req.body.sellerToken,
      creationDate: new Date(),
      isVisible: true,
    });

    saveArticle = await newArticle.save();

    if (saveArticle) {
      result = true;
    }
  }
  res.json({ result, saveArticle, error });
});

router.get("/get-all-articles", async function (req, res, next) {
  let products = await articleModel
    .find({ isVisible: true })
    .sort({ creationDate: -1 });
  console.log(
    "---PRODUCTS DANS SUR LE ROUTE ARTICLES GET ALL ARTICLES---",
    products
  );
  res.json({ products });
});

router.post("/upload", async function (req, res, next) {
  console.log("hello1 req query upload", req.query);

  var imagePath = "./tmp/ " + uniqid() + "avatar.jpg";
  console.log("hello2-------------- imagePath", imagePath);

  var resultCopy = await req.files.avatar.mv(imagePath);
  console.log("fichiers", req.files.avatar);
  console.log("hello3-----------resultCopy", resultCopy);

  if (!resultCopy) {
    var resultCloudinary = await cloudinary.uploader.upload(imagePath);
    res.json(resultCloudinary);
    console.log("hello4 ----------- resultCloudinary", resultCloudinary);
  } else {
    res.json({ error: resultCopy });
  }

  fs.unlinkSync(imagePath);
});

router.get("/filter-articles", async function (req, res, next) {
  console.log("sub cat from filter", req.query.subcat);
  let products = await articleModel
    .find({ subcategory: req.query.subcat, isVisible: true })
    .sort({ creationDate: -1 });
  console.log(products);
  res.json({ products });
});

router.get("/get-article-by-seller", async function (req, res, next) {
  console.log("---REQ.QUERY---", req.query);
  let products = await articleModel
    .find({ sellerToken: req.query.sellerToken })
    .sort({ creationDate: -1 });
  res.json({ products });
  console.log(
    "---QU'EST CE QUE PRODUCTS SUR LA ROUTE GET ARTICLE BY SELLER---",
    products
  );
});

router.get("/get-article-by-buyer", async function (req, res, next) {
  console.log("route get article by buyer", req.query);

  var order = await orderModel.find({ clientId: req.query.buyerToken });

  console.log(order);

  var articlesTab = [];
  var articlesTabValidate = [];
  for (var i = 0; i < order.length; i++) {
    if (order[i].orderState == "En cours") {
      var articles = await articleModel.findOne({ _id: order[i].articleId });
      articlesTab.push(articles);
    } else {
      var articles = await articleModel.findOne({ _id: order[i].articleId });
      articlesTabValidate.push(articles);
    }
  }

  console.log(articlesTab);
  console.log(articlesTabValidate);

  res.json({ articlesTab, articlesTabValidate });
});
// ---------------- travail sur route delete dans mes annonces

router.post("/cancel-article", async function (req, res, next) {
  var returnDb = await articleModel.deleteOne({ _id: req.body.idArticle });
  console.log("------requ body-----------------", returnDb);

  var result = false;
  if (returnDb.deletedCount == 1) {
    result == true;
  }

  res.json({ result });
});

// ---------------- fin travail sur route delete dans mes annonces

module.exports = router;
