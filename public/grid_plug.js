var plug = function(el) {
	/*
	headers: {
		title: "显示为列名",
		id: "不可以为中,
		用于区分列名",
		width: "指定宽度",
		sortable: "是否进行排序",
		filterable: "是否进行过滤"
	}
	 */
	var data = {
			url: null,
			para: {
				sortby:"",
				sortdir:"",
			},
			totalcount: 0,
			pageSize: 0,
			pageNo: 1,
			headers: [{
				title:"headtitle",
				id:"headid",
				width:"30%",
				sortable: false,
				filterable: false
			}],
			lists: []
		}
		
	this.columns = function(headers) {
			data.headers = headers;
		}
		
	this.init = function(obj) {
		data.url = obj.url;
		if(obj.para != {}){
			extendO(data.para, obj.para);
		}
		data.pageSize = (obj.pageSize? obj.pageSize: 5);
		loadData();
	}
	this.test = function(obj) {
		data.para = obj;
	}
	var fn = {
		switchPage: function(index) {
			//这里的i是v-for="i in pageCount"里面的i
			this.pageNo = index + 1;
			Array.prototype.forEach.call(event.target.parentElement.children, function(ele) {
				ele.className = '';
			})
			event.target.className = 'active';
		},
		sortPage: function(index){
			//获取排序的列名
			var tmp = this.para;

			//如果已经排序过,取反
			if(tmp.sortby == this.headers[index].id){
				//排序三种状态:asc/desc/no sorting
				tmp.sortdir = tmp.sortdir ?(tmp.sortdir == "asc" ? "desc":(tmp.sortdir == "desc"? "": "asc")) : "asc";
				this.$set('para.sortdir',tmp.sortdir);
			}else{
				tmp.sortby = this.headers[index].id
				tmp.sortdir = "asc";
				this.$set('para.sortby',tmp.sortby);
				this.$set('para.sortdir',tmp.sortdir);
			}
			loadData();
			console.log('sortby:'+this.para.sortby+' dir:'+this.para.sortdir);
		}
	}

	// 定义
	var myList = Vue.extend({
		props: ['lists'],
		template: '<div v-for="item in lists" class="detail"><p class="title">{{item.TitleLabel}}</p><p class="desc">{{item.CityName}}</p></div>'
	})

	// 注册
	Vue.component('child', myList);

	var temp = "<tr v-for='items in lists | limitBy pageSize startIndex' track-by='$index'><td v-for='item in headers'>{{items[item.name]}}</td></tr>"

	var vm = new Vue({
		el: el,
		data: data,
		methods: fn,
		ready: function() {

			this.totalcount = this.lists.length;
			this.isPagination = this.totalcount / this.pageSize > 1 ? true : false;

			this.pageCount = this.totalcount % this.pageSize == 0 ? this.totalcount / this.pageSize : Math.ceil(this.totalcount / this.pageSize);

			this.startIndex = (this.pageNo - 1) * this.pageSize;

			$('.theader [data-wid]').css('width', $('.theader [data-wid]').data('wid'));
		},
		computed: {
			isPagination: function() {
				if (this.totalcount) {
					return this.totalcount / this.pageSize > 1 ? true : false;
				}
			},
			pageCount: function() {
				if (this.totalcount) {
					return this.totalcount % this.pageSize == 0 ? this.totalcount / this.pageSize : Math.ceil(this.totalcount / this.pageSize);
				}
			},
			startIndex: function() {
				return (this.pageNo - 1) * this.pageSize;
			}
		}
	})

	/*
	url: 请求的API链接
	para: 参数配置
	 */
	function loadData() {
		$.ajax({
			url: data.url,
			data: data.para,
			success: function(data) {
				vm.lists = data.LineInfroList;
				vm.totalcount = data.LineInfroList.length;
			}
		});
	}

	function extendO(obj1, obj2){
		for(var key in obj2){
			if(obj1.hasOwnProperty(key)) continue;
			obj1[key] = obj2[key];
		}
		return obj1;
	}
}