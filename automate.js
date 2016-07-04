/*
 * 抛弃 grunt/gulp（还是用了一点点的 gulp）, 使用 npm scripts 进行前端开发流程工程化 
 * why：http://www.infoq.com/cn/news/2016/02/gulp-grunt-npm-scripts-part1
 *【功能特性】
 *   1、sass/jinja/js 自动编译 & 监听
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

	silly: 	'rainbow',
	input: 	'grey',
	info: 	'green',
	data: 	'grey',
	help: 	'cyan'
})



var PWD = process.env.PWD || process.cwd()	// 获取当前路径
console.log()
console.log(colors.log("LOG=====> 当前项目路径："+PWD))
console.log()




//======= STEP1 监控 & 自动编译 ========

var bs = require("browser-sync").create();
var compass = require('compass');
var nunjucks = require('nunjucks');
var through = require('through2');
var assign = require('object-assign');
var fs = require('fs-extra');

bs.init({
    server: "./",
    port: "8080",
    open: false
    // open: "external"
})

bs.watch("src/sass/**/*.scss", function (event, file) {
    if (event === "change") {	// event: add change unlink
		compass.compile(function(err, stdout, stderr) {	// compass
		    bs.reload("*.css")
		});
    }
});

bs.watch("src/jinja/**/*.html", function (event, file) {
    if (event === "change") {
    	
    }
});



















var tinify = require("tinify");
tinify.key = "mv3fPZDm9AhMXSdw16PIm71JRlFDUm1b";




