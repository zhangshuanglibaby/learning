/**
 * 需求 : 发现创建ajax步骤是固定的,现封装ajax步骤代码
 */

/**
 * 分析: 在创建ajax步骤中,那些代码是会发生变化的
 *       1.请求方式  --> type
 *       2.请求地址  --> url
 *       3.请求带回到服务器的数据  -->data
 *       4.不确定的逻辑代码   --> callback
 */

/**
 * 当有很多参数要传的时候,可以使用对象传参,可以实现无序传参
 * 为了省略参数,可以给参数设置默认值
 */

/**
 * @author lilybaby
 * @date 2019-07-21
 * @description 封装好的ajax代码
 * @param {object || null} options 
 * @example options {
 * 			type : 请求方式 -->  get || post,
 * 			url : 请求地址,
 * 			data : 请求带回到服务器的数据
 * 			callback : 不确定的逻辑代码
 * }
 */

function ajax(options) {
	//设置默认值
	options = options || {};
	options.type = options.type || 'get';
	options.url = options.url || '';
	options.data = options.data || '';
	options.callback = options.callback || function (res) {
		console.log('您的回调函数没给,我们不建议你这么干');
		console.log(res);
	};
	//创建ajax对象
	let xhr = new XMLHttpRequest();
	//设置请求方式和请求地址
	//检测如果是get请求方式
	if (options.type === 'get') {
		//参数要放在url后面,用?连接
		options.url += '?' + options.data;
	}
	xhr.open(options.type, options.url);
	//检测如果是post请求方式
	if (options.type === 'post') {
		//要设置请求头
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		//参数要放在send方法里面
		xhr.send(options.data);
	} else {
		xhr.send();
	}
	//监听通信状态
	xhr.onreadystatechange = function () {
		//检测服务器的响应是否完成 & 服务器的响应是否正常
		if (xhr.readyState === 4 && xhr.status === 200) {
			//获取数据,用数据去执行其他的逻辑代码是不确定的,使用回调函数来实现
			//把xhr.responseText作为参数传递到回调函数里面
			options.callback(xhr.responseText);

		}
	}
}

