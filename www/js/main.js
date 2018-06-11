/* bind navigation prechange event  in main framework */
document.addEventListener('prechange', function (event) {
    // change label
    document.querySelector('ons-toolbar .center')
        .innerHTML = event.tabItem.getAttribute('label');
    // change icon
    document.querySelector('ons-toolbar .right ons-icon').setAttribute("icon", event.tabItem.getAttribute(
        'data-action'));
	// bind event to button in tool bar
	document.querySelector('ons-toolbar .right ons-icon').onclick = function(event){
		var modal = document.querySelector('ons-modal');
		modal.show();
		var btnUpdate = document.querySelector('ons-modal #detail_update');
		var btnCancel = document.querySelector('ons-modal #detail_cancel');
		btnCancel.onclick = function(){
			modal.hide();
		}
	};
});

/* bind event for pages initialization */
document.addEventListener('init', function (event) {	
    var page = event.target;
    // bind click event for student
    if (page.id === 'student_list') {
		// bind event to get student detail page
        page.querySelector('ons-list').onclick = function (event) {
			// ignore click event on header
			if ( event.target.nodeName !== 'ONS-LIST-HEADER') {
				document.querySelector('#mainNavigator').pushPage('student_detail.html', {data: {title: '李梓艺'}});
			}    
        };
    }else if(page.id === 'student_detail'){
		page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
		// bind button event for edit student
		page.querySelector('#edit_student_btn').onclick = function (event) {
			ons.openActionSheet({
				title: '编辑',
				cancelable: true,
				buttons: [
					'排课',
					{
						label: '删除',
						modifier: 'destructive'
					},
					{
						label: 'Cancel',
						icon: 'md-close'
					}
				]
			}).then(function (index) {
				// match button schedule courses
				if (index === 0) {
					var modal = document.querySelector('ons-modal');
					modal.show();
					var btnUpdate = document.querySelector('ons-modal #detail_update');
					var btnCancel = document.querySelector('ons-modal #detail_cancel');
					btnCancel.onclick = function(){
						modal.hide();
					}
				} else if(index === 1){
					// match button delete
					ons.notification.confirm('确认要删除该学生吗？').then(function(value) {
						// confirm to delete
						if ( value === 1) {
							console.log("delete student")
						}
					});
				}
			});
		}
		// bind button event for recharge student
		page.querySelector('#recharge_btn').onclick = function (event) {
			ons.notification.prompt('金额:',{
				title:'充值',
				cancelable:true,
				buttonLabels:['确认','取消'],
				primaryButtonIndex:0
			}).then(function(input) {
				if (input != void 0 && input != '') {
					// not number
					if (isNaN(input)) {
						ons.notification.alert('只允许输入数字!',{title:'错误'});
					}else{
						ons.notification.alert('充值成功: ' + input, {title:'提示'});
					}
				}
			});
		}
	}
});
