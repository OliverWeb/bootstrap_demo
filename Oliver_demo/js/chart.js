
var myChart = echarts.init(document.getElementById('main'));
option = {
	title: {
		text: '堆叠区域图'
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'cross',
			label: {
				backgroundColor: '#6a7985'
			}
		}
	},
	legend: {
		data: ['NODE']
	},
	toolbox: {
		feature: {
			saveAsImage: {}
		}
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: [
		{
			type: 'category',
			boundaryGap: false,
			data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
		}
	],
	yAxis: [
		{
			type: 'value'
		}
	],
	series: [

		{
			name: 'node',
			type: 'line',
			stack: '总量',
			areaStyle: {normal: {}},
			data: [110, 182, 191, 150, 130, 330, 310, 130, 152]
		}
	]
};
myChart.setOption(option);
