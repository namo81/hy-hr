var $layerset = null;

var $cntwrap = '#wrap',  // 페이지 컨텐츠 영역
	$layer = '.layer-pop', // 레이어 팝업 공통 클래스
	$layercnt = '.layer-cnt', // 레이어 팝업 내 컨텐츠 영역 클래스
	onClass = 'now-open'; // 레이어 팝업 오픈 시킨 버튼에 지정될 임시 클래스

function popSet(tg, btn, bgSet, middle){
	if(bgSet == null) {
		tabIndexOff($cntwrap);
	} else {
		$layerset = bgSet;
		indexOffScroll($cntwrap);
	}
	if(middle == true)	popPos(tg);
	else null;
	if(btn != null) btn.addClass(onClass);
}

function popPos(e){
	var tgCnt = e.find($layercnt);
	var layerH = tgCnt.innerHeight() / 2;
	tgCnt.css({'top':'50%', 'margin-top':'-'+layerH+'px'});
}

// 팝업 오픈 시 페이지내 탭 요소 컨트롤
function tabIndexOff(cntwrap){
	$(''+cntwrap+' a, '+cntwrap+' button, '+cntwrap+' input').each(function(){ $(this).attr('tabindex','-1'); });
}
function tabIndexOn(cntwrap){
	$(''+cntwrap+' a, '+cntwrap+' button, '+cntwrap+' input').each(function(){ $(this).attr('tabindex','0'); });
}

// 팝업 오픈 시 페이지내 탭 요소 컨트롤 + 페이지 scroll 제어	
function indexOffScroll(cntwrap){
	if($layerset == 'fixed') { $(''+cntwrap+'').css('position','fixed'); }
	else if($layerset == 'hidden') {
		var winH = $(window).innerHeight();
		$(''+cntwrap+'').css({'overflow':'hidden','height':''+winH+'px'});
	}		
	$(''+cntwrap+' a, '+cntwrap+' button, '+cntwrap+' input').each(function(){
		$(this).attr('tabindex','-1');
	});
}
function indexOnScroll(cntwrap){
	if($layerset == 'fixed') {$(''+cntwrap+'').css('position','relative');}
	else if($layerset == 'hidden') {
		$(''+cntwrap+'').css({'overflow':'visible','height':''});
	}		
	$(''+cntwrap+' a, '+cntwrap+' button, '+cntwrap+' input').each(function(){
		$(this).attr('tabindex','0');
	});
}

/* 변수 안내
e = 레이어 호출 버튼.
pos = 레이어 위치 관련 변수 - 값이 없을 경우 - 화면 중앙 / 'top' 일 경우 - CSS 설정값 / 'position' 일 경우 - 레이어 호출버튼 위치
*/

// 버튼용 함수
function layerOpenBtn(e, pos){
	var $btn = e,
	tg = $btn.attr('data-target');
	bgSet = $btn.attr('data-layerset');

	if(pos == 'top') {
		$(window).scrollTop('0');
		$('#'+tg+'').show().find($layercnt).attr('tabindex','0').focus();
		popSet($('#'+tg+''), $btn, bgSet, false);
	} else if (pos == 'position') {
		$('#'+tg+'').show();
		var sc = $btn.offset().top,
			docH = $(document).innerHeight(),
			cntH = $('#'+tg+'').find($layercnt).innerHeight();
		if(sc > (docH - cntH)) sc = docH - cntH - 50;
		else sc = sc;
		$('#'+tg+'').find($layercnt).css('top',''+sc+'px').end().find($layercnt).attr('tabindex','0').focus();	
		popSet($('#'+tg+''), $btn, bgSet, false);
	} else {		
		$(window).scrollTop('0');
		$('#'+tg+'').show().find($layercnt).attr('tabindex','0').focus();
		popSet($('#'+tg+''), $btn, bgSet, true);
	} 
}

// 이벤트 호출용 함수
function layerOpen(e, pos, bgset){
	var $tg = e,
	$bgSet = bgset;

	if(pos == 'top') {
		$(window).scrollTop('0');
		$tg.show().find($layercnt).attr('tabindex','0').focus();
		popSet($tg, null, $bgSet, false);
	} else {
		$tg.show().find($layercnt).attr('tabindex','0').focus();
		popSet($tg, null, $bgSet, true);
	} 
}

//닫기용 함수 - 레이어 전체
function layerClose(){
	$($layer).hide();
	if($layerset != null) indexOnScroll($cntwrap);
	else tabIndexOn($cntwrap);		
	$('.'+onClass+'').focus().removeClass(onClass);
	$layerset = null;
}

//닫기용 - 팝업 어려개일 경우 현재 팝업만 닫기.
function layerCloseThis(e){
	$this = e;
	$this.closest('.layer-pop').hide();
}


/* 레이어 팝업 기능 안내
$('버튼').click(function(){
	layerOpen($(this), '위치변수');
});

<button type="button" class="버튼" data-target="" data-layerset="">버튼</button>

버튼 설정 (a, button 무관)
버튼 내 data-target 속성 : 해당 속성에 지정된 id 의 레이어 팝업을 찾아서 호출.
버튼 내 data-layerset 속성 : 해당 속성의 값에 따라 레이어 팝업 띄운 상태의 배경 컨텐츠 스크롤 차단 여부 결정.
                                       값이 없을 경우 - 배경화면 스크롤 유지
									   'fixed' 일 경우 - 배경화면 position 속성을 fixed 로 설정
									   'hidden' 일 경우 - 배경화면 높이 계산하여 overflow:hidden 설정.
*/