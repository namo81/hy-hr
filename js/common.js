// input design 설정 함수
	// checkbox
function chkSet(){
	$('.inp-check input[type=checkbox]').each(function(){
		if($(this).is(':checked')) {
			$(this).next('label').addClass('on');
		}
		if($(this).is(":disabled")){
			$(this).next('label').addClass('disabled');
		}
	});
	$('.inp-check input[type=checkbox]').click(function(){
		if($(this).is(":checked")) {
			$(this).next('label').addClass('on');
		} else {
			$(this).next('label').removeClass('on');
		}
	});
}

	// radio
function radSet(){
	$('.inp-radio input[type=radio]').each(function(){
		if($(this).is(':checked')) {
			$(this).next('label').addClass('on');
		}
		if($(this).is(":disabled")){
			$(this).next('label').addClass('disabled');
		}
	});
	$('.inp-radio input[type=radio]').click(function(){
		var inpNam = $(this).attr('name');
		$('.inp-radio input[type=radio]').each(function(){
			if($(this).attr('name') == inpNam){
				if($(this).is(":checked")) {
					$(this).next('label').addClass('on');
				} else {
					$(this).next('label').removeClass('on');
				}
			} else {
				null;
			}
		});

	});
}

	// select
function selectSet(){
	$('.inp-select').each(function(){
		var $wrap = $(this);
		$wrap.on('mouseleave',function(){
			$(this).children('.select-list').hide();
			$wrap.css('z-index','100');
		});
		$wrap.find('.btn-select').click(function(){
			$(this).next('.select-list').toggle();
			$wrap.css('z-index','200');
		});

		$wrap.find('.select-list li .btn-sel').click(function(e){
			e.preventDefault();
			var cnt = $(this).contents().clone();
			$wrap.find('.select-list').toggle();
			$wrap.find('.btn-select > span').empty().append(cnt).parent().focus();
			$wrap.css('z-index','100');
		});
	});
}

function selectSetNew(){
	$('.new-select').each(function(){
		var $wrap = $(this),
		$sel = $(this).children('select'),
		selTitle = '',
		opTotal = $sel.children('option').size(),
		firstOp = null;

		if($sel.children('option:selected').length > 0){
			firstOp = $sel.children('option:selected').text();
		} else {
			firstOp = $sel.children('option').first().text();
		}

		if($sel.attr('title')) selTitle = $sel.attr('title');

		if($sel.is(':disabled')){
			$sel.parent().append('<button type="button" class="btn-select" title="'+selTitle+'" disabled><span>'+firstOp+'</span></button>');
		} else {
			$sel.parent().prepend('<ul class="select-list"></ul>');
			$sel.parent().prepend('<button type="button" class="btn-select" title="'+selTitle+'"><span>'+firstOp+'</span></button>');
		}

		for( i=0; i<opTotal; i++){
			$sel.siblings('.select-list').append('<li><button type="button" class="btn-sel">'+$sel.children('option').eq(i).text()+'</button></li>');
		}

		$wrap.on('mouseleave',function(){
			$(this).children('.select-list').hide();
			$wrap.css('z-index','100');
		});
		$wrap.find('.btn-select').click(function(){
			$(this).next('.select-list').toggle();
			$wrap.css('z-index','200');
		});

		$wrap.find('.select-list li .btn-sel').click(function(e){
			e.preventDefault();
			var tx = $(this).text(),
				num = $(this).parent().index();
			$wrap.find('.select-list').toggle();
			$wrap.find('.btn-select span').empty().text(tx).parent().focus();
			$wrap.css('z-index','100');
			$wrap.children('select').find('option:eq('+num+')').prop('selected', true);
			$wrap.children('select').change();
		});
	});
}

//tab-menu 설정 2019-02-20
function tabmenu(){
	$('.tab-menu>ul>li>a').click(function(e){
		e.preventDefault();
		var tabCnt = $(this).attr('href');
		$(this).parents('.tab-wrap').find('.tab-cnt').each(function(){$(this).hide();});
		$(this).parents('.tab-wrap').find(''+tabCnt+'').show();
		$(this).parent().siblings('li').removeClass('on');
		$(this).parent().addClass('on');
		if($('.dashboard').length > 0) null;
		else cmtScrollMov();

		if($('.cmt-fixed').length > 0) replySet(106); $(window).scroll(); // 크롬은 window scroll 만 줘도 되는데.. ie 에서 replySet 를 안주면 버그발생.
	});
}

//tab-menu comment 용설정 2019-02-20
function tabmenuCmt(){
	$('.tab-menu-cmt>ul>li>a').click(function(e){
		e.preventDefault();
		var tabCnt = $(this).attr('href'),
			$fix = $('.cmt-fixed');
		$(this).parents('.tab-wrap').find('.tab-cnt').each(function(){$(this).hide();});
		$(this).parents('.tab-wrap').find(''+tabCnt+'').show();
		$(this).parent().siblings('li').removeClass('on');
		$(this).parent().addClass('on');
		cmtScrollMov();

		if($('.cmt-fixed').length > 0) replySet(106); $(window).scroll(); // 크롬은 window scroll 만 줘도 되는데.. ie 에서 replySet 를 안주면 버그발생.
		if($(this).parent().index() > 1) {
			$fix.hide();
		} else {
			$fix.show();
		}
	});
}

//tab-menu - simple
function tabmenuS(){
	$('.tab-menu-s>ul>li>a').click(function(e){
		e.preventDefault();
		var tabCnt = $(this).attr('href');
		$(this).parents('.tab-wrap').find('.tab-cnt').each(function(){$(this).hide();});
		$(this).parents('.tab-wrap').find(''+tabCnt+'').show();
		$(this).parent().siblings('li').removeClass('on');
		$(this).parent().addClass('on');
	});
}

//tab-menu sub 2019-07-16 추가
function tabmenuSub(){
	$('.tab-menu-sub>ul>li>a').click(function(e){
		e.preventDefault();
		var tabCnt = $(this).attr('href');
		$(this).parents('.sub-tab-wrap').find('.tab-sub-cnt').each(function(){$(this).hide();});
		$(this).parents('.tab-wrap').find(''+tabCnt+'').show();
		$(this).parent().siblings('li').removeClass('on');
		$(this).parent().addClass('on');
	});
}

//코멘트 스크롤 하단내리기
function cmtScroll(){
	$('.task-detail-wrap .cmt-list').each(function(){
		$(this).mCustomScrollbar({setTop:"20000px"});
	});
}

function cmtScrollMov(e){
	//console.log('test');
	$('.cmt-list').mCustomScrollbar('scrollTo','bottom',{scrollInertia:0});
}

//코멘트 입력 - 하단고정 - 해당 페이지에서만 함수 실행 - 2차 좌측 컨텐츠 높이가 길 경우 cmt-list 값 설정할 수 있도록 추가필요.
function replyBtm(e){
	window.onload = function () {
		 replySet(e);
		 cmtScrollMov();
		}
	$(window).on('scroll resize',function(){
		replySet(e);
	});
}

function replySet(e){
	var docH = $(document).innerHeight(),
		docW = $(document).innerWidth(),
		winH = $(window).innerHeight(),
		winW = $(window).innerWidth(),
		gapH = docH - winH,
		gapW = docW - winW,
		wt = $(this).scrollTop(),
		wl = $(this).scrollLeft(),
		objB = e,
		scrollB = gapH - wt
		scrollL = gapW - wl;

	var $tg = $('.cmt-fixed'),
		$list = $('.cmt-list'),
		//tgH = $tg.innerHeight(),
		tgH = 242,
		listT = $list.offset().top,
		tgT = docH - objB - tgH,
		listH = docH - listT - scrollB - tgH,
		listMaxH = docH - listT - objB - tgH,
		tgMaxT = listT + 200;

	//console.log(objB,tgH);
	if(listH > 200) {
		if(scrollB > objB){
			$tg.css({ 'position':'fixed', 'top':'auto', 'bottom':'0', 'left':'50%', 'margin-left':'280px', 'right':'auto' });
			$list.css('height',''+listH+'px');

			if(winW < 1300){
				$tg.css({'left':'auto', 'right':''+(scrollL *(-1) + 51)+'px', 'margin-left':'0' }); // 2019-04-03 : body - max-width : 1300 변경 대응
			} else {
				null;
			}
		} else {
			$tg.css({ 'position':'absolute', 'top':''+tgT+'px', 'bottom':'auto', 'left':'50%', 'margin-left':'280px', 'right':'auto' });
			$list.css('height',''+listMaxH+'px');
		}
	} else {
		$list.css('height','200px');
		$tg.css({'position':'absolute', 'top':''+tgMaxT+'px', 'bottom':'auto' });
	}

}

//LNB 영역 높이관련
function lnbSet(){
	var $lnb = $('.side-wrap'),
		$cnt = $('.contents'),
		lnbH = $lnb.innerHeight(),
		cntH = $cnt.innerHeight();

	if(lnbH > cntH) $cnt.css('min-height',''+(lnbH - 112)+'px');
}

// 말풍선 요소 2019-03-13 수정
	function ballonSet(){
		$('.btn-balloon').unbind();
		$('.btn-balloon').hover(function(){
			var gapT = Number($(this).attr('data-top')),
			gapL = Number($(this).attr('data-left'));
			var btnH = $(this).innerHeight(),
			btnT = $(this).position().top + btnH + gapT,
			btnL = $(this).position().left + gapL;

			$(this).next('.cnt-balloon').css({'top':''+btnT+'px','left':''+btnL+'px'}).toggleClass('on');
		});
	}

// 리더 피드백 그래프 설정함수 2019-05-30
function fbGraph(){
	var $wrap = $('.inp-graph'),
	$fill = $wrap.find('.fill'),
	$score = Number($fill.text());

	if($score > 80 && $score < 100) {
		$score = $score + ($score%80);
	} else if ($score >= 100){
		$score = 120;
	}
	$fill.css('width',''+$score+'%');
	if($score > 59 && $score < 80) $wrap.removeClass('over80 score80').addClass('under80');
	else if ($score == 80) $wrap.removeClass('over80 under80').addClass('score80');
	else if ( $score > 79 ) $wrap.removeClass('under80 score80').addClass('over80');
	else $wrap.removeClass('over80 under80 score80');
}

/* 2019-10-29 파일첨부 */
function fileSet(obj){
	var $wrap = obj,
		$file = $wrap.find('input[type=file]'),
		fileTx = '';

	if($file.is(':disabled')) $wrap.addClass('disabled').prepend('<input type="text" class="inp-file-url" title="파일 경로" readonly disabled>');
	else $wrap.prepend('<input type="text" class="inp-file-url" title="파일 경로" readonly>');

	var $inp = $wrap.find('.inp-file-url');

	if($file.attr('value')) {
		fileTx = $file.attr('value');
		$inp.val(fileTx);
	}
	$file.change(function(){
		var tx = $(this).val();
		$inp.val(tx);
	});
}

$(document).ready(function(){

	// input 디자인 적용
	radSet();
	chkSet();
	selectSet();
	selectSetNew();

	// tabmenu 적용
	tabmenu();
	tabmenuS();
	tabmenuCmt(); // 2019-02-18 추가
	tabmenuSub(); // 2019-07-16 추가

	// 코멘트 스크롤 내리기 적용
	//cmtScroll(); - 개발에서 댓글 로드 후 실행함. 중복 실행될 경우 스크롤 위치 오류가 발생하여 임의 삭제.

	//toggle 컨텐츠
	$('.btn-tgl').click(function(){
		$(this).toggleClass('on');
	});

	ballonSet(); // 말풍선 함수 선언

	// 말풍선 요소 2018-09-13 수정
	$('.btn-balloon-c').click(function(){
		var gapT = Number($(this).attr('data-top')),
		gapL = Number($(this).attr('data-left'));
		var btnH = $(this).innerHeight(),
		btnT = $(this).position().top + btnH + gapT,
		btnL = $(this).position().left + gapL;

		$('.cnt-balloon').each(function(){ $(this).removeClass('on'); });
		$(this).next('.cnt-balloon').css({'top':''+btnT+'px','left':''+btnL+'px'}).toggleClass('on');
	});

	$('.btn-balloon-close').click(function(){
		$(this).closest('.cnt-balloon').removeClass('on');
	});

	/* 2020-02-19 댓글 높이 자동 조정 추가 */
	$('.tx-height-auto').each(function(){
		$(this).on('keyup',function(){
			$(this).height(1).height( $(this).prop('scrollHeight') - 13);
		});
	});
	

});
