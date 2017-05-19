const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const uuid = require('node-uuid');
// const Users = require('./src/database/users');

const app = express();

//服务端CORS跨域处理
app.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
	res.header('X-Powered-By', ' 3.2.1');
	res.header('Content-Type', 'application/json;charset=utf-8');
	next();
});

//连接数据库
mongoose.connect('mongodb://192.168.1.123:27017/vuemusic')
	.then(() => console.log('Connected to DB succesful') //数据库成功
	.catch((err) => console.error(err))); //数据库连接错误


//创建userSchema
var userSchema = new mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	userid: {type: String, required: true},
	// telephone: {type: String, required: true},
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now}
});
var userLikeSchema = mongoose.Schema({
	userid: {type: String, required: true},
	songname: {type: String, required: true},
	singername:{type: String, required: true},
	created_at: {type: Date, default: Date.now}
});

//基于userSchema创建Users模型,每个模型对应mongodb数据库collection
var User = mongoose.model('User', userSchema);
var UserLike = mongoose.model('UserLike', userLikeSchema);
// var userlike = new UserLike({
// 	username: 'wulichuan',
// 	songname: '飘洋过海的来看你'
// });
// userlike.save(callback);
// //创建一个用户实例
// User.create({
// 	username: 'wuwuwu',
// 	password: '12345678',
// 	telephone: '111'
// }, function (err, user) {
// 	if (err) {
// 		console.error(err);
// 	}
// 	else {
// 		console.log(user);
// 	}
// });
// var callback = function (err, data) {
// 	if (err) {
// 	 	console.error(err);
// 	}
// 	else {
// 		console.log(data);
// 	}
// };
// User.find(callback); //查找所有集合文档
// User.findOne({username: 'wulichuan'}, callback); 
// UserLike.findOne({username: 'wuli'}, callback);
// UserLike.update({username: 'wulichuan'}, { '$set': {username: 'wuli'} }, callback);
// User.remove({username: 'wulichuanchuan'}, callback);

app.use(function (req, res, next) {
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	console.log('Client IP:', ip);
	next();
});

app.use(bodyParser.json()); //解析POST请求的body
app.use(bodyParser.urlencoded({ extended: false }));  

app.get('/', (req, res) => {
	res.send('wulichuan!');
});
app.get('/hello', (req, res) => {
	res.send('hello wulichuan!');
});
//restful api
//获取所有用户信息 采用GET请求
app.get('/vuemusic/getUsersList', (req, res) => {
	User.find((err, user) => {
		if (err) {
			res.statusCode = 500;
			console.log('Internal error(%d): %s', res.statusCode, err.message);
			res.send({ error: 'Server error' });
		}
		else {
			// res.end(JSON.stringify(user));
			res.json(user);
		}
	});
});

// //创建用户接口 采用POST请求
// app.post('/vuemusic/register', (req, res) => {
// 	// console.log("请求内容："+req.body);
// 	User.findOne({username: req.body.UserName},(err,userdata) => {
// 		if(err) {
// 			console.log('网络异常' + err);
// 			res.status(500).send('网络异常'+err);
// 		}else if(userdata) {
// 			console.log('用户名'+ userdata.username +'已存在');
// 			res.status(201).send('用户名'+ userdata.username +'已存在');
// 		}else {
// 			User.create({
// 				username: req.body.UserName,
// 				password: req.body.Password,
// 				userid: uuid.v1().replace(/-/g, ""),  //产生一个v1(基于时间的) id
// 				}, (err, user) => {
// 					if (!err) {
// 						console.log('用户创建成功');
// 						res.send({status: 'OK!'});
// 					}
// 					else {
// 						if (err.name === 'ValidationError') {
// 							res.status(400).send({error: 'Validation error'});
// 						}
// 						else {
// 							res.status(500).send({error: 'Server error'});
// 						}						
// 					}
// 				});
// 			}
// 	})
	
// });

//创建用户接口 采用POST请求
app.get('/vuemusic/register/:UserName/:Password', (req, res) => {
	// console.log("请求内容："+req.body);
	User.findOne({username: req.params.UserName},(err,userdata) => {
		if(err) {
			console.log('网络异常' + err);
			res.status(500).send('网络异常'+err);
		}else if(userdata) {
			console.log('用户名'+ userdata.username +'已存在');
			res.status(201).send('用户名'+ userdata.username +'已存在');
		}else {
			User.create({
				username: req.params.UserName,
				password: req.params.Password,
				userid: uuid.v1().replace(/-/g, ""),  //产生一个v1(基于时间的) id
				}, (err, user) => {
					if (!err) {
						console.log('用户创建成功');
						res.send({status: 'user created OK!'});
					}
					else {
						if (err.name === 'ValidationError') {
							res.status(400).send({error: 'Validation error'});
						}
						else {
							res.status(500).send({error: 'Server error'});
						}						
					}
				});
			}
	})
	
});

//用户登录接口 采用GET方式
app.get('/vuemusic/login/:UserName/:Password', (req, res) => {
	User.findOne({username: req.params.UserName},(err,userdata) => {
		if(err) {
			console.log('网络异常' + err);
			res.status(500).send('网络异常'+err);
		}else if(!userdata) {
			// console.log('用户名'+ userdata.username +'不存在');
			res.status(404).send('用户名不存在');
		}else {
			if(userdata.password !== req.params.Password) {
				res.status(404).send('密码错误，请检查');
			}
			else {
				res.status(200).send(userdata.userid +' '+ userdata.username);
			}
		}
	})
});

// //获取指定用户信息接口 GET
// app.get('/api/GetUserInfo/:id', function (req, res) {
// 	return UsersModel.findOne(req.params.id, function (err, user) {
// 		if (!user) {
// 			res.statusCode = 404;
// 			return res.send({error: 'Not found'});
// 		}
// 		if (!err) {
// 			// res.statusCode = 200;
// 			return res.send({status: 'OK', user: user});
// 		}
// 		else {
// 			res.statusCode = 500;
// 			console.log('Internal error(%d): %s', res.statusCode, err.message);
// 			return res.send({ error: 'Server error' });
// 		}
// 	});
// });
// //修改用户信息接口 PUT
// app.put('/api/modifyUserInfo/:id', function (req, res) {
// 	return UsersModel.findById(req.params.id, function (err, user) {
// 		if (!user) {
// 			res.statusCode = 404;
// 			return res.send({ error: err });
// 		}
// 		else {
// 			user.name = req.body.title;
// 			user.password = req.body.description;
// 			user.telephone = req.body.author;
// 			user.updated_at = Date.now;
// 		}
// 		return user.save(function (err) {
// 			if (!err) {
// 				console.log('user updated');
// 				return res.send({ status: 'OK', user: user });
// 			}
// 			else {
// 				if (err.name === 'ValidationError') {
// 					res.statusCode = 400;
// 					res.send({ error: 'Validation error' });
// 				}
// 				else {
// 					res.statusCode = 500;
// 					res.send({ error: 'Server error' });
// 				}
// 				console.log('Internal error(%d): %s', res.statusCode, err.message);
// 			}
// 		});
// 	});
// });
// //删除用户信息
// app.delete('/api/deleteUser/:id', function (req, res) {
// 	return UsersModel.findById(req.params.id, function (err, user) {
// 		if (!user) {
// 			res.statusCode = 404;
// 			return res.send({ error: err });
// 		}
// 		return user.remove(function (err) {
// 			if (!err) {
// 				console.log('user removed');
// 				return res.send({ status: 'OK' });
// 			}
// 			else {
// 				res.statusCode = 500;
// 				console.log('Internal error(%d): %s', res.statusCode, err.message);
// 				return res.send({ error: 'Server error' });
// 			}
// 		});
// 	});
// });

app.listen(3000, () => {
	console.log('app listening on port 3000');
});




