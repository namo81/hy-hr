$(document).ready(function(){
	
	var $layerset = null;

	var $cntwrap = '#wrap',  // 페이지 컨텐츠 영역
		$layer = '.layer-pop', // 레이어 팝업 공통 클래스
		$layercnt = '.layer-cnt', // 레이어 팝업 내 컨텐츠 영역 클래스
		onClass = 'now-open'; // 레이어 팝업 오픈 시킨 버튼에 지정될 임시 클래스


	// 레이어팝업 위치가 화면 중앙에 오도록.
	$('.open-layer').click(function(e){
		e.preventDefault();
		var tg = $(this).attr('href'),
			bgSet = $(this).attr('data-layerset');
		$(''+tg+'').show().find($layercnt).attr('tabindex','0').focus();
		popSet($(''+tg+''), $(this), bgSet, true);
	});

	//레이어 팝업 위치 설정 없음. CSS 에 설정된 값으로 표출
	$('.open-layer-top').click(function(e){
		e.preventDefault();
		var tg = $(this).attr('href'),
			bgSet = $(this).attr('data-layerset');
		$(''+tg+'').show().find($layercnt).attr('tabindex','0').focus();
		popSet($(''+tg+''), $(this), bgSet, false);
	});

	//레이어 팝업을 띄우는 버튼 위치에 레이어 팝업이 오도록
	$('.open-layer-postion').click(function(e){
		e.preventDefault();
		var tg = $(this).attr('href');
		$(window).scrollTop('0%');
		var sc = $(this).offset().top;
		$(''+tg+'').show().find($layercnt).css('top',''+sc+'px').end().find($layercnt).attr('tabindex','0').focus();
		$(this).addClass(onClass);
		tabIndexOff($cntwrap);
	});


	$('.close-layer').click(function(){
		$($layer).hide();
		if($layerset != null) indexOnScroll($cntwrap);
		else tabIndexOn($cntwrap);		
		$('.'+onClass+'').focus().removeClass(onClass);
		$layerset = null;
	});


	function popSet(tg, btn, bgSet, middle){
		$(window).scrollTop('0');
		if(bgSet == null) {
			tabIndexOff($cntwrap);
		} else {
			$layerset = bgSet;
			indexOffScroll($cntwrap);
		}
		if(middle == true)	popPos(tg);
		else null;
		btn.addClass(onClass);
	}

	function popPos(e){
		var tgCnt = e.find($layercnt);
		var layerH = tgCnt.innerHeight() / 2;
		tgCnt.css({'top':'50%',
			'margin-top':'-'+layerH+'px'});
	}

	
	// 팝업 오픈 시 페이지내 탭 요소 컨트롤
	function tabIndexOff(cntwrap){
		$(''+cntwrap+' a, '+cntwrap+' button, '+cntwrap+' input').each(function(){
			$(this).attr('tabindex','-1');
		});
	}
	function tabIndexOn(cntwrap){
		$(''+cntwrap+' a, '+cntwrap+' button, '+cntwrap+' input').each(function(){
			$(this).attr('tabindex','0');
		});
	}

	// 팝업 오픈 시 페이지내 탭 요소 컨트롤 + 페이지 scroll 제어	
	function indexOffScroll(cntwrap){
		if($layerset == 'fixed') { $(''+cntwrap+'').css('position','fixed'); }
		else if($layerset == 'hidden') {
			var winH = $(window).innerHeight() - 45;
			$(''+cntwrap+'').css({'overflow':'hidden','height':''+winH+'px'});
		}		
		$(''+cntwrap+' a, '+cntwrap+' button, '+cntwrap+' input').each(function(){
			$(this).attr('tabindex','-1');
		});
	}
	function indexOnScroll(cntwrap){
		if($layerset == 'fixed') {$(''+cntwrap+'').css('position','');}
		else if($layerset == 'hidden') {
			$(''+cntwrap+'').css({'overflow':'visible','height':''});
		}		
		$(''+cntwrap+' a, '+cntwrap+' button, '+cntwrap+' input').each(function(){
			$(this).attr('tabindex','0');
		});
	}
});