var grid = new plug("#mytable");
grid.columns([
	{
		title:"TitleLabel",
		id:"TitleLabel",
		width:"30%",
		sortable: false
	},
	{
		title:"LineMainTitle",
		id:"LineMainTitle",
		width:"40%",
		sortable: true
	},
	{
		title:"CityName",
		id:"CityName",
		width:"30%",
		sortable: true
	}
]);
grid.init({
	url: "test.json",
	para: {},
	pageSize: 5
});