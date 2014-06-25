"use-strict"
var app = angular.module('weatherApp', []);

app.controller("weatherWidgetCtrl", ['$scope', 'weatherService', function ($scope, weatherService) {
	
	var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20location%3D%2222102%22&format=json';
	
	weatherService.getWeather(url).success(
		function(data){
			populateWeatherData(data);
		}
	);

	function populateWeatherData(data){
		$scope.loc = data.query.results.channel.item.title.replace("Conditions for ","").replace(/( at .*)/,"");
		$scope.degree = data.query.results.channel.item.condition.temp;
		$scope.weatherImg = data.query.results.channel.item.description.split('src=')[1].split('"')[1];
		$scope.weekDesc = data.query.results.channel.item.condition.text;
		$scope.weakForcast = data.query.results.channel.item.forecast;
	}
      
}]);

app.factory('weatherService', ['$http', function ($http){
	return {
		getWeather: function(url) {
			return $http.get(url);
		}
	 };
}]);
    

app.directive('weatherDirective', function () {
    return {
		restrict: 'E',
        template:
            '<section>' +
            '<h1>{{loc}}</h1>' +
            '<article>' +
            '<main>' +
            '<div><h2>{{degree}}&deg;</h2></div>' +
            '<div class="weatherInfo"><img class="icon" src={{weatherImg}}></img><span style="font-size:12pt;display:block;">{{weekDesc}}</span></div>' +
            '<div class="clear"></div>' +
            '</main>' +
            '</article>' +
            '</section>' +
            '<section>' +
            '<div class="weekDays" ng-repeat="week in weakForcast">' +
            '<p class="lead text-center"><strong>{{week.day}}</strong></p>' +
			'<p class="lead text-center"><strong>{{week.low}}&deg;&nbsp;{{week.high}}&deg;</strong></p>' +
            '</div>' +
            '<div class="clear"></div>' +
            '</section>'
    };
});
