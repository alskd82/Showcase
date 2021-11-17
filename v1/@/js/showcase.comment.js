$(function() {
	var MUSINSA_COMMENT_ACTION_URI = "https://"+window.location.host+"/";
	var isIE = !!navigator.userAgent.match(/msie/i);
	var isIE11 = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./);
	var chRotate = '';
	var isIphone = navigator.userAgent.match(/iPhone/i)?true:false;
	var isIpod = navigator.userAgent.match(/iPod/i)?true:false;
	var MLOGIN = false;
	var CMT_EOF = false;
	var CMT_CURP = 1;
	var CMT_LOADING = false;
	var $CMOBJ;
	var $LISTLAYOUT;

	function MCLoadMCommentList(p,pReset) {
		if(CMT_LOADING) {
			return;
		}
		$baseObj = $(".ui-cmt-base .ui-cmt-list");

		var _cync =$CMOBJ.attr("cync");
		if(pReset) {
			$baseObj.find(".ui-post").remove();
			CMT_EOF = false;
		}    

		CMT_LOADING = true;
		CMT_CURP = p;

		$.ajax({
			type: 'get',
			dataType: "jsonp",
			jsonp : "callback",
			url: MUSINSA_COMMENT_ACTION_URI+'?m=comment&a=hreq_list_event&cync='+_cync+'&p='+p+'&callback=?',
			success : function(jData){
				CMT_LOADING = false;
				MLOGIN = (jData.mLogin=='1'? true: false);
				$.each(jData.item,function(___k,jObj){
					if(jObj.blinded==1) return;
					MLOGIN = (jObj.mLogin=='1'? true: false);
					var $apObj = $LISTLAYOUT.clone();
					if(jObj.writerPhoto) $apObj.find(".ui-cmt-photo").html("<img src='"+jObj.writerPhoto+"'/>");
					else $apObj.find(".ui-cmt-photo").empty();

					if(jObj.nic) var _lvnc = "LV."+jObj.writerLevel+" "+jObj.nic;
					else var _lvnc = '탈퇴회원';
					$apObj.find(".ui-cmt-nic").html(_lvnc);
					$apObj.find(".ui-cmt-date").html(jObj.date_least);
					$apObj.find(".ui-cmt-reply").html(jObj.content);

					$baseObj.append($apObj);
				});

				if(jData.item.length<1) CMT_EOF = true;
				else {
					$baseObj.find("li.ui-post").removeClass("page-last");
					$baseObj.find("li.ui-post:last").addClass("page-last");
				}

				$(".ui-cmt-total").text(jData.totalcomment);
			}
		});
	}



	$(document).ready(function() {
		$CMOBJ = $(".ui-cmt-base");
		$LISTLAYOUT = $CMOBJ.find("li").eq(0).clone();
		$CMOBJ.find("li").remove();
		MCLoadMCommentList(CMT_CURP);

		$(document).on("click",".ui-cmt-base .reload",function() {
			CMT_CURP = 1;
			MCLoadMCommentList(CMT_CURP,true);
		});

		$(document).on("focus",".ui-inp-comment",function() {
			if(!MLOGIN) {
				top.location = 'https://my.musinsa.com/login/v1/login?&referer='+encodeURIComponent(window.location.href);
			}
		});

		$(document).on("click",".ui-btn-comment",function() {
			if(!MLOGIN) {
				top.location = 'https://my.musinsa.com/login/v1/login?&referer='+encodeURIComponent(window.location.href);
			}
			if(CMT_LOADING) {
				alert("기존 댓글을 등록중입니다.");
				return;
			}
			var content = $(".ui-inp-comment").val();
			if(content.length<6) {
				alert('글 내용이 없거나 너무 짧습니다.');
				return;
			}

			if(!confirm("댓글을 등록하시겠습니까?")) return ;

			var _cync =$CMOBJ.attr("cync");

			CMT_LOADING = true;

			$.ajax({
				type: 'post',
				url: MUSINSA_COMMENT_ACTION_URI+'?m=comment&a=hreq_write_event',
				data : 'cync='+_cync+'&content='+content,
				success : function(msg){
					CMT_LOADING = false;
					var ret = msg.split("::");
					if(ret[0]=='1') {
						CMT_CURP = 1;
						$(".ui-inp-comment").val('');
						MCLoadMCommentList(CMT_CURP,true);
					}else {
						alert(ret[1]);
					}
				}
			});

		});

		$(".custom-scroll").on("scroll",function() {
			if(!CMT_EOF) {
				if(parseInt($(".ui-cmt-base").scrollTop() + $(".ui-cmt-base").innerHeight()) >= parseInt($(".page-last").position().top)-20)  {
					MCLoadMCommentList(CMT_CURP+1);
				}
			}
		});
	});
});