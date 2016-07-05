/*
 * 抛弃 grunt/gulp, 使用 npm scripts 进行前端开发流程工程化
 * why：http://www.infoq.com/cn/news/2016/02/gulp-grunt-npm-scripts-part1
 *【功能特性】
 *   1、sass/jinja/js 自动编译 & 监听（可配置取消监听某些文件和目录）
 *   2、雪碧图自动合并生成样式
 *   3、Autoprefixer 添加前缀
 *   4、URL 相对/绝对路径替换
 *   5、Tinypng 图片压缩
 *   6、FTP 文件提交 & 输出提交清单
 *   7、线上线下文件对比
 * 	 8、设计稿对比功能
 *	 9、设计稿 & 前端 Checklist 展示
 *   10、改动文件增加哈希值
 *
 */

'use strict'


// ======CONFIG========

var colors = require('colors')

colors.setTheme({
	log: 	'green',
	error: 	'red',
	debug: 	'yellow',
	warn: 'red',

	silly: 	'rainbow',
	input: 	'grey',
	info: 	'green',
	data: 	'grey',
	help: 	'cyan'
})

var PWD = process.env.PWD || process.cwd()	// 获取当前路径
console.log()
// console.log(colors.log("LOG=====> 当前项目路径："+PWD))
console.log(colors.log("======= 项目初始化 ========="))
console.log()


//======= STEP1 监控 & 自动编译 ========

var path = require('path');
var fs = require('fs-extra');
var compass = require('compass');
var postcss = require('postcss');
var nunjucks = require('nunjucks');
var uglifyJS = require('uglify-js');
var bs = require("browser-sync").create();
var autoprefixer = require('autoprefixer');

bs.init({
  server: "./",
  port: "8080",
  open: false
  // open: "external"
})

var sassWatchIgnore = [
	'**/util/**/*',
	'**/_frozen/**/*',
	'!_mixin.scss'
]

bs.watch("src/sass/**/*.scss", {ignored: sassIgnore}, function (event, file) {
  if (event === "add" || event === "change") {	// event: add change unlink
		var subFolder = path.dirname(file).split('src'+path.sep+'sass')[1] ? path.dirname(file).split('src'+path.sep+'sass')[1] : '';
		var distFile = path.join('dist','css',subFolder, path.parse(file).name+'.css');
		console.log(colors.log('[SASS]=====> 编译 SASS 文件: '+file));
		compass.compile(function(err, stdout, stderr) {
			if (err) {
				console.log(colors.warn(err))
			}
			var data = fs.readFileSync(PWD + path.sep + distFile, "utf-8");
			postcss([autoprefixer({browsers: ['>5%']})]).process(data).then(function (result) {
				result.warnings().forEach(function (warn) {
				  console.log(colors.warn(warn.toString()));
				});
				console.log(colors.log('[AutoPrefixer]=====> 执行 Autoprefixer: '+distFile));
				fs.writeFileSync(distFile, result);
			});
			bs.reload("*.css")
		})
  }
	// else if (event === 'unlink') {
	// 	fs.unlinkSync(distFile);
	// 	console.log(colors.log('[CSS]=====> 删除 CSS 文件: '+distFile));
	// }
})

bs.watch("src/jinja/**/*.html", function (event, file) {
  if (event === "add" || event === "change") {
		var subFolder = path.dirname(file).split('src'+path.sep+'jinja')[1] ? path.dirname(file).split('src'+path.sep+'jinja')[1] : '';
		var distFile = path.join('dist','html',subFolder, path.basename(file));
  	var data = fs.readFileSync(PWD + path.sep + file, "utf-8");
		console.log(colors.log('[JINJA]=====> 编译 jinja 文件: '+file));
  	var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('src'+path.sep+'jinja'));
		var result = env.renderString(data);
		fs.mkdirsSync(path.join('dist','html',subFolder));
		fs.writeFileSync(distFile, result);
  }
	// else if (event === 'unlink') {
	// 	fs.unlinkSync(distFile);
	// 	console.log(colors.log('[HTML]=====> 删除 HTML 文件: '+distFile));
	// }
})

bs.watch("src/js/**/*.js", function (event, file) {
	var subFolder = path.dirname(file).split('src'+path.sep+'js')[1] ? path.dirname(file).split('src'+path.sep+'js')[1] : '';
	var distFile = path.join('dist','js',subFolder, path.basename(file));

	if (event === "add") {
		fs.copy(file, distFile, {replace: true}, function (err) {
		  if (err) { throw err; }
			console.log(colors.log('[JS]=====> 复制 JS 文件至: '+distFile))
		});
	}
	else if (event === "change") {
		fs.copy(file, distFile, {replace: true}, function (err) {
		  if (err) { throw err; }
			console.log(colors.log('[JS]=====> 编译 JS 文件至: '+distFile))
		});
		// console.log(colors.log('LOG=====> 压缩 JS 文件至: '+distFile));
		// var result = uglifyJS.minify(file, {compress: {dead_code: true}});
		// fs.writeFileSync(distFile, result.code);
  }
	// else if (event === 'unlink') {
	// 	fs.unlinkSync(distFile);
	// 	console.log(colors.log('[JS]=====> 删除 JS 文件: '+distFile));
	// }
})


var tinify = require("tinify");
tinify.key = "mv3fPZDm9AhMXSdw16PIm71JRlFDUm1b";
