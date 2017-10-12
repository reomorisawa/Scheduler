// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

// カレンダーの日付を押してidを取得する機能はapplication.html.erbのほうに記述しています。

$(document).on('ready page:load', function(){

	$(function(){
		$('.footer-button').on('click',function(){
			var self = this;
			$(self).css('background-color', 'rgb(120,200,200)');
		});
	});

	$(function(){
		$('.header-bar').on('click',function(){
			var menuDisplay = $('.menu-drop-down').css('display');
			var self = this;

			$('.menu-drop-down').fadeToggle();
			$(self).toggleClass("yellow");
			if (menuDisplay == 'none') {
				$('div.ui-page').css('padding-top', '80px');
			}
			if (menuDisplay == 'block') {
				$('div.ui-page').css('padding-top', '0');
			}
			return menuDisplay;
		});
	});

	$(function(){
		var $window = $(window);
		var $year = $('#year-js');
		var $month = $('#month-js');
		var $tbody = $('#calendar-body-js')

		var today = new Date();
		var currentYear = today.getFullYear();
		var currentMonth = today.getMonth();
		var day = today.getDate();

		$window.on('load', function(){
			calendarWhole(currentYear, currentMonth, today);
		});



		$('#previous-month').on('click', function(){
			if (currentMonth < 1) {
				currentYear -= 1;
				currentMonth = 12;
			}
			currentMonth -= 1;
			calendarWhole(currentYear, currentMonth, today);
			return currentMonth;
		});

		$('#next-month').on('click', function(){
			if (currentMonth > 10) {
				currentYear += 1;
				currentMonth = -1;
			}
			currentMonth += 1;
			calendarWhole(currentYear, currentMonth, today);
			return currentMonth;
		});

		function calendarBody(year, month, today){
			var todayValidation = today.getFullYear() === year && today.getMonth() === month ? true : false;
			var startDate = new Date(year, month, 1);
			var endDate = new Date(year,month + 1, 0);
			var startDay = startDate.getDay();
			var endDay = endDate.getDate();
			var textSkip = true;
			var textDate = 1;
			var tableBody = '';

			for (var row = 0; row < 6; row++){
				var tr = '<tr>';
			
				for (var col = 0; col < 7; col++){
					if (row === 0 && startDay === col) {
						textSkip = false;
					}
					if (textDate > endDay) {
						textSkip = true;
					}
					
					var addClass = todayValidation && textDate === today.getDate() ? 'is-today' : '';
					var dateFormat = new Date(year, month, textDate);
					var textTd = textSkip ? '&nbsp;' : textDate++;
					var td = '<td class="date-button '+addClass+'"><input type="button" class="" id="'+addId(dateFormat)+'" value="'+textTd+'" onclick="getId(this); "></td>';
					tr += td;
					
					function addId(date) {
						var yearId = date.getFullYear().toString();
						var monthId = (date.getMonth() + 1).toString();
						var dateId = date.getDate().toString();
						var id = yearId + '-' + ("0" + monthId).slice(-2) + '-' + ("0" + dateId).slice(-2);
						if (textSkip === true) {
							id = '';
						}
						return id
					}

				}
				tr += '</tr>';
				tableBody += tr;
				
			}
			
			$tbody.html(tableBody);		
		}

		function calendarHeader(year, month) {
			$year.html(year);
			$month.html(month + 1);
		}

		function calendarWhole(year, month, date){
			calendarHeader(year, month)
			calendarBody(year, month, date)
		}
		
	});

});