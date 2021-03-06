//How frequently to check for session expiration in milliseconds
var sess_pollInterval = 1000;
//How many minutes the session is valid for
var sess_expirationSeconds = 180 //180; *CHANGE BACK

//How many minutes before the warning prompt

var sess_WarningSeconds = 150; //150 *CHANGE BACK
var sess_navNotifSeconds = 60; //60 *CHANGE BACK
var sess_intervalID;
var sess_lastActivity; 


$.event.special.tap = {
    setup: function() {
        var self = this,
            $self = $(self);
        // Bind touch start
        $self.on('touchstart', function(startEvent) {
            // Save the target element of the start event
            var target = startEvent.target;
            // When a touch starts, bind a touch end handler exactly once,
            $self.one('touchend', function(endEvent) {
                // When the touch end event fires, check if the target of the
                // touch end is the same as the target of the start, and if
                // so, fire a click.
                if (target == endEvent.target) {
                    $.event.simulate('tap', self, endEvent);
                }
            });
        });
    }
};

function initSession()
{  
	sessClearInterval();
    $(".timer-warning").css("display", "none");
    sess_lastActivity = new Date();
    sessSetInterval();
    $(document).bind('keypress.session', function (ed, e)
    {
        sessKeyPressed(ed, e);
    });
}

function sessSetInterval()
{
    sess_intervalID = setInterval('sessInterval()', sess_pollInterval);
}

 function sessClearInterval() {
	clearInterval(sess_intervalID);
}

function sessEnd()
{
	ClearPages();
	sessClearInterval();
	$(".timer-warning").css("display", "none");
}

function sessInterval()
{
	var now = new Date();
	//get milliseconds of differences
	var diff = now - sess_lastActivity;
	//console.log(diff);
	//get minutes between differences
	//console.log(diff);
	//var diffMins = (diff / 1000 / 60); 
	var diffSeconds = (diff / 1000);
	if (diffSeconds >= sess_WarningSeconds)
	{
		//warn before expiring
		$(".timer-count").html(diffSeconds);
		$(".timer-warning").css("display", "block");
		
		//stop the timer
		//sessClearInterval();
		//prompt for attention
		// var active = confirm('Your session will expire in ' + (sess_expirationSeconds - sess_WarningSeconds) +
			// ' seconds, press OK to remain on this page ' +
			// 'or press Cancel to return to the home screen.');
		
		if(diffSeconds >= sess_expirationSeconds)
		{
			sessEnd();
		}
	}
	
} 

function ClearPages () 
{
	(function(){
		$('.start-screen').show();
		$('.visible').removeClass('visible');
    	$('.popover-bg, .popover-close').hide();
		$('.modal-close').hide();
		$('.modal-close2').hide();
		$('button.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-icon-only.ui-dialog-titlebar-close').trigger('click');
			$(".home").load("page-snippets/home.html", function(){
			//$(".home").load("page-snippets/discover.html", function(){
			//$(".home").load("page-snippets/portfolio.html", function(){
			//$(".home").load("page-snippets/portfolio-v2.html", function(){
			//$(".home").load("page-snippets/develop.html", function(){
			//$(".home").load("page-snippets/study-design-b1.html", function(){
				$(".pg-discover").load("page-snippets/discover.html", function(){
					$(".pg-portfolio").load("page-snippets/portfolio.html",function(){
						$(".pg-develop").load("page-snippets/develop.html", function(){
							$(".pg-develop-home").load("page-snippets/develop-home.html", function(){
									$(".pg-study-home-a").load("page-snippets/study-home-a.html", function(){
									$(".pg-disease-state-a").load("page-snippets/disease-state-a.html", function(){
									$(".pg-rationale-a").load("page-snippets/rationale-a.html", function(){
									$(".pg-study-design-a1").load("page-snippets/study-design-a1.html", function(){
										$(".pg-study-home-b").load("page-snippets/study-home-b.html", function(){
											$(".pg-disease-state-b").load("page-snippets/disease-state-b.html", function(){
											$(".pg-rationale-b").load("page-snippets/rationale-b.html", function(){
											$(".pg-study-design-b1").load("page-snippets/study-design-b1.html", function() {
											// $(".side-nav").load("page-snippets/navigation.html", function(){
											// 	$(".pg-abstract .side-nav .abstract, .pg-portfolio .side-nav .portfolio").addClass("active");
											// 	$(".pg-abstract .side-nav .abstract img").attr("src", "images/3fx_echo_video_kiosk_ui_v1.png");
											// 	$(".pg-portfolio .side-nav .portfolio img").attr("src", "images/incyte-nav-2-portfolio-active-symbol.png");
											// 	ThreeFXanalytics.Init();
											// 	ThreeFXanalytics.Tracking();
											// });
											});
											});
											});
										});
									});
									});
									});
							});
						});
					});
				});
			});
		}).addClass('visible');
	})();
}

//page animation functions
var pageAnimating = false;
var abstractSwapping;
var toHome = function(){
	if(pageAnimating){
		return;
	}
	pageAnimating = true;
	$('.pg.visible').addClass('toHome').removeClass('visible');
	$('.home').addClass('visible');
	clear();
},
changePage = function(targetPage){
	if(pageAnimating){
		return;
	}
	pageAnimating = true;
	$('.visible').addClass('toSubpage').removeClass('visible');
	$('.pg[data-page="'+targetPage+'"]').addClass('visible');
	clear();
},
clear = function(){
	setTimeout(function(){
		pageAnimating=false;
		$('.toSubpage').removeClass('toSubpage');
		$('.toHome').removeClass('toHome');
	},500);
},
scroll = function(direction, target){

		var scrolldis = parseInt(target.scrollTop())
			childrenHeight = 0;
			target.children().each(function(){
				childrenHeight = childrenHeight + $(this).outerHeight(true);
			});
		if(direction=="up"){
			if(scrolldis-400 >=0){
				target.scrollTop(scrolldis - 400);
			}else{
				target.scrollTop(0);
			}
			
		}else if(direction=="down"){
			if(scrolldis+400 <= childrenHeight){
				target.scrollTop(scrolldis + 400);
			}else{
				target.scrollTop(childrenHeight);
			}
		}
		//setTimeout(function(){ scroll(direction, target); }, 100);
	
}

/**********************
***** ASHE ************
**********************/
/* DISCOVER SCREEN */
	function resetVideo() {
		var video = $('video#discover-screen-video').get(0);
			video.pause();
			video.currentTime = 0;
	}

/* BASIC VIDEO CONTROLS */
function basicVidControl(vid, vidBtn) {
	$('.pages').on('click', vidBtn, function() {

		if ( $(vidBtn).hasClass('paused') ) {
			$(vid).get(0).play();
			$(vidBtn).attr('src', 'images/ashe-incyte-pause-btn.png').removeClass('paused');
		} else {
			$(vid).get(0).pause();
			$(vidBtn).attr('src', 'images/ashe-incyte-play-btn.png').addClass('paused');	
		}

		videoBarProgress('rationale-b-video', 'progressbar5');
	});
}

/* VIDEO progress */
function videoBarProgress(videoID, progressBarId) {
	setTimeout(function() {
	  	var video = document.getElementById(videoID);
		var pBar = document.getElementById(progressBarId);

		if (video) {
		video.addEventListener('timeupdate', function() {
			var percent = Math.floor((100 / video.duration) * video.currentTime);
		  	pBar.value = percent;
		  	pBar.getElementsByTagName('span')[0].innerHTML = percent;

		}, false);

		$('.pages').on('click', 
				'.discover-rewind-btn, .disease-state-rewind-btn, .disease-state-rewind-btn, .rewind-btn, .discover-pu-rewind-btn', 
				function() {
				if ( video.currentTime <= 30 ) {
					video.currentTime = 0;
				} else {
					video.currentTime -= 30;
				}
			});
		}
	}, 250);
}

/* video end function */
	function vidEnded(vid, vidBtn) {
		$(vid).on('ended',function(){
	     	//console.log('Video has ended!');
			$(vidBtn).attr('src', 'images/ashe-incyte-play-btn.png').addClass('paused');
			resetVideo();
	    });
	}


// functionality on study-design pages
function navColorChange(navItem) {
	$('.sd-main .col-xs-12').addClass('bg-blue').not(navItem).removeClass('bg-blue');
}


function scrollToF(id) {
	$('.sd-main-content').animate( {scrollTop: $(id).position().top }, 500 );	
	//var currentPos = $(id).position().top;
	//console.log(currentPos);
}

/* scroll into view function for develop */
function scrollInView() {
	$.fn.inView = function(){
	    if(!this.length) return false;
	    var rect = this.get(0).getBoundingClientRect();

	    return (
	        rect.top >= 0 &&
	        rect.left >= 0 &&
	        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
	        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	    );
	};
}

$(function () {

	$(document).on('click', initSession);

	//load the content
	(function(){
		ClearPages();
	})();
	
	//load up animation click handlers
	(function(){
		$(document).on(
			"click",
			'.nav-button.loads-page',
			function(){
			var intentPage = $(this).attr('data-pagelink'),
				activePage = $('.visible').attr('data-page');
				if(intentPage!=activePage)
				changePage(intentPage);
				
				if(intentPage == "portfolio"){
					setTimeout(function(){
						/* PORTFOLIO ANIMATIONS */
						$('div.progress-bar').css('width', '62%');
						$('div.progress-bar.width34').css('width', '38%');
						$('div.progress-bar.width42-2').css('width', '48%');
						$('div.progress-bar.width42').css('width', '52%');
						$('div.progress-bar.width54').css('width', '58%');
						$('div.progress-bar.width66').css('width', '72%');
						$('div.progress-bar.width69').css('width', '74%');
						$('div.progress-bar.width72').css('width', '76%');
						$('div.progress-bar.width81').css('width', '85%');
						$('div.progress-bar.width97').css('width', '97%');
						setTimeout(function () {
							$('div.progress-bar').addClass('on');
						}, 800);
					},550);
				}else{
					/* PORTFOLIO ANIMATIONS */
					$('div.progress-bar').css('width', '0%');
					$('div.progress-bar.width34').css('width', '0%');
					$('div.progress-bar.width42-2').css('width', '0%');
					$('div.progress-bar.width42').css('width', '0%');
					$('div.progress-bar.width54').css('width', '0%');
					$('div.progress-bar.width66').css('width', '0%');
					$('div.progress-bar.width69').css('width', '0%');
					$('div.progress-bar.width72').css('width', '0%');
					$('div.progress-bar.width81').css('width', '0%');
					$('div.progress-bar.width97').css('width', '0%');
					$('div.progress-bar').removeClass('on');
				}
				if(intentPage == "disease-state-a"){
					setTimeout(function(){
						$('video#disease-state-video').get(0).play();
					},550);
				}else{
						$('video#disease-state-video').get(0).pause();
						$('video#disease-state-video').get(0).currentTime = 0;
				}
				if(intentPage == "rationale-a"){
					setTimeout(function(){
						$('video#rationale-a-video').get(0).play();
					},550);
				}else{
						$('video#rationale-a-video').get(0).pause();
						$('video#rationale-a-video').get(0).currentTime = 0;
				}
				if(intentPage == "disease-state-b"){
					setTimeout(function(){
						$('video#disease-state-b-video').get(0).play();
					},550);
				}else{
						$('video#disease-state-b-video').get(0).pause();
						$('video#disease-state-b-video').get(0).currentTime = 0;
				}
				if(intentPage == "rationale-b"){
					setTimeout(function(){
						$('video#rationale-b-video').get(0).play();
					},550);
				}else{
						$('video#rationale-b-video').get(0).pause();
						$('video#rationale-b-video').get(0).currentTime = 0;
				}
				if (intentPage == "study-design-a1") {

					  	$('.pages').on('click', '.primary-objectives-nav', function() {
							//navColorChange('.primary-objectives-nav');
							scrollToF('#po');
					  	});

					  	$('.pages').on('click', '.study-design-nav', function() {
							//navColorChange('.study-design-nav');
							scrollToF('#sd');
						});

					  	$('.pages').on('click', '.criteria-nav', function() {
							//navColorChange('.criteria-nav');
							scrollToF('#kiec');
					  	});


					 //  	/* scroll within box via chevrons*/
					  	$('.pages').on('click', '.chevron-top', function() {
						  $(".sd-main-content").animate({ scrollTop: '-=100px' }, 600);
						});
						$('.pages').on('click', '.chevron-btm', function() {
						  $(".sd-main-content").animate({ scrollTop: '+=100px' }, 600);
						});


						setTimeout(function() {
							scrollInView();
							$('.sd-main-content').on('scroll', function(){ 
							    if( $('#po').inView() ) {
									navColorChange('.primary-objectives-nav');
							    }
							    if( $('#sd').inView() ) {
									navColorChange('.study-design-nav');
							    }
							    if( !$('#sd').inView() && !$('#po').inView() ) {
							   	//if( $('#kiec').inView() ) {
							        navColorChange('.criteria-nav');
							    }
							});
						}, 500);
				}
				if (intentPage == "study-design-b1") {
						setTimeout(function() {

					  	$('.pages').on('click', '.primary-objectives-nav', function() {
							//navColorChange('.primary-objectives-nav');
							scrollToF('#poB');
					  	});

					  	$('.pages').on('click', '.study-design-nav', function() {
							//navColorChange('.study-design-nav');
							scrollToF('#sdB');
						});

					  	$('.pages').on('click', '.criteria-nav', function() {
							//navColorChange('.criteria-nav');
							scrollToF('#kiecB');
					  	});


					 //  	/* scroll within box via chevrons*/
					  	$('.pages').on('click', '.chevron-top', function() {
						  $(".sd-main-content").animate({ scrollTop: '-=100px' }, 600);
						});
						$('.pages').on('click', '.chevron-btm', function() {
						  $(".sd-main-content").animate({ scrollTop: '+=100px' }, 600);
						});
 

							scrollInView();
							$('.sd-main-content').on('scroll', function(){ 
								if( $('#poB').inView() ) {
									navColorChange('.primary-objectives-nav');
							    }
							    if( $('#sdB').inView() ) {
									navColorChange('.study-design-nav');
							    }
							    if( !$('#sdB').inView() && !$('#poB').inView() ) {
							        navColorChange('.criteria-nav.b');
							    }	
							});
						}, 500);
				}
				if (intentPage !== "home") {
					setTimeout(function() {
						$('.pop-up-div').hide();
  						$('.popup-btn').attr('src', 'images/ashe-incyte-popup-btn.png').removeClass('on');
					});
				}
				if (intentPage == 'discover') {
					$('.timer-warning').css('display', 'none !important');
				}
			}
		);
			
		$(document).on(
			"click",
			".logo, .home-btn",
			toHome
		);
	})();
	
	// hidden reset button
	$('.pages').on('click', '.home-btn', function () {
		sessEnd();
		setTimeout(function() {
			window.location.reload(true);
		}, 500);
	});

	// Time-out continue button
	$(".continue-button").click(function () {
		$(".timer-warning").css("display", "none");
		sessClearInterval();
		initSession();		
	});
	
	/* FADE OUT START SCREEN */
	// $('.start-screen').on('click', function() {
	// 	$(this).fadeOut('slow');
	// });

    /* MODAL POP-UP */
    $('.pages').on('click', '.modal-show', function () {
    	var winW = $(window).width();
		var winH = $(window).height();

        $('#modal-frame').attr('src', $(this).attr('href'));
    	$('.modal-close').show();
		$('#modal-dialog').dialog({
            width: winW,
            height: winH,
            modal: true,
            show: {
	            effect: 'fade',
	            duration: 1000
	        },
	        hide: {
	            effect: 'fade',
	            duration: 100
	        },
            close: function () {
                $('#modal-frame').attr('src', 'about:blank');
                $('#modal-dialog').fadeOut();
            }
        });
        return false;
    });

	// click x to trigger click on modal-website popup
	$('.modal-close').on('mousedown touchstart', function () {
        $('.modal-close').hide();
		$('button.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-icon-only.ui-dialog-titlebar-close').trigger('click');
		return false;
	});

	$('.modal-close2').on('mousedown touchstart', function () {
        $('.modal-close2').hide();
		$('button.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-icon-only.ui-dialog-titlebar-close').trigger('click');
		return false;
	});

	$('.pages').on('click', '.trigger-close', function() {
		$('.popover-close').trigger('click');
	});


    $(".pages").on('click', '.video', function () {
    	//alert(1);
        var url = this.href,
			name = $(this).find('p').text();

		$(this).find('span').children('img').addClass('on');
		setTimeout(function() {
        	$("#video_pop").html(

        	'<div><img class="vp-close-btn" src="images/ashe-incyte-popup-btn-x.png" style="padding: 50px;" alt="Close" title="Close"></div>' +
    		'<video autoplay id="the_Video" data-videoname="'+ name +'" width="100%" height="100%"><source src="' + url + '" type="video/mp4" /></video>' +

			'<div class="video-on-discover col-xs-12">' +
				'<div class="col-xs-1 text-right"><img class="discover-pu-play-pause-btn paused" src="images/ashe-incyte-pause-btn.png"></div>' +

				'<div class="col-xs-1 text-center"><img class="discover-pu-rewind-btn" src="images/ashe-incyte-rewind-btn.png"></div>' +
				'<div class="col-xs-10"><progress id="progressbar6" max="100" value="0">' +
					'<div class="progressbar2">' +
				        '<span style="width: 100%;"></span>' +
				    '</div>' +
			    '</progress></div>' +
		    '</div>').css('display', 'block');

					/* discover pop-up controls */
					setTimeout(function() {
						videoBarProgress('the_Video', 'progressbar6');
					}, 500);

					// setTimeout(function() {
					// 	basicVidControl('video#the_Video', '.discover-pu-play-pause-btn');
					// }, 500);
					setTimeout(function() {
							$('.pages').on('click', '.discover-pu-play-pause-btn', function() {

								if ( $('.discover-pu-play-pause-btn').hasClass('paused') ) {
									$('video#the_Video').get(0).play();
									$('.discover-pu-play-pause-btn').attr('src', 'images/ashe-incyte-pause-btn.png');
								} else {
									$('video#the_Video').get(0).pause();
									$('.discover-pu-play-pause-btn').attr('src', 'images/ashe-incyte-play-btn.png');	
								}

								videoBarProgress('the_Video', 'progressbar6');
							});
					}, 250);

					setTimeout(function() {
			  			vidEnded('video#the_Video', '.discover-pu-play-pause-btn');
						$('video#the_Video').on('ended', function() {
							$('.vp-close-btn').trigger('click');
						});
			  		}, 500);
			//ThreeFXanalytics.VideoTracking();
		}, 1000);


		$('.pages').on('click', '#video_pop img.vp-close-btn', function() {
			$('#the_Video').get(0).pause();
			$('#the_Video').get(0).currentTime = 0;
			$('#video_pop').fadeOut();
		});

		// Video controls
  		$('.pages').on('click', '.play-pause-btn', function() {
				$('video#the_Video').get(0).pause();
				$('.play-pause-btn').attr('src', 'images/play-btn.png').addClass('paused');	

	  			$('.pages').on('click', '.play-pause-btn.paused', function() {
					$('video#the_Video').get(0).play();
					$('.play-pause-btn').attr('src', 'images/pause-btn.png').removeClass('paused');
		  		});
  		});

  // 		setTimeout(function() {
		// 	$('video#the_Video').on('ended', function() {
		// 		$('.home-btn').trigger('click');
		// 	});
		// }, 5000);

  		// force restart if replay button in top nav clicked
  		$('.pages').on('click', '.replay-btn', function() {
  				$('video#the_Video').load();
				$('.play-pause-btn').attr('src', 'images/pause-btn.png');	
				$('.play-pause-btn').show();
  		});
		
		ThreeFXanalytics.VideoTracking();
        return false;
    });

    /* FADE OUT VIDEO PLAYER HOME BTN */
    // $('.pages').on('click', '.video-pop', function () {
    // 	$('.carousel').carousel(0); 
    // 	//$('#video_pop').fadeOut();
    // 	if ( $('#carousel-home div.carousel-caption > div span img').hasClass('on') ) {
    // 		$('#carousel-home div.carousel-caption > div span img').removeClass('on');
    // 	}
    // });


    // Portfolio page pop-up
    $('.pages').on('click', '.progress-bar', function () {
			var content = $(this).attr('data-content');
			//alert(content);
			$('.data-content-html').html(content);
			if ( !$(this).hasClass('stopClick') ) {
				$('.popover-bg, .popover-close').fadeIn();
			}
		});
    $('.pages').on('click', '.popover-close', function () {
    	$('video').attr('src', '');
    	$('.popover-bg, .popover-close').fadeOut();
    });

 	// img over video to play port videos
	$('.pages').on('click', '.data-video-wrapper img', function() {
	   $('.data-video-wrapper .data-video-overlay').fadeOut();
	   $('.data-video-wrapper video').get(0).play();
	   $('.data-video-wrapper video').attr('controls', 'true');
	});



		/* NAV */
	    $(".pages").on("click", '#nav-toggle', function() {
    		//$(this).toggleClass( "active" );
    		if ( $('#nav-toggle').hasClass('active') ) {
    			// this opens nav; play
				$('#carousel-home').animate({height:'85px'}, 1000).css('background', 'rgba(255, 255, 255, .75');
				$('.carousel-control, .white-overlay').fadeOut();
				$('.video-on').fadeIn(1000);
				$('.discover-text').delay(200).fadeOut();
				$('.discover-play-pause-btn').click().attr('src', 'images/ashe-incyte-pause-btn.png').removeClass('paused');
				$('video#discover-screen-video').get(0).play();
				$('#nav-toggle').removeClass('active').css('visibility', 'visible');
				$('.embed-responsive.embed-responsive-16by9.ss').fadeOut();
			} else {
				resetVideo();
				$('#carousel-home').animate({height:'314px'}, 1000).css('background', 'none');
				$('.discover-text, .carousel-control, .white-overlay,.embed-responsive.embed-responsive-16by9.ss').fadeIn();
				$('.video-on').fadeOut(500);
				$('#nav-toggle').addClass('active').css('visibility', 'hidden');;
				$('.discover-play-pause-btn').attr('src', 'images/ashe-incyte-play-btn.png').addClass('paused');
			}
	  	});

		// whe tap screen to start clicked, trigger clicks on hamburger and play button to close nav and start video
  		$('.pages').on('click', '.discover-text', function() {
  			$('#nav-toggle').click();
  		});


/* discover video */
		$('.pages').on('click', '.discover-play-pause-btn', function() {
			$('video#discover-screen-video').get(0).pause();
			$('.discover-play-pause-btn').attr('src', 'images/ashe-incyte-play-btn.png').addClass('paused');	
 		});
		$('.pages').on('click', '.discover-play-pause-btn.paused', function() {
			$('video#discover-screen-video').get(0).play();
			$('.discover-play-pause-btn').attr('src', 'images/ashe-incyte-pause-btn.png').removeClass('paused');
		});

		videoBarProgress('discover-screen-video', 'progressbar');

		setInterval(function() {
  			if ( $('#progressbar').val() >= 99 ) {
  				$('.discover-play-pause-btn').attr('src', 'images/ashe-incyte-play-btn.png').addClass('paused');
				$('#nav-toggle').trigger('click');
  			}
  		}, 2000);


/* disease-state-a video */
		setTimeout(function() {
			videoBarProgress('disease-state-video', 'progressbar2');
		}, 500);
		basicVidControl('video#disease-state-video', '.disease-state-play-pause-btn');
		setTimeout(function() {
  			vidEnded('video#disease-state-video', '.disease-state-play-pause-btn');
  		}, 500);
/* rational-a-video controls */
		setTimeout(function() {
			videoBarProgress('rationale-a-video', 'progressbar3');
		}, 500);
		basicVidControl('video#rationale-a-video', '.rationale-a-play-pause-btn');
		setTimeout(function() {
  			vidEnded('video#rationale-a-video', '.rationale-a-play-pause-btn');
  		}, 500);
/* disease-state-b */
		setTimeout(function() {
			videoBarProgress('disease-state-b-video', 'progressbar4');
		}, 500);
		basicVidControl('video#disease-state-b-video', '.disease-state-b-play-pause-btn');
		setTimeout(function() {
  			vidEnded('video#disease-state-b-video', '.disease-state-b-play-pause-btn');
  		}, 500);
/* rational-b-video controls */
		setTimeout(function() {
			videoBarProgress('rationale-b-video', 'progressbar5');
		}, 500);
		basicVidControl('video#rationale-b-video', '.rationale-b-play-pause-btn');
		setTimeout(function() {
  			vidEnded('video#rationale-b-video', '.rationale-b-play-pause-btn');
  		}, 500);


/* discover pop-up controls */
		setTimeout(function() {
			videoBarProgress('the_Video', 'progressbar6');
		}, 500);
		basicVidControl('video#the_Video', '.discover-pu-play-pause-btn');
		setTimeout(function() {
  			vidEnded('video#the_Video', '.discover-pu-play-pause-btn');
  		}, 500);





/* popup for more information book thing */
$('.pages').on('click', '.popup-btn', function() {
	$('.pop-up-div').fadeIn();
	$('.popup-btn').attr('src', 'images/ashe-incyte-popup-btn-x.png').addClass('on');
});
$('.pages').on('click', '.popup-btn.on', function() {
	$('.pop-up-div').fadeOut();
	$('.popup-btn').attr('src', 'images/ashe-incyte-popup-btn.png').removeClass('on');
});


}); 