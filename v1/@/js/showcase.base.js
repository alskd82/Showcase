$(document).ready(function() {
	var MUSINSA_SHOWCASE_URI = (typeof(window._MUSINSA_SHOWCASE_URI_)!='undefined' ? window._MUSINSA_SHOWCASE_URI_ : "https://"+window.location.host+"/" );
	var imageURI = '//image.musinsa.com';
	function number_format(data)
	{

		var tmp = '';
		var number = '';
		var cutlen = 3;
		var comma = ',';
		var i;

		data=''+data;

		len = data.length;
		mod = (len % cutlen);
		k = cutlen - mod;
		for (i=0; i<data.length; i++)
		{
			number = number + data.charAt(i);

			if (i < data.length - 1)
			{
				k++;
				if ((k % cutlen) == 0)
				{
					number = number + comma;
					k = 0;
				}
			}
		}

		return number;
	}
	function loadItemList(jData) {
		var _qstr = "q=&goods_no="+jData.itemuids+"&display_cnt="+jData.display_cnt+"&cache_key="+jData.cache_key;
		$.ajax({
			url:'https://store.musinsa.com/app/searches/query/?callback=?',
			cache: false,
			type: 'GET',
			data: _qstr,
			dataType: "jsonp",
			timeout: 2000,
			crossDomain: true,
			success: function (data) {
				var $product_layout = $(".ui-product-area li").eq(0).clone();
				$(".ui-product-area").empty();
				$.each(data,function(i,ob){
					var $appObj = $product_layout.clone();
					var _link = "https://store.musinsa.com/app/product/detail/"+ob.goods_no+"/"+ob.goods_sub;
					var _brlink = "https://display.musinsa.com/display/brands/"+ob.brand;
					var _img = imageURI+(ob.img.replace('_500','_320'));
					$appObj.attr('data-goodsno',ob.goods_no);
					$appObj.attr('data-price',ob.price);
					$appObj.attr('data-dimension17',ob.rate);
					$appObj.attr('data-dimension18','스토어상품');
					$appObj.attr('data-list','/magazine/showcase');
					$appObj.find(".product-img").attr("href",_link).html('<img class="lazy-load-image" data-original="'+_img+'" alt="'+ob.brand_nm+'_'+ob.goods_nm+'">');
					$appObj.find(".product-brand").attr("href",_brlink).html(ob.brand_nm);
					$appObj.find(".product-name").attr("href",_link).html(ob.goods_nm);
					$appObj.find(".product-price-text").text(number_format(ob.normal_price)+'원');
					$(".ui-product-area").append($appObj);
				});
				$(".ui-product-area").find("img.lazy-load-image").lazyload({
					effect : "fadeIn",
					threshold : 100
				});
				$(".ui-product-area").show();
			}
		});
	}

	$(".custom-scroll").on("scroll",function() {
		$(window).trigger("lazyloadupdate");
	});

	$(document).on("click",".ui-btn-copy-fb",function(){
		var data_url = encodeURIComponent(window.location.href);
		var data_text = encodeURIComponent($("meta[name=title]").attr("content"));
		var share_url = 'https://www.facebook.com/sharer.php?u=' + data_url + '&t=' + data_text;
		window.open(share_url,'sns_share','top=0,left=0,width=400,height=300');
	});

	$(document).on("click",".ui-btn-copy-twi",function(){
		var data_url = encodeURIComponent(window.location.href);
		var data_text = encodeURIComponent($("meta[name=title]").attr("content"));
		var share_url = 'https://twitter.com/intent/tweet?text=' + data_text + '&url=' + data_url;
		window.open(share_url,'sns_share','top=0,left=0,width=400,height=300');
	});

	function initSNS() {
		$("#showcaseshareuri").val(window.location.href);
		$(".ui-btn-copy-uri").attr("data-clipboard-target","#showcaseshareuri");
		var clipboard = new Clipboard('.ui-btn-copy-uri');
		clipboard.on('success', function(e) {
			$(".success-tooltip").addClass("is-active");
			setTimeout(function(){
				$(".success-tooltip").removeClass("is-active");
			},3000);
		});

		Kakao.init($(".ui-snsshare-area").data("kakao_key"));

		Kakao.Link.createDefaultButton({
			container: '#btnShareKakao',
			objectType: 'feed',
			content: {
				title: $("meta[name=title]").attr("content"),
				description: $("meta[name=description]").attr("content"),
				imageUrl:  $("meta[property='og:image']").attr("content"),
				link: {
					mobileWebUrl: window.location.href,
					webUrl: window.location.href
				}
			},
			social: {
				likeCount: $(".ui-snsshare-area").data("increase"),
				commentCount: $(".ui-snsshare-area").data("comment")
			}
		});
	}

	function loadMagazine() {
		var uid = $(".ui-product-area").data("targetcode");
		$.getJSON(MUSINSA_SHOWCASE_URI+"xml/showcasemagazine.json.php?uid="+uid,function(jData) {
			if(jData.cd>0) {
				$(".ui-snsshare-area").data("increase",parseInt(jData.data.increase));
				$(".ui-snsshare-area").data("comment",parseInt(jData.data.comment));
				$(".ui-snsshare-area").data("kakao_key",jData.data.kakao_key);
				loadItemList(jData.data);
				initSNS();
			}
		});
	}
	loadMagazine();
});