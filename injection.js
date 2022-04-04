	var url = "destiny";
	function findClosestMatch(e){
		var target = e.target || e.srcElement; 
		var current = target;
		var found = false;
		if (url == "destiny") {
			var parentClass = "msg-chat";
			var linkClass = "externallink";
		}
		else if (url == "twitch") {
			var parentClass = "chat-line__message";
			var linkClass = "link-fragment.tw-link";
		}
		
		if (!current.classList.contains(parentClass))current = current.closest("."+parentClass);
		
		if (!current.classList.contains(parentClass)) { return null; }
		found = false;
		var link = current.querySelector("a."+linkClass);
		if (link != null) return null;
		
		var prevI = 0;
		var prevLink;
		var previous = current;
		for (prevI = 0; prevI < 5; prevI++){
			previous = previous.previousSibling;
			if (previous == null) break;
			prevLink = previous.querySelector("a."+linkClass);
			if (prevLink != null) break;
		}

		var nextI = 0;
		var nextLink;
		var next = current;
		for (nextI = 0; nextI < 2; nextI++){
			next = next.nextSibling;
			if (next == null) break;
			nextLink = next.querySelector("a."+linkClass);
			if (nextLink != null) break;
		}
		if (prevLink != null && nextLink == null) return prevLink;
		else if (prevLink == null && nextLink != null) return nextLink;
		else if (prevI < nextI) return prevLink;
		else return nextLink;
	}
	function clickListener (e){
		if (!e.ctrlKey) return ;
			
			
			if (url == "destiny") {
				var parentClass = "msg-chat";
				var linkClass = "externallink";
			}
			else if (url == "twitch") {
				var parentClass = "chat-line__message";
			}
		
			
			var target = e.target || e.srcElement; 
			var link;
			if (target.tagName.toLowerCase() == "a" && target.classList.contains(linkClass)){
				link = target;
				e.preventDefault();
			}
			else if (target.tagName.toLowerCase()!= "div"){
				link = target.querySelector("a."+linkClass) || (target.closest("."+parentClass).querySelector("a."+linkClass)) || findClosestMatch(e);
			}
			else {
				link = target.querySelector("a."+linkClass) || findClosestMatch(e);
			}
			if (link != null) {
				var href=link.href;
				var embedRegEx = new RegExp(".*destiny.gg/bigscreen#.*", "g");
				if (!href.match(embedRegEx)){
					Object.assign(document.createElement('a'), {
						target: '_blank',
						href: href,
					}).click();
				}
				else {
					link.click();
				}
			}
	}
	window.onload = function(){
		var currentUrl = window.location.href;
		var destinyRegEx = new RegExp(".*destiny.gg/bigscreen.*","g");
		var twitchRegEx = new RegExp(".*twitch.tv/.*","g");
		if (currentUrl.match(destinyRegEx) ){
			url = "destiny";
			document.querySelector("#chat-wrap > iframe").contentDocument.addEventListener("click", function (e) {
				clickListener(e);
			});
		}
		else if (currentUrl.match(twitchRegEx)) {
			url = "twitch";
			//setTimeout(() => {
				document.querySelector(".chat-scrollable-area__message-container").addEventListener("click", function (e) {
					clickListener(e);
				})
			//}, 5000);
		}
	};