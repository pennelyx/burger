var express = require ("express");

var router = express.Router();

var burger = require ("../models/burger.js");

router.get("/", function(req, res) {
	burger.selectAll (function(data) {
		var devouredBurger = [];
		var unDevouredBurger = [];
		for (i = 0; i<data.length; i++) {
			if(data[i].devoured == 0){
				unDevouredBurger.push(data[i]);
			}
			else {
				devouredBurger.push(data[i]);
			}
		}
		var hbsObject = {
			devouredBurger: devouredBurger,
			unDevouredBurger: unDevouredBurger
		};
		console.log(hbsObject);
		res.render("index", hbsObject);
	});
});

router.post("/", function(req, res) {
	burger.insertOne([
		"burger_name", "devoured"
		], [
		req.body.burger_name, false
		], function(){
			res.redirect("/");
	});
});

router.put("/:id", function(req, res) {
	var condition = "id = " + req.params.id;
	var newVal = "devoured = " + req.body.devoured;
	console.log(newVal + condition);
	burger.updateOne(newVal, condition, function() {
		res.redirect("/");
	});
});

module.exports = router;