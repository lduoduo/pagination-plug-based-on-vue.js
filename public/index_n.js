Vue.config.debug = true;

var vm = new Vue({
    el: '#list',
    data: {
        items: [],
        index: 0,
        pagesize: 5
    },
    computed: {
        pageLength: function() {
            var res = (this.items.length % this.pagesize == 0) ? this.items.length / this.pagesize : Math.floor(this.items.length / this.pagesize) + 1;
            return res;
        }
    },
    methods: {
        changeIndex: function(index) {
            if (this.index == index) return false;
            this.index = index;
            Array.prototype.forEach.call(event.target.parentElement.children, function(ele){
            	ele.className = '';
            });
            event.target.className = 'choose';
        }
    }
});



$.ajax({
    url: 'test.json',
    data: [],
    success: function(data) {
        vm.items = data.LineInfroList;
        vm.index = 0;
        vm.pagesize = 5;

        // index 修改成计算属性
    }
});
