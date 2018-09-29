

// Mongodb uses language called bson
// Json is very similar yo json


// Data Types
{
	string: "stay strong, work hard",
	int:405,
	double:1.345,
	boolean:true, // false
	array: [1,2,3],
	object: {attr1: "attr1", attr2: "attr2"},
	date: new Date("<YYYY-mm-dd>"),
	object_id: <ObjectId>,
	no_value: null;

	/* 
additional data types
..................
timestamp
Binary data
Regular expression
JS code
	*/
}
// Inserting student in students collections

inserting objects (key value atribute)
db.students.insertOne({name:"Jack", major:"Biology", gpa:3.3 })

once you run this in terminal 
_id is the unique id created automatically 
mongodb generate unique id also you can insert your own id 
for example
db.students.insertOne({_id:2, name:"Clara", major:"Mathematics", gpa:3.4,
awards:["programming contest winner", "best coder"]})
now she will have custom id 2

you can also insert extra field mongodb has that features 

db.students.insertOne({name:"Shara", major:"Anatomy", gpa:3.5, grades:[80,82,93,90]})

db.students.insertOne({name:"Tory", major:"Accounting", gpa:3.6, contact:{phone:"218-777-2233", email:"sarahp@school.edu"}})

db.students.insertOne({name:"Leah", major:"IT", gpa:3.8, startdate: new Date("2017-08-14")})

db.students.insertMany([{name:"Cody", major:"Computer Science", gpa:3.2},{name:"Clark", major:"Business", gpa:3.8,
awards:["best business model"]}])

###########################################################

=> finding documents in collections
db.students.find({}) // display everything you have in table 


db.students.find({},{_id:0}) // do not display id

db.students.find({},{_id:0}.limit(3)) // shows only top 3 results

db.students.find({},{_id:0}.sort({name:1})) // sort records by name 1 for accesding order and -1 for descending order

db.students.find({},{_id:0}.sort({gps:-1, name:1}) )// sorting by multiple fields, first it will sort gps 
													// descending order and only by name if they have some gpa

db.students.find({major:"IT", name: "Leah"},{_id:0}.sort({name:1}))// and logic finding leah with biology major

// or logic , find all students with IT major or name Cody

db.students.find({$or:[{major:"IT"},{name:"Cody"}]},{_id:0})

// display records gps greater than 3.5

db.students.find({gpa:{$gt:3.5}},{_id:0})   // lte for less than 

// display record with name Cody and Leah

db.students.find({name:{$in:["Cody","Leah"]}},{_id:0}) // NOTE: $nin is for not in 

// display students who has awards

db.students.find({awards:{$exists:true}},{_id:0})

// finding using types 
db.students.find({name:{$type:2}},{_id:0}) // name field as string, string = 2 , all data types has different numbers


// using arrays
db.students.find({"grades.0":80},{_id:0}) // display who has first grades as 80

// display who has grades greater than 80
db.students.find({grades:{$elemMatch:{$gte:80}}},{_id:0})

// display student who has grades size 4
db.students.find({grades:{$size:4}},{_id:0})


##############################################

=> Update and Delete Information from the collections
https://www.youtube.com/watch?v=2yWPqPO6Zkk&list=PLLAZ4kZ9dFpOFJ9JcVW9u4PlSWO-VFoao&index=7

// this will only update one first match record found in collection 
// if you have more than one IT major you need to use updateMany instead.

db.students.updateOne (
	{major:"IT"},   // what to update 
	{
		$set: {major:"Computer Science"}   // what to set, this part is filter
	}
	)

db.students.updateMany(
	{major:"Computer Science"},   // called filters
	{
		$set: {major:"IT"}
	}
	)

// replace the entry

db.students.replaceOne(
	{major:"IT"}, // this is filter 
	{name:"my name", major:"Computer Science", gpa:4.0, startdate: new Date("2017-09-23")}
	)


// deleting the entry in collections

db.students.deleteMany({})   // Deletes all record in collection
// deleteOne works too.

db.students.deleteMany({gpa:{$gte:3.8}}) // deletes all record with gpa greater than 3.8
// deleteOne works too 

###################################################
// bulkWrite in mongodb
// able to combine bunch of different request into one 
// creating array with different objects like insertOne, updateOne, deleteOne
// so you can just make one trip to database

db.students.bulkWrite(
	[
		{
			insertOne: 
			{
				"document": {name:"Terry",major:"Mathematics",gpa:"3.6"}
			}
		},

		{
			insertOne:
			{
				"document": {name:"peter", major:"IT",gpa:2.9}
			}
		},

		{
			updateOne:
			{
				filter:{name:"Terry"},
				update:{$set: {gpa:4.0}}
		}
	},
	{
		deleteOne:
		{
			filter: {name:"Jack"}
	}
	},

	{
		replaceOne: {
				filter: {name:"Clark"},
				replacement: {name:"MoneyGirl", major:"play girl"}
	}
}

	]
);

###############################################

// Text Indexing

db.stores.insertMany(
	[
		{_id:1, name:"Java Hut", description:"Coffee and cakes"},
		{_id:2, name:"Coffee Shop", description:"Just coffee"},
		{_id:3, name:"Burger Buns", description:"Gourmet hamburgers"},
		{_id:4, name:"Clothes Clothes Clothes", description:"Discount clothing"},
		{_id:5, name:"Java Shopping", description:"Indonesian goods"}
	]
	)


// creating text indes in name and description helps finding entries while searching
// so powerful 
db.stores.createIndex({name:"text",description:"text"})

db.stores.find({$text:{$search:"Coffee"}}) // will look for Coffee in both name and description

db.stores.find({$text:{$search:"Java Hut Coffee"}}) // display all with Java, Hut and Coffee

// gives the score how close the search is on each record
// tells you what the relavent database entry is
db.stores.find({$text:{$search:"Java Hut Coffee"}},
				{score: {$meta:"textScore"}}
	)

// sort by the scores

db.stores.find({$text:{$search:"Java Hut Coffee"}},
				{score: {$meta:"textScore"}}
	).sort({score:{$meta:"textScore"}})

###########################################################

// Aggereation in mongodb, helps to process data records
https://www.youtube.com/watch?v=Kk6Er0c7srU&index=10&list=PLLAZ4kZ9dFpOFJ9JcVW9u4PlSWO-VFoao
















