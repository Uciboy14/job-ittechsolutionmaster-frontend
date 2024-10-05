/**
 * Renders a calendar
 * @component lyte-calendar
 * @version 1.0.0
 * @utility revertToToday,revertToSelected
 * @methods onDateSelected,onNavigate,onViewChange
 * @dependencies lyte-dropdown
 */

Lyte.Component.register( 'lyte-calendar', {
_template:"<template tag-name=\"lyte-calendar\"> <div class=\"{{containerClass}}\" ontouchstart=\"{{action('record',event)}}\" ontouchend=\"{{action('decide',event)}}\"> <div class=\"lyteCalendarView\"> <div> <template is=\"if\" value=\"{{navYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"navigator\"></lyte-yield> </template><template case=\"false\"> <div class=\"lyteCalendarNavigator\"> <span id=\"{{monthDropdownId}}\" class=\"lyteVisuallyHidden\">{{lyteUiI18n(\"lyte.calendar.choose.month\")}}</span> <span id=\"{{yearDropdownId}}\" class=\"lyteVisuallyHidden\">{{lyteUiI18n(\"lyte.calendar.choose.year\")}}</span> <span class=\"lyteVisuallyHidden\" aria-live=\"polite\" id=\"{{headerId}}\"> <template is=\"if\" value=\"{{expHandlers(viewType,'===','dateView')}}\"><template case=\"true\"> <span>{{lyteUiGetMonthOrYear(monthHeader,\"M\")}}</span><span>{{lyteUiGetMonthOrYear(monthHeader,\"Y\")}}</span> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(viewType,'===','monthView')}}\"><template case=\"true\"> <span>{{currentYear}}</span> </template><template case=\"false\"> <span>{{decadeStart}} - {{decadeEnd}}</span> </template></template></template></template> </span> <span class=\"lyteCalsCalMon\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(ltPropHeaderType,'===','dropdown'),'||',expHandlers(ltPropHeaderType,'===','picklist'))}}\"><template case=\"true\"> <lyte-dropdown lt-prop-aria-button=\"{{monthAriaObj}}\" lt-prop-freeze=\"false\" lt-prop=\"{{stringify(ltPropDropdown)}}\" on-show=\"{{method('setClass')}}\" class=\"lyteCalMonthDD\" on-option-selected=\"{{method('optionSelected','M')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{monthNames}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item}}\">{{item}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <template is=\"if\" value=\"{{expHandlers(ltPropHeaderType,'===','dropdown')}}\"><template case=\"true\"> <lyte-dropdown lt-prop-aria-button=\"{{yearAriaObj}}\" lt-prop-freeze=\"false\" lt-prop=\"{{stringify(ltPropDropdown)}}\" on-show=\"{{method('setClass')}}\" class=\"lyteCalYearDD\" on-option-selected=\"{{method('optionSelected','Y')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{years}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item}}\">{{item}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template><template case=\"false\"> <lyte-picklist lt-prop-options=\"{{years}}\" lt-prop-dropdown=\"{&quot;freeze&quot;: false, &quot;callout&quot;: true}\" class=\"lyteCalYearDD\" on-option-select=\"{{method('optionSelected','Y')}}\" on-show=\"{{method('setClass')}}\"> </lyte-picklist> </template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(ltPropHeaderType,'===','drilldown')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(viewType,'===','dateView')}}\"><template case=\"true\"> <span aria-label=\"{{lyteUiI18n('lyte.calendar.monthview.drilldown.button')}}\" tabindex=\"0\" role=\"button\" class=\"lyteDrillCalHeaderButton\" onclick=\"{{action('changeToMonthView',event)}}\" onkeydown=\"{{action('changeToMonthViewOnKeys',event)}}\"> <span class=\"lyteCalsCalMonth\">{{lyteUiGetMonthOrYear(monthHeader,\"M\")}}</span> <span class=\"lyteCalsCalYear\">{{lyteUiGetMonthOrYear(monthHeader,\"Y\")}}</span> </span> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(viewType,'===','monthView')}}\"><template case=\"true\"> <span aria-label=\"{{lyteUiI18n('lyte.calendar.decadeview.drilldown.button')}}\" tabindex=\"0\" role=\"button\" class=\"lyteDrillCalHeaderButton\" onclick=\"{{action('changeToDecadeView',event)}}\" onkeydown=\"{{action('changeToDecadeViewOnKeys',event)}}\"> <span class=\"lyteCalsCalYear\">{{currentYear}}</span> </span> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(viewType,'===','decadeView')}}\"><template case=\"true\"> <span class=\"lyteDrillCalHeaderButton lyteDrillCalYearListHeader\"> {{decadeStart}} - {{decadeEnd}} </span> </template></template></template></template></template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(expHandlers(ltPropSelectionType,'===','month'),'||',expHandlers(ltPropSelectionType,'===','year'))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(viewType,'===','monthView')}}\"><template case=\"true\"> <span> <span class=\"lyteCalsCalYear\">{{currentYear}}</span> </span> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(viewType,'===','decadeView')}}\"><template case=\"true\"> <span class=\"lyteDrillCalHeaderButton lyteDrillCalYearListHeader\"> {{decadeStart}} - {{decadeEnd}} </span> </template></template></template></template> </template><template case=\"false\"> <span class=\"lyteCalsCalMonth\">{{lyteUiGetMonthOrYear(monthHeader,\"M\")}}</span> <span class=\"lyteCalsCalYear\">{{lyteUiGetMonthOrYear(monthHeader,\"Y\")}}</span> </template></template></template></template></template></template> </span> <template is=\"if\" value=\"{{ifNotEquals(ltPropHeaderType,&quot;dropdown&quot;)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropYear}}\"><template case=\"true\"> <span role=\"button\" tabindex=\"0\" class=\"lyteCalNav lyteCalyearNavLft\" onclick=\"{{action('previous','Y',event)}}\" onkeydown=\"{{action('previousOnKeys','Y',event)}}\"> <span class=\"lyteVisuallyHidden\">{{lyteUiI18n('lyte.calendar.previous.year')}}</span> </span> </template></template> </template></template> <span role=\"button\" class=\"lyteCalNav lyteCaldLft {{lyteUiDisableCalendarNav(viewDate,'previous')}}\" tabindex=\"0\" onclick=\"{{action('previous','M',event)}}\" onkeydown=\"{{action('previousOnKeys','M',event)}}\"> <span class=\"lyteVisuallyHidden\">{{lyteUiI18n('lyte.calendar.previous.month')}}</span> </span> <span role=\"button\" class=\"lyteCalNav lyteCaldRgt {{lyteUiDisableCalendarNav(viewDate,'next')}}\" tabindex=\"0\" onkeydown=\"{{action('nextOnKeys','M',event)}}\" onclick=\"{{action('next','M',event)}}\"> <span class=\"lyteVisuallyHidden\">{{lyteUiI18n('lyte.calendar.next.month')}}</span> </span> <template is=\"if\" value=\"{{ifNotEquals(ltPropHeaderType,&quot;dropdown&quot;)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropYear}}\"><template case=\"true\"> <span role=\"button\" class=\"lyteCalNav lyteCalyearNavRgt\" tabindex=\"0\" onkeydown=\"{{action('nextOnKeys','Y',event)}}\" onclick=\"{{action('next','Y',event)}}\"> <span class=\"lyteVisuallyHidden\">{{lyteUiI18n('lyte.calendar.next.year')}}</span> </span> </template></template> </template></template> </div> </template></template> </div> <div class=\"lyteCalTableContainer\" role=\"grid\"> <template is=\"if\" value=\"{{ltPropBodyYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"body\"></lyte-yield> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(viewType,'===','dateView')}}\"><template case=\"true\"> <div role=\"row\" class=\"lyteCalTableRowHeader\"> <template is=\"if\" value=\"{{ltPropWeekNumber}}\"><template case=\"true\"> <div role=\"columnheader\" class=\"lyteCalTableCellHeader lyteWeekNumberGrid\"><span>WN</span></div> </template></template> <template is=\"for\" items=\"{{daysOfWeek}}\" item=\"day\" index=\"idod\"> <div role=\"columnheader\" aria-label=\"{{day.title}}\" class=\"lyteCalTableCellHeader\" id=\"{{day.id}}\">{{lyteUiI18n(day.day)}}</div> </template> </div> </template></template> <div class=\"lyteCalTableRowGroup\"> <template is=\"if\" value=\"{{expHandlers(viewType,'===','dateView')}}\"><template case=\"true\"> <template is=\"for\" items=\"{{matrix}}\" item=\"vector\" index=\"rowid\"> <template is=\"if\" value=\"{{expHandlers(lyteUiCheckEmpty(vector),'!')}}\"><template case=\"true\"> <div class=\"lyteCalTableRow\" role=\"row\"> <template is=\"if\" value=\"{{ltPropWeekNumber}}\"><template case=\"true\"> <div role=\"gridcell\" tabindex=\"-1\" class=\"{{weeknum[rowid].class}}\"><span>{{if(ifNotEquals(weeknum[rowid].val,0),weeknum[rowid].val,'')}}</span></div> </template></template> <template is=\"for\" items=\"{{vector}}\" item=\"date\" index=\"cellid\"> <template is=\"if\" value=\"{{expHandlers(lyteUiCheckInRange(ltPropMinDate,ltPropMaxDate,date.val,ltPropFormat),'&amp;&amp;',expHandlers(lyteUiDisabledDates(date,ltPropDisabledDates),'!'))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{date.emptyBlock}}\"><template case=\"true\"> <div role=\"gridcell\" class=\"lyteCalEmpty\" data-selectable=\"false\"></div> </template><template case=\"false\"> <div role=\"gridcell\" tabindex=\"-1\" id=\"{{date.id}}\" aria-labelledby=\"{{concat(date.id,' ',headerId,' ',daysOfWeek[cellid]['id'])}}\" onkeydown=\"{{action('performNavigation',event)}}\" onclick=\"{{action('dateSelected',event)}}\" class=\"{{date.clsname}}\" data-date=\"{{date.val}}\" data-selectable=\"true\"><span class=\"lyteCalDateSpan\">{{date.date}}</span></div> </template></template> </template><template case=\"false\"> <template is=\"if\" value=\"{{date.emptyBlock}}\"><template case=\"true\"> <div role=\"gridcell\" class=\"lyteCalEmpty\" data-selectable=\"false\"></div> </template><template case=\"false\"> <div role=\"gridcell\" tabindex=\"-1\" id=\"{{date.id}}\" aria-labelledby=\"{{concat(date.id,' ',headerId,' ',daysOfWeek[cellid]['id'])}}\" aria-disabled=\"true\" onkeydown=\"{{action('performNavigation',event)}}\" data-date=\"{{date.val}}\" class=\"{{date.clsname}}\" data-selectable=\"false\"><span class=\"lyteCalDateSpan\">{{date.date}}</span></div> </template></template> </template></template> </template> </div> </template></template> </template> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(viewType,'===','monthView')}}\"><template case=\"true\"> <template is=\"for\" items=\"{{monthViewData}}\" item=\"row\" index=\"rowIndex\"> <div class=\"lyteCalTableRow\"> <template is=\"for\" items=\"{{row}}\" item=\"column\" index=\"columnIndex\"> <div aria-label=\"{{lyteUiI18n(lyteUiGetLinearIndex(ariaMonthNames,rowIndex,columnIndex))}}\" role=\"gridcell\" tabindex=\"-1\" onkeydown=\"{{action('performNavigation',event)}}\" onclick=\"{{action('monthSelected',event)}}\" class=\"{{column['class']}}\" data-date=\"{{column['systemValue']}}\"> {{column['displayValue']}} </div> </template> </div> </template> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(viewType,'===','decadeView')}}\"><template case=\"true\"> <template is=\"for\" items=\"{{decadeViewData}}\" item=\"row\" index=\"rowIndex\"> <div class=\"lyteCalTableRow\"> <template is=\"for\" items=\"{{row}}\" item=\"column\" index=\"columnIndex\"> <template is=\"if\" value=\"{{expHandlers(column.emptyBlock,'!')}}\"><template case=\"true\"> <div role=\"gridcell\" tabindex=\"-1\" onkeydown=\"{{action('performNavigation',event)}}\" onclick=\"{{action('yearSelected',event)}}\" class=\"lyteCalTableCell {{column.class}}\" data-date=\"{{column.year}}\"> {{column.year}} </div> </template><template case=\"false\"> <div role=\"gridcell\" class=\"lyteCalEmpty\"> </div> </template></template> </template> </div> </template> </template></template></template></template></template></template> </div> </template></template> </div> <div> <div class=\"lyteCalBtns\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(showToday,'&amp;&amp;',ltPropShowToday),'&amp;&amp;',expHandlers(ltPropSelectionType,'===','month'))}}\"><template case=\"true\"> <p role=\"button\" tabindex=\"0\" onkeydown=\"{{action('curMonthOnKey',event)}}\" class=\"lyteCalCurrentDate\"><a onclick=\"{{action('curMonth',event)}}\">{{lyteUiI18n('Current Month')}}</a></p> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(expHandlers(showToday,'&amp;&amp;',ltPropShowToday),'&amp;&amp;',expHandlers(ltPropSelectionType,'===','week'))}}\"><template case=\"true\"> <p role=\"button\" tabindex=\"0\" onkeydown=\"{{action('curWeekOnKey',event)}}\" class=\"lyteCalCurrentDate\"><a onclick=\"{{action('curWeek',event)}}\">{{lyteUiI18n('Current Week')}}</a></p> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(showToday,'&amp;&amp;',ltPropShowToday)}}\"><template case=\"true\"> <p role=\"button\" tabindex=\"0\" onkeydown=\"{{action('todayOnKey',event)}}\" class=\"lyteCalCurrentDate\"><a onclick=\"{{action('today',event)}}\">{{lyteUiI18n('today')}}</a></p> </template></template></template></template></template></template> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"footer\"></lyte-yield> </template></template> </div> </div> </div> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1,1]},{"type":"if","position":[1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,0]},{"type":"attr","position":[1,5]},{"type":"attr","position":[1,5,1]},{"type":"if","position":[1,5,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"text","position":[2,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"text","position":[1,2]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,7,1]},{"type":"if","position":[1,7,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"text","position":[1,3]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"text","position":[1,3]}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"text","position":[3,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,9]},{"type":"if","position":[1,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,11]},{"type":"text","position":[1,11,1,0]},{"type":"attr","position":[1,13]},{"type":"text","position":[1,13,1,0]},{"type":"attr","position":[1,15]},{"type":"if","position":[1,15],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,3,1]},{"type":"if","position":[1,1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}]}},"default":{}},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0,0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0,0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0,0]}]}},"default":{}}]}},"default":{}}]}]}},"default":{}}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]}]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]}]},"false":{"dynamicNodes":[]}},"default":{}}]}]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,5,1,1]},{"type":"if","position":[1,1,5,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,0]},{"type":"text","position":[1,0,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,0]},{"type":"text","position":[1,0,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,0]},{"type":"text","position":[1,0,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,5,1,3]},{"type":"if","position":[1,1,5,1,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropStartDate","ltPropEndDate","ltPropCurrentDate","ltPropFormat","ltPropYear","ltPropMonthHeaderFormat","daysOfWeek","ariaMonthNames","monthSystemValues","monthNames","shortHands","todayName","viewDate","changeData","ltPropYield","ltPropMinDate","ltPropMaxDate","ltPropStartWeekDay","navYield","selectDate","currentDatechanged","ltPropFillRows","ltPropNumberOfRows","callFrmDidcnct","monthDD","yearDD","years","ltPropHeaderType","ltPropDropdown","cords","start","prev","tt","showToday","monthViewTableArray","ltPropBodyYield","ltPropShowToday","ltPropI18n","ltPropActivateNavigation","ltPropDisableNavigation","ltPropPreventAddingRows","ltPropSelectionType","ltPropWeekends","ltPropCurrentWeek","ltPropCurrentMonth","ltPropCurrentYear","ltPropDisabledDates","ltPropCurrentDates","ltPropMultiple","headerId","monthDropdownId","yearDropdownId","ltPropIso","ltPropWeekNumCriteria","ltPropHolidays","ltPropDisableWeekends","ltPropDisableHolidays","ltPropWeekNumber","ltPropAlwaysShowToday","ltPropHighlightWeekendHolidays"],

	data: function() {
		return {
			'ltPropStartDate': Lyte.attr( 'string', { 
				'default': ''
			} ),
			'ltPropEndDate': Lyte.attr( 'string', { 
				'default': ''
			} ),

			/** 
			 * @componentProperty {dateString} ltPropCurrentDate
			 */

			'ltPropCurrentDate': Lyte.attr( 'string', { 
				'default': '' 
			} ),
			/** 
			 * @typedef {
				* MM/DD/YYYY |
				* YYYY/MM/DD |
				* MMM/DD/YYYY |
				* MMM/YYYY/DD |
				* DD/MMM/YYYY |
				* YYYY/MMM/DD |
				* DD/YYYY/MMM |
				* YYYY/DD/MMM |
				* MMMM/DD/YYYY |
				* MMMM/YYYY/DD |
				* DD/YYYY/MMMM |
				* YYYY/DD/MMMM |
				* DD/MMMM/YYYY |
				* YYYY/MMMM/DD
				* } dateFormat
			*/
			/** 
			 * @componentProperty {dateFormat} ltPropFormat
			 * @default MM/DD/YYYY
			 */

			'ltPropFormat': Lyte.attr( 'string', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-calendar', 'format', 'MM/DD/YYYY' )  
			} ),

			/**
			 * @componentProperty {boolean} ltPropYear
			 * @default false
			 * 
			 */

			'ltPropYear': Lyte.attr( 'boolean', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-calendar', 'year', false ) 
			} ),

			/**
			 * @typedef {
			 * 'MMMM YYYY' |
			 * 'MMM YYYY' 
			 * } MonthHeaderFormat
			 */
			/**
			 * @componentProperty {MonthHeaderFormat} ltPropMonthHeaderFormat
			 * @default 'MMMM YYYY'
			 */

			'ltPropMonthHeaderFormat': Lyte.attr( 'string', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-calendar', 'monthHeaderFormat', 'MMMM YYYY' ) 
			} ),
			'daysOfWeek': Lyte.attr( 'array', { 
				'default': [] 
			} ),

			'ariaMonthNames': Lyte.attr( 'array', { 'default': [
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
					'August',
					'September',
					'October',
					'November',
					'December' 
			] } ),

			'monthSystemValues': Lyte.attr( 'array', {
				'default': [
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
					'August',
					'September',
					'October',
					'November',
					'December' 
				]
			} ),

			'monthNames': Lyte.attr( 'array', { 
				'default': [
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
					'August',
					'September',
					'October',
					'November',
					'December' 
				]
			} ),
			'shortHands': Lyte.attr( 'array', { 
				'default': [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'short.may',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec'
				]
			} ),
			'todayName': Lyte.attr( 'string', {
				'default': 'Today' 
			} ),
			'viewDate': Lyte.attr( 'object', { 
				'default': {} 
			} ),
			'changeData': Lyte.attr( 'number', {
				'default': 0 
			} ),

			/**
			 * @componentProperty {boolean} ltPropYield
			 * @default false
			 * 
			 */

			'ltPropYield': Lyte.attr( 'boolean', { 
				'default': false
			} ),

			/**
			 * @componentProperty {dateString} ltPropMinDate
			 */

			'ltPropMinDate': Lyte.attr( 'string', { 
				'default': ''
			} ),

			/**
			 * @componentProperty {dateString} ltPropMaxDate
			 */

			'ltPropMaxDate': Lyte.attr( 'string', { 
				'default': '' 
			} ),

			/**
			 * @componentProperty {number} ltPropStartWeekDay
			 * @default 1
			 * @minValue 0
			 * @maxValue 6
			 * @step 1
			 */

			'ltPropStartWeekDay': Lyte.attr( 'number', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-calendar', 'startWeekDay', 1 )
			} ),
			'navYield': Lyte.attr( 'boolean', { 
				'default': false 
			} ),
			'selectDate': Lyte.attr( 'boolean', { 
				'default': true 
			} ),
			'currentDatechanged': Lyte.attr( 'number', { 
				'default': 0 
			} ),

			/**
			 * @componentProperty {boolean} ltPropFillRows
			 * @default true
			 * @version 1.0.2
			 * 
			 */

			'ltPropFillRows': Lyte.attr( 'boolean', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-calendar', 'fillRows', true ) 
			} ),

			/**
			 * @componentProperty {number} ltPropNumberOfRows
			 * @version 1.0.2
			 * @default 6
			 */

			'ltPropNumberOfRows': Lyte.attr( 'number', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-calendar', 'numberOfRows', 6 )
			} ),
			'callFrmDidcnct' : Lyte.attr('boolean',{"default" : false}),
			'monthDD' : Lyte.attr("object"),
			'yearDD' : Lyte.attr("object"),
			'years' :Lyte.attr("array",{"default":[]}),

			/**
			 * @componentProperty {default|dropdown|drilldown} ltPropHeaderType
			 * @default default
			 * @version 1.0.2
			 */

			'ltPropHeaderType' : Lyte.attr( "string", { "default": _lyteUiUtils.resolveDefaultValue( 'lyte-calendar', 'headerType', 'default' ) } ),

			'ltPropDropdown': Lyte.attr( 'object', { 'default': _lyteUiUtils.resolveDefaultValue( 'lyte-calendar', 'dropdown', 
				{
					'callout': true
				} 
			) } ),

			'cords': Lyte.attr( 'object', { default: {} } ),
			'start': Lyte.attr( 'number' ),
			'prev': Lyte.attr( 'boolean' ),
			'tt': Lyte.attr( 'boolean', { 'default': true } ),
			'showToday': Lyte.attr( 'boolean', { 'default': true } ),

			'monthViewTableArray': Lyte.attr( 'array', { 'default': [] } ),

			'ltPropBodyYield': Lyte.attr( 'boolean', { 'default': false } ),

			'ltPropShowToday': Lyte.attr( 'boolean', { 'default': _lyteUiUtils.resolveDefaultValue( 'lyte-calendar', 'showToday', true ) } ),

			'ltPropI18n': Lyte.attr( 'boolean', { 'default': _lyteUiUtils.resolveDefaultValue( 'lyte-calendar', 'I18n', false ) } ),

			'ltPropActivateNavigation': Lyte.attr( 'boolean', { 'default': false } ),

			// This attribute is only relevant for dateView
			'ltPropDisableNavigation': Lyte.attr( 'boolean', { 'default': false } ),

			/* A team uses this but we are not goint to expose this outside */
			'ltPropPreventAddingRows': Lyte.attr( 'boolean', { 'default': false } ),

			'ltPropSelectionType': Lyte.attr( 'string', { 'default': 'day' } ),

			'ltPropWeekends': Lyte.attr( 'array', { 'default': [ 6, 0 ] } ),

			'ltPropCurrentWeek': Lyte.attr( 'array', { 'default': [] } ),

			'ltPropCurrentMonth': Lyte.attr( 'string', { 'default': '' } ),

			'ltPropCurrentYear': Lyte.attr( 'string', { 'default': '' } ),

			'ltPropDisabledDates': Lyte.attr( 'array', { 'default': [] } ),

			'ltPropCurrentDates': Lyte.attr( 'array', { 'default': [] } ),

			'ltPropMultiple': Lyte.attr( 'boolean', { 'default': false } ),

			'headerId': Lyte.attr( 'string' ),

			'monthDropdownId': Lyte.attr( 'string' ),
			
			'yearDropdownId': Lyte.attr( 'string' ),

			'ltPropIso' : Lyte.attr( 'string'  ),

			'ltPropWeekNumCriteria': Lyte.attr( 'number', { 'default': 1 } ),

			'ltPropHolidays': Lyte.attr( 'array', { 'default': [ ] } ),

			'ltPropDisableWeekends': Lyte.attr( 'boolean', { 'default': false } ),

			'ltPropDisableHolidays': Lyte.attr( 'boolean', { 'default': false } ),

			'ltPropWeekNumber': Lyte.attr( 'boolean', { 'default': false } ),

			//showToday even when we are in current date
			'ltPropAlwaysShowToday': Lyte.attr( 'boolean', { 'default': false } ),

			'ltPropHighlightWeekendHolidays': Lyte.attr( 'boolean', { 'default': false } )

		}
	},

	getCells: function() {
		var container = this.getTableContainer(),
		rows = container.children, cells = [];

		Array.from( rows ).forEach( function( row ) {
			cells = cells.concat( Array.from( row.children ) );
		} );

		return cells;
	},

	getTableContainer: function() {
		return this.$node.querySelector( '.lyteCalTableRowGroup' );
	},

	moveForward: function( event, navDirection, cellsToMove ) {
		this.move( event, navDirection, cellsToMove );
	},

	moveBackward: function( event, navDirection, cellsToMove ) {
		this.move( event, navDirection, cellsToMove );
	},

	move: function( event, navDirection, cellsToMove ) {
		var activeCell = this.getActiveCell(),
		cells = this.getCells(),
		currentNavIndex = cells.indexOf( activeCell ),
		newNavIndex = currentNavIndex + cellsToMove,
		newActiveCell;

		if( !activeCell ) {
			return ;
		}

		if( !this.shouldViewChange( cells, newNavIndex, cellsToMove ) ) {
			newActiveCell = this.getCellFromSameView( cells, newNavIndex );
		}
		else {
			newActiveCell = this.getCellFromDifferentView( navDirection, currentNavIndex, cellsToMove, event );
		}

		this.activateCell( newActiveCell );
		this.focusActiveCell();
	},

	getCellFromSameView: function( cells, index ) {
		return cells[ index ];
	},

	focusActiveCell: function() {
		var activeCell = this.getActiveCell();

		if( activeCell ) {
			activeCell.focus();
		}
	},

	focusActiveRow: function() {
		var activeRow = this.getActiveRow();
		if( activeRow ) {
			activeRow.focus();
		}
	},

	shouldViewChange: function( cells, newNavIndex, cellsToMove ) {
		var viewType = this.getData( 'viewType' );

		if( viewType === 'monthView' || viewType === 'decadeView' ) {
			return !cells[ newNavIndex ];
		}

		return !this.isSameMonth( cellsToMove );
	},

	isDisabledCell: function( cell ) {
		return cell.classList.contains( 'lyteCalDisabled' )
	},

	getCellFromDifferentView: function( navDirection, currentNavIndex, cellsToMove, event ) {
		var viewType = this.getData( 'viewType' ), newActiveDate;

		if( viewType === 'monthView' || viewType === 'decadeView' ) {
			this.changeView( navDirection );

			return this.getDrillDownViewCell( navDirection, currentNavIndex, cellsToMove );
		}


		newActiveDate = this.getChangedDate( cellsToMove );
		this.changeView( navDirection );
		

		return this.getCell( newActiveDate );
	},

	getDrillDownViewCell: function( navDirection, currentNavIndex, cellsToMove ) {
		var cells = this.getCells();

		return navDirection === 'previous' ? cells[ cells.length + ( currentNavIndex + cellsToMove ) ] : cells[ ( currentNavIndex + cellsToMove ) % cells.length ]
	},

	changeView: function( navDirection ) {
		if( navDirection === 'previous' ) {
			this.moveToPrevious( 'M', event );	
		}
		else {
			this.moveToNext( 'M', event );
		}
	},

	moveToFirstCell: function( event, navDirection ) {
		var actionType = 'home',
		cellsToMove = this.getCellsToMove( navDirection, actionType );

		this.moveBackward( event, navDirection, cellsToMove );
	},

	moveToLastCell: function( event, navDirection ) {
		var actionType = 'end', 
		cellsToMove = this.getCellsToMove( navDirection, actionType );

		this.moveForward( event, navDirection, cellsToMove );
	},

	getCellsToMove: function( navDirection, actionType ) {
		var activeCell = this.getActiveCell(),
		parentElement = ( activeCell || {} ).parentElement,
		children = Array.from( ( parentElement || {} ).children || [] ),
		index = children.indexOf( activeCell ), viewType = this.getData( 'viewType' );

		if( !activeCell ) {
			return 0;
		}

		if( actionType === 'home' || actionType === 'end' ) {
			return navDirection === 'previous' ? -index : ( children.length - 1 - index );
		}
	
		if( viewType === 'monthView' || viewType === 'decadeView' ) {
			return navDirection === 'previous' ? -4 : 4;
		}

		return navDirection === 'previous' ? -7 : 7;
	},

	getCell: function( date ) {
		return this.$node.querySelector( '[data-date="' + date + '"]' );
	},

	isSameMonth: function( daysToChange ) {
		var changedMonth = this.getChangedMonth( daysToChange ),
		viewDate = this.getData( 'viewDate' ),
		currentViewedMonth = viewDate.getMonth();
		
		return changedMonth === currentViewedMonth;

	},

	getChangedMonth: function( daysToChange ) {
		var changedDate = this.getChangedDate( daysToChange ),
		format = this.getData( 'ltPropFormat' );

		return $L.moment( changedDate, format ).format( 'M' ) - 1;
	},

	// Assume activeCell will always return a valid cell
	getChangedDate: function( daysToChange ) {
		var activeCell = this.getActiveCell(),
		activeDate = activeCell.getAttribute( 'data-date' ),
		format = this.getData( 'ltPropFormat' );

		return $L.moment( activeDate, format ).add( daysToChange, 'day' ).format( format );
	},

	previousNavigation: function( MONTH, event ) {
		var YEAR = 'Y', MONTH = 'M', 
		navigationType = event.shiftKey ? YEAR : MONTH;

		this.moveToPrevious( navigationType, event );
		this.focusActiveCell();
	},

	nextNavigation: function( MONTH, event ) {
		var YEAR = 'Y', MONTH = 'M', 
		navigationType = event.shiftKey ? YEAR : MONTH;

		this.moveToNext( navigationType, event );
		this.focusActiveCell();
	},

	toDate : function(){
		if( this.isHavingTimezone ){
			return new Date( $L.moment().format( 'MM/DD/YYYY' ) );
		}
		return new Date();
	},

	moment : function( arg1, arg2, arg3 ){
		var timezone = this.isHavingTimezone;
		if( timezone ){// for test case failure
			if( arg3 ){
				arg3.ignore_timezone = timezone;
			} else{
				arg3 = { ignore_timezone : timezone };
			}
			return $L.moment( arg1, arg2, arg3 );
		} else{
			if( arg2 ){ // for test case failure
				if( arg3 ){ // for test case failure
					return $L.moment( arg1, arg2, arg3 );
				}
				return $L.moment( arg1, arg2 );
			}
			return $L.moment( arg1 );
		}
	},

	changeBodyContainerClass: function() {
		var container = this.$node.querySelector( '.lyteCalTableContainer' ),
		viewType = this.getData( 'viewType' ),
		selectionType = this.getData( 'ltPropSelectionType' );

		if( this.isDrilldown() ) {
			if( viewType === 'dateView' ) {
				container.classList.remove( 'lyteDrillCalMonthView' );
				container.classList.remove( 'lyteDrillCalYearView' );
			}
			else if( viewType === 'monthView' ) {
				container.classList.add( 'lyteDrillCalMonthView' );
				container.classList.remove( 'lyteDrillCalYearView' );
			}
			else if( viewType === 'decadeView' ) {
				container.classList.remove( 'lyteDrillCalMonthView' );
				container.classList.add( 'lyteDrillCalYearView' );
			}
		}
		else {
			this.removeSelectionStyles();

			if( selectionType === 'day' ) {
				container.classList.add( 'lyteCalDaySelType' );
			}
			else if( selectionType === 'week' ) {
				container.classList.add( 'lyteCalWeekSelType' );
			}
			else if( selectionType === 'month' ) {
				container.classList.add( 'lyteCalMonthSelType' );
			}
			else {
				container.classList.add( 'lyteCalYearSelType' );
			}
		}

		
	}.observes( 'viewType' ).on( 'didConnect' ),

	removeSelectionStyles: function() {
		var container = this.$node.querySelector( '.lyteCalTableContainer' );

		container.classList.remove( 'lyteCalDaySelType' );
		container.classList.remove( 'lyteCalWeekSelType' );
		container.classList.remove( 'lyteCalMonthSelType' );
		container.classList.remove( 'lyteCalYearSelType' );
	},

	changeDaysOfWeek: function() {
		var days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ], 
		title = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
		startDay = this.getData( 'ltPropStartWeekDay' ), i, result = [] ;
		for( i = 0; i < 7; i++ ) { 
			result.push( { 'day': days[ ( i + startDay ) % 7 ], 'id': this.generateRandomId() , 'title': title[ ( i + startDay ) % 7 ] } );
		}

		this.setData( 'daysOfWeek', result );
		
	},

	generateRandomId: function() {
		return 'Lyte_Calendar_Day_' + _lyteUiUtils.calId++;
	},

	isYYFormat: function() {
		var format = this.getData( 'ltPropFormat' ),
		rYY = /\byy\b/ig;

		return rYY.test( format );
	},

	outsideBoundary: function( calStartDate ) {
		var calculatedYear = calStartDate.getFullYear(),
		current = this.toDate(),
		currentYear = current.getFullYear(),
		diff = calculatedYear - currentYear,
		dateBounds = this.isMomentSupported ? $L.moment() : { uL: 19, lL: 80 };

		if( diff > dateBounds.uL ) {
			return true;
		}
		else if( diff < -dateBounds.lL ) {
			return true;
		}	
		
	},

	didDestroy: function() {
		delete this.$node.revertToToday;
	},

	activateNavigation: function() {
		if( !this.getData( 'ltPropActivateNavigation' ) ) {
			return ;
		}

		this.activateRelevantCell();

		this.setData( 'ltPropActivateNavigation', false );

	}.observes( 'ltPropActivateNavigation' ),

	activateRelevantCell: function() {
		var format = this.getData( 'ltPropFormat' ),
		curDate = this.stringToDate( this.getData( 'ltPropCurrentDate' ), format ),
		todayDate = new Date(), 
		previousActiveDate = this.stringToDate( this.getData( 'previousActiveCellDate' ), format ), relevantCell;

		if( previousActiveDate !== 'Invalid Date' ) {
			relevantCell = this.findSimilarCell( previousActiveDate );
		}

		if( curDate !== 'Invalid Date' ) {
			relevantCell = relevantCell || this.findSimilarCell( curDate );
		}

		relevantCell = relevantCell || this.findSimilarCell( todayDate );

		this.activateCell( relevantCell );
	},

	findSimilarCell: function( userDateObj ) {
		var userDate = userDateObj.getDate(),
		currentViewedDateObj = this.getData( 'viewDate' ),
		currentViewedMonth = currentViewedDateObj.getMonth(),
		currentViewedYear = currentViewedDateObj.getFullYear(),
		userMonth = userDateObj.getMonth(),
		numberOfDaysInMonth = this.getNumber( currentViewedMonth, currentViewedYear ),
		format = this.getData( 'ltPropFormat' ),
		resultDate, resultDateObj, resultDateString;

		resultDate = userDate > numberOfDaysInMonth ? numberOfDaysInMonth : userDate;
		resultDateObj = new Date( currentViewedMonth + 1 + '/' + resultDate + '/' + currentViewedYear );
		resultDateString = this.getDateFromFormat( resultDateObj, format );

		return this.getCell( resultDateString );
	},

	activateCell: function( cell ) {

		if( !cell ) {
			return ;
		}

		var previousCell = this.$node.querySelector( '.lyteCalNavCell' );

		if( previousCell ) {
			previousCell.classList.remove( 'lyteCalNavCell' );
			previousCell.setAttribute( 'tabindex', '-1' );
		}

		cell.setAttribute( 'tabindex', '0' );
		cell.focus();
		cell.classList.add( 'lyteCalNavCell' );
		
		this.setData( 'previousActiveCellDate', cell.getAttribute( 'data-date' ) );
	},

	getActiveCell: function() {
		return this.$node.querySelector( '.lyteCalNavCell' );
	},

	getActiveRow: function() {
		var par =  this.$node.querySelector( '.lyteCalToday' ); //gives undefined !?
		return $L( par ).closest('lyteCalTableRow')[0];
	},

	setMonthAndYearDropdown : function(){
		if(!this.getData('navYield') && this.isDropdownHeader() && this.getData('monthDD') && this.getData('yearDD')){
			var monthHeaders = this.getData('monthHeader').split( ' ' ),
			format = this.getData( 'ltPropMonthHeaderFormat' ), 
			lmd = /MMMM YYYY/ig,
			ld = /MMM YYYY/ig,
			monthArray = [],
			monthNames;
			if(arguments[0].item == "callFrmDidcnct"){
				if(lmd.test( format )){
					monthNames = this.getData('monthNames');
				}
				else if(ld.test(format)){
					monthNames = this.getData('shortHands');
				}
				for(var i=0;i<monthNames.length; i++){
					monthArray[i] = _lyteUiUtils.i18n(monthNames[i]);
				}
				this.setData('monthNames',monthArray);
			}
			// this.getData('monthDD').component.setData('ltPropOptions',monthArray);
			this.getData('monthDD').component.setData('ltPropSelected',monthHeaders[0]);
			this.getData('yearDD').component.setData('ltPropSelected',monthHeaders[1]);
		}
	}.observes('monthHeader','callFrmDidcnct'),

	startWeekDayObserver: function() {
		this.changeDaysOfWeek();
	}.observes( 'ltPropStartWeekDay' ),

	monthHeaderObserver: function() {
		this.buildDateViewHeader();
	}.observes( 'monthNames.[]' ),

	getMonthHeader: function() {
		var format = this.getData( 'ltPropMonthHeaderFormat' ), 
		lmd = /MMMM YYYY/ig,
		ld = /MMM YYYY/ig,
		retval = "", monthArray;

		if( lmd.test( format ) ) {
			monthArray = this.getData( 'monthNames' )
			retval = _lyteUiUtils.i18n( monthArray[ this.getData( 'viewDate' ).getMonth() ] ) + " " + this.getData( 'viewDate' ).getFullYear();
		}
		else if( ld.test( format ) ) {
			monthArray = this.getData( 'shortHands' )
			retval = _lyteUiUtils.i18n( monthArray[ this.getData( 'viewDate' ).getMonth() ] ) + " " + this.getData( 'viewDate' ).getFullYear();
		}

		return retval;
	},

	revert: function( event ) {
		var from = new Date( this.getData( 'viewDate' ).getTime() ), 
		curDate = this.toDate();


		curDate.setDate(1);

		var to = new Date( curDate.getTime() );

		this.setData( 'viewDate', curDate );
		this.setAndBuildView( 'dateView', event );
		if( !this.getData('ltPropAlwaysShowToday') ){
			this.setData('showToday',false);
		}
		if( this.getMethods( 'onNavigate' ) 
			&& ( from.getMonth() !== to.getMonth() 
			|| from.getFullYear() !== to.getFullYear() ) 
		) {
			this.executeMethod( 'onNavigate', event, this.getDateFromFormat( from, this.getData( 'ltPropFormat' ) ), this.getDateFromFormat( to, this.getData( 'ltPropFormat' ) ) ,this );
		}
	},

	revertToMonth: function( event ) {
		var from = new Date( this.getData( 'viewDate' ).getTime() ), 
		curDate = this.toDate();


		curDate.setDate(1);

		var to = new Date( curDate.getTime() );

		this.setData( 'viewDate', curDate );
		this.setAndBuildView( 'monthView', event );
		if( !this.getData('ltPropAlwaysShowToday') ){
			this.setData('showToday',false);
		}
		if( this.getMethods( 'onNavigate' ) 
			&& ( from.getMonth() !== to.getMonth() 
			|| from.getFullYear() !== to.getFullYear() ) 
		) {
			this.executeMethod( 'onNavigate', event, this.getDateFromFormat( from, this.getData( 'ltPropFormat' ) ), this.getDateFromFormat( to, this.getData( 'ltPropFormat' ) ) ,this );
		}
	},

	getDateFromFormat: function( dateObj, format ) {
		if( this.isMomentSupported ) {
			return this.getDateStringFromMoment( dateObj, format );
		}
		else {
			return this.getDateStringManually( dateObj, format );
		}
	},

	getDateStringFromMoment: function( dateObj, format ) {
		format = this.getRelevantFormat( format );

		return this.moment( dateObj ).format( format );
	},

	resolveConflicts: function( format ) {
		var match = /(\bd\b|\bdd\b|\bddd\b|\bdddd\b)/.exec( format ),
		index = ( match || {} ).index,
		matchLength = ( match || [] )[ 0 ].length || 0;

		if( !isNaN( index ) ) {
			return format.substring( 0, index + matchLength ) + ( format.substring( index + matchLength ) || '' ).toUpperCase();
		}

		return format.toUpperCase();
	},

	isConflictingFormat: function( format ) {
		var rdate = /(\bd\b|\bdd\b|\bddd\b|\bdddd\b)/ig,
		match = format.match( rdate ) || [];

		return match.length > 1;
	},

	getRelevantFormat: function( format ) {

		if( this.isConflictingFormat( format ) ) {
			return this.resolveConflicts( format );
		}

		return format.toUpperCase();
	},

	getDateStringManually: function( dateObj, format ) {
		var date = dateObj.getDate(), year = dateObj.getFullYear(), month = dateObj.getMonth() + 1, monthArray,
		sd = /(MM).+(DD).+(YYYY)/ig,
		dmy = /(DD).+(MM).+(YYYY)/ig,
		ld = /(MMM|DD|YYYY).+(MMM|DD|YYYY).+(YYYY|MMM|DD)/ig,
		lmd = /(MMMM|DD|YYYY).+(MMMM|DD|YYYY).+(YYYY|MMMM|DD)/ig,
		iso =/(YYYY).+(MM).+(DD)/ig;

		format = format.toUpperCase();
		
		if( month < 10 ) {
			month = '0' + month
		}

		if( date < 10 ) {
			date = '0' + date
		}

		if( lmd.test( format ) ) {
			monthArray = [ 
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
			]
			format = format.replace( 'MMMM', monthArray[ month - 1 ] );
			format = format.replace( 'DD', date );
			format = format.replace( 'YYYY', year );
		}
		else if( ld.test( format ) ){
			monthArray=[ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
			format = format.replace( 'MMM', monthArray[ month - 1 ] );
			format = format.replace( 'DD', date );
			format = format.replace( 'YYYY', year );
		}
		else if( iso.test( format ) ){
			format = format.replace( 'MM', month );
			format = format.replace( 'DD', date );
			format = format.replace( 'YYYY', year );
		}
		else if( sd.test( format ) ) {
			format = format.replace( 'MM', month );
			format = format.replace( 'DD', date );
			format = format.replace( 'YYYY', year );
		}
		else if( dmy.test( format ) ) {
			format = format.replace( 'MM', month );
			format = format.replace( 'DD', date );
			format = format.replace( 'YYYY', year );
		}
		
		return format
	},

	isLeapYear: function( year ) {
		return ( ( year % 4 == 0 ) && ( year % 100 != 0 ) ) || ( year % 400 == 0 );
	},

	getNumber: function(month,year) {
		var daysinmonths = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
		if( this.isLeapYear.call( this, year ) && month == 1 ) {
			return 29;
		}
		else{
			return daysinmonths[ month ];
		}
	},

	showtoday: function() {
		var curDate = this.toDate();

		if( curDate.getMonth() != this.getData('viewDate').getMonth() || curDate.getYear() != this.getData('viewDate').getYear() ) {
			this.setData( 'showToday', true );
		}
		else {
			this.setData( 'showToday', false );
		}

		if( this.getData('ltPropAlwaysShowToday') ){
			this.setData( 'showToday', true);
		}

	},

	reset: function( cur ) {
		cur.setHours( 0 );
		cur.setMinutes( 0 );
		cur.setSeconds( 0 );
		cur.setMilliseconds( 0 );
	},

	checkDate: function( current ) {
		var start = this.getData( 'ltPropMinDate' ) || '', 
		end = this.getData( 'ltPropMaxDate' ) || '',
		startDate, endDate;

		this.reset( current );

		if( start === '' && end === '' ) {
			return true;
		}
		else if( start !== '' && end === '' ) {
			startDate = this.stringToDate( start, this.getData( 'ltPropFormat' ) );
			this.reset( startDate );
			
			if( current >= startDate ) {
				return true;
			}
		}
		else if( start !== '' && end !== '' ) {
			startDate = this.stringToDate( start, this.getData( 'ltPropFormat' ) );
			this.reset( startDate );

			endDate = this.stringToDate( end, this.getData( 'ltPropFormat' ) );
			this.reset( endDate );

			if( current >= startDate && current <= endDate ) {
				return true;
			}
		}
		else {
			endDate = this.stringToDate( end, this.getData( 'ltPropFormat' ) );
			this.reset( endDate );

			if( current <= endDate ) {
				return true;
			}
		}

		return false;
	},

	numberOfRowsChange: function() {
		// https://stackoverflow.com/questions/19727905/in-javascript-is-it-expensive-to-use-try-catch-blocks-even-if-an-exception-is-n
		// No penalty in chrome >= 60
		var numberOfRows = this.getData( 'ltPropNumberOfRows' );

		try {
			if( numberOfRows < 5 ) {
				throw "Calendar failed to render. The number of rows should be greater than 4.";
			}
		}
		catch( e ) {
			console.error( e );
			return ;
		}

		this.setDatesFunction();
	}.observes( 'ltPropNumberOfRows' ),

	setDates: function( arg ) {
		if( this.__ignoremin && arg.item == "ltPropMinDate" ){
			return;
		}
		this.setDatesFunction();
	}.observes( 
		'ltPropStartDate', 
		'ltPropEndDate', 
		'changeData', 
		'ltPropMinDate', 
		'ltPropMaxDate',
		'ltPropFormat',
		'ltPropStartWeekDay'
	),

	getNumberOfFirstRowDates: function( firstday ) {
		var startDayOfMonth = this.getData( 'ltPropStartWeekDay' ), 
		firstRowDays;

		if( firstday == 0 ) {
			firstRowDays = startDayOfMonth === 0 ? 7 : startDayOfMonth;
		}
		else {
			if( firstday < startDayOfMonth ) {
				firstRowDays = startDayOfMonth - firstday;
			}
			else {
				firstRowDays = 7 - ( firstday - startDayOfMonth );
			}
		}

		return firstRowDays;

	},

	getNumberToSubtract: function( firstday ) {
		var numberToSubtract, startDayOfMonth = this.getData( 'ltPropStartWeekDay' );

		if( firstday == 0 ) {
			numberToSubtract = startDayOfMonth == 0 ? 0 : 7 - startDayOfMonth;
		}
		else {
			if( firstday < startDayOfMonth ) {
				numberToSubtract = 7 - ( startDayOfMonth - firstday );
			}
			else {
				numberToSubtract = firstday - startDayOfMonth;
			}
		}

		return numberToSubtract;
	},

	getFirstDay: function( date, day ) {
		var first;

		first = date - Math.floor( date / 7 ) * 7 - 1;
		first = day - first;

		if( first < 0 ){
			first = 7 - first;
		}

		return first;
	},

	getRemainingDays: function( numberOfDaysInMonth, firstRowDays ) {
		var rem = numberOfDaysInMonth - firstRowDays;
		rem = rem - 28;

		return rem;
	},

	inc: function( rem, num ) {
		var preventAddingRows = this.getData( 'ltPropPreventAddingRows' );

		if( preventAddingRows ) {
			return num;
		}

		if( rem > 0 && num == 6 ) {
			return 7; 
		}

		return num;
	},

	setDatesFunction: function() {
		// Number of rows in the table
		var numberOfRows = this.getData( 'ltPropNumberOfRows' ), 
		fillRows = this.getData( 'ltPropFillRows' ), 
		format = this.getData( 'ltPropFormat' ),
		reachedNextMonth = false, 
		result = [],
		cur = this.getData( 'viewDate' ), 
		day = cur.getDay(),
		date = cur.getDate(), 
		firstday =  this.getFirstDay( date, day ),
		month = cur.getMonth(),
		year = cur.getFullYear(),
		numberOfDaysInMonth = this.getNumber( month, year ),
		firstRowDays = this.getNumberOfFirstRowDates( firstday ),
		rem = this.getRemainingDays( numberOfDaysInMonth, firstRowDays ),
		selectionType = this.getData( 'ltPropSelectionType' ) || 'day';

		var weekNumber = this.getCurrentWeekNumber( cur );
		var weekNumArr = [];

		numberOfRows = this.inc( rem, numberOfRows );

		var calStartDate = new Date( month + 1 + '/1/' + year ), 
		numberToSubtract = this.getNumberToSubtract( firstday );

		calStartDate.setDate( calStartDate.getDate() -  numberToSubtract );
		
		var todayDate = this.__ignoremin ? cur : this.toDate(), firstRow;


		var curSelectedDate = this.getSelectedDateObj(),
		disabledDates = this.getDisabledDates();

		// Construct array
		for( var i = 0; i < numberOfRows; i++ ) {

			// This is to ensure that we don't create an empty row when we reach the next month when fillRows is false.
			if(reachedNextMonth) {
				break;
			}

			var weekNumClass = 'lyteWeekNumberGrid';
			result.push( [] );

			for( var j = 0; j < 7; j++ ) {
				if( !fillRows && month !== calStartDate.getMonth() ) {
					result[i].push( { emptyBlock: true } );
					calStartDate.setDate( calStartDate.getDate() + 1 );

					if( i != 0 ) {
						reachedNextMonth = true;
					}

					continue;
				}
				else if( fillRows && this.isYYFormat() && this.outsideBoundary( calStartDate ) && !this.isIso ) {
					result[ i ].push( { emptyBlock: true } );
					calStartDate.setDate( calStartDate.getDate() + 1 );

					if( i != 0 ) {
						reachedNextMonth = true;
					}

					continue;
				}

				var clsname = 'lyteCalCdate', newMonth = calStartDate.getMonth(),
				curDate = new Date( this.getData( 'viewDate' ).getTime() ),
				curMonth = curDate.getMonth(),
				ndate = calStartDate.getDate(),
				nyear = calStartDate.getYear(),
				isInRange = this.checkDate( calStartDate ),
				isDisabled = this.isDisabled( calStartDate, disabledDates ),
				isPresent = ( this.getData( 'ltPropMinDate' ) || "" ) !== "" || ( this.getData( 'ltPropMaxDate' ) || "" ) !== "";

				if( curMonth !== newMonth ) {
					clsname += ' lyteCalDiffMonth';

					if( !isPresent ) {
						clsname += ' lyteCalGray';
					}

					// Out of range in different month
					else if( !isInRange ) {
						clsname += ' lyteCalDisabled';
					}		
				}

				// Out of range in same month
				else if( isPresent 
					&& !isInRange ) {
					clsname += ' lyteCalDisabled';
				}

				if( isDisabled ) {
					clsname += ' lyteCalendarDisabledDate';
				}
				if( selectionType === 'day' && this.isSelectedDate( calStartDate, curSelectedDate ) && this.getData( 'selectDate' ) ) {
					clsname += ' lyteCalSel';
				}

				if( selectionType === 'week' ) {
					clsname += ' ' + this.getWeekSelectedClass( calStartDate );
				}

				if( todayDate.getMonth() === newMonth && todayDate.getDate() === ndate && todayDate.getYear() === nyear /*&& this.getData( 'selectDate' )*/ ) {
					clsname += ' lyteCalToday';
					weekNumClass += ' lyteCalCurWeekNum';
				}

				// Add Classes for weekends
				if( this.isWeekend( calStartDate ) ) {
					clsname += ' lyteCalWeekend';	//only weekend
					if( this.getData('ltPropDisableWeekends') && !isDisabled ){
						clsname += ' lyteCalendarDisabledDate'; 
					}

					if( this.getData('ltPropHighlightWeekendHolidays') &&  this.isHoliday( calStartDate ) ){
						clsname += ' lyteCalWeekendHoliday'; 	//weekend and holiday 
					}
				}

				if( this.isHoliday( calStartDate ) ) {
					clsname += ' lyteCalHoliday';
					if( this.getData('ltPropDisableHolidays') && !isDisabled ){
						clsname += ' lyteCalendarDisabledDate';
					}
				}

				// Store in array and increment date by 1
				clsname += ' lyteCalTableCell';
				var obj = {};
				obj.date = calStartDate.getDate();
				obj.id = this.generateRandomId();
				obj.clsname = clsname;
				obj.val = this.getDateFromFormat.call( this, calStartDate, this.getData( 'ltPropFormat' ) );
				result[ i ].push( obj );
				// Lyte.arrayUtils( this.getData( 'matrix' )[ i ], 'push', obj )
				calStartDate.setDate( calStartDate.getDate() + 1 );
			}

			weekNumArr.push( {class: weekNumClass, val: weekNumber++} );
		}

		this.setData( 'matrix', result );
		this.setData( 'weeknum', weekNumArr );

		if( this.shouldActivateCell() ) {
			this.activateRelevantCell();
		}
	},

	isSelectedDate: function( date, selectedDate ) {
		var isMultiple = this.getData( 'ltPropMultiple' );

		if( isMultiple ) {
			return this.isDateInArray( selectedDate, date );
		}
		else {
			return selectedDate !== 'nodate' && selectedDate !== 'Invalid Date'  && this.isSameDate( date, selectedDate );
		}
		
	},

	isDateInArray: function( dateArr, date ) {
		dateArr = dateArr || [];

		for( var i = 0; i < dateArr.length; i++ ) {
			if( this.isSameDate( date, dateArr[ i ] ) ) {
				return true;
			}
		}
	},

	isSameDate: function( obj1, obj2 ) {
		return obj1.getYear() == obj2.getYear()
			&& obj1.getMonth() == obj2.getMonth()
			&& obj1.getDate() == obj2.getDate();
	},

	getSelectedDateObj: function() {
		var isMultiple = this.getData( 'ltPropMultiple' ),
		selectedDates = this.getData( 'ltPropCurrentDates' ),
		that = this,
		dateObj;

		if( isMultiple ) {
			return this.getDObjArrayFromStrings( selectedDates );
		}
		else {
			if(this.isIso){
				dateObj = this.isoToDate( this.getData('ltPropIso') );
			}else{
				dateObj = this.getData( 'ltPropCurrentDate' ) ? this.stringToDate( this.getData( 'ltPropCurrentDate' ), this.getData( 'ltPropFormat' ) ) : 'nodate';
			}

			return dateObj;
		}

	},

	getDObjArrayFromStrings: function( dates ) {
		var that = this;

		dates = dates || [];

		return dates.map( function( date ) { 
			return that.stringToDate( date, that.getData( 'ltPropFormat' ) );
		} );
	},

	getDisabledDates: function() {
		var disabledDates = this.getData( 'ltPropDisabledDates' );

		return this.getDObjArrayFromStrings( disabledDates );
	},

	isDisabled: function( date, disabledDates ) {
		return this.isDateInArray( disabledDates, date );
	},

	getWeekSelectedClass: function( currentDate ) {
		var selectedWeek = this.getData( 'ltPropCurrentWeek' ) || [],
		weekStart = selectedWeek[ 0 ] || '',
		weekEnd = selectedWeek[ 1 ] || '',
		format = this.getData( 'ltPropFormat' );

		weekStart = this.stringToDate( weekStart, format );
		weekEnd = this.stringToDate( weekEnd, format );

		if( weekStart === 'Invalid Date' || weekEnd === 'InvalidDate' || currentDate < weekStart || currentDate > weekEnd ) {
			return ''
		}
		else {
			return 'lyteCalWeekSel';
		}
	},

	isWeekend: function( date ) {
		var day = date.getDay(),
		weekends = this.getData( 'ltPropWeekends' ) || [];

		return !!~weekends.indexOf( day );
	},

	isHoliday: function( date ) {
		var holidays = this.getData( 'ltPropHolidays' ) || [],
		dayHol = date.getDate(),
		monHol = date.getMonth() + 1,
		monYear = date.getFullYear();

		var strHol =  dayHol + '/' + monHol +'/' + monYear;
		
		return !!~holidays.indexOf( strHol );
	},

	shouldActivateCell: function() {
		var disableNavigation = this.getData( 'ltPropDisableNavigation' ),
		/* input can set the lt-prop-current-date - so don't activate during observer changes because input might lose focus */
		isObserverCall = this.isFromCurrentDateObserver,

		/* don't focus when previous/next buttons are pressed */
		navigationButtonPressed = this.navigationButtonPressed;

		this.isFromCurrentDateObserver = false;

		this.navigationButtonPressed = false;

		return !disableNavigation && !isObserverCall && !navigationButtonPressed;
	},

	executeViewDateChanges : function() {
		if( this.getMethods( 'onViewdateChange' ) ) {
			this.executeMethod( 'onViewdateChange', this, this.getData( 'viewDate' ) );
		}
	}.observes( 'viewDate' ),

	/** 
	 * get proper month from user defined value
	 * @param {String} mon - The current month
	 *
	 */

	getProperMonth: function( val ) {
		var sm = {
			'jan': 1,
			'feb': 2,
			'mar': 3,
			'apr': 4,
			'may': 5,
			'jun': 6,
			'jul': 7,
			'aug': 8,
			'sep': 9,
			'oct': 10,
			'nov': 11,
			'dec': 12
		}, lg = {
			'january': 1,
			'february': 2,
			'march': 3,
			'april': 4,
			'may': 5,
			'june': 6,
			'july': 7,
			'august': 8,
			'september': 9,
			'october': 10,
			'november': 11,
			'december': 12
		}, ret

		val = val.toLowerCase();
		ret = sm[ val ] || lg[ val ];

		if( !ret && ret !== 0 ) {
			return parseFloat( val ) - 1;
		}

		return ret-1;
	},

	/**
	 * Checks if the date is a proper date for the corresponding month and year
	 * @param {Number} year - The year of the date object
	 * @param {Number} month - The month of the date object
	 * @param {Number} date - The date value of the date object
	 *
	 */

	isProperDate: function( year, month, date ) {
		var daysInMonth = this.getNumber( month, year );

		if( date <= daysInMonth ) {
			return true;
		}

		return false;
	},


	/**
	 * Return the date object for the given string and format
	 * @param {String} dateString - The current date in the form of a string
	 * @param {String} format - The format of the dateString
	 *
	 */

	getDateObjFromString: function( dateString, format ) {
		try {
			var vals = dateString.match( /([\da-z]+)/ig ), year, month,
			format = format.toUpperCase(),
			sep = format.match( /([a-z]+)/ig ),
			date = this.toDate(), i = 0, order=['Y', 'M', 'D'];
			date.setDate(1);  //initialize the day to be 1 to avoid error for eg: 30 Feb if passed will generate 1 Mar as result.

			if( vals.length !== 3 ) {
				return 'Invalid Date';
			}

			while( i < sep.length ) {
				var ind = this.getOrderIndex(sep, order[ i ] );

				if( i == 0 ) {
					date.setFullYear( year = vals[ ind ] );
				}
				else if( i == 1 ) {
					month = this.getProperMonth( vals[ ind ] );

					if( month < 0 || month > 11 ) {
						return 'Invalid Date';
					}

					date.setMonth( month );
				}
				else if( i == 2 ) {
					if( !this.isProperDate( year, month, vals[ ind ] ) ) {
						return 'Invalid Date';
					}

					date.setDate( vals[ ind ] );
				}

				if( date.toString() === 'Invalid Date' ) {
					return date.toString();
				}

				i++;
			}

			return date;	
		}
		catch( e ) {
			return 'Invalid Date';
		}
	},

	getDateObjFromMoment: function( dateString, format ) {
		var momentObj, ret;

		format = this.getRelevantFormat( format );

		if( !dateString ) {
			return 'Invalid Date';
		} 

		try {
			momentObj = this.moment( dateString, format );
			ret = momentObj.getDObj();
		}
		catch( e ) {
			ret = 'Invalid Date';
		}

		if( Object.prototype.toString.call( ret ) === '[object Date]' ) {
			if( isNaN( ret.getTime() ) ) {
				ret = 'Invalid Date';
			}
		}

		return ret || 'Invalid Date';
	},

	/**
	 * Convert the string to date object based on the format
	 * @param {String} cur - The current date of the user passed
	 * @param {String} format - The format of the dates
	 *
	 */

	stringToDate: function( cur, format ) {
		var ret;

		cur = this.convertToEnglish( cur );

		if( this.isMomentSupported ) {
			ret = this.getDateObjFromMoment( cur, format );
		}
		else {
			ret = this.getDateObjFromString( cur, format );
		}

		return ret;
	},
	findISO: function(){
		this.isIso = this.getData('ltPropIso') ? true : false;
	},
	isoToDate: function(cur){
		var ret = $L.moment(cur).getDObj();
		this.data.ltPropCurrentDate = $L.moment(ret).format(this.getData('ltPropFormat'));
		return ret;
	},

	convertToEnglish: function( cur ) {
		var i18n = this.getData( 'ltPropI18n' ),
		format = this.getData( 'ltPropFormat' );

		if( i18n ) {
			return this.moment( cur, format, { i18n : true } ).format( format );
		}

		return cur;
	},

	getEnglishShorthand: function( cur ) {
		var months = this.getShortHands(), proper = -1, max = 0,
		shortHands = this.getData( 'shortHands' );

		for( var i = 0; i < months.length; i++ ) {
			if( !!~cur.indexOf( months[ i ] ) && months[ i ].length > max ) {
				proper = i;
				max = months[ i ].length;
			}
		}

		if( proper !== -1 ) {
			cur = cur.replace( months[ proper ], this.getProperShortHand( shortHands[ proper ] ) );
		}

		return cur;
	},

	getShortHands: function() {
		var shortHands = this.getData( 'shortHands' ), res = [];

		for( var i = 0; i < shortHands.length; i++ ) {
			res.push( _lyteUiUtils.i18n( shortHands[ i ] ) );
		}

		return res;
	},

	getProperShortHand: function( val ) {
		if( val === 'short.may' ) {
			return 'May';
		}

		return val;
	},

	getEnglishStandard: function( cur ) {
		var months = this.getStandardMonths(), englishMonths = this.getData( 'monthNames' ),
		proper = -1, max = 0;

		for( var i = 0; i < months.length; i++ ) {
			if( !!~cur.indexOf( months[ i ] ) && months[ i ].length > max ) {
				proper = i;
				max = months [ i ].length;
			}
		}

		if( proper !== -1 ) {
			cur = cur.replace( months[ proper ], englishMonths[ proper ] );
		}

		return cur;
	},

	getStandardMonths: function() {
		var monthNames = this.getData( 'monthNames' ), res = [];

		for( var i = 0; i < monthNames.length; i++ ) {
			res.push( _lyteUiUtils.i18n( monthNames[ i ] ) );
		}

		return res;
	},

	getOrderIndex : function(objArr, match){
		for(var i = 0; i < objArr.length; i++){
			if(objArr[i].charAt(0) === match){
				return i;
			}
		}
		return -1;
	},

	buildYears: function() {
		/*var yearBounds = this.buildMinAndMaxYear(),*/
		var maxYear = 2100,
		minYear = 1900, i, years = [];

		for( i = minYear; i <= maxYear; i++ ) {
			years.push( i.toString() );
		}
		// if(this.isIso){
		// 	years.push( $L.moment(this.getData('ltPropIso')).get('fullYear') )
		// }
		this.setData( 'years', years );
	},

	/*buildMinAndMaxYear: function() {
			
		var currentDate = this.toDate();
		var isYYFormat = this.isYYFormat(),
		currentYear = currentDate.getFullYear(),
		dateBounds = this.isMomentSupported ? $L.moment() : { uL: 19, lL: 80 },
		valueToAdd = dateBounds.uL,
		valueToRemove = dateBounds.lL;

		return {
			maxYear: isYYFormat ? currentYear + valueToAdd : 2100,
			minYear: isYYFormat ? currentYear - valueToRemove : 1900
		};

	},*/

	setAndBuildView: function( viewType, event, preventCallback ) {
		var oldView = this.getData( 'viewType' ),
		newView = viewType;

		this.setData( 'viewType', viewType );

		if( viewType === 'monthView' ) {
			this.buildMonthView();
		}
		else if( viewType === 'decadeView' ) {
			this.buildDecadeView();
			this.setData( 'showToday', false );
		}
		else if( viewType === 'dateView' ) {
			this.buildDateView();
		}

		if( this.getData('ltPropAlwaysShowToday') ){
			this.setData( 'showToday', true );
		}
		// pressing the today button should not fire the viewChange when it is in the dateview
		if( !preventCallback && ( oldView !== newView ) ) {
			if( this.getMethods( 'onViewChange' ) ) {
				this.executeMethod( 'onViewChange', event, viewType, this );
			}
		}
		
	},

	buildDateView: function() {
		this.buildDateViewHeader();
		this.buildDateViewContent();
		this.showtoday();
	},

	buildDateViewHeader: function() {
		this.setData( 'monthHeader', this.getMonthHeader() );
	},

	buildDateViewContent: function() {
		this.setDatesFunction();
	},

	buildMonthView: function() {
		this.buildMonthViewHeader();
		this.buildMonthViewContent();
		this.showtoday();
		this.activateCell( this.getActiveCell() );
	},

	buildMonthViewHeader: function() {
		var viewDate = this.getData( 'viewDate' ),
		year = viewDate.getFullYear();

		this.setData( 'currentYear', year );
	},

	buildMonthViewContent: function() {
		var systemValues = this.getData( 'monthSystemValues' ),
		displayValue = this.getData( 'shortHands' ),
		rowCount = 3, columnCount = 4,
		rowIterator = 0, columnIterator,
		result = [], indexOfMonth;

		for( ; rowIterator < rowCount; rowIterator++ ) {
			result.push( [] );

			for( columnIterator = 0; columnIterator < columnCount; columnIterator++ ) {
				indexOfMonth = ( rowIterator * columnCount ) + columnIterator;

				result[ rowIterator ].push( 
					{
						displayValue: _lyteUiUtils.i18n( displayValue[ indexOfMonth ] ),
						systemValue: systemValues[ indexOfMonth ],
						class: this.getProperClassForMonthView( indexOfMonth )
					} 
				);
			}
		}

		this.setData( 'monthViewData', result );
	},

	getProperClassForMonthView: function( month ) {
		var viewDate = this.getData( 'viewDate' ),
		viewYear = viewDate.getFullYear(),
		todayMonth = this.getCurrentMonth(),
		todayYear = this.getCurrentYear(),
		format = this.getData( 'ltPropFormat' ),
		curDate = this.stringToDate( this.getData( 'ltPropCurrentDate' ), format ),
		previousActiveDate = this.getData( 'previousActiveCellDate' ) || '',
		previousActiveMonth = this.getData( 'monthSystemValues' ).indexOf( previousActiveDate ),
		ret = 'lyteCalTableCell', curMonth, selectedMonth = this.getData( 'ltPropCurrentMonth' );

		ret += todayYear === viewYear && month === todayMonth ? ' lyteDrillCalCurrentMonth': '';

		if( previousActiveMonth !== -1 ) {
			ret += month === previousActiveMonth ? ' lyteCalNavCell' : ''; 
		}
		else if( curDate !== 'Invalid Date' ) {
			curMonth = curDate.getMonth();
			ret += month === curMonth ? ' lyteCalNavCell' : '';
		}
		else {
			ret += month === todayMonth ? ' lyteCalNavCell' : '';
		}

		if( selectedMonth === ( month + 1 ).toString() ) {
			ret += ' lyteCalMonthSel';
		}
		

		return ret;
	},

	getCurrentYear: function() {
		var date = this.toDate();

		return date.getFullYear();
	},

	getCurrentMonth: function() {
		var date = this.toDate();

		return date.getMonth();
	},

	buildDecadeView: function() {
		this.buildDecadeViewHeader();
		this.buildDecadeViewContent();
		this.activateCell( this.getActiveCell() );
	},

	buildDecadeViewHeader: function() {
		var viewDate = this.getData( 'viewDate' ),
		currentYear = viewDate.getFullYear(),
		numberOfYearsFromDecadeStart = currentYear % 10,
		decadeStart = currentYear - numberOfYearsFromDecadeStart,
		decadeEnd = decadeStart + 9;

		this.setData( 'decadeStart', decadeStart );
		this.setData( 'decadeEnd', decadeEnd );
	},


	buildDecadeViewContent: function() {
		var viewDate = this.getData( 'viewDate' ),
		currentYear = viewDate.getFullYear(),
		numberOfYearsFromDecadeStart = currentYear % 10,
		decadeStart = currentYear - numberOfYearsFromDecadeStart,
		yearBounds = {minYear:1900 , maxYear:2100},	
		isYYFormat = this.isYYFormat(),
		minYear = yearBounds.minYear, maxYear = yearBounds.maxYear,	
		rows = 3, columns = 4, i, j, result = [], year;

		for( i = 0; i < rows; i++ ) {
			result.push( [] );

			for( j = 0; j < columns; j++ ) {

				year = ( decadeStart + i * 4 + j ) - 1;

				if( isYYFormat ) {
					result[ i ].push( 
						( year > maxYear || year < minYear ) ? this.emptyCell() : this.currentYearCell( year, decadeStart )
					);
				}
				else {
					result[ i ].push( this.currentYearCell( year, decadeStart ) );
				}
				
			}
		}

		this.setActiveDecadeCell( result );

		this.setData( 'decadeViewData', result );
	},

	emptyCell: function() {
		return {
			emptyBlock: true
		};
	},

	currentYearCell: function( year, decadeStart ) {
		var decadeEnd = decadeStart + 9,
		classVal = [], todayYear = this.getCurrentYear(),
		selectedYear = this.getData( 'ltPropCurrentYear' );

		if( year < decadeStart || year > decadeEnd ) {
			classVal.push( 'lyteCalOtherDecadeCell' );
		}

		if( todayYear === year ) {
			classVal.push( 'lyteDrillCalCurrentYear' );
		}

		if( selectedYear === year.toString() ) {
			classVal.push( 'lyteCalYearSel' )
		}

		return {
			year: year,
			emptyBlock: false,
			class: classVal.join( ' ' )
		}
	},

	setActiveDecadeCell: function( result ) {
		var currentDate = this.getData( 'ltPropCurrentDate' ),
		format = this.getData( 'ltPropFormat' ),
		currentDateObj = this.stringToDate( currentDate, format ),
		previousActiveDate = this.getData( 'previousActiveCellDate' ),
		todayYear = this.getCurrentYear(),
		yearToUse = !isNaN( previousActiveDate ) ? +previousActiveDate : ( currentDateObj !== 'Invalid Date' ? currentDateObj.getFullYear() : todayYear ),
		firstCell = result[ 0 ][ 0 ], firstRenderedYear = firstCell.year, lastCell = result[ result.length - 1 ][ result[ result.length - 1 ].length - 1 ], lastRenderedYear = lastCell.year, activeCellIndex;

		if( yearToUse >= firstRenderedYear && yearToUse <= lastRenderedYear ) {
			result[ Math.floor( ( yearToUse - firstRenderedYear ) / 4 ) ][ ( yearToUse - firstRenderedYear ) % 4 ].class += ' lyteCalNavCell';
		}
		else {
			if( yearToUse % 10 === 9 ) {
				activeCellIndex = Math.abs( yearToUse - firstRenderedYear ) < Math.abs( yearToUse - lastRenderedYear ) ? 0 : 10; 
			}
			else if( yearToUse % 10 === 0 ) {
				activeCellIndex = Math.abs( yearToUse - firstRenderedYear ) < Math.abs( yearToUse - lastRenderedYear ) ? 1 : 11; 
			}
			else {
				activeCellIndex = ( yearToUse % 10 ) + 1;
			}

			
			result[ Math.floor( activeCellIndex / 4 ) ][ activeCellIndex % 4 ].class += ' lyteCalNavCell';
		}
	},

	buildNavigationalUI: function() {
		var type = this.getData( 'ltPropHeaderType' );

		if( this.isDropdownHeader() ) {
			this.buildYears();	
		}
	},

	init: function() {
		this.findISO();
	},

	initFn: function() {
		var self = this;
		
		this.addContainerClass();
		this.checkForMoment();		
		this.buildViewDate();
		this.changeDaysOfWeek();
		this.initializeCalendar();
		this.setCalendarIdsForAria();

		// set revert
		this.$node.revertToToday = function() {
			self.revert();
		};

		this.$node.focusCalendar = function() {
			self.setData( 'ltPropActivateNavigation', true );
		}

		this.$node.revertToSelected = function() {
			self.revertToSelected();
		}

		// This is being internally used by CRM for their calendar
		this.$node.getDateArray = function( viewDate ) {
			self.setData( 'viewDate', viewDate );
			self.buildDateViewContent();

			return self.getData( 'matrix' );
		}

	}.observes( 'currentDatechanged' ).on( 'init' ),


	setCalendarIdsForAria: function() {
		this.setData( 'headerId', this.generateRandomId() );
		this.setData( 'monthDropdownId', this.generateRandomId() );
		this.setData( 'yearDropdownId', this.generateRandomId() );
		this.setData( 'monthAriaObj', { 'aria-labelledby': this.getData( 'monthDropdownId' ) } );
		this.setData( 'yearAriaObj', { 'aria-labelledby': this.getData( 'yearDropdownId' ) } );
	},

	revertToSelected: function() {
		var from = new Date( this.getData( 'viewDate' ).getTime() ), 
		cur = this.getData( 'ltPropCurrentDate' ),
		format = this.getData( 'ltPropFormat' ),
		curDate = cur ? this.stringToDate( cur, format ) : this.toDate(),
		today = this.toDate(), event = {};

		if( curDate === 'Invalid Date' ) {
			return ;
		}
		
		curDate.setDate(1);

		var to = new Date( curDate.getTime() );

		this.setData( 'viewDate', curDate );
		this.setAndBuildView( 'dateView', event );

		if( to.getMonth() === today.getMonth() && to.getFullYear() === today.getFullYear() ) {
			this.setData( 'showToday', false );	
		}
		else {
			this.setData( 'showToday', true );
		}
		
		if( this.getData('ltPropAlwaysShowToday') ){
			this.setData( 'showToday',true );
		}
		if( this.getMethods( 'onNavigate' ) 
			&& ( from.getMonth() !== to.getMonth() 
			|| from.getFullYear() !== to.getFullYear() ) 
		) {
			this.executeMethod( 'onNavigate', event, this.getDateFromFormat( from, this.getData( 'ltPropFormat' ) ), this.getDateFromFormat( to, this.getData( 'ltPropFormat' ) ) ,this );
		}
	},

	addContainerClass: function() {
		var type = this.getData( 'ltPropHeaderType' ),
		classVal = [ 'lyteCalendarPopup' ];

		if( type === 'drilldown' ) {
			classVal.push( 'lyteDrillDownCalendar' );
		}

		this.setData( 'containerClass', classVal.join( ' ' ) );
	},

	checkForMoment: function() {
		this.isMomentSupported = $L && $L.moment ? true : false; 
		this.isHavingTimezone = this.isMomentSupported && !!$L.moment()._timezone;
	},

	buildViewDate: function() {
		if(this.isIso){
			var viewDate = this.isoToDate( this.getData('ltPropIso') );
		}else{
			var viewDate = this.getData( 'ltPropCurrentDate' ) ? 
						this.stringToDate( this.getData( 'ltPropCurrentDate' ), this.getData( 'ltPropFormat' ) ) 
						: this.toDate();
		}
		if( viewDate === 'Invalid Date' ) {
			viewDate = this.toDate();
		}

		viewDate.setDate( 1 );
		this.setData( 'viewDate', viewDate );
	},

	initializeCalendar: function() {
		
		this.buildNavigationalUI();
		this.decideView();
			
	},

	decideView: function() {
		var selectionType = this.getData( 'ltPropSelectionType' ) || 'day';

		if( selectionType === 'day' || selectionType === 'week' ) {
			this.setAndBuildView( 'dateView', undefined, true );
		}
		else if( selectionType === 'month' ) {
			this.setAndBuildView( 'monthView', undefined, true );
		}
		else {
			this.setAndBuildView( 'decadeView', undefined, true );
		}
	},

	selectionTypeObserver: function() {
		if( !this.isDrilldown() ) {
			this.data.ltPropCurrentDate = '';
			this.data.ltPropCurrentWeek = [];
			this.data.ltPropCurrentMonth = '';
			this.data.ltPropCurrentYear = '';
		}

		this.decideView();
	}.observes( 'ltPropSelectionType' ),

	isDrilldown: function() {
		var type = this.getData( 'ltPropHeaderType' );

		return type === 'drilldown';
	},

	didConnect : function(){

		if( !this.getData('navYield') && this.isDropdownHeader() ) {
			this.setData( 'monthDD', this.getMonthDropdown() );
			this.setData( 'yearDD', this.getYearDropdown() );
			this.setData( 'callFrmDidcnct', true );
		}

	},


	isDropdownHeader: function() {
		var type = this.getData( 'ltPropHeaderType' );

		return type === 'picklist' || type === 'dropdown';
	},

	getYearDropdown: function() {
		var type = this.getData( 'ltPropHeaderType' ), 
		ret = this.$node.querySelector( '.lyteCalYearDD' );

		if( type === 'picklist' ) {
			ret = ret.querySelector( 'lyte-dropdown' ); 
		}

		return ret;
	},

	getMonthDropdown: function() {
		return this.$node.querySelector( '.lyteCalMonthDD' );
	},

	didDestroy: function() {
		delete this.$node.revertToToday;
	},

	changeIso : function(){
		
		this.isIso = true;
		var newDate = $L.moment(this.getData('ltPropIso')).getDObj();
		this.setData( 'viewDate', newDate );
		if( this.isDropdownHeader() ) {
			this.buildYears();	
		}
		this.data.ltPropCurrentDate = $L.moment(this.getData('ltPropIso')).format(this.getData('ltPropFormat'),this.isYYFormat());
		this.buildDateView();
	}.observes('ltPropIso'),

	changeViewDate: function( val ) {
		this.isIso = false;
		var cur = this.getData( 'ltPropCurrentDate' ),
		type = this.getData( 'ltPropHeaderType' );

		if( this.getData( 'preventObs' ) ) {
			return ;
		}

		// Current Date is set to empty
		if( !cur ) {
			this.removeSelectedCell();
			return ;
		}

		// Bad current date
		if( this.stringToDate( cur, this.getData( 'ltPropFormat' ) ) === 'Invalid Date' ) {
			this.removeSelectedCell();
			return ;
		}

		var val = this.getData( 'ltPropCurrentDate' );
		var newDate = this.stringToDate( val, this.getData( 'ltPropFormat' ) );
		newDate.setDate( 1 );

		if( type === 'dropdown' && !this.isInRange( newDate ) ) {
			return ;
		}

		this.setData( 'viewDate', newDate );
		if(this.isMomentSupported){
			this.data.ltPropIso = this.moment(newDate).format();
		}
		this.isFromCurrentDateObserver = true;
		this.buildDateView();
	}.observes( 'ltPropCurrentDate' ),

	selectedDatesChanged: function() {
		if( this.getData( 'preventObs' ) ) {
			return ;
		}

		// Handling invalid dates is a bit expensive

		this.isFromCurrentDateObserver = true;
		this.buildDateView();

	}.observes( 'ltPropCurrentDates.[]' ),

	disabledDatesChanged: function() {
		this.isFromCurrentDateObserver = true;
		this.buildDateView();
	}.observes( 'ltPropDisabledDates.[]' ),

	isInRange: function( date ) {
		var year = date.getFullYear();

		if( year >= 1900 && year <= 2100 ) {
			return true;
		}

		return false;
	},

	monthHeaderFormatObserver: function() {
		this.buildDateViewHeader();
	}.observes( 'ltPropMonthHeaderFormat' ),

	weekNumberObserver: function() {
		var parCalendar = this.$node;

		if( this.getData('ltPropWeekNumber') ){
			parCalendar.classList.add( 'lyteWeekNumContainer' );
		}
		else {
			parCalendar.classList.remove( 'lyteWeekNumContainer' );
		}

	}.observes( 'ltPropWeekNumber' ).on( 'didConnect' ),

	changeCurrentDate: function( set, val, event ) {
		var inter, to, from = new Date( this.getData( 'viewDate' ).getTime() ), 
		fromDate, toDate, formattedDate, format = this.getData( 'ltPropFormat' ),
		isYYFormat = this.isYYFormat();

		format = this.getRelevantFormat( format );

		if( set === 'Y' ) {
			inter = this.getData( 'viewDate' );
			if(this.isIso){
				formattedDate = $L.moment(this.getData('viewDate'));
				isYYFormat = false;
			}else{
				formattedDate = this.moment( this.getDateFromFormat( inter, format ), format );
			}

			if( this.isMomentSupported ) {
				if( val > 0 ) {
					to = this.moment( formattedDate, format ).add( val, 'fullYear', isYYFormat ).getDObj();
				}
				else {
					to = this.moment( formattedDate, format ).add( val, 'fullYear', isYYFormat ).getDObj();
				}
			}
			else {
				inter.setYear( inter.getFullYear() + val )
				to = new Date( inter.getTime() )
			}
			
			this.setData( 'viewDate', to );
			this.buildDateView();
		}
		else if( set === 'M' ) {
			inter = this.getData( 'viewDate' );
			if(this.isIso){
				formattedDate = $L.moment(this.getData('viewDate'));
				isYYFormat = false;
			}else{
				formattedDate = this.moment( this.getDateFromFormat( inter, format ), format );
			}
			if( this.isMomentSupported ) {
				if( val > 0 ) {
					to = formattedDate.add( val, 'month', isYYFormat ).getDObj();
				}
				else {
					to = formattedDate.add( val, 'month', isYYFormat ).getDObj();
				}
			}
			else {
				inter.setMonth( inter.getMonth() + val )
				to = new Date( inter.getTime() )
			}
			
			this.setData( 'viewDate', to )
			this.buildDateView();
		}

		fromDate = this.getDateFromFormat( from, this.getData( 'ltPropFormat' ) );
		toDate = this.getDateFromFormat( to, this.getData( 'ltPropFormat' ) );

		if( this.getMethods( 'onNavigate' ) ) {
			this.executeMethod( 'onNavigate', event, fromDate, toDate, this )
		}
	},

	changeCurrentYear: function( val, event ) {
		var viewDate = this.getData( 'viewDate' ),
		isMomentSupported = this.isMomentSupported,
		fullYear = viewDate.getFullYear(),
		format = this.getData( 'ltPropFormat' ),
		isYYFormat = this.isYYFormat(),
		formattedDate = this.getDateFromFormat( viewDate, format ),
		fromDate = formattedDate,
		toDate;
		if( isMomentSupported ) {
			format = this.getRelevantFormat( format );
			if(this.isIso){
				formattedDate = this.moment(this.getData('viewDate'));
				isYYFormat = false;
			}else{
				formattedDate = this.moment( formattedDate, format );
			}
			viewDate = formattedDate.add( val, 'fullYear', isYYFormat ).getDObj();
		}
		else {
			viewDate.setFullYear( fullYear + val );
		}

		toDate = this.getDateFromFormat( viewDate, format );

		this.setData( 'viewDate', viewDate );

		if( this.getMethods( 'onNavigate' ) ) {
			this.executeMethod( 'onNavigate', event, fromDate, toDate, this );
		}
	},

	changeCurrentDecade: function( val, event ) {
		var viewDate = this.getData( 'viewDate' ),
		format = this.getData( 'ltPropFormat' ),
		isMomentSupported = this.isMomentSupported,
		formattedDate = this.getDateFromFormat( viewDate, format ),
		isYYFormat = this.isYYFormat(),
		currentYear = viewDate.getFullYear(),
		fromDate = formattedDate,
		toDate;

		format = this.getRelevantFormat( format );

		if( isMomentSupported ) {
			if(this.isIso){
				formattedDate = this.moment(this.getData('viewDate'));
				isYYFormat = false;
			}else{
				formattedDate = this.moment( formattedDate, format );
			}
			// viewDate = formattedDate.add( val, 'fullYear', isYYFormat ).getDObj();
			viewDate = formattedDate.add( val * 10, 'fullYear', isYYFormat ).getDObj(); 
		}
		else {
			viewDate.setFullYear( currentYear + 10 * val );
		}

		toDate = this.getDateFromFormat( viewDate, format );
		this.setData( 'viewDate', viewDate );

		if( this.getMethods( 'onNavigate' ) ) {
			this.executeMethod( 'onNavigate', event, fromDate, toDate, this );
		}
	},

	/** 
	 * Get the proper calendar date item that was clicked
	 * @param {Element} elem - represents the element that was clickedd
	 *
	 */
	getProper: function( elem ) {
		while( elem 
			&& !elem.classList.contains( 'lyteCalTableCell' ) 
		) {
			elem = elem.parentElement;
		}

		return elem;
	},

	convertToLang: function( val ) {
		var i18n = this.getData( 'ltPropI18n' ),
		format = this.getData( 'ltPropFormat' );

		if( i18n ) {
			return this.moment( val, format ).i18N( format );
		}

		return val;
	},

	moveToPrevious: function( val, event ) {
		var viewType = this.getData( 'viewType' );

		if( viewType === 'dateView' ) {
			this.navigationButtonPressed = true;
			this.changeCurrentDate( val, -1, event );
		}
		else if( viewType === 'monthView' ) {
			this.changeCurrentYear( -1, event );
			this.buildMonthView();
		}
		else if( viewType === 'decadeView' ) {
			this.changeCurrentDecade( -1, event );
			this.buildDecadeView();
		}
	},

	moveToNext: function( val, event ) {

		var viewType = this.getData( 'viewType' );

		if( viewType === 'dateView' ) {
			this.navigationButtonPressed = true;
			this.changeCurrentDate( val, 1, event );
		}
		else if( viewType === 'monthView' ) {
			this.changeCurrentYear( 1, event );
			this.buildMonthView();
		}
		else if( viewType === 'decadeView' ) {
			this.changeCurrentDecade( 1, event );
			this.buildDecadeView();
		}
	},

	changeToMonthView: function( event ) {
		this.setAndBuildView( 'monthView', event );
	},

	changeToDecadeView: function( event ) {
		this.setAndBuildView( 'decadeView', event );
	},

	selectHighlightedCell: function( event ) {
		var viewType = this.getData( 'viewType' ),
		headerType = this.getData( 'ltPropHeaderType' );

		if( headerType !== 'drilldown' || viewType === 'dateView' ) {
			this.makeSelection( event );
		}
		else if( viewType === 'monthView' ) {
			this.monthSelected( event );
		}
		else {
			this.yearSelected( event ); 
		}
	},

	selectDate: function( event ) {
		var isMultiple = this.getData( 'ltPropMultiple' );

		if( isMultiple ) {
			this.selectMultiple( event );
		}
		else {
			this.selectSingle( event );
		}
	},

	selectMultiple: function( event ) {
		var dateCell = this.getProper( event.target );

		if( this.terminateSelection( this.fireBeforeCallback( event, dateCell ) ) ) {
			return ;
		}

		if( this.alreadySelected( dateCell ) ) {
			this.removeSelectedCell( dateCell );
			this.removeSelected( dateCell );

			if( this.getMethods( 'onDateRemoved' ) ) {
				this.executeMethod( 'onDateRemoved', event, dateCell.getAttribute( 'data-date' ), this );
			}
		}
		else {
			this.selectCell( event );
		}
	},

	terminateSelection: function( beforeCallbackReturnValue ) {
		return beforeCallbackReturnValue === false;
	},

	fireBeforeCallback: function( event, dateCell ) {
		if( this.alreadySelected( dateCell ) ) {
			return this.fireBeforeRemove( event, dateCell );
		}

		return this.fireBeforeAdd( event, dateCell );
	},

	fireBeforeRemove: function( event, dateCell ) {
		if( this.getMethods( 'onBeforeRemove' ) ) {
			return this.executeMethod( 'onBeforeRemove', event, dateCell.getAttribute( 'data-date' ), this );
		}
	},

	fireBeforeAdd: function( event, dateCell ) {
		if( this.getMethods( 'onBeforeAdd' ) ) {
			return this.executeMethod( 'onBeforeAdd', event, dateCell.getAttribute( 'data-date' ), this );
		}
	},

	alreadySelected: function( cell ) {
		return cell.classList.contains( 'lyteCalSel' );
	},

	removeSelected: function( cell ) {
		var dateToRemove = cell.getAttribute( 'data-date' ),
		selectedDates = this.getData( 'ltPropCurrentDates' ) || [],
		indexToRemove = selectedDates.indexOf( dateToRemove );

		if( !!~indexToRemove ) {
			Lyte.arrayUtils( selectedDates, 'removeAt', indexToRemove );
		}
	},

	selectSingle: function( event ) {
		this.removeDayHighlights();
		this.selectCell( event );
	},

	selectCell: function( event ) {
		var target = this.getProper( event.target );
		
		this.setSelected( target );

		target.classList.add( 'lyteCalSel' );
		target.setAttribute( 'aria-selected', 'true' );
		target.setAttribute( 'tabindex', '1' );

		if( this.getMethods( 'onDateSelected' ) ) {
			this.executeMethod( 'onDateSelected', event, target.getAttribute( 'data-date' ), this );
		}
	},

	setSelected: function( cell ) {
		var isMultiple = this.getData( 'ltPropMultiple' ),
		curDate = this.convertToLang( cell.getAttribute( 'data-date' ) );

		this.setData( 'preventObs', true );

		if( isMultiple ) {
			Lyte.arrayUtils( this.getData( 'ltPropCurrentDates' ), 'push', curDate );
		}
		else {
			this.setData( 'ltPropCurrentDate', curDate );
		}
		
		this.setData( 'preventObs', false );
	},

	monthSelected: function( event ) {
		var viewDate = this.getData( 'viewDate' ),
		currentYear = viewDate.getFullYear(),
		target = this.getProper( event.target ),
		currentSelectedMonth = target.getAttribute( 'data-date' ),
		isDrilldown = this.getData( 'ltPropHeaderType' ) === 'drilldown';

		currentSelectedMonth = this.getData( 'monthSystemValues' ).indexOf( currentSelectedMonth ) + 1;

		this.setData( 'viewDate', new Date( currentSelectedMonth + '/1/' + currentYear ) );

		if( isDrilldown ) {
			this.setAndBuildView( 'dateView', event );
		}

		this.removeMonthHighlight();
		this.addMonthHighlight( target );

		this.setData( 'ltPropCurrentMonth', currentSelectedMonth );

		if( this.getMethods( 'onMonthSelected' ) ) {
			this.executeMethod( 'onMonthSelected', event, ( currentSelectedMonth || "" ).toString(), this );
		}
		
		this.focusActiveCell();
	},

	removeMonthHighlight: function() {
		var month = this.$node.querySelector( '.lyteCalMonthSel' );

		if( month ) {
			month.classList.remove( 'lyteCalMonthSel' );
			month.removeAttribute( 'aria-selected' );
		}
	},

	addMonthHighlight: function( cell ) {
		cell.classList.add( 'lyteCalMonthSel' );
		cell.setAttribute( 'aria-selected', 'true' );
	},

	yearSelected: function( event ) {
		var viewDate = this.getData( 'viewDate' ),
		target = this.getProper( event.target ),
		currentSelectedYear = target.getAttribute( 'data-date' ),
		isDrilldown = this.getData( 'ltPropHeaderType' ) === 'drilldown';

		viewDate.setYear( currentSelectedYear );
		this.setData( 'viewDate', viewDate );

		if( isDrilldown ) {
			this.setAndBuildView( 'monthView', event );
		}

		this.removeYearHighlight();
		this.addYearHighlight( target );

		this.setData( 'ltPropCurrentYear', currentSelectedYear );

		if( this.getMethods( 'onYearSelected' ) ) {
			this.executeMethod( 'onYearSelected', event, currentSelectedYear, this );
		}

		this.focusActiveCell();
	},

	removeYearHighlight: function() {
		var year = this.$node.querySelector( '.lyteCalYearSel' );

		if( year ) {
			year.classList.remove( 'lyteCalYearSel' );
			year.removeAttribute( 'aria-selected' );
		}
	},

	addYearHighlight: function( cell ) {
		cell.classList.add( 'lyteCalYearSel' );
		cell.setAttribute( 'aria-selected', 'true' );
	},

	focusDrillDownButton: function() {
		var button = this.$node.querySelector( '.lyteDrillCalHeaderButton' );

		if( button ) {
			button.focus();
		}
	},

	makeSelection: function( event ) {
		var selectionType = this.getData( 'ltPropSelectionType' );

		if( selectionType === 'day' ) {
			this.selectDate( event );
		}
		else {
			this.selectWeek( event );
		}
	},

	selectWeek: function( event ) {
		if( !event ){
			var dateCell = this.$node.querySelector('.lyteCalToday');
		}
		else {
			var dateCell = this.getProper( event.target );
		}

		var firstDayOfWeek = this.getFirstSelectableDay( dateCell ).getAttribute( 'data-date' ),
		lastDayOfWeek = this.getLastSelectableDay( dateCell ).getAttribute( 'data-date' );

		this.removeDayHighlights();
		this.addWeekHighlight( dateCell );
		this.setData( 'ltPropCurrentWeek', [ this.convertToLang( firstDayOfWeek ), this.convertToLang( lastDayOfWeek ) ] );

		if( this.getMethods( 'onWeekSelected' ) ) {
			this.executeMethod( 'onWeekSelected', event, firstDayOfWeek, lastDayOfWeek, this );
		}
	},

	removeDayHighlights: function() {
		this.removeSelectedCell();
		this.removeWeekHighlight();
	},

	removeSelectedCell: function( cell ) {
		var node = cell || this.getSelectedCell();

		if( node ) {
			node.classList.remove( 'lyteCalSel' );
			node.removeAttribute( 'aria-selected' );
			node.setAttribute( 'tabindex', '-1' );
		}
	},

	getSelectedCell: function() {
		return this.$node.querySelector( '.lyteCalSel' );
	},

	removeWeekHighlight: function() {
		var highlightedDays = this.$node.querySelectorAll( '.lyteCalWeekSel' );
		var highlightedWeekNum = this.$node.querySelectorAll('.lyteCalWeekNumberSel');

		for( var i = 0; i < highlightedDays.length; i++ ) {
			highlightedDays[ i ].classList.remove( 'lyteCalWeekSel' );
			highlightedDays[ i ].removeAttribute( 'aria-selected' );
		} 

		for( var i = 0; i < highlightedWeekNum.length; i++ ) {
			highlightedWeekNum[ i ].classList.remove( 'lyteCalWeekNumberSel' );
			highlightedWeekNum[ i ].removeAttribute( 'aria-selected' );
		} 
		
	},

	addWeekHighlight: function( dateCell ) {
		var firstSelectableDayOfWeek = this.getFirstSelectableDay( dateCell );

		day = firstSelectableDayOfWeek;

		if( this.getData('ltPropWeekNumber') ){
			var parent = dateCell.parentElement;
			var target = parent.querySelector('.lyteWeekNumberGrid');

			if( target ){
				target.classList.add('lyteCalWeekNumberSel');
				target.setAttribute( 'aria-selected', 'true' );
			}
		}

		do {
			day.classList.add( 'lyteCalWeekSel' );
			day.setAttribute( 'aria-selected', 'true' );

			day = day.nextElementSibling;
		}while( day && day.getAttribute( 'data-selectable' ) === 'true' );
	},

	getFirstSelectableDay: function( cell ) {
		var rowCells = cell.parentElement.children;

		for( var i = 0; i < rowCells.length; i++ ) {
			if( rowCells[ i ].getAttribute( 'data-selectable' ) === "true" ) {
				return rowCells[ i ];
			}
		}
	},

	getLastSelectableDay: function( cell ) {
		var rowCells = cell.parentElement.children;

		for( var i = rowCells.length - 1; i > -1; i-- ) {
			if( rowCells[ i ].getAttribute( 'data-selectable' ) === "true" ) {
				return rowCells[ i ];
			}
		}
	},

	getCurrentWeekNumber: function( currentDateObj ) {
		var curDateObj = new Date( currentDateObj );	//clone
		var weekNumCriteria = this.getData('ltPropWeekNumCriteria');
		var startDate = 1;
		var startWeekDay = this.getData('ltPropStartWeekDay');
		var weekNum = 0;

		switch( weekNumCriteria ){
			case 1:
				startDate = 1;
				break;

			case 2:
				//find first thursday date( can provide option for user to select 'any' day instead of thursday )
				startDate = this.getDateOfFirstDay( currentDateObj.getFullYear(), 4 ); // 4 -> thursday
				break;

			case 3: 
				//find first full week's first date
				startDate = this.getDateOfFirstDay( currentDateObj.getFullYear(), this.getData('ltPropStartWeekDay') ); 
				break;

		}

		var startDateObj = new Date( currentDateObj.getFullYear(), 0, startDate );

		this.getDateObjToStartDay( curDateObj );
		this.getDateObjToStartDay( startDateObj );

		var itrDateObj = new Date( startDateObj );

		while (itrDateObj <= curDateObj) {
			if (itrDateObj.getDay() === startWeekDay) { 
				weekNum += 1;
			}
			itrDateObj.setDate(itrDateObj.getDate() + 1); 
		}

		return weekNum;
	},

	getDateOfFirstDay: function( year, day ){
		var currDateObj = new Date( year, 0, 1 );
		for( var i=0; i<7; i++ ){
			if( currDateObj.getDay() === day ){
				break;
			}  
			currDateObj.setDate( currDateObj.getDate()+1 );
		}

		return currDateObj.getDate();
	},

	getDateObjToStartDay: function( curDateObj ){
		var startOfWeekDay = this.getData('ltPropStartWeekDay');
		for( var it=0;it<7;it++ ){
			if( curDateObj.getDay() == startOfWeekDay ){
				return;
			}
			curDateObj.setDate( curDateObj.getDate() - 1 );
		}
	},

	actions: {
		changeToMonthView: function( event ) {
			this.changeToMonthView( event );
			this.focusDrillDownButton();	
		},

		changeToMonthViewOnKeys: function( event ) {
			var keyCode = event.keyCode,
			SPACE_KEY = 32,
			ENTER_KEY = 13;

			if( keyCode === ENTER_KEY || keyCode === SPACE_KEY ) {
				this.changeToMonthView( event );
				this.focusDrillDownButton();	
			}
		},

		changeToDecadeView: function( event ) {
			this.changeToDecadeView( event );
			this.focusActiveCell();
		},

		changeToDecadeViewOnKeys: function( event ) {
			var keyCode = event.keyCode,
			SPACE_KEY = 32,
			ENTER_KEY = 13;

			if( keyCode === ENTER_KEY || keyCode === SPACE_KEY ) {
				this.changeToDecadeView( event );
				this.focusActiveCell();
			}
		},

		// Detecting a one finger swipe
		record: function( event ) {
			// This is stupid
			this.setData( 'prev', false );

			if( event.touches.length > 1 ) {
				this.setData( 'prev', true );

				return ;
			}

			var touch = event.targetTouches[ 0 ],
			cords = {
				x: touch.clientX,
				y: touch.clientY
			},
			start = new Date().getTime();

			this.setData( 'cords', cords );
			this.setData( 'start', start );
		},

		decide: function( event ) {
			var prev = this.getData( 'prev' );

			// prev will be false only when you do a single finger swipe
			// Multi finger swipes return out of execution
			if( prev ) {
				return ;
			}

			var start = this.getData( 'cords' ),
			x = start.x, y = start.y,
			touch = event.changedTouches[ 0 ],
			diffX = x - touch.clientX,
			diffY = y - touch.clientY,
			parent = this.$node.querySelector( '.lyteCalendarPopup' ),
			rect = parent.getBoundingClientRect(),
			width = rect.width,
			height = rect.height,
			xTolerance = width * 0.2,
			yTolerance = height * 0.15,
			begin = this.getData( 'start' ),
			delay = ( new Date().getTime() ) - begin;

			if( yTolerance > Math.abs( diffY ) 
				&& xTolerance < Math.abs( diffX ) 
				&& delay < 1000 
			) {
				if( diffX < 0 ) {
					this.changeCurrentDate( "M", -1, event );
				}
				else if( diffX > 0 ) {
					this.changeCurrentDate( "M", 1, event );
				}
			}
			
		},

		previousOnKeys: function( val, event ) {
			var ENTER_KEY = 13, SPACE_KEY = 32, keyCode = event.keyCode;

			if( event.keyCode === ENTER_KEY || event.keyCode === SPACE_KEY ) {
				this.moveToPrevious( val, event );
			}

		},

		nextOnKeys: function( val, event ) {
			var ENTER_KEY = 13, SPACE_KEY = 32, keyCode = event.keyCode;

			if( keyCode === ENTER_KEY || keyCode === SPACE_KEY ) {
				this.moveToNext( val, event );
			}
		},

		previous: function( val, event ) {
			this.moveToPrevious( val, event );
		},

		next: function( val, event ) {
			this.moveToNext( val, event );
		},

		yearSelected: function( event ) {
			this.yearSelected( event );
		},

		monthSelected: function( event ) {
			this.monthSelected( event );
		},

		dateSelected: function( event ) {
			if( event.button !== 0 ) {
				return ;
			}

			this.makeSelection( event );
		},

		performNavigation: function( event ) {
			var keyCode = event.keyCode,
			ARROW_UP = 38,
			ARROW_DOWN = 40,
			ARROW_LEFT = 37,
			ARROW_RIGHT = 39,
			SPACE_KEY = 32, 
			ENTER_KEY = 13,
			HOME_KEY = 36,
			END_KEY = 35,
			PAGE_UP = 33,
			PAGE_DOWN = 34,
			MONTH = 'M',
			navDirection, cellsToMove, cell = event.target, actionType;

			if( this.getData( 'ltPropDisableNavigation' ) ) {
				return ;
			}

			switch( keyCode ) {
				case ARROW_UP:
					navDirection = 'previous';
					actionType = 'up';
					cellsToMove = this.getCellsToMove( navDirection, actionType );
					this.moveBackward( event, navDirection, cellsToMove );
					event.preventDefault();
					break;

				case ARROW_DOWN:
					navDirection = 'next';
					actionType = 'down';
					cellsToMove = this.getCellsToMove( navDirection, actionType );
					this.moveForward( event, navDirection, cellsToMove );
					event.preventDefault();
					break;

				case ARROW_LEFT:
					navDirection = 'previous';
					cellsToMove = -1;
					this.moveBackward( event, navDirection, cellsToMove );
					event.preventDefault();
					break;

				case ARROW_RIGHT:
					navDirection = 'next';
					cellsToMove = 1;
					this.moveForward( event, navDirection, cellsToMove );
					event.preventDefault();
					break;
				case SPACE_KEY:
				case ENTER_KEY:
					if( this.isDisabledCell( cell ) ) {
						return ;
					}

					this.selectHighlightedCell( event );
					event.preventDefault();
					break;
				case HOME_KEY:
					navDirection = 'previous';
					this.moveToFirstCell( event, navDirection );
					event.preventDefault();
					break;
				case END_KEY:
					navDirection = 'next';
					this.moveToLastCell( event, navDirection );
					event.preventDefault();
					break;
				case PAGE_UP:
					this.previousNavigation( MONTH, event );
					event.preventDefault();
					break;
				case PAGE_DOWN:
					this.nextNavigation( MONTH, event );
					event.preventDefault();
					break;
			}
		},

		today: function( event ) {
			this.revert( event );
			this.focusActiveCell();
		},

		todayOnKey: function( event ) {
			var keyCode = event.keyCode,
			SPACE_KEY = 32,
			ENTER_KEY = 13;

			if( keyCode === ENTER_KEY || keyCode === SPACE_KEY ) {
				this.revert( event );
				this.focusActiveCell();
			}
		},

		curWeek: function( event ) {
			//should entire row be focused? its been selected for now
			
			this.revert( event );
			this.selectWeek();
			// this.focusActiveRow();
		},

		curWeekOnKey: function( event ) {
			var keyCodes = event.keyCode;

			if( keyCodes === 13 || keyCodes === 32 ) {
				this.revert( event );
				this.selectWeek();
				// this.focusActiveRow();

			}
		},

		curMonth: function( event ) {
			this.revertToMonth( event );
			// this.focusActiveCell();
		},

		curMonthOnKey: function( event ) {
			var keycode = event.keyCode;

			if( keycode === 13 || keycode === 32 ) {
				this.revertToMonth( event );
				// this.focusActiveCell();
			}
		}
	},

	methods : {
		optionSelected : function(prop,event,selected,comp){
			this.navigationButtonPressed = true;

			if(prop == 'M') {
				// var index = comp.getData('ltPropOptions').indexOf(selected);
				var index = this.getData('monthNames').indexOf(selected);

				this.changeCurrentDate(prop, index - this.getData('viewDate').getMonth(),event);
			}
			else if(prop == 'Y') {
				this.changeCurrentDate(prop, parseInt(selected) - this.getData('viewDate').getFullYear(),event);
			}
		},

		setClass: function( ev, comp ) {
			var drop = comp.childComp,
			rtl = _lyteUiUtils.getRTL(),
			dir = rtl ? 'right' : 'left',
			arrow = drop.querySelector( '.lyteArrow' );

			drop.classList.add( 'lyteCalendarDropdown' )
			arrow.style[ dir ] = '20%';

			if( rtl ) {
				arrow.style.left = 'auto';
			}
		}
	}
});

/**
 * @syntax nonYielded
 * <lyte-calendar></lyte-calendar>
 */

/**
 * @syntax yielded
 * <lyte-calendar>
 *     <template is="registerYield" yield-name="footer">
 *         <span>Footer Of The Calendar</span>
 *     </template>
 * </lyte-calendar>
 */
