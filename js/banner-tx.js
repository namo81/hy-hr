/* -- date : 2017-12-04 -- */
/* -- snamo(Seo nam ho) for m.s.p -- */
/* -- 텍스트 배너 -- */


	$.fn.txBanner = function(option){

		//if(!option) { option = {}; }

		var set = $.extend({
			wrap:this,
			motion:true,
			btnPrev:null,  // 이전버튼
			btnNext:null,  // 다음버튼
			bannerH: null,  // 배너 너비값
			bannerWrap:null,  // 배너영역
			bannerSlide:'>ul',
			bannerList:'>ul>li',
			playStopBtn:null,  // 자동롤링 제어버튼
			rolTime:0,  // 자동롤링 시간 설정 - 0 일 경우 롤링 없음.
			stopTxt:'정지',
			startTxt:'시작',
			playStopBtnImg:false,  // 자동롤링 제어버튼 - 이미지버튼 or 시스템폰트 버튼 설정
			startImgTxt:'play',
			stopImgTxt:'stop',
			active : null
		}, option);
	
		var $wrap = $(set.wrap),
			$banwrap = $wrap.find(set.bannerWrap),
			$banSlide = $banwrap.find(set.bannerSlide),
			$ban = $banwrap.find(set.bannerList),
			$banH = set.bannerH;

		var $next = $wrap.find(set.btnNext),
			$prev = $wrap.find(set.btnPrev);

		var nowNum = 0,
			total = $ban.size(),
			$motion = set.motion;

		/* 초기 셋팅 */
		if(total > 2) {
			$banSlide.prepend($ban.last()).css('transform','translate3d(0,-'+$banH+'px,0)');
		} else {
			var $dummy1 = $ban.first().clone(),
				$dummy2 = $ban.eq(1).clone();
			$banSlide.append($dummy1).append($dummy2);
			$ban = $banwrap.find(set.bannerList);
			$banSlide.prepend($ban.last()).css('transform','translate3d(0,-'+$banH+'px,0)');
		}

		function btnOff(){ // 버튼 전체 기능제거 - 모션 진행 중 버튼 클릭 방지
			$next.off();
			$prev.off();
		}
		function btnOn(){ // 버튼 전체 기능 실행
			$next.on('click',btnNextClick);
			$prev.on('click',btnPrevClick);
		}

		function btnNextClick(){
			$banSlide.unbind('webkitTransitionEnd transitionend');
			contSet();
			if($motion == true) {
				$banSlide.stop().css({
					'transition':'.5s',
					'transform':'translate3d(0,-'+$banH * 2+'px,0)'
				});
				endNext();
			} else {
				endNext();
			}
		}

		function btnPrevClick(){
			$banSlide.unbind('webkitTransitionEnd transitionend');
			contSet();
			if($motion == true){
				$banSlide.stop().css({
					'transition':'.5s',
					'transform':'translate3d(0,0px,0)'
				});
				endPrev();
			} else {
				$banSlide.prepend($ban.last());
				endPrev();
			}
		}
		
		function endNext(){  // 모션 이동 완료 시 실행
			$banSlide.bind('webkitTransitionEnd transitionend', function(){
				$banSlide.append($ban.first());
				$banSlide.stop().css({
					'transition':'0s',
					'transform':'translate3d(0,-'+$banH+'px,0)'
				});
			});
			if(nowNum < total -1) nowNum++;
			else nowNum = 0;
			callBack();
			btnOn();
		}

		function endPrev(){  // 모션 이동 완료 시 실행
			$banSlide.bind('webkitTransitionEnd transitionend', function(){
				$banSlide.prepend($ban.last());
				$banSlide.stop().css({
					'transition':'0s',
					'transform':'translate3d(0,-'+$banH+'px,0)'
				});
			});
			if(nowNum > 0) nowNum--;
			else nowNum = total -1;
			callBack();
			btnOn();
		}

		function contSet(){ // 변수를 클릭마다 설정하도록 해야 매번 처음/마지막 컨텐츠가 현재 위치의 처음/마지막 으로 설정됨.
			btnOff();
			$ban = $banwrap.find(set.bannerList); 
		}
		

		// 자동롤링 설정
		if(set.rolTime > 0){
			var $control = $wrap.find(set.playStopBtn);
			var rolChk = true;

			var timerName = $(set.wrap).attr('class');
			timerName = setInterval(rolling, set.rolTime);
			$control.click(function(){
				if(rolChk == true){
					clearInterval(timerName);
					if(set.playStopBtnImg == true){
						mOff($control);
					} else {
						$control.children().empty().text(set.stopTxt);
					}
					rolChk = false;
				} else {
					timerName = setInterval(rolling, set.rolTime);
					if(set.playStopBtnImg == true){
						mOn($control);
					} else {
						$control.children().empty().text(set.startTxt);
					}
					rolChk = true;
				}
			});

			$wrap.on('mouseenter',function(){
				clearInterval(timerName);
			});
			$wrap.on('mouseleave',function(){
				timerName = setInterval(rolling, set.rolTime);
			});
		} else null;

		function rolling(){
			btnNextClick();
		}

		// 공통함수

		function mOff(e){
			var imgUrl = e.find('img').attr('src');
			e.find('img').attr('src', imgUrl.replace(set.stopImgTxt, set.startImgTxt)).attr('alt',set.startTxt);
		}
		function mOn(e){
			var imgUrl = e.find('img').attr('src');
			e.find('img').attr('src', imgUrl.replace(set.startImgTxt, set.stopImgTxt)).attr('alt',set.stopTxt);
		}
		
		// 콜백함수 설정 - active
		function callBack(){ 
			if ( typeof set.active === 'function' ) { // 실행시 콜백함수 설정
				set.active( nowNum + 1 );
			}
		}

		btnOn();

	}

$(document).ready(function(){
	$('.top-menu').txBanner({
		bannerH:42,
		motion:true,
		rolTime : 3000,
		bannerWrap:'.top-notice'
	});
});