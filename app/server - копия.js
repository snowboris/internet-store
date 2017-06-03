var tasks = require('./models/tasks');
var Handlebars = require('handlebars-helpers');
var hands = require('handlebars');
var express = require('express');
var app = express();

var request = require('request');
var urlutils = require('url');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

var templating = require('consolidate');
app.engine('hbs', templating.handlebars);

app.set('view engine', 'hbs');
app.set('views', __dirname + '\\views'); // + '/views'

var currentDate = new Date();

/*app.engine('handlebars', Handlebars({
    defaultLayout: 'main'
}));*/
/*
Handlebars.registerHelper('link', function(text, options) {
  console.log(options.hash['href']);   //значение, лежащее в poem.url
  console.log(options.hash['class']); //"poem"
  return new Handlebars.SafeString("<a href=\"" + options.hash['href'] + "\">" + Handlebars.escapeExpression(text) + "</a>");
});*/

/*------------------------------------------------------------------------*/
var glob = 0;
tasks.category('select *from category',function(err, tasks) {
	

console.log(glob);

	hands.registerHelper('category', function(level, option) {

		var buffer='';
		var buffer_1='';
		var buffer_2='';
		switch(option) {
			case 'menu': {
						for(i=0; i<tasks.length; i++) {
							if(tasks[i].id_parent===0) {
								buffer += '<li class="link menu__item"><a class="menu__link" href="#">'+tasks[i].name+'</a>';
								buffer += '<ul class="menu-embedded">' ;
								for(j=0; j<tasks.length; j++) {
									if(tasks[j].id_parent===tasks[i].id) {
										buffer += '<h4 class="menu-embedded__subtitle">'+tasks[j].name+'</h4>';
										for(k=0; k<tasks.length; k++) {
											if(tasks[j].id===tasks[k].id_parent) {
												buffer+= '<li class="link menu-embedded__item"><a class="menu-embedded__link">'+tasks[k].name+'</a></li>';
											}
										}
									}
								}
								buffer+= '</ul>';	
								buffer += '</li>';
							}
						}
					} break;
			case 'admin': {
				console.log('admin');
					buffer += '<select class="admin-menu__action select-category-l'+level+'" name="menu-category">';
					for(i=0; i<tasks.length; i++) {
						//console.log(level);
						if(level===0) {
							if(tasks[i].id_parent===0){
								buffer += '<option value="' + tasks[i].id +'"">';
								buffer += tasks[i].name;
								buffer += '</option>';
							}
							
						} else if(level===1) {
							//console.log(tasks[i].id_parent +'===' );
							if(tasks[i].id_parent!==0){
								for(j=0; j<tasks.length; j++){
									if(tasks[j].id===tasks[i].id_parent) {
										if(tasks[j].id_parent===0){
											buffer += '<option value="' + tasks[i].id +'"">';
											buffer += tasks[i].name;
											buffer += '</option>';
										}
									}
								}
								//console.log('tasks[j].id_parent='+tasks[j].id_parent);
								//console.log('j==='+j);
								
							}
						} else {
							if(tasks[i].id_parent!==0 ){
								if(tasks[i].id_parent!==0){
								for(j=0; j<tasks.length; j++){
									if(tasks[j].id===tasks[i].id_parent) {
										if(tasks[j].id_parent!==0) {
											buffer += '<option value="' + tasks[i].id +'"">';
											buffer += tasks[i].name;
											buffer += '</option>';
										}
									}
								}
								
							}
							}
						}
					}
					
					buffer += '</select>';

				}break;
		}
			
		
	  return new hands.SafeString(buffer);
	});

});

/*------------------------------------------------------------------------*/
app.get('/', function(req, res) {
	tasks.category(function(err, tasks) {
		//console.dir(tasks);
		
		res.render(
			'main.hbs', 
			{
				/*title: 'Главная страница',*/
				currentDate: currentDate.getFullYear(),
				task: tasks
			}
		)
	
	});
});

app.post('/', function(req, res) {
	tasks.add(req.body.task, function() {
		res.redirect('/');
	});
});


app.listen(3044);

/*----------------------API-------------------------------*/

app.get('/api/shares', function(req, res) {
	tasks.category(function(err, tasks) {
		//console.dir(tasks);
		
		res.send(tasks[0]);
	
	});
});

app.get('/api/administration', function(req, res) {  //ajax page administration
	//var codePage = req.url.split(/[?//&]/);
	var temp = urlutils.parse(req.url).query;
	temp = temp.split('&');
	console.log(temp);
	mapURL = {};
	for(var i = 0; i<temp.length; i++){
		
		var temp2 = temp[i].split('=');
		console.log(temp2);
		mapURL[temp2[0]]=temp2[1]; 
	}
	//temp = temp.split('=');
	var querySQL = 'select *from category';
	if(mapURL['level']==='0') {
		//querySQL += ' where '
		if(mapURL['event']==='add') {
			querySQL = 'insert into category(id_parent, name) value(0, "'+mapURL['name']+'");'
		}
		if(mapURL['event']==='change') {
			querySQL = 'update category set name="'+mapURL['name']+'" where id='+mapURL['id'];  
		}
		if(mapURL['event']==='delete') {
			querySQL = 'delete from category where id='+mapURL['id'];
		}
	} else {
		if(mapURL['event']==='add') {
			querySQL = 'insert into category(id_parent, name) value('+mapURL['id']+', "'+mapURL['name']+'");'
		}
		if(mapURL['event']==='change') {
			querySQL = 'update category set name="'+mapURL['name']+'" where id='+mapURL['id'];  
		}
		if(mapURL['event']==='delete') {
			querySQL = 'delete from category where id='+mapURL['id'];
		}
	} 

	console.log(querySQL);
		//console.log(mapURL);
	
	//console.log(urlutils.parse(req.url).query);
/*	var codePage2 = codePage.split('?');
	var codePage3 = codePage2[1].split('&')*/
	//console.log(codePage[2]);
	//console.log(codePage[3]);
	
	//switch(codePage[2]){
		//case 'administration':{
	tasks.category(querySQL,function(err, tasks) {
		//console.dir(tasks);
				//[0]var temp = JSON.parse(tasks);
				//console.log(resQuery);
				//console.log(tasks);
				//console.log((mapURL['event']);
			//console.log(querySQL);
			if(mapURL['event']==='add'){
			//	var temp = [];
				//temp.val=66;//tasks['insertId'];
				res.send(tasks);
			}

	
		//	});
	//	}break;
		//default: {
		//	console.log('error query /api/administration');
		//} break;
	});

});

app.get('/api/administration', function(req, res) { 

});
/*--------------API----------------------------------------*/

tasks.category('SELECT *from category',function(err, query) {
	hands.registerHelper('menu-admin', function(level) {

		var buffer='';
		for(i=0; i<query.length; i++) {
			if(query[i].id_parent===level) {
				buffer += '<option value="'+query[i].id+'">'+query[i].name+'</option>';
			}
		}


		return new hands.SafeString(buffer);
	}); 
});

app.get('/administration', function(req, res) {
	//tasks.category(function(err, query) {
		//console.dir(tasks);
		
		res.render(
			'administration.hbs'
		)
	
	//});
});